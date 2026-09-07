import { NextResponse } from "next/server";
import { assertSameOrigin } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";

const RESEND_URL = "https://api.resend.com";
const AUDIENCE_NAME = "Pigiecore Newsletter";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cachedAudienceId: string | null = null;

async function resendFetch(path: string, init?: RequestInit) {
  return fetch(`${RESEND_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

async function getAudienceId(): Promise<string | null> {
  if (cachedAudienceId) return cachedAudienceId;
  const listRes = await resendFetch("/audiences");
  if (!listRes.ok) {
    const body = await listRes.text();
    console.error("Resend list audiences failed:", listRes.status, body);
    return null;
  }
  const list = await listRes.json();
  const existing = list?.data?.find((a: { name?: string; id?: string }) => a.name === AUDIENCE_NAME);
  if (existing?.id) {
    cachedAudienceId = existing.id;
    return existing.id;
  }

  const createRes = await resendFetch("/audiences", {
    method: "POST",
    body: JSON.stringify({ name: AUDIENCE_NAME }),
  });
  const created = await createRes.json();
  if (createRes.ok && created?.id) {
    cachedAudienceId = created.id;
    return created.id;
  }
  if (/already/i.test(JSON.stringify(created))) {
    // Race: an audience was created concurrently. Re-list and cache the match.
    const retryRes = await resendFetch("/audiences");
    const retry = await retryRes.json();
    const found = retry?.data?.find((a: { name?: string; id?: string }) => a.name === AUDIENCE_NAME);
    if (found?.id) cachedAudienceId = found.id;
    return found?.id ?? null;
  }
  console.error("Resend create audience failed:", createRes.status, JSON.stringify(created));
  return null;
}

export async function POST(request: Request) {
  const blocked = assertSameOrigin(request);
  if (blocked) return blocked;

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  const rl = rateLimit(request, "newsletter", 5, 10 * 60 * 1000);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const audienceId = await getAudienceId();
  if (!audienceId) {
    return NextResponse.json(
      { error: "Could not set up the newsletter audience" },
      { status: 502 }
    );
  }

  const addRes = await resendFetch(`/audiences/${audienceId}/contacts`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const addBody = await addRes.json().catch(() => null);

  if (!addRes.ok) {
    const text = JSON.stringify(addBody);
    if (!/already|exists/i.test(text)) {
      console.error("Resend add contact failed:", addRes.status, text);
      return NextResponse.json({ error: "Could not subscribe you" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}

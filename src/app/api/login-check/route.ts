import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = (body?.email as string | undefined)?.toLowerCase().trim() || "unknown";

  const rl = rateLimit(request, `login:${email}`, 10, 10 * 60 * 1000);
  if (rl.limited) {
    return NextResponse.json(
      {
        error: "Too many login attempts. Please wait before trying again.",
        retryAfter: rl.retryAfter,
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  return NextResponse.json({ ok: true });
}
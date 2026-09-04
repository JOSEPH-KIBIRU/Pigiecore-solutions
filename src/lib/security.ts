import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase-server";

const SITE_HOST = (process.env.NEXT_PUBLIC_SITE_URL || "https://pigiecore.co.ke")
  .replace(/^https?:\/\//, "")
  .replace(/\/.*$/, "");

function defaultAdmins(): string[] {
  return (process.env.ADMIN_EMAILS || "josephkibiru19@gmail.com")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    if (host === SITE_HOST) return true;
    if (host === "localhost" || host === "127.0.0.1") return true;
    if (host.endsWith(".vercel.app")) return true;
    return false;
  } catch {
    return false;
  }
}

export function assertSameOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  if (isAllowedOrigin(origin)) return null;
  return NextResponse.json(
    { error: "Forbidden: cross-origin request" },
    { status: 403 }
  );
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return defaultAdmins().includes(email.toLowerCase());
}

export interface AuthResult {
  user: {
    id: string;
    email?: string | undefined;
  } | null;
  response: NextResponse | null;
}

export async function requireAdmin(): Promise<AuthResult> {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const role = (user.app_metadata as Record<string, unknown> | undefined)?.role;
  const isAdmin = role === "admin" || isAdminEmail(user.email);

  if (!isAdmin) {
    return {
      user: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user: { id: user.id, email: user.email }, response: null };
}

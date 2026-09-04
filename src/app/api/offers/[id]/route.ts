import { getServerClient } from "@/lib/supabase-server";
import { assertSameOrigin, requireAdmin } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = assertSameOrigin(request);
  if (blocked) return blocked;
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const rl = rateLimit(request, "offers:write", 60, 10 * 60 * 1000, auth.user!.id);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const supabase = await getServerClient();

  const { id } = await params;
  try {
    const body = await request.json();
    const { title, body: offerBody, button_text, button_url, color_from, color_to, active, sort_order } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("offers")
      .update({
        title,
        body: offerBody || null,
        button_text: button_text || null,
        button_url: button_url || null,
        color_from: color_from || "#2563eb",
        color_to: color_to || "#9333ea",
        active: active !== false,
        sort_order: sort_order || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = assertSameOrigin(request);
  if (blocked) return blocked;
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const supabase = await getServerClient();

  const { id } = await params;
  const { error } = await supabase.from("offers").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
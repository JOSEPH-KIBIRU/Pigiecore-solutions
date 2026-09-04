import { getServerClient } from "@/lib/supabase-server";
import { assertSameOrigin, requireAdmin } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = assertSameOrigin(request);
  if (blocked) return blocked;
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const rl = rateLimit(request, "testimonials:write", 60, 10 * 60 * 1000, auth.user!.id);
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
    const { client_name, company, role, content, rating, avatar_url, published, sort_order } = body;

    if (!client_name || !content) {
      return NextResponse.json({ error: "Client name and content are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("testimonials")
      .update({
        client_name,
        company: company || null,
        role: role || null,
        content,
        rating: Math.max(1, Math.min(5, Number(rating) || 5)),
        avatar_url: avatar_url || null,
        published: published !== false,
        sort_order: sort_order || 0,
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
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

import { getServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

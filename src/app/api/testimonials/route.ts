import { getServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let query = supabase.from("testimonials").select("*");
  if (!user) query = query.eq("published", true);
  const { data, error } = await query
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=120" },
  });
}

export async function POST(request: Request) {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { client_name, company, role, content, rating, avatar_url, published, sort_order } = body;

    if (!client_name || !content) {
      return NextResponse.json({ error: "Client name and content are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        client_name,
        company: company || null,
        role: role || null,
        content,
        rating: Math.max(1, Math.min(5, Number(rating) || 5)),
        avatar_url: avatar_url || null,
        published: published !== false,
        sort_order: sort_order || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

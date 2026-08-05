import { getServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let query = supabase.from("offers").select("*");
  if (!user) query = query.eq("active", true);
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
    const { title, body: offerBody, button_text, button_url, color_from, color_to, active, sort_order } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("offers")
      .insert({
        title,
        body: offerBody || null,
        button_text: button_text || null,
        button_url: button_url || null,
        color_from: color_from || "#2563eb",
        color_to: color_to || "#9333ea",
        active: active !== false,
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
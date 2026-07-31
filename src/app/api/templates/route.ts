import { getServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
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
    const { name, description, image_url, category, icon_name, gradient_from, gradient_to, preview_gradient, sort_order, url } = body;

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, category" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("templates")
      .insert({
        name,
        description,
        image_url: image_url || null,
        category,
        icon_name: icon_name || "Home",
        gradient_from: gradient_from || "sky-500",
        gradient_to: gradient_to || "blue-600",
        preview_gradient: preview_gradient || "from-sky-400 via-blue-500 to-indigo-600",
        sort_order: sort_order || 0,
        url: url || null,
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

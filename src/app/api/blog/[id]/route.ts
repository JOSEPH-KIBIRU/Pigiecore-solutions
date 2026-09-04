import { getServerClient } from "@/lib/supabase-server";
import { assertSameOrigin, requireAdmin } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = assertSameOrigin(request);
  if (blocked) return blocked;
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const supabase = await getServerClient();

  const { id } = await params;
  try {
    const body = await request.json();
    const { title, excerpt, content, cover_image_url, author, published, slug } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        title,
        slug: slug || slugify(title),
        excerpt: excerpt || null,
        content: content || null,
        cover_image_url: cover_image_url || null,
        author: author || "Pigiecore Solutions",
        published: published ? true : false,
        published_at: published ? new Date().toISOString() : null,
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
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

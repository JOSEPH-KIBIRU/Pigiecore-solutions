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

export async function GET() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let query = supabase.from("blog_posts").select("*");
  if (!user) query = query.eq("published", true);
  const { data, error } = await query
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=120" },
  });
}

export async function POST(request: Request) {
  const blocked = assertSameOrigin(request);
  if (blocked) return blocked;

  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const rl = rateLimit(request, "blog:write", 60, 10 * 60 * 1000, auth.user!.id);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const supabase = await getServerClient();

  try {
    const body = await request.json();
    const { title, excerpt, content, cover_image_url, author, published, slug } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const finalSlug = slug || slugify(title);
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug: finalSlug,
        excerpt: excerpt || null,
        content: content || null,
        cover_image_url: cover_image_url || null,
        author: author || "Pigiecore Solutions",
        published: published ? true : false,
        published_at: published ? new Date().toISOString() : null,
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

import { getServerClient } from "@/lib/supabase-server";
import { assertSameOrigin, requireAdmin } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

async function adminGuard(request: Request) {
  const blocked = assertSameOrigin(request);
  if (blocked) return { response: blocked as NextResponse };
  const auth = await requireAdmin();
  if (auth.response) return auth;
  const rl = rateLimit(request, "templates:write", 60, 10 * 60 * 1000, auth.user!.id);
  if (rl.limited) {
    return {
      response: NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      ) as NextResponse,
    };
  }
  return auth;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await adminGuard(request);
  if (guard.response) return guard.response;
  const { id } = await params;
  const supabase = await getServerClient();

  try {
    const body = await request.json();
    const { name, description, image_url, category, icon_name, gradient_from, gradient_to, preview_gradient, sort_order, url } = body;

    const { data, error } = await supabase
      .from("templates")
      .update({
        name,
        description,
        image_url,
        category,
        icon_name,
        gradient_from,
        gradient_to,
        preview_gradient,
        sort_order,
        url,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await adminGuard(request);
  if (guard.response) return guard.response;
  const { id } = await params;
  const supabase = await getServerClient();

  const { error } = await supabase
    .from("templates")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

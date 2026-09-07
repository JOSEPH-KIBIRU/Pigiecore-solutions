import { ImageResponse } from "next/og";
import { getServerClient } from "@/lib/supabase-server";

export const alt = "Pigiecore Solutions — Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Pigiecore Solutions — Insights";
  let excerpt = "Software, automation & business insights from Pigiecore";

  try {
    const supabase = await getServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, excerpt")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (data?.title) title = data.title as string;
    if (data?.excerpt) excerpt = data.excerpt as string;
  } catch {
    // fall back to defaults
  }

  const titleSize = title.length > 90 ? 46 : 60;
  const fontFamily = "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "linear-gradient(135deg, #0f172a 0%, #082f49 55%, #0c4a6e 100%)",
          color: "#ffffff",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
              fontSize: "38px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            P
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700, color: "#e2e8f0" }}>
            Pigiecore Solutions
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: "999px",
              background: "rgba(56,189,248,0.15)",
              color: "#7dd3fc",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Insights
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: "1024px",
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#94a3b8",
              maxWidth: "960px",
            }}
          >
            {excerpt}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#38bdf8",
            }}
          />
          <div style={{ fontSize: "26px", color: "#7dd3fc", fontWeight: 600 }}>
            pigiecore.co.ke
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

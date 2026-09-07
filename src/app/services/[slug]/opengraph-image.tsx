import { ImageResponse } from "next/og";
import { getEntry } from "@/lib/service-content";

export const alt = "Pigiecore Solutions — Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("services", slug);
  const title = entry?.h1 || "Custom Software Services in Kenya";
  const tagline = entry?.tagline || "Custom software that grows your business";

  const titleSize = title.length > 70 ? 50 : 62;
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
          background: "linear-gradient(135deg, #0f172a 0%, #312e81 55%, #4338ca 100%)",
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
            Services
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
              color: "#c7d2fe",
              maxWidth: "960px",
            }}
          >
            {tagline}
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

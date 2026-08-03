import { ImageResponse } from "next/og";

export const alt = "Pigiecore Solutions — Custom Software Development in Kenya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(135deg, #0f172a 0%, #082f49 55%, #0c4a6e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
              fontSize: "44px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            P
          </div>
          <div style={{ fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Pigiecore Solutions
          </div>
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          Custom Software That Grows Your Business
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "30px",
            color: "#7dd3fc",
            maxWidth: "860px",
            lineHeight: 1.4,
          }}
        >
          Dashboards &amp; web apps for real estate, logistics, salons, schools, and hospitals
        </div>
      </div>
    ),
    { ...size }
  );
}
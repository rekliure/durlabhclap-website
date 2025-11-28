import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "radial-gradient(900px 520px at 18% 20%, rgba(34,211,238,0.28), rgba(0,0,0,0) 60%), radial-gradient(900px 540px at 84% 70%, rgba(251,113,133,0.26), rgba(0,0,0,0) 62%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 46%), #05070a",
          color: "white",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 2, opacity: 0.9 }}>
          DURLABHCLAP FOUNDATION
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
          Protect creators.
          <br />
          Make learning joyful.
        </div>
        <div style={{ fontSize: 26, marginTop: 22, opacity: 0.82, maxWidth: 980 }}>
          Arts-based learning culture aligned with NEP 2020 — creativity, critical thinking, life skills, local context.
        </div>
        <div style={{ marginTop: 40, fontSize: 18, opacity: 0.75 }}>
          durlabhclapfoundation.org
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

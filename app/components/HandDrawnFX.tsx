"use client";

import { useMemo } from "react";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

type Props = {
  progress: number; // 0..1
  mode?: "corner" | "full";
  className?: string;
};

export default function HandDrawnFX({ progress, mode = "corner", className }: Props) {
  const p = clamp01(progress);

  // Staggered drawing: different layers reveal at different times
  const wordP = clamp01((p - 0.02) / 0.30);
  const characterP = clamp01((p - 0.18) / 0.42);
  const bgP = clamp01((p - 0.08) / 0.80);

  // Stroke style
  const stroke = "rgba(255,255,255,0.65)";
  const stroke2 = "rgba(34,211,238,0.75)";  // accent glow
  const stroke3 = "rgba(251,113,133,0.65)"; // accent2 glow

  const size = mode === "full" ? "100%" : "360";

  const style = useMemo(() => {
    return {
      ["--pWord" as any]: 1 - wordP,
      ["--pChar" as any]: 1 - characterP,
      ["--pBg" as any]: 1 - bgP,
    } as React.CSSProperties;
  }, [wordP, characterP, bgP]);

  return (
    <div
      className={`pointer-events-none select-none ${className ?? ""}`}
      style={style}
      aria-hidden
    >
      <svg
        width={size}
        height={mode === "full" ? "100%" : "260"}
        viewBox="0 0 860 520"
        className="w-full h-full"
      >
        <defs>
          <filter id="glowA" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowB" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- HAND-DRAWN WORDMARK (top-left-ish) --- */}
        <g filter="url(#glowA)" opacity="0.92" transform="translate(34,46)">
          {/* Underline swoosh */}
          <path
            d="M16 108 C 140 60, 310 150, 520 74"
            fill="none"
            stroke={stroke2}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hdStroke hdWord"
          />
          {/* Word-style strokes (abstract, not a real font) */}
          <path
            d="M20 62 C 60 20, 110 20, 150 62
               M165 62 C 210 10, 260 10, 300 62
               M312 62 C 340 30, 380 30, 410 62
               M428 62 C 470 14, 520 14, 556 62"
            fill="none"
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hdStroke hdWord"
          />
        </g>

        {/* --- BACKGROUND DOODLES (full-canvas) --- */}
        <g opacity="0.55" filter="url(#glowB)">
          <path
            d="M40 420 C 180 340, 250 480, 420 400 S 670 350, 820 430"
            fill="none"
            stroke={stroke3}
            strokeWidth="2.4"
            strokeLinecap="round"
            className="hdStroke hdBg"
          />
          <path
            d="M96 188 C 210 140, 260 220, 360 168 S 560 104, 760 150"
            fill="none"
            stroke={stroke2}
            strokeWidth="2"
            strokeLinecap="round"
            className="hdStroke hdBg"
          />
          <path
            d="M88 300 C 160 260, 250 330, 320 288 S 470 210, 640 280 S 780 340, 820 320"
            fill="none"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="6 10"
            className="hdStroke hdBg"
          />
        </g>

        {/* --- CHARACTER (center-right). Simple butterfly mascot style --- */}
        <g transform="translate(515,210) scale(1.05)" filter="url(#glowA)">
          {/* Body */}
          <path
            d="M120 30 C 108 64, 106 98, 118 140
               C 130 178, 120 208, 98 238"
            fill="none"
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
            className="hdStroke hdChar"
          />

          {/* Left wing */}
          <path
            d="M118 70 C 62 20, 10 50, 30 120
               C 48 184, 92 182, 118 140"
            fill="none"
            stroke={stroke2}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hdStroke hdChar"
          />

          {/* Right wing */}
          <path
            d="M126 70 C 178 18, 236 50, 214 122
               C 194 186, 150 186, 126 140"
            fill="none"
            stroke={stroke3}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hdStroke hdChar"
          />

          {/* Antennae */}
          <path
            d="M120 26 C 110 8, 92 10, 84 26
               M124 26 C 136 8, 154 10, 160 26"
            fill="none"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
            className="hdStroke hdChar"
          />
        </g>
      </svg>
    </div>
  );
}

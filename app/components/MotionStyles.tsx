"use client";

export default function MotionStyles() {
  return (
    <style jsx global>{`
      /* Scroll reveal: blur -> sharp (reversible) */
      .reveal {
        opacity: 0;
        transform: translate3d(0, 14px, 0) scale(0.985);
        filter: blur(12px);
        transition:
          opacity 700ms ease,
          transform 800ms cubic-bezier(0.2, 0.86, 0.2, 1),
          filter 900ms ease;
        transition-delay: var(--reveal-delay, 0ms);
        will-change: opacity, transform, filter;
      }
      .reveal.is-inview {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
        filter: blur(0px);
      }

      /* Mystery heading */
      .mysteryHeading {
        text-shadow:
          0 0 22px rgb(var(--accent) / 0.16),
          0 0 46px rgb(var(--accent2) / 0.10);
      }
      .mysteryGradient {
        background: linear-gradient(
          90deg,
          rgb(var(--fg)),
          rgb(var(--accent2)),
          rgb(var(--accent))
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      /* ✅ Scroll-driven 3D wrapper */
      .scroll3d {
        perspective: 1200px;
        transform-style: preserve-3d;
      }

      .scroll3d > .scroll3dInner {
        transform-style: preserve-3d;
        transform: perspective(1200px) rotateX(var(--rx, 0deg))
          rotateY(var(--ry, 0deg)) translateZ(var(--tz, 0px))
          scale(var(--ts, 1));
        transition:
          box-shadow 300ms ease,
          border-color 300ms ease,
          background 300ms ease;
        will-change: transform;
      }

      /* keep hover as polish, not overriding scroll transform */
      .scroll3d > .scroll3dInner:hover {
        box-shadow: 0 26px 80px rgb(var(--accent) / 0.18);
        border-color: rgb(var(--accent2) / 0.35);
      }

      /* Animated logo helpers (already used in SiteHeader) */
      .logoShell { position: relative; isolation: isolate; }
      .logoRing {
        position: absolute;
        inset: -2px;
        border-radius: 18px;
        background: conic-gradient(
          from 0deg,
          rgb(var(--accent) / 0.55),
          rgb(var(--accent2) / 0.55),
          rgb(var(--accent) / 0.55)
        );
        filter: blur(8px);
        opacity: 0.65;
        z-index: -1;
        animation: ringSpin 5s linear infinite;
      }
      @keyframes ringSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .logoFloatV2 {
        animation: logoFloatV2 2.8s ease-in-out infinite;
        transform-origin: center;
      }
      @keyframes logoFloatV2 {
        0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        50% { transform: translate3d(0, -4px, 0) rotate(-2deg) scale(1.04); }
        100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
          transition: none !important;
        }
        .logoRing, .logoFloatV2 { animation: none !important; }
        .scroll3d > .scroll3dInner { transform: none !important; }
      }
    `}</style>
  );
}

"use client";

import { useMemo } from "react";

export default function BackgroundFX() {
  const stars = useMemo(() => {
    const n = 70;
    return Array.from({ length: n }).map((_, i) => {
      const seed = (i + 3) * 9973;
      const x = (seed % 1000) / 10;
      const y = ((seed * 7) % 1000) / 10;
      const size = 1 + ((seed * 13) % 16) / 10; // 1..2.6
      const dur = 5 + ((seed * 17) % 18); // 5..22
      const delay = ((seed * 19) % 40) / 3;
      const opacity = 0.25 + ((seed * 23) % 65) / 100; // brighter
      return { x, y, size, dur, delay, opacity };
    });
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* glow clouds */}
        <div className="cloudGlowA absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="cloudGlowB absolute top-40 -right-28 h-96 w-96 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="cloudGlowC absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-300/16 blur-3xl" />

        {/* stars */}
        {stars.map((s, idx) => (
          <span
            key={idx}
            className="starDot absolute rounded-full bg-slate-200"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.7); opacity: 0.95; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .starDot {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes cloudDriftA {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(100px, 18px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes cloudDriftB {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-120px, 28px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes cloudDriftC {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(85px, -22px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .cloudGlowA { animation: cloudDriftA 22s ease-in-out infinite; }
        .cloudGlowB { animation: cloudDriftB 30s ease-in-out infinite; }
        .cloudGlowC { animation: cloudDriftC 36s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .starDot, .cloudGlowA, .cloudGlowB, .cloudGlowC {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}

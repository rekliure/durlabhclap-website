"use client";

import { useMemo } from "react";

type Props = {
  density?: number;
};

export default function BackgroundFX({ density = 44 }: Props) {
  const stars = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const seed = (i + 1) * 9973;
      const x = (seed % 1000) / 10;
      const y = ((seed * 7) % 1000) / 10;
      const size = 1 + ((seed * 13) % 14) / 10;
      const dur = 6 + ((seed * 17) % 22);
      const delay = ((seed * 19) % 40) / 2;
      const opacity = 0.22 + ((seed * 23) % 55) / 100;
      return { x, y, size, dur, delay, opacity };
    });
  }, [density]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* cloud glows */}
      <div className="cloudGlow cloudGlowA absolute -top-24 -left-40 h-96 w-96 rounded-full bg-[rgb(var(--accent)/0.16)] blur-3xl" />
      <div className="cloudGlow cloudGlowB absolute top-32 -right-48 h-[30rem] w-[30rem] rounded-full bg-[rgb(var(--accent2)/0.12)] blur-3xl" />
      <div className="cloudGlow cloudGlowC absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full bg-[rgb(var(--accent)/0.10)] blur-3xl" />

      {/* stars */}
      {stars.map((s, idx) => (
        <span
          key={idx}
          className="starDot absolute rounded-full bg-[rgb(var(--fg))]"
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

      <style jsx global>{`
        @keyframes twinkle {
          0% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.5); opacity: 0.90; }
          100% { transform: scale(1); opacity: 0.18; }
        }
        .starDot {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes cloudDriftA {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(120px, 18px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes cloudDriftB {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-140px, 26px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes cloudDriftC {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(100px, -22px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .cloudGlowA { animation: cloudDriftA 22s ease-in-out infinite; }
        .cloudGlowB { animation: cloudDriftB 30s ease-in-out infinite; }
        .cloudGlowC { animation: cloudDriftC 36s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .starDot, .cloudGlowA, .cloudGlowB, .cloudGlowC { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

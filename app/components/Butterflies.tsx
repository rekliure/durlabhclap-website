"use client";

import { useEffect, useMemo, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function ButterflySVG({ gid }: { gid: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-6 w-6">
      <defs>
        <linearGradient id={gid} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgb(var(--accent2))" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="rgb(var(--accent))" stopOpacity="0.92" />
          <stop offset="1" stopColor="rgba(255,255,255,0.75)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <path
        d="M31.5 32c-6 7.8-13.8 15.1-21.4 12.8-5.7-1.7-6.2-9.8-2.7-17.7C11 18.7 21 11.2 29 15.4c3.3 1.7 4.3 5.6 2.5 10.1zm1 0c6 7.8 13.8 15.1 21.4 12.8 5.7-1.7 6.2-9.8 2.7-17.7C53 18.7 43 11.2 35 15.4c-3.3 1.7-4.3 5.6-2.5 10.1z"
        fill={`url(#${gid})`}
      />
      <path
        d="M32 29c1.8 0 3.2 1.6 3.2 3.6S33.8 36.2 32 36.2s-3.2-1.6-3.2-3.6S30.2 29 32 29z"
        fill="rgba(255,255,255,0.80)"
      />
      <path d="M32 18c-2 4.2-2 8.2 0 12 2-3.8 2-7.8 0-12z" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

export default function Butterflies({
  count = 10,
  colorful = false,
}: {
  count?: number;
  colorful?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const top = 8 + Math.random() * 80;
      const delay = Math.random() * 6;
      const dur = 9 + Math.random() * 10;
      const scale = 0.75 + Math.random() * 1.35;
      const wiggle = 8 + Math.random() * 16;
      const opacity = 0.25 + Math.random() * 0.6;
      const direction = i % 2 === 0 ? "ltr" : "rtl";
      const hue = Math.floor(Math.random() * 360);
      return { top, delay, dur, scale, wiggle, opacity, direction, hue, i };
    });
  }, [count]);

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.map((b) => {
        const gid = `butterGrad-${b.i}-${b.hue}`;
        const filter = colorful
          ? `hue-rotate(${b.hue}deg) saturate(1.7) contrast(1.08)`
          : "none";

        return (
          <div
            key={gid}
            className={b.direction === "ltr" ? "butterflyFlyL" : "butterflyFlyR"}
            style={{
              top: `${b.top}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
              opacity: b.opacity,
              transform: `scale(${b.scale})`,
              // @ts-ignore
              ["--wiggle"]: `${b.wiggle}px`,
              filter,
            }}
          >
            <div className="butterflyFlutter drop-shadow-[0_0_22px_rgba(var(--accent),0.22)]">
              <ButterflySVG gid={gid} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

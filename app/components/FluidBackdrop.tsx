"use client";

import React, { useEffect, useId, useRef } from "react";

/**
 * FluidBackdrop
 * - Full-screen fluid “liquid” film using SVG turbulence + displacement
 * - No external libs, works great with your cyberpunk glow variables
 * - Respects prefers-reduced-motion
 */
export default function FluidBackdrop() {
  const id = useId().replace(/:/g, "");
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) return;

    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      // gentle time-varying frequencies
      const fx = 0.008 + Math.sin(t * 0.35) * 0.0015;
      const fy = 0.014 + Math.cos(t * 0.27) * 0.0018;

      // small scroll-reactive intensity
      const scrollY = window.scrollY || 0;
      const scrollBoost = Math.min(1, scrollY / 900);
      const scale = 18 + scrollBoost * 14 + Math.sin(t * 0.6) * 2;

      if (turbRef.current) {
        turbRef.current.setAttribute("baseFrequency", `${fx.toFixed(4)} ${fy.toFixed(4)}`);
        turbRef.current.setAttribute("seed", `${(2 + Math.floor(t * 2)) % 999}`);
      }
      if (dispRef.current) {
        dispRef.current.setAttribute("scale", `${scale.toFixed(1)}`);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base glow blobs (behind your content, above body bg) */}
      <div className="absolute inset-0 opacity-[0.55] mix-blend-screen">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[rgb(var(--accent)/0.22)]" />
        <div className="absolute top-[12%] right-[-220px] h-[620px] w-[620px] rounded-full blur-3xl bg-[rgb(var(--accent2)/0.20)]" />
        <div className="absolute bottom-[-220px] left-[8%] h-[680px] w-[680px] rounded-full blur-3xl bg-[rgb(var(--accent)/0.12)]" />
      </div>

      {/* Fluid film (SVG filter) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.50] mix-blend-overlay"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`${id}-liquid`} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.008 0.014"
              numOctaves="2"
              seed="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="goo"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="goo"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.20)" />
            <stop offset="40%" stopColor="rgba(168,85,247,0.14)" />
            <stop offset="70%" stopColor="rgba(251,113,133,0.16)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.12)" />
          </linearGradient>

          <radialGradient id={`${id}-r`} cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0.00)" />
          </radialGradient>
        </defs>

        <g filter={`url(#${id}-liquid)`}>
          <rect x="0" y="0" width="1000" height="1000" fill={`url(#${id}-g)`} />
          <rect x="0" y="0" width="1000" height="1000" fill={`url(#${id}-r)`} opacity="0.65" />
        </g>
      </svg>

      {/* Fine grain (tiny, so it feels “alive”) */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12)_1px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:140px_140px,180px_180px,220px_220px]" />
    </div>
  );
}

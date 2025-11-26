"use client";

import { useEffect, useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ScrollTilt({
  children,
  className = "",
  maxRotateX = 14,
  maxRotateY = 12,
  zMax = 24,
  scale = 1.0,
}: {
  children: React.ReactNode;
  className?: string;
  maxRotateX?: number;
  maxRotateY?: number;
  zMax?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tz", "0px");
      el.style.setProperty("--ts", "1");
      return;
    }

    const tick = () => {
      raf.current = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const vw = window.innerWidth || 1200;

      const centerY = rect.top + rect.height / 2;
      const centerX = rect.left + rect.width / 2;

      // -1..1 based on distance from center of viewport
      const dy = clamp((centerY - vh / 2) / (vh / 2), -1, 1);
      const dx = clamp((centerX - vw / 2) / (vw / 2), -1, 1);

      // rotate opposite to scroll direction for depth feel
      const rx = clamp(-dy * maxRotateX, -maxRotateX, maxRotateX);
      const ry = clamp(dx * maxRotateY, -maxRotateY, maxRotateY);

      // more pop near center
      const proximity = 1 - Math.min(1, Math.abs(dy));
      const tz = Math.round(proximity * zMax);

      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--tz", `${tz}px`);
      el.style.setProperty("--ts", `${scale}`);
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxRotateX, maxRotateY, zMax, scale, reducedMotion]);

  return (
    <div ref={ref} className={`scroll3d ${className}`}>
      {children}
    </div>
  );
}

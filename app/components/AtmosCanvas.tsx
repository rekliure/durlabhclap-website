"use client";

import { useEffect, useMemo, useRef } from "react";

type AtmosCanvasProps = {
  mode?: "hero" | "journey";
  seed?: number;
  className?: string;
};

export default function AtmosCanvas({ mode = "hero", seed = 1, className = "" }: AtmosCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });

  const cfg = useMemo(() => {
    // small differences per mode (journey slightly calmer & denser)
    const isJourney = mode === "journey";
    const density = isJourney ? 30 : 26;
    const amp = isJourney ? 14 : 18;
    const speed = isJourney ? 0.014 : 0.018;

    // deterministic pseudo-random from seed
    const rand = mulberry32(Math.floor(seed || 1));
    const hueShiftA = rand() * 0.08; // used only for subtle alpha modulation
    const hueShiftB = rand() * 0.08;

    return { density, amp, speed, rand, hueShiftA, hueShiftB };
  }, [mode, seed]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(1, r.width);
      const ny = (e.clientY - r.top) / Math.max(1, r.height);
      mouse.current.vx = (nx - mouse.current.x) * 0.12;
      mouse.current.vy = (ny - mouse.current.y) * 0.12;
      mouse.current.x = nx;
      mouse.current.y = ny;
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      mouse.current.vx *= 0.92;
      mouse.current.vy *= 0.92;

      const mx = mouse.current.x * width;
      const my = mouse.current.y * height;

      // subtle seed-based alpha shifts (same colors, just slightly different feel)
      const a1 = 0.20 + cfg.hueShiftA * 0.06;
      const a2 = 0.14 + cfg.hueShiftB * 0.06;

      const g1 = ctx.createRadialGradient(mx, my, 20, mx, my, Math.max(width, height) * 0.8);
      g1.addColorStop(0, `rgba(34,211,238,${a1})`);
      g1.addColorStop(0.45, "rgba(34,211,238,0.06)");
      g1.addColorStop(1, "rgba(0,0,0,0)");

      const g2 = ctx.createRadialGradient(
        width * 0.86,
        height * 0.72,
        30,
        width * 0.86,
        height * 0.72,
        Math.max(width, height) * 0.85
      );
      g2.addColorStop(0, `rgba(251,113,133,${a2})`);
      g2.addColorStop(0.5, "rgba(251,113,133,0.05)");
      g2.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      const lines = cfg.density;
      const amp = cfg.amp;
      const speed = reduce ? 0 : cfg.speed;

      for (let i = 0; i < lines; i++) {
        const y = (i / (lines - 1)) * height;
        const phase = t * speed + i * 0.22;
        const wob = Math.sin(phase) * amp + mouse.current.vx * 55;

        ctx.beginPath();
        const a = 0.08 + i * 0.012;
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = 1;

        for (let x = -20; x <= width + 20; x += 18) {
          const k = x / width;
          const wave =
            Math.sin(k * 6 + phase) * amp +
            Math.cos(k * 3.6 - phase * 1.15) * (amp * 0.55) +
            (mouse.current.y - 0.5) * 22;

          const yy = y + wave + wob * 0.08;
          if (x === -20) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }

      const vg = ctx.createRadialGradient(width * 0.5, height * 0.4, 20, width * 0.5, height * 0.4, Math.max(width, height));
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      if (!reduce) t += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    // only track pointer when on canvas
    canvas.addEventListener("pointermove", onMove, { passive: true });

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove as any);
    };
  }, [cfg]);

  return (
    <canvas
      ref={ref}
      className={["h-full w-full", mode === "hero" ? "opacity-[0.85] mix-blend-overlay" : "opacity-[0.92]", className].join(" ")}
      aria-hidden
    />
  );
}

/** deterministic PRNG */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

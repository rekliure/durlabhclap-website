"use client";

import { useEffect, useRef } from "react";

type Mode = "hero" | "journey";

// tiny seeded random (stable visuals)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function AtmosCanvas({
  mode = "journey",
  seed = 7,
  className = "",
}: {
  mode?: Mode;
  seed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      cv.width = Math.max(2, Math.floor(r.width * dpr));
      cv.height = Math.max(2, Math.floor(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // intersection (pause when offscreen)
    let running = true;
    const io = new IntersectionObserver(
      (entries) => {
        running = !!entries[0]?.isIntersecting;
      },
      { threshold: 0.08 }
    );
    io.observe(cv);

    resize();
    window.addEventListener("resize", resize);

    // Build stable constellation points
    const rand = mulberry32(seed);
    const points = Array.from({ length: mode === "hero" ? 42 : 56 }).map(() => ({
      x: rand(),
      y: rand(),
      r: 0.8 + rand() * 1.8,
      dx: (rand() - 0.5) * 0.0006,
      dy: (rand() - 0.5) * 0.0006,
    }));

    // Precompute “root growth” branches
    const branches = (() => {
      const b: Array<{ a: [number, number]; c: [number, number]; d: [number, number]; w: number }> = [];
      const baseCount = mode === "hero" ? 9 : 12;
      for (let i = 0; i < baseCount; i++) {
        const x0 = 0.42 + (i / (baseCount - 1)) * 0.16;
        const y0 = 0.98;
        const x1 = x0 + (rand() - 0.5) * 0.18;
        const y1 = 0.62 - rand() * 0.25;
        const cx = (x0 + x1) / 2 + (rand() - 0.5) * 0.12;
        const cy = (y0 + y1) / 2 - rand() * 0.16;
        b.push({ a: [x0, y0], c: [cx, cy], d: [x1, y1], w: 1.2 + rand() * 1.6 });
        // sub branches
        const sub = 2 + Math.floor(rand() * 2);
        for (let s = 0; s < sub; s++) {
          const sx0 = x1;
          const sy0 = y1;
          const sx1 = sx0 + (rand() - 0.5) * 0.22;
          const sy1 = sy0 - (0.10 + rand() * 0.18);
          const scx = (sx0 + sx1) / 2 + (rand() - 0.5) * 0.14;
          const scy = (sy0 + sy1) / 2 - rand() * 0.12;
          b.push({ a: [sx0, sy0], c: [scx, scy], d: [sx1, sy1], w: 0.7 + rand() * 1.1 });
        }
      }
      return b;
    })();

    const getCSSVar = (name: string, fallback: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    };

    const draw = () => {
      if (!running) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const r = cv.getBoundingClientRect();
      const W = r.width || 1;
      const H = r.height || 1;
      ctx.clearRect(0, 0, W, H);

      // stage progress from scroll (0..1) based on canvas position in viewport
      const top = r.top;
      const vh = window.innerHeight || 1;
      const p = clamp(1 - (top + H * 0.25) / (vh + H * 0.25), 0, 1);

      // Theme colors from CSS tokens
      // accent is hex in your ThemeProvider currently; for canvas we use safe fallbacks
      const isDark =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

      // We’ll use slightly different alpha for light mode so it remains visible
      const lineA = isDark ? 0.18 : 0.12;
      const nodeA = isDark ? 0.28 : 0.20;
      const rootA = isDark ? 0.22 : 0.14;

      // Extract rgb(var(--accent)) patterns are not readable here, so we use brand-like fallbacks.
      // You can later replace with real parsed values if you want.
      const accent = "rgba(34,211,238,";
      const accent2 = "rgba(251,113,133,";

      // ---- 1) Gradient Flow Lines (scroll reactive) ----
      const flowCount = mode === "hero" ? 16 : 22;
      const amp = (mode === "hero" ? 16 : 22) + p * 10;
      const speed = reduce ? 0 : 0.012;

      for (let i = 0; i < flowCount; i++) {
        const y = (i / (flowCount - 1)) * H;
        const phase = t * speed + i * 0.22;
        const g = ctx.createLinearGradient(0, y, W, y);
        g.addColorStop(0, `${accent}${lineA})`);
        g.addColorStop(0.55, `${accent2}${lineA * 0.85})`);
        g.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.8;

        ctx.beginPath();
        for (let x = -20; x <= W + 20; x += 18) {
          const k = x / W;
          const wave =
            Math.sin(k * 6.2 + phase) * amp +
            Math.cos(k * 3.6 - phase * 1.12) * (amp * 0.55);
          const yy = y + wave * (0.35 + p * 0.85);
          if (x === -20) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // ---- 2) Constellation Nodes & Trails ----
      const radius = (mode === "hero" ? 86 : 110) * (0.65 + p * 0.65);

      // update drift
      for (const pt of points) {
        pt.x += pt.dx * (reduce ? 0.2 : 1);
        pt.y += pt.dy * (reduce ? 0.2 : 1);
        if (pt.x < -0.05) pt.x = 1.05;
        if (pt.x > 1.05) pt.x = -0.05;
        if (pt.y < -0.05) pt.y = 1.05;
        if (pt.y > 1.05) pt.y = -0.05;
      }

      // lines
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const ax = a.x * W;
        const ay = a.y * H;
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const bx = b.x * W;
          const by = b.y * H;
          const dx = bx - ax;
          const dy = by - ay;
          const d = Math.hypot(dx, dy);
          if (d < radius) {
            const k = 1 - d / radius;
            const alpha = (nodeA * 0.9) * k * (0.25 + p * 0.85);
            const gg = ctx.createLinearGradient(ax, ay, bx, by);
            gg.addColorStop(0, `${accent}${alpha})`);
            gg.addColorStop(1, `${accent2}${alpha})`);
            ctx.strokeStyle = gg;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of points) {
        const x = n.x * W;
        const y = n.y * H;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 26);
        glow.addColorStop(0, `${accent}${0.20 * (0.35 + p * 0.75)})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(x - 26, y - 26, 52, 52);

        ctx.fillStyle = `${accent2}${0.28 * (0.35 + p * 0.75)})`;
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- 3) Root / Tree Growth ----
      // draw partial Bezier based on progress
      const grow = clamp((p - 0.10) / 0.90, 0, 1); // starts a bit later
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < branches.length; i++) {
        const br = branches[i];
        const a = [br.a[0] * W, br.a[1] * H] as const;
        const c = [br.c[0] * W, br.c[1] * H] as const;
        const d = [br.d[0] * W, br.d[1] * H] as const;

        // each branch appears slightly later
        const local = clamp((grow - i * 0.012), 0, 1);
        if (local <= 0) continue;

        const alpha = rootA * (0.25 + local * 0.75);
        const stroke = ctx.createLinearGradient(a[0], a[1], d[0], d[1]);
        stroke.addColorStop(0, `${accent}${alpha})`);
        stroke.addColorStop(1, `${accent2}${alpha * 0.9})`);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = br.w;

        // Draw partial quadratic by sampling
        ctx.beginPath();
        const steps = 26;
        for (let s = 0; s <= steps; s++) {
          const tt = (s / steps) * local;
          const x = (1 - tt) * (1 - tt) * a[0] + 2 * (1 - tt) * tt * c[0] + tt * tt * d[0];
          const y = (1 - tt) * (1 - tt) * a[1] + 2 * (1 - tt) * tt * c[1] + tt * tt * d[1];
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // subtle vignette (helps light mode too)
      const vg = ctx.createRadialGradient(W * 0.5, H * 0.4, 20, W * 0.5, H * 0.4, Math.max(W, H));
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, isDark ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.10)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      if (!reduce) t += 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [mode, seed]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />;
}

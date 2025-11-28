"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundFX from "../components/BackgroundFX";
import SiteHeader from "../components/SiteHeader";

type ActivityKey =
  | "story"
  | "emotion_art"
  | "sound_scribble"
  | "postcard"
  | "butterfly_builder"
  | "prompt_spinner"
  | "compliments"
  | "jingle"
  | "rangoli"
  | "origami";

type Activity = {
  key: ActivityKey;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  vibe: string; // tiny tag
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

function softBg() {
  // subtle premium gradient using CSS vars so it fits your theme system
  return `radial-gradient(900px 420px at 15% 25%, rgba(34,211,238,0.18), rgba(0,0,0,0) 60%),
          radial-gradient(900px 520px at 85% 70%, rgba(251,113,133,0.14), rgba(0,0,0,0) 60%),
          linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 46%)`;
}

export default function CreativeStudioPage() {
  const reduce = prefersReducedMotion();

  const activities: Activity[] = useMemo(
    () => [
      {
        key: "story",
        title: "Make-a-Story (30 sec)",
        subtitle: "Random characters + places + problems. Write 4 lines. Export a poster.",
        vibe: "Write",
        icon: <IconBook />,
      },
      {
        key: "emotion_art",
        title: "Emotion → Art Canvas",
        subtitle: "Pick a mood, pick colors, draw a feeling. Download your art.",
        vibe: "Draw",
        icon: <IconBrush />,
      },
      {
        key: "sound_scribble",
        title: "Sound + Scribble",
        subtitle: "Tiny ambient sound + doodle mode. Calm, focused, playful.",
        vibe: "Listen",
        icon: <IconSound />,
      },
      {
        key: "postcard",
        title: "Memory Postcard",
        subtitle: "2 prompts → a beautiful postcard you can download.",
        vibe: "Reflect",
        icon: <IconMail />,
      },
      {
        key: "butterfly_builder",
        title: "Build a Butterfly Journey",
        subtitle: "Place values into stages (Egg → Butterfly). See your culture roadmap.",
        vibe: "Play",
        icon: <IconButterfly />,
      },
      {
        key: "prompt_spinner",
        title: "Creative Prompt Spinner",
        subtitle: "Spin to get: Draw / Write / Act / Build / Sing + a theme.",
        vibe: "Spin",
        icon: <IconSpinner />,
      },
      {
        key: "compliments",
        title: "Compliment Generator (for kids)",
        subtitle: "Meaningful, NEP-friendly encouragement lines for teachers/parents.",
        vibe: "Care",
        icon: <IconSpark />,
      },
      {
        key: "jingle",
        title: "Make Your Own Jingle",
        subtitle: "Choose mood + instruments → play a tiny loop + lyric ideas.",
        vibe: "Music",
        icon: <IconMusic />,
      },
      {
        key: "rangoli",
        title: "Digital Rangoli / Pattern Maker",
        subtitle: "Tap to place shapes with symmetry. Make folk-pattern magic.",
        vibe: "Pattern",
        icon: <IconPattern />,
      },
      {
        key: "origami",
        title: "Origami + Craft Hub",
        subtitle: "Step-by-step micro-cards: paper boat, kite, butterfly & more.",
        vibe: "Craft",
        icon: <IconHands />,
      },
    ],
    []
  );

  const [active, setActive] = useState<ActivityKey>("story");

  // remember last opened activity
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dcf_create_active");
      if (saved) setActive(saved as ActivityKey);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("dcf_create_active", active);
    } catch {}
  }, [active]);

  const activeMeta = activities.find((a) => a.key === active) ?? activities[0];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] relative overflow-hidden">
      <BackgroundFX density={22} />
      <SiteHeader variant="home" />

      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 opacity-90" style={{ backgroundImage: softBg() }} />
        <div className="absolute inset-0 bg-[rgb(var(--surface)/0.16)]" />
        <div className="noiseOverlay absolute inset-0 opacity-[0.14]" />
      </div>

      <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16">
        <section className="pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                Creative Studio
              </p>
              <h1 className="mt-2 text-2xl md:text-4xl font-semibold tracking-tight mysteryHeading">
                <span className="mysteryGradient">A playground for joyful learning.</span>
              </h1>
              <p className="mt-2 max-w-3xl text-sm md:text-base text-[rgb(var(--fg)/0.78)]">
                Pick an activity: draw, write, play, reflect — and take something home (downloadable art/posters).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/journey"
                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
              >
                Explore Journey →
              </Link>
              <a
                href="mailto:contact@durlabhclapfoundation.org"
                className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
              >
                Share your creation
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-12">
          {/* Left menu */}
          <aside className="lg:col-span-4">
            <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.50)] backdrop-blur p-3">
              <div className="flex items-center justify-between px-2 py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))] opacity-90">
                  Choose an activity
                </p>
                <span className="text-[11px] text-[rgb(var(--muted))]">
                  {reduce ? "Reduced motion" : "Interactive"}
                </span>
              </div>

              <div className="mt-1 grid gap-2">
                {activities.map((a) => {
                  const isActive = a.key === active;
                  return (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => setActive(a.key)}
                      className={[
                        "group w-full text-left rounded-2xl border px-3 py-3 transition relative",
                        isActive
                          ? "border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--surface)/0.62)]"
                          : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] hover:bg-[rgb(var(--surface)/0.55)]",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={[
                            "h-10 w-10 rounded-2xl border flex items-center justify-center shrink-0",
                            isActive
                              ? "border-[rgb(var(--accent)/0.45)] bg-[rgb(var(--accent)/0.12)]"
                              : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)]",
                          ].join(" ")}
                          aria-hidden
                        >
                          {a.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold truncate">{a.title}</p>
                            <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] px-2 py-0.5 text-[10px] text-[rgb(var(--fg)/0.75)]">
                              {a.vibe}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[rgb(var(--fg)/0.72)]">{a.subtitle}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right content */}
          <section className="lg:col-span-8">
            <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.50)] backdrop-blur p-5 md:p-6 overflow-hidden">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                    {activeMeta.title}
                  </p>
                  <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">{activeMeta.subtitle}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] px-3 py-1 text-[11px] text-[rgb(var(--fg)/0.78)]">
                    Tip: Download & share ❤️
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4 md:p-5">
                {active === "story" && <StoryPoster />}
                {active === "emotion_art" && <EmotionArtCanvas />}
                {active === "sound_scribble" && <SoundScribble />}
                {active === "postcard" && <MemoryPostcard />}
                {active === "butterfly_builder" && <ButterflyBuilder />}
                {active === "prompt_spinner" && <PromptSpinner />}
                {active === "compliments" && <ComplimentGenerator />}
                {active === "jingle" && <JingleMaker />}
                {active === "rangoli" && <RangoliMaker />}
                {active === "origami" && <OrigamiHub />}
              </div>

              <div className="mt-4 text-xs text-[rgb(var(--muted))]">
                Built for joyful learning • No sign-up needed • Works best on desktop, but mobile friendly too.
              </div>
            </div>
          </section>
        </section>
      </main>

      <style jsx global>{`
        .mysteryHeading {
          text-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);
        }
        .mysteryGradient {
          background: linear-gradient(90deg, rgb(var(--accent2)), rgb(var(--fg)));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .noiseOverlay {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
}

/* =========================
   1) Make-a-Story + Poster
========================= */

function StoryPoster() {
  const [character, setCharacter] = useState("a mountain kid");
  const [place, setPlace] = useState("a small school");
  const [problem, setProblem] = useState("a lost kite");
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const characters = useMemo(
    () => [
      "a mountain kid",
      "a shy student",
      "a curious teacher",
      "a talking dog",
      "a brave little sister",
      "a grandparent storyteller",
      "a tiny sparrow",
      "a friendly tree",
    ],
    []
  );
  const places = useMemo(
    () => ["a small school", "a village field", "a river bank", "a bus stop", "a library corner", "a classroom circle", "a mountain trail"],
    []
  );
  const problems = useMemo(
    () => ["a lost kite", "stage fear", "a broken bridge", "a missing chalk", "a rainy-day lesson", "a new kid feeling alone", "a quiet child who won’t speak"],
    []
  );

  const remix = () => {
    setCharacter(pick(characters));
    setPlace(pick(places));
    setProblem(pick(problems));
  };

  const renderPoster = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const W = 1200;
    const H = 675;
    c.width = W;
    c.height = H;

    // background
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "rgba(34,211,238,0.22)");
    g.addColorStop(0.5, "rgba(10,10,18,1)");
    g.addColorStop(1, "rgba(251,113,133,0.18)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // soft glow
    const glow = ctx.createRadialGradient(W * 0.18, H * 0.22, 20, W * 0.18, H * 0.22, W * 0.65);
    glow.addColorStop(0, "rgba(255,255,255,0.10)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // frame
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 8;
    roundRect(ctx, 42, 42, W - 84, H - 84, 32);
    ctx.stroke();

    // header
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "700 44px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText("DCF • Make-a-Story", 86, 130);

    ctx.fillStyle = "rgba(255,255,255,0.70)";
    ctx.font = "500 26px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText(`Character: ${character}  •  Place: ${place}  •  Problem: ${problem}`, 86, 176);

    // story box
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    roundRect(ctx, 86, 220, W - 172, H - 320, 28);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.90)";
    ctx.font = "600 32px ui-sans-serif, system-ui, -apple-system";

    const story = text.trim()
      ? text.trim()
      : "Write your story here (4 short lines).\nExample:\nI found courage in the rain.\nWe laughed, we tried again.\nThe class became a safe place.\nAnd joy helped learning stay.";

    wrapText(ctx, story, 120, 280, W - 240, 44);

    // footer
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "500 22px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText("Protect creators • Make learning joyful • durlabhclapfoundation.org", 86, H - 105);
  };

  useEffect(() => {
    renderPoster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, place, problem, text]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Chip label="Character" value={character} onClick={() => setCharacter(pick(characters))} />
        <Chip label="Place" value={place} onClick={() => setPlace(pick(places))} />
        <Chip label="Problem" value={problem} onClick={() => setProblem(pick(problems))} />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write 4 short lines…"
        className="min-h-[120px] w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] px-4 py-3 text-sm outline-none focus:border-[rgb(var(--accent)/0.35)]"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={remix}
          className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
        >
          Remix prompts
        </button>

        <button
          type="button"
          onClick={() => {
            renderPoster();
            const c = canvasRef.current;
            if (c) downloadCanvas(c, "dcf-story-poster.png");
          }}
          className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
        >
          Download poster (PNG)
        </button>
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-3">
        <canvas ref={canvasRef} className="w-full h-auto rounded-xl" />
      </div>
    </div>
  );
}

/* =========================
   2) Emotion → Art Canvas
========================= */

function EmotionArtCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [mood, setMood] = useState<"happy" | "calm" | "curious" | "brave" | "stormy">("calm");
  const [color, setColor] = useState("rgba(34,211,238,0.85)");
  const [size, setSize] = useState(8);

  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const moodHints = {
    happy: "Draw like laughter: dots + bouncy lines.",
    calm: "Draw like breath: slow curves + soft circles.",
    curious: "Draw like questions: spirals + zigzags.",
    brave: "Draw like steps: bold blocks + confident strokes.",
    stormy: "Draw like rain: fast strokes + diagonals.",
  } as const;

  const palette = useMemo(
    () => [
      "rgba(34,211,238,0.85)",
      "rgba(251,113,133,0.85)",
      "rgba(251,191,36,0.85)",
      "rgba(74,222,128,0.85)",
      "rgba(168,85,247,0.85)",
      "rgba(255,255,255,0.75)",
    ],
    []
  );

  const resize = () => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = w.getBoundingClientRect();
    c.width = Math.max(1, Math.floor(rect.width * dpr));
    c.height = Math.max(1, Math.floor(360 * dpr));
    c.style.height = "360px";
    c.style.width = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // gentle background
    ctx.clearRect(0, 0, rect.width, 360);
    const g = ctx.createLinearGradient(0, 0, rect.width, 360);
    g.addColorStop(0, "rgba(255,255,255,0.03)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, 360);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return { x: 0, y: 0 };
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const drawLine = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };

  const clear = () => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const rect = w.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, 360);

    const g = ctx.createLinearGradient(0, 0, rect.width, 360);
    g.addColorStop(0, "rgba(255,255,255,0.03)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, 360);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-[rgb(var(--muted))]">Mood:</span>
        {(["happy", "calm", "curious", "brave", "stormy"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMood(m)}
            className={[
              "rounded-full border px-3 py-2 text-xs transition",
              mood === m
                ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)]",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] px-4 py-3 text-sm text-[rgb(var(--fg)/0.80)]">
        <span className="text-[rgb(var(--accent2))] font-semibold">Prompt:</span> {moodHints[mood]}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-[rgb(var(--muted))]">Color:</span>
        {palette.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setColor(p)}
            className={[
              "h-8 w-8 rounded-full border transition",
              color === p ? "border-[rgb(var(--accent)/0.65)] scale-[1.02]" : "border-[rgb(var(--border))]",
            ].join(" ")}
            style={{ background: p }}
            aria-label="Select color"
          />
        ))}
        <span className="ml-2 text-xs text-[rgb(var(--muted))]">Brush:</span>
        <input
          type="range"
          min={2}
          max={22}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>

      <div ref={wrapRef} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-3">
        <canvas
          ref={canvasRef}
          className="w-full rounded-xl touch-none"
          onPointerDown={(e) => {
            drawing.current = true;
            const p = pointer(e);
            last.current = p;
            (e.currentTarget as any).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const p = pointer(e);
            drawLine(last.current, p);
            last.current = p;
          }}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
          aria-label="Drawing canvas"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            const c = canvasRef.current;
            if (c) downloadCanvas(c, "dcf-emotion-art.png");
          }}
          className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
        >
          Download art (PNG)
        </button>
      </div>
    </div>
  );
}

/* =========================
   3) Sound + Scribble
========================= */

function SoundScribble() {
  const [mode, setMode] = useState<"rain" | "birds" | "chime">("rain");
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<AudioContext | null>(null);
  const nodeRef = useRef<{
    stop: () => void;
  } | null>(null);

  useEffect(() => {
    return () => {
      try {
        nodeRef.current?.stop();
        audioRef.current?.close();
      } catch {}
    };
  }, []);

  const start = async () => {
    if (playing) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    const stopFns: Array<() => void> = [];

    if (mode === "rain") {
      // filtered noise
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1200;

      const g = ctx.createGain();
      g.gain.value = 0.55;

      noise.connect(filter);
      filter.connect(g);
      g.connect(master);
      noise.start();

      stopFns.push(() => noise.stop());
    }

    if (mode === "birds") {
      // gentle chirps
      const gain = ctx.createGain();
      gain.gain.value = 0.22;
      gain.connect(master);

      let alive = true;
      const chirp = () => {
        if (!alive) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        const base = 900 + Math.random() * 900;
        o.frequency.setValueAtTime(base, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(base * 1.6, ctx.currentTime + 0.08);
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

        o.connect(g);
        g.connect(gain);

        o.start();
        o.stop(ctx.currentTime + 0.16);

        setTimeout(chirp, 320 + Math.random() * 820);
      };

      chirp();
      stopFns.push(() => {
        alive = false;
      });
    }

    if (mode === "chime") {
      // soft repeating chords
      const gain = ctx.createGain();
      gain.gain.value = 0.28;
      gain.connect(master);

      let t = ctx.currentTime + 0.05;
      const notes = [392, 494, 587, 659]; // G B D E
      const interval = 0.65;

      let alive = true;
      const schedule = () => {
        if (!alive) return;

        const n1 = pick(notes);
        const n2 = pick(notes) * 0.5;

        [n1, n2].forEach((f, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "triangle";
          o.frequency.value = f;

          const startAt = t + idx * 0.02;
          g.gain.setValueAtTime(0.0001, startAt);
          g.gain.exponentialRampToValueAtTime(0.12, startAt + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.42);

          o.connect(g);
          g.connect(gain);
          o.start(startAt);
          o.stop(startAt + 0.44);
        });

        t += interval;
        setTimeout(schedule, interval * 1000);
      };

      schedule();
      stopFns.push(() => {
        alive = false;
      });
    }

    nodeRef.current = {
      stop: () => stopFns.forEach((fn) => fn()),
    };
    setPlaying(true);
  };

  const stop = async () => {
    try {
      nodeRef.current?.stop();
      nodeRef.current = null;
      await audioRef.current?.close();
      audioRef.current = null;
    } catch {}
    setPlaying(false);
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] px-4 py-3 text-sm text-[rgb(var(--fg)/0.80)]">
        Turn on a tiny ambience and doodle in the <b>Emotion → Art</b> canvas too — best combo for focus.
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[rgb(var(--muted))]">Ambience:</span>
        {(["rain", "birds", "chime"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              if (playing) return;
              setMode(m);
            }}
            className={[
              "rounded-full border px-3 py-2 text-xs transition",
              mode === m
                ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)]",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
          >
            Play ambience
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
          >
            Stop
          </button>
        )}

        <Link
          href="/create"
          onClick={() => {
            // nothing
          }}
          className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.55)] transition"
        >
          Tip: try “Emotion → Art” with this →
        </Link>
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4">
        <p className="text-sm font-semibold text-[rgb(var(--accent2))]">Small prompt</p>
        <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">
          Close your eyes for 5 seconds. Open. Now draw <b>what you feel</b> in 10 strokes.
        </p>
      </div>
    </div>
  );
}

/* =========================
   4) Memory Postcard
========================= */

function MemoryPostcard() {
  const [name, setName] = useState("");
  const [moment, setMoment] = useState("");
  const [helper, setHelper] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const render = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const W = 1200;
    const H = 700;
    c.width = W;
    c.height = H;

    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "rgba(168,85,247,0.18)");
    g.addColorStop(0.55, "rgba(10,10,18,1)");
    g.addColorStop(1, "rgba(34,211,238,0.18)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // paper card
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(ctx, 70, 70, W - 140, H - 140, 34);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 6;
    ctx.stroke();

    // header
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "800 46px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText("A Memory Postcard", 110, 150);

    ctx.fillStyle = "rgba(255,255,255,0.70)";
    ctx.font = "500 26px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText("DCF • Joyful learning • Himachal Pradesh", 110, 195);

    // message
    const safeName = name.trim() ? name.trim() : "Someone";
    const line1 = moment.trim() ? moment.trim() : "a small moment where learning felt like home";
    const line2 = helper.trim() ? helper.trim() : "a teacher / friend / family member who made it easier";

    ctx.fillStyle = "rgba(255,255,255,0.90)";
    ctx.font = "700 34px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText(`${safeName} remembers…`, 110, 275);

    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.font = "600 30px ui-sans-serif, system-ui, -apple-system";
    wrapText(ctx, `“${line1}”`, 110, 335, W - 220, 42);

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "500 26px ui-sans-serif, system-ui, -apple-system";
    wrapText(ctx, `Someone who helped: ${line2}`, 110, 520, W - 220, 36);

    // footer strip
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    roundRect(ctx, 110, H - 175, W - 220, 85, 22);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.68)";
    ctx.font = "500 22px ui-sans-serif, system-ui, -apple-system";
    ctx.fillText("If learning felt safe, curiosity grew. If curiosity grew, the child stayed a creator.", 140, H - 125);
  };

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, moment, helper]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Field label="Your name (optional)" value={name} onChange={setName} placeholder="Shashank" />
        <div className="md:col-span-2">
          <Field
            label="A moment you felt proud while learning…"
            value={moment}
            onChange={setMoment}
            placeholder="I solved something I was scared of…"
          />
        </div>
      </div>

      <Field
        label="Someone who helped you was…"
        value={helper}
        onChange={setHelper}
        placeholder="A teacher, friend, parent…"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            render();
            const c = canvasRef.current;
            if (c) downloadCanvas(c, "dcf-memory-postcard.png");
          }}
          className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
        >
          Download postcard (PNG)
        </button>
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-3">
        <canvas ref={canvasRef} className="w-full h-auto rounded-xl" />
      </div>
    </div>
  );
}

/* =========================
   5) Butterfly Builder (simple drag-less)
========================= */

function ButterflyBuilder() {
  const stages = useMemo(
    () => [
      { key: "egg", label: "Egg (Foundation)" },
      { key: "larva", label: "Larva (Growth)" },
      { key: "pupa", label: "Pupa (Systems)" },
      { key: "butterfly", label: "Butterfly (Culture)" },
    ],
    []
  );

  const tokens = useMemo(
    () => ["Hope", "Play", "Art", "Courage", "Practice", "Belonging", "Curiosity", "Care"],
    []
  );

  const [pool, setPool] = useState(tokens);
  const [placed, setPlaced] = useState<Record<string, string[]>>({
    egg: [],
    larva: [],
    pupa: [],
    butterfly: [],
  });

  const moveTo = (token: string, stageKey: string) => {
    // remove from everywhere
    setPlaced((prev) => {
      const next: Record<string, string[]> = { ...prev };
      Object.keys(next).forEach((k) => {
        next[k] = next[k].filter((x) => x !== token);
      });
      next[stageKey] = [...next[stageKey], token];
      return next;
    });
    setPool((p) => p.filter((x) => x !== token));
  };

  const returnToPool = (token: string) => {
    setPlaced((prev) => {
      const next: Record<string, string[]> = { ...prev };
      Object.keys(next).forEach((k) => {
        next[k] = next[k].filter((x) => x !== token);
      });
      return next;
    });
    setPool((p) => (p.includes(token) ? p : [...p, token]));
  };

  const summary = useMemo(() => {
    const egg = placed.egg.join(", ");
    const larva = placed.larva.join(", ");
    const pupa = placed.pupa.join(", ");
    const butterfly = placed.butterfly.join(", ");
    const parts = [
      egg ? `Foundation grows from ${egg}.` : "",
      larva ? `Growth becomes routine with ${larva}.` : "",
      pupa ? `Systems stabilize with ${pupa}.` : "",
      butterfly ? `Culture flies with ${butterfly}.` : "",
    ].filter(Boolean);
    return parts.length ? parts.join(" ") : "Place a few values into stages to generate your roadmap sentence.";
  }, [placed]);

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] p-4">
        <p className="text-sm font-semibold text-[rgb(var(--accent2))]">Value tokens</p>
        <p className="mt-1 text-xs text-[rgb(var(--fg)/0.72)]">Click a token → choose a stage below.</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {pool.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-3 py-2 text-xs text-[rgb(var(--fg)/0.82)]"
            >
              {t}
            </span>
          ))}
          {!pool.length ? (
            <span className="text-xs text-[rgb(var(--muted))]">Pool empty — remove a token from a stage to reuse.</span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {stages.map((s) => (
          <div key={s.key} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{s.label}</p>
              <div className="flex gap-2">
                {pool.slice(0, 3).map((token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => moveTo(token, s.key)}
                    className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] px-3 py-1.5 text-[11px] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.55)] transition"
                    title={`Place "${token}" here`}
                  >
                    + {token}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {(placed[s.key] ?? []).map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => returnToPool(token)}
                  className="rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.10)] px-3 py-2 text-xs text-[rgb(var(--accent2))] hover:opacity-90 transition"
                  title="Remove"
                >
                  {token} ×
                </button>
              ))}
              {!placed[s.key]?.length ? (
                <span className="text-xs text-[rgb(var(--muted))]">No values placed yet.</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[rgb(var(--accent)/0.30)] bg-[rgb(var(--bg)/0.60)] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">Your roadmap</p>
        <p className="mt-2 text-sm text-[rgb(var(--fg)/0.80)]">{summary}</p>
      </div>
    </div>
  );
}

/* =========================
   6) Prompt Spinner
========================= */

function PromptSpinner() {
  const reduce = prefersReducedMotion();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<{ action: string; theme: string } | null>(null);

  const actions = useMemo(() => ["Draw", "Write", "Act", "Build", "Sing"], []);
  const themes = useMemo(() => ["Mountains", "Friendship", "School", "Dreams", "Rain", "Courage", "A new kid", "A kindness moment"], []);

  const spin = () => {
    if (spinning) return;
    const extra = 720 + Math.random() * 720;
    const next = rotation + extra;
    setSpinning(true);
    setRotation(next);

    const action = pick(actions);
    const theme = pick(themes);

    window.setTimeout(
      () => {
        setResult({ action, theme });
        setSpinning(false);
      },
      reduce ? 50 : 1400
    );
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:items-center">
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-5 overflow-hidden">
          <div className="relative mx-auto h-[220px] w-[220px]">
            <div
              className="absolute inset-0 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] shadow-[0_14px_50px_rgba(0,0,0,0.22)]"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: reduce ? "none" : "transform 1.4s cubic-bezier(.2,.95,.2,1)",
              }}
            >
              <div className="absolute inset-0 opacity-90" style={{ backgroundImage: softBg(), borderRadius: 9999 }} />
              <div className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.06)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.65)] px-3 py-1 text-xs text-[rgb(var(--fg)/0.80)]">
                  SPIN
                </span>
              </div>
            </div>

            {/* pointer */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-[rgb(var(--accent2))]" />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={spin}
              className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
            >
              {spinning ? "Spinning…" : "Spin"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] p-5">
          <p className="text-sm font-semibold text-[rgb(var(--accent2))]">Your prompt</p>
          <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">
            {result ? (
              <>
                <b>{result.action}</b> something about <b>{result.theme}</b>. <br />
                Make it <b>simple</b>, make it <b>honest</b>.
              </>
            ) : (
              "Spin to get a creative action + theme."
            )}
          </p>

          <div className="mt-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4 text-sm text-[rgb(var(--fg)/0.78)]">
            <p className="font-semibold text-[rgb(var(--fg))]">Quick rules</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• 3 minutes only</li>
              <li>• One idea, not perfection</li>
              <li>• Share it with someone if you can</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   7) Compliment Generator
========================= */

function ComplimentGenerator() {
  const [kid, setKid] = useState("");
  const [trait, setTrait] = useState<"curious" | "kind" | "brave" | "creative" | "hardworking">("curious");
  const [lines, setLines] = useState<string[]>([]);

  const templates: Record<string, string[]> = useMemo(
    () => ({
      curious: [
        "{n}, the way you ask questions shows a sharp mind.",
        "I noticed how {n} explored the idea instead of rushing.",
        "{n}, you’re learning like a true creator — with curiosity.",
        "Your questions help the whole class learn, {n}.",
        "I love how you tried a new way of thinking, {n}.",
      ],
      kind: [
        "{n}, you made someone feel included today — that matters.",
        "Your kindness is a skill, {n}. Keep practicing it.",
        "{n}, you helped without being asked. That’s leadership.",
        "I noticed how gently you spoke today, {n}.",
        "Because of you, the class feels safer, {n}.",
      ],
      brave: [
        "{n}, you tried even when it felt scary — that’s courage.",
        "Bravery is not loud; it’s trying again. You did that, {n}.",
        "{n}, you stood up for your idea. Respect.",
        "I saw you take a small risk today, {n}. Well done.",
        "Your effort today was brave, {n}.",
      ],
      creative: [
        "{n}, your idea was fresh — you think differently.",
        "I loved your unique way of solving it, {n}.",
        "{n}, you made something new out of something simple.",
        "You’re building imagination like a muscle, {n}.",
        "{n}, your creativity adds color to the class.",
      ],
      hardworking: [
        "{n}, your consistency is turning into strength.",
        "I noticed the effort you put in, {n}. Keep going.",
        "{n}, you didn’t give up — that’s real progress.",
        "Your practice is working, {n}. I can see it.",
        "{n}, you’re building a strong learning habit.",
      ],
    }),
    []
  );

  const generate = () => {
    const n = kid.trim() || "You";
    const raw = templates[trait].map((t) => t.replaceAll("{n}", n));
    // shuffle a bit
    const shuffled = raw
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x);
    setLines(shuffled.slice(0, 5));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trait]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Field label="Child’s name (optional)" value={kid} onChange={setKid} placeholder="Simba (jk 😄) / Riya / Aman…" />
        <div className="md:col-span-2 flex flex-wrap items-end gap-2">
          <div className="flex flex-wrap gap-2">
            {(["curious", "kind", "brave", "creative", "hardworking"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrait(t)}
                className={[
                  "rounded-full border px-3 py-2 text-xs transition",
                  trait === t
                    ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                    : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)]",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={generate}
            className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
          >
            Regenerate
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4">
        <p className="text-sm font-semibold text-[rgb(var(--accent2))]">Compliments</p>
        <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
          {lines.map((l, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-[rgb(var(--muted))]">
          Tip: Say it specific + true + effort-based (not “smart”, but “you tried 3 ways”).
        </p>
      </div>
    </div>
  );
}

/* =========================
   8) Jingle Maker (tiny)
========================= */

function JingleMaker() {
  const [mood, setMood] = useState<"happy" | "calm" | "energetic">("happy");
  const [playing, setPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playHit = (ctx: AudioContext, freq: number, t: number, dur: number, type: OscillatorType, amp: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(amp, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  };

  const start = async () => {
    if (playing) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    const bpm = mood === "energetic" ? 118 : mood === "happy" ? 100 : 84;
    const beat = 60 / bpm;

    let step = 0;
    const loop = () => {
      const t = ctx.currentTime + 0.04;

      // kick
      if (step % 4 === 0) playHit(ctx, 90, t, 0.12, "sine", mood === "calm" ? 0.06 : 0.10);
      // clap
      if (mood !== "calm" && step % 8 === 4) playHit(ctx, 420, t, 0.06, "square", 0.05);
      // bell
      if (step % 8 === 2 || (mood === "energetic" && step % 8 === 6))
        playHit(ctx, 740, t, 0.18, "triangle", mood === "energetic" ? 0.055 : 0.04);

      step = (step + 1) % 16;
      timerRef.current = window.setTimeout(loop, beat * 1000);
    };

    loop();
    setPlaying(true);
  };

  const stop = async () => {
    try {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      await ctxRef.current?.close();
      ctxRef.current = null;
    } catch {}
    setPlaying(false);
  };

  const lyrics = useMemo(() => {
    const base = [
      "CLAP clap — learn with joy!",
      "Safe hearts — curious minds!",
      "Play, art, courage — every day!",
      "We keep creators alive!",
    ];
    if (mood === "calm") return ["Soft steps — steady minds", "Breathe in joy — learn slow", ...base.slice(2)];
    if (mood === "energetic") return ["CLAP clap — louder now!", "Move, laugh, learn — right now!", ...base];
    return base;
  }, [mood]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[rgb(var(--muted))]">Mood:</span>
        {(["happy", "calm", "energetic"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              if (playing) return;
              setMood(m);
            }}
            className={[
              "rounded-full border px-3 py-2 text-xs transition",
              mood === m
                ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)]",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
          >
            Play loop
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
          >
            Stop
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4">
        <p className="text-sm font-semibold text-[rgb(var(--accent2))]">Lyric ideas</p>
        <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
          {lyrics.slice(0, 5).map((l, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* =========================
   9) Rangoli / Pattern Maker
========================= */

function RangoliMaker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [shape, setShape] = useState<"dot" | "diamond" | "petal">("dot");
  const [symmetry, setSymmetry] = useState<"none" | "mirror" | "quad">("quad");
  const [color, setColor] = useState("rgba(251,191,36,0.86)");
  const [points, setPoints] = useState<Array<{ x: number; y: number; s: string; c: string }>>([]);

  const palette = useMemo(
    () => [
      "rgba(251,191,36,0.86)",
      "rgba(34,211,238,0.86)",
      "rgba(251,113,133,0.86)",
      "rgba(74,222,128,0.86)",
      "rgba(168,85,247,0.86)",
      "rgba(255,255,255,0.70)",
    ],
    []
  );

  const resize = () => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = w.getBoundingClientRect();
    c.width = Math.max(1, Math.floor(rect.width * dpr));
    c.height = Math.max(1, Math.floor(380 * dpr));
    c.style.height = "380px";
    c.style.width = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    redraw();
  };

  const redraw = () => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const rect = w.getBoundingClientRect();
    const W = rect.width;
    const H = 380;

    ctx.clearRect(0, 0, W, H);

    // background
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.fillRect(0, 0, W, H);

    // guide
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2, 20);
    ctx.lineTo(W / 2, H - 20);
    ctx.moveTo(20, H / 2);
    ctx.lineTo(W - 20, H / 2);
    ctx.stroke();

    points.forEach((p) => drawShape(ctx, p.x, p.y, p.s as any, p.c));
  };

  const addPoint = (x: number, y: number) => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const rect = w.getBoundingClientRect();
    const W = rect.width;
    const H = 380;

    const list: Array<{ x: number; y: number; s: string; c: string }> = [];
    const add = (px: number, py: number) => list.push({ x: px, y: py, s: shape, c: color });

    add(x, y);

    if (symmetry === "mirror" || symmetry === "quad") {
      const mx = W - x;
      add(mx, y);
    }
    if (symmetry === "quad") {
      const my = H - y;
      add(x, my);
      add(W - x, my);
    }

    setPoints((p) => [...p, ...list]);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    redraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, shape, symmetry, color]);

  const pointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return { x: 0, y: 0 };
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-[rgb(var(--muted))]">Shape:</span>
        {(["dot", "diamond", "petal"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setShape(s)}
            className={[
              "rounded-full border px-3 py-2 text-xs transition",
              shape === s
                ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)]",
            ].join(" ")}
          >
            {s}
          </button>
        ))}

        <span className="ml-2 text-xs text-[rgb(var(--muted))]">Symmetry:</span>
        {(["none", "mirror", "quad"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSymmetry(s)}
            className={[
              "rounded-full border px-3 py-2 text-xs transition",
              symmetry === s
                ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)]",
            ].join(" ")}
          >
            {s}
          </button>
        ))}

        <span className="ml-2 text-xs text-[rgb(var(--muted))]">Color:</span>
        {palette.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setColor(p)}
            className="h-7 w-7 rounded-full border border-[rgb(var(--border))] hover:opacity-90"
            style={{ background: p }}
            aria-label="Select color"
          />
        ))}
      </div>

      <div ref={wrapRef} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-3">
        <canvas
          ref={canvasRef}
          className="w-full rounded-xl touch-none"
          onPointerDown={(e) => {
            const p = pointer(e);
            addPoint(p.x, p.y);
          }}
          aria-label="Rangoli canvas"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setPoints([])}
          className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            const c = canvasRef.current;
            if (c) downloadCanvas(c, "dcf-rangoli.png");
          }}
          className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
        >
          Download pattern (PNG)
        </button>
      </div>
    </div>
  );
}

function drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, s: "dot" | "diamond" | "petal", c: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = c;
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;

  if (s === "dot") {
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (s === "diamond") {
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(8, 0);
    ctx.lineTo(0, 8);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    // petal
    ctx.beginPath();
    ctx.ellipse(0, -6, 7, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.ellipse(0, 6, 7, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* =========================
   10) Origami + Craft Hub
========================= */

function OrigamiHub() {
  const crafts = useMemo(
    () => [
      {
        title: "Paper Boat (5 steps)",
        steps: [
          "Fold paper in half (rectangle).",
          "Fold corners to make a triangle.",
          "Fold bottom flaps up on both sides.",
          "Open into a square and fold to triangle again.",
          "Pull open the sides — boat appears!",
        ],
      },
      {
        title: "Paper Kite (6 steps)",
        steps: [
          "Fold paper diagonally, open it.",
          "Fold both sides to the center line.",
          "Fold top corner down a little.",
          "Fold again to lock the shape.",
          "Add tail strips.",
          "Decorate with patterns!",
        ],
      },
      {
        title: "Butterfly (6 steps)",
        steps: [
          "Fold paper like an accordion (fan).",
          "Fold the fan in half.",
          "Tie a small thread in the center (or pinch).",
          "Spread both wings.",
          "Curve the wings gently.",
          "Add dots/patterns.",
        ],
      },
    ],
    []
  );

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] p-4 text-sm text-[rgb(var(--fg)/0.80)]">
        Pick a craft. Set a <b>10-minute timer</b>. Build. Then show someone.
      </div>

      <div className="grid gap-3">
        {crafts.map((c) => (
          <details key={c.title} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4">
            <summary className="cursor-pointer text-sm font-semibold text-[rgb(var(--accent2))]">{c.title}</summary>
            <ol className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)] list-decimal pl-5">
              {c.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-[rgb(var(--muted))]">Pro tip: add local motifs (mountain, leaf, river) as designs.</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* =========================
   Small shared UI helpers
========================= */

function Chip({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] p-3">
      <p className="text-[11px] text-[rgb(var(--muted))]">{label}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-1 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] px-3 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.55)] transition"
      >
        <span className="truncate">{value}</span>
        <span className="text-[rgb(var(--accent2))]">↻</span>
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] text-[rgb(var(--muted))]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] px-4 py-3 text-sm outline-none focus:border-[rgb(var(--accent)/0.35)]"
      />
    </label>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.replaceAll("\r", "").split(/\s+/);
  let line = "";
  let yy = y;

  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + " ";
    const metrics = ctx.measureText(test);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trimEnd(), x, yy);
      line = words[n] + " ";
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line.trim().length) ctx.fillText(line.trimEnd(), x, yy);
}

/* =========================
   Icons (tiny inline SVG)
========================= */

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Z" stroke="rgb(var(--accent2))" strokeWidth="2" />
      <path d="M19 20H8a3 3 0 0 0-3 3" stroke="rgb(var(--accent2))" strokeWidth="2" />
    </svg>
  );
}
function IconBrush() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 3l7 7-9 9H5v-7l9-9Z" stroke="rgb(var(--accent2))" strokeWidth="2" />
      <path d="M7 17c0 2-1 4-4 4 2-1 2.5-2.5 2.5-4H7Z" fill="rgb(var(--accent2))" opacity="0.8" />
    </svg>
  );
}
function IconSound() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9a4 4 0 0 1 0 6" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M19 7a7 7 0 0 1 0 10" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16v10H4V7Z" stroke="rgb(var(--accent2))" strokeWidth="2" />
      <path d="m4 8 8 6 8-6" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconButterfly() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v16" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12c-2-5-6-6-8-3 2 3 4 5 8 5" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12c2-5 6-6 8-3-2 3-4 5-8 5" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2v4" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
      <path d="M20.5 12a8.5 8.5 0 1 1-2.5-6" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 6v6h-6" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2l1.2 4.2L17 7.5l-3.8 1.3L12 13l-1.2-4.2L7 7.5l3.8-1.3L12 2Z" fill="rgb(var(--accent2))" opacity="0.85" />
      <path d="M5 14l.8 2.8L8 18l-2.2.7L5 21l-.8-2.3L2 18l2.2-.7L5 14Z" fill="rgb(var(--accent2))" opacity="0.55" />
    </svg>
  );
}
function IconMusic() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" stroke="rgb(var(--accent2))" strokeWidth="2" />
      <path d="M12 18V5l9-2v11" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 19a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" stroke="rgb(var(--accent2))" strokeWidth="2" />
    </svg>
  );
}
function IconPattern() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l3 5-3 5-3-5 3-5Z" fill="rgb(var(--accent2))" opacity="0.75" />
      <path d="M12 11l3 5-3 5-3-5 3-5Z" fill="rgb(var(--accent2))" opacity="0.55" />
      <path d="M3 12l5-3 5 3-5 3-5-3Z" fill="rgb(var(--accent2))" opacity="0.45" />
      <path d="M11 12l5-3 5 3-5 3-5-3Z" fill="rgb(var(--accent2))" opacity="0.35" />
    </svg>
  );
}
function IconHands() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 12v-2a2 2 0 0 1 4 0v2" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 12V8a2 2 0 0 1 4 0v4" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <path d="M15 12V9a2 2 0 0 1 4 0v6c0 4-3 7-7 7s-7-3-7-7v-1" stroke="rgb(var(--accent2))" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

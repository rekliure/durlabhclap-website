"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import BackgroundFX from "../components/BackgroundFX";
import SiteHeader from "../components/SiteHeader";

type ActivityKey = "doodle" | "prompt" | "story" | "poem" | "pattern";

export default function CreatePage() {
  const currentYear = new Date().getFullYear();

  const activities = useMemo(
    () =>
      [
        {
          key: "doodle",
          title: "Doodle Pad",
          desc: "Free-draw with a smooth brush. Download your art.",
        },
        {
          key: "prompt",
          title: "Creative Prompt Spinner",
          desc: "Get a playful task in 1 click (kids love this).",
        },
        {
          key: "story",
          title: "Story Seed Builder",
          desc: "Pick a character + place + conflict → instant story seed.",
        },
        {
          key: "poem",
          title: "Tiny Poem Generator",
          desc: "Make a 3-line poem and copy it.",
        },
        {
          key: "pattern",
          title: "Pattern Weaver",
          desc: "Generate a simple craft pattern (tiles) and copy/share.",
        },
      ] as const,
    []
  );

  const [active, setActive] = useState<ActivityKey>("doodle");

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] relative overflow-hidden">
      <BackgroundFX density={22} />
      <SiteHeader variant="home" />

      <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16">
        {/* Header */}
        <section className="pt-6">
          <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.50)] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
              Create
            </p>
            <h1 className="mt-2 text-2xl md:text-4xl font-semibold mysteryHeading">
              <span className="mysteryGradient">A small creative studio for every visitor.</span>
            </h1>
            <p className="mt-3 max-w-3xl text-sm md:text-base text-[rgb(var(--fg)/0.78)]">
              Pick an activity below. No login. Just play, create, and share.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {activities.map((a) => {
                const isActive = a.key === active;
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setActive(a.key)}
                    className={[
                      "rounded-full border px-4 py-2 text-xs transition",
                      isActive
                        ? "border-[rgb(var(--accent)/0.40)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent2))]"
                        : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)]",
                    ].join(" ")}
                  >
                    {a.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Studio */}
        <section className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6">
              <p className="text-sm font-semibold text-[rgb(var(--accent2))]">What you’re doing</p>
              <div className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                {activities.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setActive(a.key)}
                    className={[
                      "w-full text-left rounded-2xl border px-4 py-3 transition",
                      a.key === active
                        ? "border-[rgb(var(--accent)/0.34)] bg-[rgb(var(--surface)/0.70)]"
                        : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] hover:bg-[rgb(var(--surface)/0.55)]",
                    ].join(" ")}
                  >
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-xs text-[rgb(var(--fg)/0.72)]">{a.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.55)] p-4 text-xs text-[rgb(var(--fg)/0.78)]">
                Tip: on mobile, rotate to landscape for bigger canvas.
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/journey"
                  className="btnMagnetic inline-flex rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.12)] px-4 py-2 text-xs font-semibold text-[rgb(var(--accent2))]"
                >
                  See Journey →
                </Link>
                <Link
                  href="/#contact"
                  className="btnMagnetic inline-flex rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg"
                >
                  Connect
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6">
              {active === "doodle" ? <DoodlePad /> : null}
              {active === "prompt" ? <PromptSpinner /> : null}
              {active === "story" ? <StorySeed /> : null}
              {active === "poem" ? <TinyPoem /> : null}
              {active === "pattern" ? <PatternWeaver /> : null}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="mt-10 rounded-[28px] border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--bg)/0.60)] px-6 py-8 md:px-8 backdrop-blur"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                Contact
              </p>
              <h2 className="mt-2 text-2xl font-semibold mysteryHeading">
                <span className="mysteryGradient">Let’s build joyful learning together.</span>
              </h2>
              <p className="mt-3 text-sm text-[rgb(var(--fg)/0.82)]">
                If you created something here—share it with us. If you want to collaborate, volunteer, or bring
                arts-based learning to your community, ping us anytime.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="mailto:contact@durlabhclapfoundation.org"
                  className="btnMagnetic inline-flex rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--bg))] shadow-lg"
                >
                  Email us
                </a>
                <Link
                  href="/journey"
                  className="btnMagnetic inline-flex rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.12)] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--accent2))]"
                >
                  Explore Journey →
                </Link>
              </div>
            </div>

            <div className="w-full max-w-md rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6">
              <p className="text-sm font-semibold text-[rgb(var(--accent2))]">Details</p>
              <div className="mt-4 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                <p>
                  Email:{" "}
                  <a href="mailto:contact@durlabhclapfoundation.org" className="text-[rgb(var(--accent2))] hover:opacity-90">
                    contact@durlabhclapfoundation.org
                  </a>
                </p>
                <p>Location: Shahpur, Kangra, Himachal Pradesh, India</p>
                <p className="text-xs text-[rgb(var(--muted))]">Based in Himachal Pradesh • NEP 2020 aligned</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: "Instagram", href: "https://instagram.com/" },
                    { label: "YouTube", href: "https://youtube.com/" },
                    { label: "LinkedIn", href: "https://linkedin.com/" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.65)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.9)] hover:text-[rgb(var(--accent2))] transition"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] py-6">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 flex flex-col gap-3 text-xs text-[rgb(var(--muted))] md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} DurlabhCLAP Foundation. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Shahpur, Kangra, HP</span>
            <a href="mailto:contact@durlabhclapfoundation.org" className="hover:text-[rgb(var(--accent2))]">
              contact@durlabhclapfoundation.org
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =======================
   Activity: Doodle Pad
   ======================= */
function DoodlePad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [down, setDown] = useState(false);
  const [size, setSize] = useState(6);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.floor(r.width * dpr));
      c.height = Math.max(1, Math.floor(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    c.setPointerCapture(e.pointerId);
    setDown(true);
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!down) return;
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const p = pos(e);
    ctx.strokeStyle = "rgba(255,255,255,0.92)";
    ctx.lineWidth = size;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const end = () => setDown(false);

  const clear = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
  };

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "dcf-doodle.png";
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">Doodle Pad</p>
          <p className="text-sm text-[rgb(var(--fg)/0.72)]">Draw something joyful. Then download it.</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={clear} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs hover:bg-[rgb(var(--surface)/0.80)] transition">
            Clear
          </button>
          <button onClick={download} className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg">
            Download
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-[rgb(var(--fg)/0.78)]">
        <span>Brush</span>
        <input
          type="range"
          min={2}
          max={18}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-48"
        />
        <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-3 py-1">{size}px</span>
      </div>

      <div className="mt-4 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.40)] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-[380px] w-full touch-none"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          aria-label="Doodle canvas"
        />
      </div>
    </div>
  );
}

/* =======================
   Activity: Prompt Spinner
   ======================= */
function PromptSpinner() {
  const prompts = useMemo(
    () => [
      "Draw a house in the Himalayas during rain — add one tiny surprise.",
      "Make a 3-step clap rhythm and teach it to someone.",
      "Invent a new animal and name it in your language.",
      "Create a story using only 5 words (repeat allowed).",
      "Build a paper toy: boat / plane / ring — then decorate it.",
      "Make a ‘happy’ face using only triangles and circles.",
      "Teach a younger kid: 1 small skill in 2 minutes.",
      "Draw your favorite memory as 3 simple symbols.",
    ],
    []
  );

  const [prompt, setPrompt] = useState<string>(prompts[0]);

  const spin = () => {
    const next = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(next);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {}
  };

  return (
    <div>
      <p className="text-lg font-semibold">Creative Prompt Spinner</p>
      <p className="text-sm text-[rgb(var(--fg)/0.72)]">One click = one playful activity.</p>

      <div className="mt-4 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.44)] p-5">
        <p className="text-base text-[rgb(var(--fg))]">{prompt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={spin} className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg">
            New prompt
          </button>
          <button onClick={copy} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs hover:bg-[rgb(var(--surface)/0.80)] transition">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Activity: Story Seed
   ======================= */
function StorySeed() {
  const characters = ["A shy tiger", "A curious child", "A friendly crow", "A lost robot", "A brave grandma"] as const;
  const places = ["a mountain village", "a school courtyard", "a forest trail", "a small library", "a riverside"] as const;
  const conflicts = ["must solve a small mystery", "must help a friend", "must learn a new skill", "must fix a mistake", "must protect something precious"] as const;

  const [c, setC] = useState<(typeof characters)[number]>(characters[0]);
  const [p, setP] = useState<(typeof places)[number]>(places[0]);
  const [k, setK] = useState<(typeof conflicts)[number]>(conflicts[0]);

  const seed = `Story seed: ${c} in ${p} who ${k}. Add: (1) one funny moment, (2) one lesson, (3) one tiny twist.`;

  const randomize = () => {
    setC(characters[Math.floor(Math.random() * characters.length)]);
    setP(places[Math.floor(Math.random() * places.length)]);
    setK(conflicts[Math.floor(Math.random() * conflicts.length)]);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(seed);
    } catch {}
  };

  return (
    <div>
      <p className="text-lg font-semibold">Story Seed Builder</p>
      <p className="text-sm text-[rgb(var(--fg)/0.72)]">Pick 3 knobs → instant story prompt.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <select value={c} onChange={(e) => setC(e.target.value as any)} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-3 text-sm outline-none">
          {characters.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
        <select value={p} onChange={(e) => setP(e.target.value as any)} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-3 text-sm outline-none">
          {places.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
        <select value={k} onChange={(e) => setK(e.target.value as any)} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-3 text-sm outline-none">
          {conflicts.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
      </div>

      <div className="mt-4 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.44)] p-5">
        <p className="text-sm text-[rgb(var(--fg)/0.86)]">{seed}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={randomize} className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg">
            Randomize
          </button>
          <button onClick={copy} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs hover:bg-[rgb(var(--surface)/0.80)] transition">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Activity: Tiny Poem
   ======================= */
function TinyPoem() {
  const starters = ["In the quiet morning,", "Under the mountain sky,", "In a classroom of laughter,", "Near the river bend,", "After a long rain,"] as const;
  const middles = ["small hands build big dreams,", "curiosity wakes up,", "songs become ideas,", "stories learn to fly,", "colors find courage,"] as const;
  const enders = ["and learning feels like home.", "and the heart says yes.", "and fear becomes smaller.", "and joy stays longer.", "and everyone belongs."] as const;

  const [poem, setPoem] = useState(`${starters[0]}\n${middles[0]}\n${enders[0]}`);

  const generate = () => {
    const p =
      `${starters[Math.floor(Math.random() * starters.length)]}\n` +
      `${middles[Math.floor(Math.random() * middles.length)]}\n` +
      `${enders[Math.floor(Math.random() * enders.length)]}`;
    setPoem(p);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(poem);
    } catch {}
  };

  return (
    <div>
      <p className="text-lg font-semibold">Tiny Poem Generator</p>
      <p className="text-sm text-[rgb(var(--fg)/0.72)]">3 lines. Simple. Shareable.</p>

      <div className="mt-4 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.44)] p-5">
        <pre className="whitespace-pre-wrap text-sm text-[rgb(var(--fg))]">{poem}</pre>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={generate} className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg">
            Generate
          </button>
          <button onClick={copy} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs hover:bg-[rgb(var(--surface)/0.80)] transition">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Activity: Pattern Weaver
   ======================= */
function PatternWeaver() {
  const tiles = ["✦", "✶", "•", "✺", "✸", "❋", "✿", "◦"] as const;
  const [n, setN] = useState(8);
  const [grid, setGrid] = useState<string[][]>(() => gen(8, tiles));

  function gen(size: number, set: readonly string[]) {
    const g: string[][] = [];
    for (let r = 0; r < size; r++) {
      const row: string[] = [];
      for (let c = 0; c < size; c++) {
        const pick = set[(r * 3 + c * 5 + Math.floor(Math.random() * set.length)) % set.length];
        row.push(pick);
      }
      g.push(row);
    }
    return g;
  }

  const regen = () => setGrid(gen(n, tiles));

  const asText = grid.map((r) => r.join(" ")).join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText);
    } catch {}
  };

  useEffect(() => {
    setGrid(gen(n, tiles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return (
    <div>
      <p className="text-lg font-semibold">Pattern Weaver</p>
      <p className="text-sm text-[rgb(var(--fg)/0.72)]">A tiny pattern you can copy or use for crafts.</p>

      <div className="mt-4 flex items-center gap-3 text-xs text-[rgb(var(--fg)/0.78)]">
        <span>Size</span>
        <input type="range" min={6} max={12} value={n} onChange={(e) => setN(Number(e.target.value))} />
        <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-3 py-1">{n}×{n}</span>
      </div>

      <div className="mt-4 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.44)] p-5 overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap: 8 }}>
          {grid.flatMap((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] py-3 text-center text-sm"
              >
                {cell}
              </div>
            ))
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={regen} className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg">
            Regenerate
          </button>
          <button onClick={copy} className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs hover:bg-[rgb(var(--surface)/0.80)] transition">
            Copy pattern
          </button>
        </div>
      </div>
    </div>
  );
}

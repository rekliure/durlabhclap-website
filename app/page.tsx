"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundFX from "./components/BackgroundFX";
import SiteHeader from "./components/SiteHeader";
import Reveal from "./components/Reveal";
import AtmosCanvas from "./components/AtmosCanvas";
import { content } from "../src/data/lang";
import { useLang } from "./components/LanguageProvider";

type HomeKey = "hero" | "manifesto" | "impact" | "programs" | "founder" | "contact";
type Theme = { bg: string; glowA: string; glowB: string };

export default function Home() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLang();

  const c = content[lang];
  const stats = c.stats;
  const programs = c.programs.items;

  const [active, setActive] = useState<HomeKey>("hero");
  const els = useRef<Record<HomeKey, HTMLElement | null>>({
    hero: null,
    manifesto: null,
    impact: null,
    programs: null,
    founder: null,
    contact: null,
  });

  const t = (en: string, hi: string, hing: string) => (lang === "hi" ? hi : lang === "hing" ? hing : en);

  const themes = useMemo(() => {
    const base = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 46%)";
    const map: Record<HomeKey, Theme> = {
      hero: {
        bg: `radial-gradient(1200px 520px at 12% 22%, rgba(34,211,238,0.20), rgba(0,0,0,0) 60%),
             radial-gradient(900px 560px at 84% 44%, rgba(251,113,133,0.20), rgba(0,0,0,0) 62%),
             ${base}`,
        glowA: "rgba(34,211,238,0.24)",
        glowB: "rgba(251,113,133,0.18)",
      },
      manifesto: {
        bg: `radial-gradient(1100px 560px at 18% 30%, rgba(251,191,36,0.18), rgba(0,0,0,0) 60%),
             radial-gradient(900px 580px at 80% 62%, rgba(34,211,238,0.14), rgba(0,0,0,0) 62%),
             ${base}`,
        glowA: "rgba(251,191,36,0.18)",
        glowB: "rgba(34,211,238,0.18)",
      },
      impact: {
        bg: `radial-gradient(1200px 620px at 18% 40%, rgba(163,230,53,0.20), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 82% 56%, rgba(74,222,128,0.18), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(163,230,53,0.22)",
        glowB: "rgba(74,222,128,0.18)",
      },
      programs: {
        bg: `radial-gradient(1200px 620px at 12% 56%, rgba(251,191,36,0.20), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 86% 40%, rgba(34,211,238,0.14), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(251,191,36,0.20)",
        glowB: "rgba(34,211,238,0.16)",
      },
      founder: {
        bg: `radial-gradient(1200px 620px at 18% 54%, rgba(168,85,247,0.20), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 84% 36%, rgba(244,114,182,0.18), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(168,85,247,0.20)",
        glowB: "rgba(244,114,182,0.16)",
      },
      contact: {
        bg: `radial-gradient(1200px 620px at 18% 35%, rgba(34,211,238,0.16), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 82% 70%, rgba(251,191,36,0.14), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(34,211,238,0.18)",
        glowB: "rgba(251,191,36,0.14)",
      },
    };
    return map;
  }, []);

  const activeTheme = themes[active];

  useEffect(() => {
    const keys: HomeKey[] = ["hero", "manifesto", "impact", "programs", "founder", "contact"];
    const nodes = keys.map((k) => els.current[k]).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        const k = (best?.target as HTMLElement | undefined)?.dataset?.home as HomeKey | undefined;
        if (k) setActive(k);
      },
      { threshold: [0.18, 0.3, 0.45, 0.6], rootMargin: "-18% 0px -55% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const jump = (key: HomeKey) => {
    const el = els.current[key];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const proofItems = useMemo(() => {
    const arr = [
      `${t("Based in", "आधारित", "Based in")} Himachal Pradesh`,
      "NEP 2020 aligned",
      "Arts-based learning",
      "Joyful & culturally rooted",
      ...stats.map((s) => `${s.value} · ${s.label}`),
    ];
    return Array.from(new Set(arr));
  }, [lang, stats]);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] relative overflow-hidden">
      <BackgroundFX density={26} />
      <SiteHeader variant="home" />

      {/* GLOBAL BACKDROP (cinematic crossfade) */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 transition-opacity duration-700" style={{ backgroundImage: activeTheme.bg }} />
        <div className="absolute inset-0 bg-[rgb(var(--surface)/0.20)]" />
        <div className="noiseOverlay absolute inset-0 opacity-[0.14]" />
        <div
          className="absolute -top-28 -right-28 h-[560px] w-[560px] rounded-full blur-3xl transition-all duration-700"
          style={{ background: activeTheme.glowA, opacity: 0.86 }}
        />
        <div
          className="absolute -bottom-36 -left-36 h-[680px] w-[680px] rounded-full blur-3xl transition-all duration-700"
          style={{ background: activeTheme.glowB, opacity: 0.76 }}
        />
      </div>

      <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16">
        {/* HERO */}
        <section
          data-home="hero"
          ref={(el) => {
            els.current.hero = el;
          }}
          className="pt-6"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6 space-y-6" delay={0}>
              <p className="inline rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.10)] px-3 py-1 text-xs font-medium text-[rgb(var(--accent2))]">
                {c.hero.badge}
              </p>

              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl mysteryHeading">
                <span className="softShimmer">{c.hero.title}</span>{" "}
                <span className="mysteryGradient">{c.hero.highlight}</span>
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-[rgb(var(--fg)/0.78)] md:text-base">
                {c.hero.description}
              </p>

              {/* Quick nav chips */}
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ["manifesto", t("Why we exist", "हम क्यों हैं", "Why we exist")],
                    ["impact", c.nav.impact],
                    ["programs", c.nav.programs],
                    ["founder", c.nav.founder],
                    ["contact", c.nav.contact],
                  ] as [HomeKey, string][]
                ).map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => jump(k)}
                    className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/journey"
                  className="btnMagnetic rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--bg))] shadow-lg"
                >
                  {c.hero.primaryCta}
                </Link>

                <button
                  type="button"
                  onClick={() => jump("programs")}
                  className="text-sm font-medium underline-offset-4 hover:underline transition-opacity hover:opacity-90"
                >
                  {c.hero.secondaryCta}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 max-w-xl">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-3 py-3 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <p className="text-lg font-semibold text-[rgb(var(--accent2))]">{stat.value}</p>
                    <p className="text-[11px] text-[rgb(var(--muted))]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6 relative" delay={120}>
              <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] shadow-xl">
                {/* NEW premium canvas layer */}
                <div className="absolute inset-0">
                  <AtmosCanvas mode="hero" seed={11} className="opacity-[0.92]" />
                </div>

                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/hero-loop.gif"
                    alt="Children learning at DCF centre"
                    fill
                    className="object-cover opacity-[0.92]"
                    priority
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 heroGlass" />
              </div>

              <div className="absolute -bottom-5 left-4 w-[84%] rounded-2xl border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--bg)/0.90)] px-4 py-3 text-xs shadow-lg backdrop-blur">
                {c.hero.quote} — <span className="font-semibold">{c.hero.quoteFrom}</span>
              </div>
            </Reveal>
          </div>

          {/* PROOF STRIP (ticker) */}
          <div className="mt-10 rounded-[22px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.46)] overflow-hidden">
            <div className="proofTrack py-3">
              <div className="proofRow">
                {proofItems.concat(proofItems).map((x, i) => (
                  <span
                    key={`${x}-${i}`}
                    className="inline-flex items-center gap-2 px-5 text-[11px] text-[rgb(var(--fg)/0.78)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))] shadow-[0_0_18px_rgba(var(--accent),0.30)]" />
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO / WHY WE EXIST */}
        <section
          data-home="manifesto"
          ref={(el) => {
            els.current.manifesto = el;
          }}
          className="mt-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-5">
              <div className="sticky top-[calc(var(--siteHeaderH,110px)+14px)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                  {t("WHY WE EXIST", "WHY WE EXIST", "WHY WE EXIST")}
                </p>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold mysteryHeading">
                  <span className="mysteryGradient">
                    {t(
                      "Protect creators. Make learning joyful.",
                      "Creators ko protect karo. Learning ko joyful banao.",
                      "Creators ko protect karo. Learning ko joyful banao."
                    )}
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm text-[rgb(var(--fg)/0.78)] md:text-[15px]">
                  {t(
                    "We start where learning begins — early years — and build confidence through arts, play and local culture.",
                    "Hum early years se shuru karte hain — arts, play aur local culture se confidence build karte hain.",
                    "Early years se shuru — arts + play + culture."
                  )}
                </p>

                <div className="mt-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                    {t("One-line philosophy", "एक लाइन में", "One-line")}
                  </p>
                  <p className="mt-3 text-sm text-[rgb(var(--fg)/0.82)]">
                    {t(
                      "Less fear. More curiosity. Learning that feels like belonging.",
                      "कम डर। ज्यादा जिज्ञासा। ऐसी सीख जो अपनापन लगे।",
                      "Less fear. More curiosity."
                    )}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/journey"
                    className="btnMagnetic rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.12)] px-4 py-2 text-xs font-semibold text-[rgb(var(--accent2))]"
                  >
                    {t("See the Journey →", "Journey देखें →", "Journey dekho →")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => jump("contact")}
                    className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.80)] transition"
                  >
                    {c.nav.connect}
                  </button>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7 grid gap-4">
              <Reveal delay={80}>
                <ManifestoCard
                  num="01"
                  title={t("Problem", "समस्या", "Problem")}
                  body={t(
                    "Many schools unintentionally crush free thinking — kids learn to “perform”, not to create.",
                    "कई स्कूल अनजाने में free thinking दबा देते हैं — बच्चे ‘create’ नहीं, ‘perform’ करना सीखते हैं।",
                    "Schools creativity crush kar dete hain."
                  )}
                />
              </Reveal>
              <Reveal delay={140}>
                <ManifestoCard
                  num="02"
                  title={t("Vision", "दृष्टि", "Vision")}
                  body={t(
                    "Every child remains a creator — confident, expressive, and curious.",
                    "हर बच्चा creator बना रहे — confident, expressive और curious।",
                    "Har bachcha creator bana rahe."
                  )}
                />
              </Reveal>
              <Reveal delay={200}>
                <ManifestoCard
                  num="03"
                  title={t("Model", "मॉडल", "Model")}
                  body={t(
                    "Arts-based, joyful learning rooted in local culture — aligned with the spirit of NEP 2020.",
                    "Local culture में rooted joyful learning — NEP 2020 की spirit के साथ aligned।",
                    "Arts-based joyful learning, NEP aligned."
                  )}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section
          id="impact"
          data-home="impact"
          ref={(el) => {
            els.current.impact = el;
          }}
          className="mt-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-5">
              <div className="sticky top-[calc(var(--siteHeaderH,110px)+14px)]">
                <h2 className="text-2xl font-semibold mysteryHeading">
                  <span className="mysteryGradient">{c.impact.title}</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm text-[rgb(var(--fg)/0.78)] md:text-[15px]">
                  {c.impact.paragraph}
                </p>

                <div className="mt-6 rounded-3xl border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--bg)/0.58)] p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                    {t("What changes first", "सबसे पहले क्या बदलता है", "What changes first")}
                  </p>
                  <p className="mt-3 text-sm text-[rgb(var(--fg)/0.82)]">
                    {t(
                      "A child feels safe. Then the child becomes curious. Then learning starts to stick.",
                      "बच्चा सुरक्षित feel करता है। फिर जिज्ञासा आती है। फिर सीखना टिकता है।",
                      "Safe → curious → learning sticks."
                    )}
                  </p>
                </div>

                <div className="mt-5">
                  <Link href="/journey" className="inline-flex text-xs font-medium text-[rgb(var(--accent2))] hover:opacity-90">
                    {c.impact.readMore}
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-3">
                <Reveal delay={90}>
                  <ImpactCard title={c.impact.cards[0].title} body={c.impact.cards[0].body} />
                </Reveal>
                <Reveal delay={160}>
                  <ImpactCard title={c.impact.cards[1].title} body={c.impact.cards[1].body} />
                </Reveal>
                <Reveal delay={230}>
                  <ImpactCard title={c.impact.cards[2].title} body={c.impact.cards[2].body} />
                </Reveal>
              </div>

              <Reveal delay={260}>
                <div className="mt-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6">
                  <p className="text-sm font-semibold text-[rgb(var(--accent2))]">
                    {t("Why this works", "ये क्यों काम करता है", "Why it works")}
                  </p>
                  <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">
                    {t(
                      "Because the first goal is not syllabus — it’s confidence, expression and belonging.",
                      "क्योंकि पहला goal syllabus नहीं — confidence, expression और belonging है।",
                      "Syllabus se pehle confidence."
                    )}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section
          id="programs"
          data-home="programs"
          ref={(el) => {
            els.current.programs = el;
          }}
          className="mt-20"
        >
          <Reveal>
            <h2 className="text-2xl font-semibold mysteryHeading">
              <span className="mysteryGradient">{c.programs.title}</span>
            </h2>
          </Reveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" delay={90}>
              <div className="editorialCard rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6 overflow-hidden">
                <div className="editorialGlow" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                  {c.programs.ageTag}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{programs[0]?.title ?? ""}</h3>
                <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">{programs[0]?.description ?? ""}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(programs.slice(0, 3) ?? []).map((p) => (
                    <span
                      key={p.title}
                      className="rounded-full border border-[rgb(var(--accent)/0.30)] bg-[rgb(var(--accent)/0.10)] px-3 py-1 text-[11px] text-[rgb(var(--accent2))]"
                    >
                      {p.title}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[rgb(var(--muted))]">
                    {t("Built for early years. Rooted in local context.", "Early years के लिए. Local context में rooted.", "Early years, local context.")}
                  </span>
                  <Link
                    href="/journey"
                    className="btnMagnetic inline-flex items-center justify-center rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg"
                  >
                    {t("Open Journey →", "Journey खोलो →", "Open Journey →")}
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-5 grid gap-4">
              {programs.slice(1).map((program, i) => (
                <Reveal key={program.title} delay={130 + i * 80}>
                  <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6 transition-transform duration-200 hover:-translate-y-0.5">
                    <h3 className="text-sm font-semibold">{program.title}</h3>
                    <p className="mt-2 text-xs text-[rgb(var(--fg)/0.78)]">{program.description}</p>
                    <div className="mt-4 inline-flex text-[11px] font-medium text-[rgb(var(--accent2))]">
                      {c.programs.ageTag}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={260}>
            <div className="mt-10 rounded-[28px] border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--bg)/0.62)] p-6 md:p-8 backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                    {t("Butterfly Evolution", "Butterfly Evolution", "Butterfly Evolution")}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {t(
                      "See how joy becomes a culture — step by step.",
                      "Dekho kaise joy culture banti hai — step by step.",
                      "Joy → culture, step by step."
                    )}
                  </p>
                </div>
                <Link
                  href="/journey"
                  className="btnMagnetic inline-flex justify-center rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--bg))] shadow-lg"
                >
                  {t("Open Journey →", "Journey खोलो →", "Open Journey →")}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FOUNDER */}
        <section
          id="founder"
          data-home="founder"
          ref={(el) => {
            els.current.founder = el;
          }}
          className="mt-20 grid gap-6 lg:grid-cols-12 lg:items-center"
        >
          <Reveal className="lg:col-span-5 flex justify-center lg:justify-start" delay={0}>
            <div className="w-full max-w-sm rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.60)] p-4">
              <div className="relative mb-3 h-56 w-full overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface2))]">
                <Image src="/founder-sahil.jpg" alt="Founder - Sahil Dogra" fill className="object-cover" />
              </div>
              <p className="text-sm font-semibold">Sahil Dogra</p>
              <p className="text-[11px] text-[rgb(var(--muted))]">Founder, DurlabhCLAP Foundation</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-4" delay={120}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
              {c.founder.label}
            </p>
            <h2 className="text-2xl font-semibold mysteryHeading">
              “<span className="mysteryGradient">{c.founder.quote}</span>”
            </h2>
            <p className="text-sm text-[rgb(var(--fg)/0.78)]">{c.founder.p1}</p>
            <p className="text-sm text-[rgb(var(--fg)/0.78)]">{c.founder.p2}</p>
            <p className="text-sm text-[rgb(var(--fg)/0.78)]">{c.founder.p3}</p>

            <p className="text-xs text-[rgb(var(--muted))]">
              — <span className="font-semibold text-[rgb(var(--fg))]">{c.founder.signature}</span>
            </p>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          data-home="contact"
          ref={(el) => {
            els.current.contact = el;
          }}
          className="mt-20 rounded-[28px] border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--bg)/0.60)] px-6 py-8 md:px-8 backdrop-blur"
        >
          <Reveal delay={0}>
            <h2 className="text-2xl font-semibold mysteryHeading">
              <span className="mysteryGradient">{c.contact.title}</span>
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-3 max-w-3xl text-sm text-[rgb(var(--fg)/0.82)]">{c.contact.paragraph}</p>
          </Reveal>

          <div className="mt-7 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" delay={150}>
              <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6">
                <p className="text-sm font-semibold text-[rgb(var(--accent2))]">{c.contact.lookingForTitle}</p>

                <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                  {c.contact.lookingFor.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))] shadow-[0_0_18px_rgba(var(--accent),0.30)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href="mailto:contact@durlabhclapfoundation.org"
                    className="btnMagnetic inline-flex rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg"
                  >
                    {t("Email us", "Email करें", "Email karo")}
                  </a>
                  <Link
                    href="/journey"
                    className="btnMagnetic inline-flex rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.12)] px-4 py-2 text-xs font-semibold text-[rgb(var(--accent2))]"
                  >
                    {t("Explore Journey", "Journey देखें", "Journey dekho")}
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={220}>
              <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6">
                <p className="text-sm font-semibold text-[rgb(var(--accent2))]">{t("Details", "जानकारी", "Details")}</p>

                <div className="mt-4 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                  <p>
                    Email:{" "}
                    <a href="mailto:contact@durlabhclapfoundation.org" className="text-[rgb(var(--accent2))] hover:opacity-90">
                      contact@durlabhclapfoundation.org
                    </a>
                  </p>
                  <p>
                    {c.contact.locationLabel}: Shahpur, Kangra, Himachal Pradesh, India
                  </p>
                  <p className="text-[rgb(var(--muted))]">{c.contact.basedIn}</p>

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
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer: removed duplicate email (contact already shows it) */}
      <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] py-6">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 flex flex-col gap-3 text-xs text-[rgb(var(--muted))] md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} DurlabhCLAP Foundation. {c.contact.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <span>{c.contact.basedIn}</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .heroGlass {
          background: radial-gradient(800px 420px at 20% 20%, rgba(255,255,255,0.10), rgba(0,0,0,0) 48%),
            radial-gradient(760px 520px at 84% 70%, rgba(255,255,255,0.07), rgba(0,0,0,0) 52%);
          mix-blend-mode: overlay;
        }

        /* Proof ticker */
        .proofTrack {
          mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        }
        .proofRow {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
          animation: proofMarquee 22s linear infinite;
        }
        @keyframes proofMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Editorial glow */
        .editorialCard {
          position: relative;
          transform: translateZ(0);
        }
        .editorialGlow {
          pointer-events: none;
          position: absolute;
          inset: -30%;
          background: radial-gradient(circle at 18% 22%, rgba(34,211,238,0.18), rgba(0,0,0,0) 55%),
            radial-gradient(circle at 80% 72%, rgba(251,113,133,0.14), rgba(0,0,0,0) 55%);
          filter: blur(22px);
          opacity: 0.85;
          transition: transform 220ms ease, opacity 220ms ease;
        }
        .editorialCard:hover .editorialGlow {
          transform: translate3d(12px, -8px, 0);
          opacity: 1;
        }

        /* Magnetic-ish buttons (simple + safe) */
        .btnMagnetic {
          transition: transform 180ms ease, filter 180ms ease, box-shadow 180ms ease;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.22);
        }
        .btnMagnetic:hover {
          transform: translateY(-1px);
          filter: brightness(1.04);
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.28);
        }
        .btnMagnetic:active {
          transform: translateY(0px) scale(0.98);
        }

        @media (prefers-reduced-motion: reduce) {
          .proofRow {
            animation: none !important;
          }
          .btnMagnetic,
          .editorialGlow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ImpactCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.60)] p-5 transition-transform duration-200 hover:-translate-y-0.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs text-[rgb(var(--fg)/0.78)]">{body}</p>
    </div>
  );
}

function ManifestoCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-6 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">{title}</p>
        <span className="text-[11px] text-[rgb(var(--muted))]">{num}</span>
      </div>
      <p className="mt-3 text-sm text-[rgb(var(--fg)/0.82)]">{body}</p>
    </div>
  );
}

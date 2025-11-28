"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundFX from "../components/BackgroundFX";
import SiteHeader from "../components/SiteHeader";
import Reveal from "../components/Reveal";
import { useLang } from "../components/LanguageProvider";
import { content } from "../../src/data/lang";
import AtmosCanvas from "../components/AtmosCanvas";
import FocusOnScroll from "../components/FocusOnScroll";


type StageKey = "context" | "egg" | "larva" | "pupa" | "butterfly" | "contact";

type Theme = {
  bg: string;
  glowA: string;
  glowB: string;
  ink: string;
};

type Stage = {
  key: StageKey;
  label: string;
  kicker: string;
  title: string;
  subtitle: string;
  bullets: string[];
  builds: string[];
  signals: string[];
  significance: string;
  theme: Theme;
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function JourneyPage() {
  const { lang } = useLang();

  const t = (en: string, hi: string, hing: string) =>
    lang === "hi" ? hi : lang === "hing" ? hing : en;

  const stages = useMemo<Stage[]>(() => {
    const base = "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0) 46%)";

    const theme: Record<StageKey, Theme> = {
      context: {
        bg: `radial-gradient(1200px 520px at 12% 22%, rgba(34,211,238,0.22), rgba(0,0,0,0) 60%),
             radial-gradient(900px 560px at 84% 44%, rgba(251,113,133,0.20), rgba(0,0,0,0) 62%),
             ${base}`,
        glowA: "rgba(34,211,238,0.25)",
        glowB: "rgba(251,113,133,0.18)",
        ink: "rgba(34,211,238,0.78)",
      },
      egg: {
        bg: `radial-gradient(1200px 620px at 18% 40%, rgba(251,191,36,0.24), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 82% 56%, rgba(34,211,238,0.14), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(251,191,36,0.22)",
        glowB: "rgba(34,211,238,0.14)",
        ink: "rgba(251,191,36,0.88)",
      },
      larva: {
        bg: `radial-gradient(1200px 620px at 18% 44%, rgba(163,230,53,0.24), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 82% 56%, rgba(74,222,128,0.18), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(163,230,53,0.20)",
        glowB: "rgba(74,222,128,0.16)",
        ink: "rgba(74,222,128,0.88)",
      },
      pupa: {
        bg: `radial-gradient(1200px 620px at 18% 54%, rgba(168,85,247,0.24), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 84% 36%, rgba(244,114,182,0.22), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(168,85,247,0.20)",
        glowB: "rgba(244,114,182,0.18)",
        ink: "rgba(244,114,182,0.86)",
      },
      butterfly: {
        bg: `radial-gradient(1200px 640px at 12% 30%, rgba(34,211,238,0.22), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 86% 70%, rgba(251,113,133,0.22), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(34,211,238,0.26)",
        glowB: "rgba(251,113,133,0.20)",
        ink: "rgba(251,113,133,0.90)",
      },
      contact: {
        bg: `radial-gradient(1200px 620px at 20% 30%, rgba(34,211,238,0.20), rgba(0,0,0,0) 62%),
             radial-gradient(900px 560px at 84% 70%, rgba(251,191,36,0.18), rgba(0,0,0,0) 60%),
             ${base}`,
        glowA: "rgba(34,211,238,0.20)",
        glowB: "rgba(251,191,36,0.16)",
        ink: "rgba(34,211,238,0.78)",
      },
    };

    return [
      {
        key: "context",
        label: t("Context", "Context", "Context"),
        kicker: t("WHY WE EXIST", "WHY WE EXIST", "WHY WE EXIST"),
        title: t(
          "Protect creators. Make learning joyful.",
          "Creators ko protect karo. Learning ko joyful banao.",
          "Creators ko protect karo. Learning ko joyful banao."
        ),
        subtitle: t(
          "We’re building an arts-based learning culture aligned with NEP 2020 — creativity, critical thinking, life skills, and local context.",
          "NEP 2020 aligned arts-based learning — creativity, critical thinking, life skills, local context.",
          "NEP 2020 aligned arts-based learning — creativity, critical thinking, life skills."
        ),
        bullets: [
          t(
            "Problem: schools crush free thinking and creativity.",
            "Problem: schools creativity crush kar rahe hain.",
            "Problem: schools creativity crush kar rahe hain."
          ),
          t(
            "Vision: every child remains a creator.",
            "Vision: har bachcha creator bana rahe.",
            "Vision: har bachcha creator bana rahe."
          ),
          t(
            "Model: CLAP Fellows bring arts into classrooms and community.",
            "Model: CLAP Fellows arts le aate hain.",
            "Model: CLAP Fellows arts le aate hain."
          ),
        ],
        builds: [
          t("A clear mission teachers and parents can repeat.", "Aisi mission jo sab repeat kar saken.", "Clear mission."),
          t("Trust-first spaces that feel safe for children.", "Trust-first spaces.", "Trust-first."),
          t("A culture where curiosity is protected, not punished.", "Curiosity protect hoti hai.", "Curiosity protected."),
        ],
        signals: [
          t("Children participate without fear.", "Bachche bina darr participate karein.", "No fear participation."),
          t("Teachers use play/arts as routine, not “extra”.", "Play/arts routine ban jaye.", "Routine play/arts."),
          t("Parents notice confidence + expression at home.", "Parents ko confidence dikhe.", "Parents notice confidence."),
        ],
        significance: t(
          "If we don’t protect creativity early, we end up repairing confidence later.",
          "Agar early creativity protect nahi hui, baad me confidence repair karna padta hai.",
          "Protect early, or repair later."
        ),
        theme: theme.context,
      },
      {
        key: "egg",
        label: t("Eggs", "Eggs", "Eggs"),
        kicker: t("0–6 MONTHS · FOUNDATION", "0–6 MONTHS · FOUNDATION", "0–6 MONTHS · FOUNDATION"),
        title: t("Baseline + Fellows + first 10% content", "Baseline + Fellows + first 10% content", "Baseline + Fellows + 10% content"),
        subtitle: t(
          "Choose and train fellows, map learning levels, and launch arts-based modules for early grades.",
          "Fellows select/train, baseline, early grades me modules launch.",
          "Fellows select/train, baseline, modules."
        ),
        bullets: [
          t("Select and induct CLAP Fellows; allocate to schools/centres.", "Fellows select + induct; allocation.", "Select + allocate."),
          t("Baseline assessment and clear targets.", "Baseline assessment + targets.", "Baseline + targets."),
          t("Design arts-based content for first 10% topics.", "First 10% topics ka content.", "10% content."),
        ],
        builds: [
          t("A reliable baseline so progress is real, not vibes.", "Baseline reliable ho.", "Real baseline."),
          t("A trained field team with a consistent rhythm.", "Field team ka rhythm.", "Consistent rhythm."),
          t("A “starter kit” of modules that teachers can actually use.", "Starter kit modules.", "Usable modules."),
        ],
        signals: [
          t("Fellows can run sessions confidently.", "Fellows confident.", "Fellows confident."),
          t("Baseline tools are simple enough for repeat use.", "Tools repeatable.", "Repeatable tools."),
          t("Children settle into safe routines quickly.", "Routines me comfort.", "Routine comfort."),
        ],
        significance: t(
          "Strong foundations prevent chaos later — baseline + team + modules make scale possible.",
          "Strong foundation = baad ka chaos kam.",
          "Foundation makes scale possible."
        ),
        theme: theme.egg,
      },
      {
        key: "larva",
        label: t("Larvae", "Larvae", "Larvae"),
        kicker: t("6–12 MONTHS · GROWTH", "6–12 MONTHS · GROWTH", "6–12 MONTHS · GROWTH"),
        title: t("Joy becomes routine.", "Joy routine banta hai.", "Joy routine."),
        subtitle: t(
          "Fellows support teachers to use modules; expert + field visits deepen practice; student showcases begin.",
          "Teachers support; expert visits; showcase; content expands.",
          "Support; visits; showcase."
        ),
        bullets: [
          t("Support educators in launchpad schools.", "Educators support.", "Educators support."),
          t("Expert visits + field visits for fellows.", "Expert + field visits.", "Expert + field."),
          t("Expand content to 15% topics + showcase learning.", "15% content + showcase.", "15% + showcase."),
        ],
        builds: [
          t("Teacher confidence through co-facilitation.", "Teacher confidence.", "Teacher confidence."),
          t("Visible progress the community can feel.", "Community ko feel ho.", "Visible progress."),
          t("A habit of reflection: what worked, what didn’t.", "Reflection habit.", "Reflection habit."),
        ],
        signals: [
          t("Teachers initiate activities; fellows support.", "Teachers initiate karein.", "Teachers initiate."),
          t("Children explain ideas, not just answer.", "Bachche explain karein.", "Kids explain."),
          t("Showcases are joyful, not pressure-driven.", "Showcase joyful ho.", "Joyful showcase."),
        ],
        significance: t(
          "Growth is where culture starts to stick — pilot becomes practice.",
          "Pilot se practice — yahin pe hota hai.",
          "Pilot → practice happens here."
        ),
        theme: theme.larva,
      },
      {
        key: "pupa",
        label: t("Pupae", "Pupae", "Pupae"),
        kicker: t("12–18 MONTHS · TRANSFORMATION", "12–18 MONTHS · TRANSFORMATION", "12–18 MONTHS · TRANSFORMATION"),
        title: t("Independence + systems.", "Independence + systems.", "Independence + systems."),
        subtitle: t(
          "Teachers run CLAP inside classrooms; fellows extend into community classes; partnerships begin.",
          "Teachers independent; community classes; partnerships start.",
          "Independent; community; partnerships."
        ),
        bullets: [
          t("Educators run offerings independently inside classrooms.", "Educators independently.", "Educators independent."),
          t("Community classes started by fellows.", "Community classes start.", "Community classes."),
          t("Expand content to 20% topics + explore partners.", "20% + partners.", "20% + partners."),
        ],
        builds: [
          t("Simple systems: planning, tracking, and feedback loops.", "Simple systems.", "Systems."),
          t("Community buy-in (parents, volunteers, local leaders).", "Community buy-in.", "Buy-in."),
          t("A resilient model that doesn’t break if one person leaves.", "Resilience.", "Resilience."),
        ],
        signals: [
          t("Sessions continue without founders around.", "Founder ke bina bhi.", "Works without founders."),
          t("Teachers share practices with other teachers.", "Teachers share karein.", "Peer sharing."),
          t("Partners ask “how to join”, not “why this?”", "Partners join poochein.", "Partners pull."),
        ],
        significance: t(
          "Transformation is quiet — but this is where scale becomes stable.",
          "Quiet stage — par scale stable yahin hota hai.",
          "Quiet work → stable scale."
        ),
        theme: theme.pupa,
      },
      {
        key: "butterfly",
        label: t("Butterflies", "Butterflies", "Butterflies"),
        kicker: t("18–24 MONTHS · ADULT BUTTERFLY", "18–24 MONTHS · ADULT BUTTERFLY", "18–24 MONTHS · ADULT BUTTERFLY"),
        title: t("Replication-ready culture.", "Replication-ready culture.", "Replication-ready culture."),
        subtitle: t(
          "Master trainers emerge, community capacity grows, and expansion becomes realistic with partners.",
          "Master trainers; community capacity; expansion possible.",
          "Master trainers; expansion."
        ),
        bullets: [
          t("Educators evolve into master trainers.", "Educators master trainers.", "Master trainers."),
          t("Parents/community capacity building by fellows.", "Community capacity.", "Community capacity."),
          t("Expand content to 25% topics + scale with partners.", "25% + scale.", "25% + scale."),
        ],
        builds: [
          t("Train-the-trainer capability inside the ecosystem.", "Train-the-trainer.", "Trainer network."),
          t("A replicable playbook: what, how, and why.", "Replicable playbook.", "Playbook."),
          t("A movement: children → facilitators → centre leads.", "Movement.", "Movement."),
        ],
        signals: [
          t("New centres start with minimal supervision.", "Low supervision.", "Low supervision."),
          t("Teachers mentor other teachers.", "Mentoring.", "Mentoring."),
          t("Partners commit space, people, and funds.", "Resource commitment.", "Resource commitment."),
        ],
        significance: t(
          "Adult Butterfly isn’t “more activity” — it’s a culture that can fly without losing its soul.",
          "Culture jo fly kare aur soul na lost ho.",
          "Culture that can fly."
        ),
        theme: theme.butterfly,
      },
      {
        key: "contact",
        label: t("Connect", "Connect", "Connect"),
        kicker: t("LET’S BUILD TOGETHER", "LET’S BUILD TOGETHER", "LET’S BUILD TOGETHER"),
        title: content[lang].contact.title,
        subtitle: content[lang].contact.paragraph,
        bullets: content[lang].contact.lookingFor,
        builds: [
          t("Partnership pathway: pilot → replication → scale.", "Pilot → replication → scale.", "Pilot → scale."),
          t("Local ownership with shared standards.", "Local ownership.", "Local ownership."),
          t("A feedback loop that keeps quality high.", "Quality loop.", "Quality loop."),
        ],
        signals: [
          t("You care about early learning + culture change.", "Aap early learning care karte ho.", "You care."),
          t("You can contribute time, expertise, or resources.", "Aap contribute kar sakte ho.", "You can contribute."),
          t("You want high-quality impact in rural contexts.", "Quality impact chahte ho.", "Quality impact."),
        ],
        significance: t(
          "If this resonates, connect — we’ll share the simplest next step.",
          "Resonate kare toh connect karte hain.",
          "Let’s connect."
        ),
        theme: theme.contact,
      },
    ];
  }, [lang]);

  const [active, setActive] = useState<StageKey>("context");

  const sectionRefs = useRef<Record<StageKey, HTMLElement | null>>({
    context: null,
    egg: null,
    larva: null,
    pupa: null,
    butterfly: null,
    contact: null,
  });

  const progressRef = useRef<Record<StageKey, number>>({
    context: 0,
    egg: 0,
    larva: 0,
    pupa: 0,
    butterfly: 0,
    contact: 0,
  });

  const [, force] = useState(0);

  // ✅ FIX: stable reduce-motion flag (computed once)
  const reduce = useMemo(() => prefersReducedMotion(), []);

  const [dockCollapsed, setDockCollapsed] = useState(false);
  const lastY = useRef(0);

  // ✅ FIX: better auto-collapse behavior (works even if reduce-motion is ON)
  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;

        // start collapsing only after some scroll so it’s noticeable + not jittery
        const hasStarted = y > 140;

        const dy = y - lastY.current;
        if (Math.abs(dy) < 10) return;

        if (!hasStarted) {
          setDockCollapsed(false);
        } else {
          if (dy > 0) setDockCollapsed(true); // down = collapse
          else setDockCollapsed(false); // up = expand
        }

        lastY.current = y;
      });
    };

    lastY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, []);

  const activeTheme = useMemo(
    () => stages.find((s) => s.key === active)?.theme ?? stages[0].theme,
    [stages, active]
  );

  const jumpTo = (key: StageKey) => {
    const el = sectionRefs.current[key];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const keys: StageKey[] = ["context", "egg", "larva", "pupa", "butterfly", "contact"];
    const nodes = keys.map((k) => sectionRefs.current[k]).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const k = (best?.target as HTMLElement | undefined)?.dataset?.stage as StageKey | undefined;
        if (k) setActive(k);
      },
      { threshold: [0.18, 0.28, 0.4, 0.55, 0.7], rootMargin: "-25% 0px -45% 0px" }
    );

    nodes.forEach((n) => io.observe(n));

    const onScroll = () => {
      const vh = window.innerHeight || 1;
      keys.forEach((k) => {
        const el = sectionRefs.current[k];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = vh * 0.58;
        const start = mid;
        const end = -(r.height * 0.2);
        const p = clamp((start - r.top) / (start - end), 0, 1);
        progressRef.current[k] = p;
      });
      force((x) => (x + 1) % 100000);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onScroll as any);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] relative overflow-hidden">
      <BackgroundFX density={26} />

      {/* Natural elements: flying birds */}
      <BirdField />

      {/* header */}
      <div className="sticky top-0 z-[80]">
        <SiteHeader variant="journey" />
      </div>

      {/* GLOBAL BACKDROP */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundImage: activeTheme.bg }} />
        <div className="absolute inset-0 bg-[rgb(var(--surface)/0.18)]" />
        <div className="noiseOverlay absolute inset-0 opacity-[0.14]" />
        <div
          className="absolute -top-28 -right-28 h-[560px] w-[560px] rounded-full blur-3xl transition-all duration-500"
          style={{ background: activeTheme.glowA, opacity: 0.88 }}
        />
        <div
          className="absolute -bottom-36 -left-36 h-[680px] w-[680px] rounded-full blur-3xl transition-all duration-500"
          style={{ background: activeTheme.glowB, opacity: 0.72 }}
        />
      </div>

      {/* DOCK (desktop left) + (mobile bottom) */}
      <JourneyDock
        stages={stages}
        active={active}
        collapsed={dockCollapsed}
        onToggle={() => setDockCollapsed((v) => !v)}
        jumpTo={jumpTo}
        t={t}
      />

      {/* MAIN */}
      <main className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-10 pb-20">
        <section className="pt-10 md:pt-14">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                  {t("Our Journey", "हमारी यात्रा", "Our Journey")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <FocusOnScroll once>
                  <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight mysteryHeading">
                  <span className="mysteryGradient">
                    {t(
                      "A transformation you can feel — stage by stage.",
                      "Stage by stage — aisi transformation jo feel ho.",
                      "Stage by stage transformation."
                    )}
                  </span>
                </h1>
                </FocusOnScroll>
                
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 max-w-2xl text-sm md:text-base text-[rgb(var(--fg)/0.78)]">
                  {t(
                    "Scroll down to move through the evolution. Each stage reveals what we build, what to watch for, and why it matters.",
                    "Scroll karke evolution dekho. Har stage pe: kya build hota hai, kya signals hain, aur kyun important hai.",
                    "Scroll to evolve: builds, signals, significance."
                  )}
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={200}>
                <div className="rounded-3xl border border-[rgb(var(--accent)/0.22)] bg-[rgb(var(--bg)/0.56)] p-5 backdrop-blur stageCard">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))] opacity-90">
                    {t("How to use this", "Kaise use karein", "How to use")}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                    <li className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
                      <span>{t("Scroll → stages unfold.", "Scroll → stages unfold.", "Scroll → unfold.")}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
                      <span>{t("Left map → jump anytime.", "Left map → jump.", "Left map → jump.")}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
                      <span>{t("Hover cards → subtle premium cues.", "Hover cards → cues.", "Hover → cues.")}</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* STAGES */}
        <div className="mt-12 space-y-10">
          {stages.map((s) => {
            const pRaw = progressRef.current[s.key] ?? 0;
            const p = easeInOutCubic(pRaw);

            return (
              <section
                key={s.key}
                data-stage={s.key}
                ref={(el) => {
                  sectionRefs.current[s.key] = el;
                }}
              >
                <div className="relative rounded-[40px] border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.80)] p-[1px] overflow-hidden">
                  {/* gradient + atmosphere only inside card */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: s.theme.bg, opacity: active === s.key ? 0.85 : 0.55 }}
                    />
                    <AtmosCanvas mode="journey" seed={keySeed(s.key)} className="absolute inset-0 opacity-[0.75]" />
                    <div className="absolute inset-0 bg-[rgb(var(--bg)/0.32)]" />
                  </div>

                  {/* content */}
                  <div className="relative z-10 grid gap-6 p-5 md:p-7 md:grid-cols-12">
                    <div className="md:col-span-7">
                      <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                          {s.kicker}
                        </p>
                      </Reveal>

                      <Reveal delay={80}>
                        <FocusOnScroll once>
                          <h2 className="mt-2 text-2xl md:text-4xl font-semibold tracking-tight mysteryHeading">
                          <span className="mysteryGradient">{s.title}</span>
                        </h2>
                        </FocusOnScroll>
                        
                      </Reveal>

                      <Reveal delay={120}>
                        <p className="mt-3 max-w-2xl text-sm md:text-base text-[rgb(var(--fg)/0.78)]">
                          {s.subtitle}
                        </p>
                      </Reveal>

                      <Reveal delay={160}>
                        <div className="mt-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.56)] p-5 backdrop-blur stageCard">
                          <p className="text-sm font-semibold text-[rgb(var(--accent2))]">
                            {s.key === "contact"
                              ? content[lang].contact.lookingForTitle
                              : t("Purpose (clear + measurable)", "Purpose (clear + measurable)", "Purpose")}
                          </p>

                          <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                            {s.bullets.map((b, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>

                          {s.key === "contact" ? (
                            <div className="mt-5 flex flex-wrap gap-3">
                              <a
                                href="mailto:contact@durlabhclapfoundation.org"
                                className="rounded-full bg-[rgb(var(--accent))] px-5 py-2 text-xs font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition"
                              >
                                {t("Email us", "Email us", "Email us")}
                              </a>
                              <Link
                                href="/"
                                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.45)] px-5 py-2 text-xs font-semibold text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.65)] transition"
                              >
                                {t("Back to home", "Home पर वापस", "Back to home")}
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </Reveal>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <Reveal delay={200}>
                          <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.40)] p-5 backdrop-blur stageCard">
                            <p className="text-sm font-semibold text-[rgb(var(--accent2))]">
                              {t("What this stage builds", "Is stage se kya banta hai", "What it builds")}
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                              {s.builds.map((x, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Reveal>

                        <Reveal delay={240}>
                          <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.40)] p-5 backdrop-blur stageCard">
                            <p className="text-sm font-semibold text-[rgb(var(--accent2))]">
                              {t("Signals to look for", "Signals to look for", "Signals")}
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
                              {s.signals.map((x, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent2))]" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Reveal>
                      </div>

                      <Reveal delay={280}>
                        <div className="mt-4 rounded-3xl border border-[rgb(var(--accent)/0.22)] bg-[rgb(var(--bg)/0.56)] p-5 backdrop-blur stageCard">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                            {t("Why it matters", "Why it matters", "Why it matters")}
                          </p>
                          <p className="mt-2 text-sm md:text-base text-[rgb(var(--fg)/0.78)]">{s.significance}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {stages
                              .filter((x) => x.key !== s.key)
                              .filter((x) => x.key !== "contact")
                              .slice(0, 3)
                              .map((x) => (
                                <button
                                  key={x.key}
                                  type="button"
                                  onClick={() => jumpTo(x.key)}
                                  className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.50)] px-4 py-2 text-xs text-[rgb(var(--fg)/0.82)] hover:bg-[rgb(var(--surface)/0.70)] hover:text-[rgb(var(--accent2))] transition"
                                >
                                  {t("Next:", "Next:", "Next:")} {x.label} →
                                </button>
                              ))}
                          </div>
                        </div>
                      </Reveal>
                    </div>

                    <div className="md:col-span-5">
                      <Reveal delay={130}>
                        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.56)] p-5 backdrop-blur stageCard">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
                                {t("Evolution", "Evolution", "Evolution")}
                              </p>
                              <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">
                                {t("Shape morphs as you scroll.", "Scroll pe shape morph hota hai.", "Scroll to morph.")}
                              </p>
                            </div>

                            <div className="rounded-full border border-[rgb(var(--accent)/0.22)] bg-[rgb(var(--surface)/0.55)] px-3 py-1 text-[11px] text-[rgb(var(--fg)/0.82)]">
                              {Math.round(pRaw * 100)}%
                            </div>
                          </div>

                          <div className="mt-4">
                            <EvolutionMorph stage={s.key} p={p} ink={s.theme.ink} />
                          </div>
                        </div>
                      </Reveal>

                      <Reveal delay={220}>
                        <div className="mt-4 rounded-3xl border border-[rgb(var(--accent)/0.22)] bg-[rgb(var(--surface)/0.38)] p-5 backdrop-blur stageCard">
                          <p className="text-sm font-semibold text-[rgb(var(--accent2))]">
                            {t("Stage snapshot", "Stage snapshot", "Stage snapshot")}
                          </p>
                          <div className="mt-3 grid gap-2">
                            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.56)] px-4 py-3 text-xs text-[rgb(var(--fg)/0.82)]">
                              {t("Focus:", "Focus:", "Focus:")}{" "}
                              <span className="text-[rgb(var(--accent2))]">{s.label}</span>
                            </div>

                            {s.key === "contact" ? (
                              <>
                                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.56)] px-4 py-3 text-xs text-[rgb(var(--fg)/0.82)]">
                                  {t("Email:", "Email:", "Email:")}{" "}
                                  <a
                                    href="mailto:contact@durlabhclapfoundation.org"
                                    className="text-[rgb(var(--accent2))] hover:opacity-90"
                                  >
                                    contact@durlabhclapfoundation.org
                                  </a>
                                </div>

                                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.56)] px-4 py-3 text-xs text-[rgb(var(--fg)/0.82)]">
                                  {content[lang].contact.locationLabel}: Shahpur, Kangra, Himachal Pradesh, India
                                </div>
                              </>
                            ) : (
                              <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.56)] px-4 py-3 text-xs text-[rgb(var(--fg)/0.82)]">
                                {t("Feel:", "Feel:", "Feel:")}{" "}
                                <span className="text-[rgb(var(--fg))]">
                                  {s.key === "context"
                                    ? t("clarity + care", "clarity + care", "clarity + care")
                                    : s.key === "egg"
                                    ? t("foundation", "foundation", "foundation")
                                    : s.key === "larva"
                                    ? t("growth", "growth", "growth")
                                    : s.key === "pupa"
                                    ? t("transformation", "transformation", "transformation")
                                    : t("flight", "flight", "flight")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <footer className="mt-14 pb-8">
          <div className="flex flex-col gap-2 text-xs text-[rgb(var(--muted))] md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} DurlabhCLAP Foundation. {content[lang].contact.rights}</p>
            <p>{content[lang].contact.basedIn}</p>
          </div>
        </footer>
      </main>

      {/* premium hover + birds */}
      <style jsx global>{`
        .stageCard {
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease;
        }
        .stageCard:hover {
          transform: translateY(-2px);
          border-color: rgba(34, 211, 238, 0.28);
          box-shadow: 0 22px 80px rgba(0, 0, 0, 0.22);
          background: rgb(var(--surface) / 0.50);
        }

        @keyframes birdLTR {
          0% { transform: translateX(-18vw) translateY(0px); opacity: 0; }
          10% { opacity: 0.9; }
          50% { transform: translateX(50vw) translateY(var(--bWiggle, -10px)); opacity: 0.95; }
          100% { transform: translateX(120vw) translateY(calc(var(--bWiggle, -10px) * -1)); opacity: 0; }
        }

        @keyframes birdRTL {
          0% { transform: translateX(120vw) translateY(0px); opacity: 0; }
          10% { opacity: 0.9; }
          50% { transform: translateX(50vw) translateY(var(--bWiggle, 10px)); opacity: 0.95; }
          100% { transform: translateX(-18vw) translateY(calc(var(--bWiggle, 10px) * -1)); opacity: 0; }
        }

        .bird {
          position: absolute;
          left: 0;
          will-change: transform, opacity;
          pointer-events: none;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,0.20));
        }

        .bird.ltr { animation: birdLTR var(--bDur, 18s) linear infinite; }
        .bird.rtl { animation: birdRTL var(--bDur, 20s) linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .stageCard { transition: none !important; }
          .stageCard:hover { transform: none !important; }
          .bird { animation: none !important; opacity: 0.35; transform: translateX(0) !important; }
        }

        .dockShell {
          box-shadow: 0 14px 55px rgba(0,0,0,0.18);
          transition: background 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }
        .dockShell:hover {
          background: rgb(var(--bg) / 0.34);
          box-shadow: 0 22px 80px rgba(0,0,0,0.22);
          border-color: rgba(34,211,238,0.22);
        }

        .dockActiveGlow {
          background: radial-gradient(220px 90px at 16% 50%, rgba(34,211,238,0.20), rgba(0,0,0,0) 60%),
                      radial-gradient(220px 90px at 84% 50%, rgba(251,113,133,0.14), rgba(0,0,0,0) 60%);
          opacity: 0.85;
          filter: blur(10px);
          pointer-events: none;
        }

        .dockNav[data-collapsed="true"] {
          transform: translateX(-2px);
          opacity: 0.94;
        }

        .noScrollbars::-webkit-scrollbar { display: none; }
        .noScrollbars { -ms-overflow-style: none; scrollbar-width: none; }

        @media (prefers-reduced-motion: reduce) {
          .dockNav,
          .dockShell,
          .dockActiveGlow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* helper for AtmosCanvas seed per stage */
function keySeed(key: StageKey) {
  switch (key) {
    case "context":
      return 11;
    case "egg":
      return 23;
    case "larva":
      return 37;
    case "pupa":
      return 53;
    case "butterfly":
      return 71;
    case "contact":
      return 89;
    default:
      return 1;
  }
}

/* ========== NATURAL ELEMENTS: BIRDS ========== */

function BirdField() {
  const reduce = prefersReducedMotion();
  if (reduce) return null;

  const birds = [
    { dir: "ltr", top: "14vh", dur: "18s", wiggle: "-10px", scale: 1.0, delay: "0s", opacity: 0.55 },
    { dir: "rtl", top: "22vh", dur: "22s", wiggle: "12px", scale: 0.9, delay: "2s", opacity: 0.45 },
    { dir: "ltr", top: "34vh", dur: "24s", wiggle: "-14px", scale: 0.8, delay: "5s", opacity: 0.40 },
    { dir: "rtl", top: "44vh", dur: "26s", wiggle: "10px", scale: 0.75, delay: "8s", opacity: 0.35 },
  ] as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-[20]">
      {birds.map((b, i) => (
        <div
          key={i}
          className={`bird ${b.dir}`}
          style={
            {
              top: b.top,
              ["--bDur" as any]: b.dur,
              ["--bWiggle" as any]: b.wiggle,
              animationDelay: b.delay,
              opacity: b.opacity,
              transform: `scale(${b.scale})`,
            } as any
          }
        >
          <BirdWithTrail />
        </div>
      ))}
    </div>
  );
}

function BirdWithTrail() {
  return (
    <svg width="220" height="70" viewBox="0 0 220 70" fill="none" aria-hidden style={{ color: "rgb(var(--fg))" }}>
      <path
        d="M10 40 C40 20, 72 22, 96 32 C120 42, 150 45, 208 26"
        stroke="currentColor"
        opacity="0.10"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
      <path d="M108 34 C114 28, 120 28, 126 34" stroke="currentColor" opacity="0.30" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M136 30 C142 24, 148 24, 154 30" stroke="currentColor" opacity="0.22" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M92 30 C98 24, 104 24, 110 30" stroke="currentColor" opacity="0.20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ========== DOCK ICONS ========== */

function StageGlyph({ stage }: { stage: StageKey }) {
  const cls = "h-4 w-4 text-[rgb(var(--accent2))] opacity-90";
  switch (stage) {
    case "context":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 12c4-7 12-7 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 14c3 5 9 5 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    case "egg":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3c3 0 6 4 6 9s-3 9-6 9-6-4-6-9 3-9 6-9Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "larva":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 8c2-2 4-2 6 0s4 2 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 14c2-2 4-2 6 0s4 2 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        </svg>
      );
    case "pupa":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4c2 3 3 5 3 8s-1 5-3 8c-2-3-3-5-3-8s1-5 3-8Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "butterfly":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12c-2-5-6-6-8-3 2 3 4 5 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12c2-5 6-6 8-3-2 3-4 5-8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "contact":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 7h16v10H4V7Z" stroke="currentColor" strokeWidth="2" />
          <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ========== EVOLUTION MORPH ========== */

type MorphProfile = {
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  r: number;
  sx: number;
  sy: number;
  mirror: boolean;
};

const PROFILES: Record<StageKey, MorphProfile> = {
  context: { a1: 0.05, a2: 0.08, a3: 0.04, a4: 0.03, r: 92, sx: 1.0, sy: 1.0, mirror: false },
  egg: { a1: 0.03, a2: 0.05, a3: 0.02, a4: 0.02, r: 88, sx: 0.92, sy: 1.12, mirror: false },
  larva: { a1: 0.14, a2: 0.10, a3: 0.06, a4: 0.05, r: 84, sx: 1.25, sy: 0.80, mirror: false },
  pupa: { a1: 0.06, a2: 0.08, a3: 0.05, a4: 0.04, r: 86, sx: 0.85, sy: 1.28, mirror: false },
  butterfly: { a1: 0.16, a2: 0.12, a3: 0.08, a4: 0.06, r: 82, sx: 1.22, sy: 1.0, mirror: true },
  contact: { a1: 0.08, a2: 0.12, a3: 0.05, a4: 0.04, r: 90, sx: 1.08, sy: 0.95, mirror: false },
};

function EvolutionMorph({ stage, p, ink }: { stage: StageKey; p: number; ink: string }) {
  const reduce = prefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const loop = () => {
      setTick((x) => (x + 1) % 100000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const prof = PROFILES[stage];
  const alpha = reduce ? 1 : p;
  const time = reduce ? 0 : tick * 0.012;

  const blobPath = useMemo(() => {
    const cx = 260;
    const cy = 150;
    const n = 12;
    const pts: Array<{ x: number; y: number }> = [];

    const w = (k: number) => (Math.sin(time * 0.7 + k) + 1) * 0.5;

    for (let i = 0; i < n; i++) {
      const theta = (i / n) * Math.PI * 2;

      const base = 1 + 0.03 * Math.sin(theta * 1 + time * 0.8);
      const harm =
        prof.a1 * Math.sin(theta * 1 + time * 0.9) +
        prof.a2 * Math.sin(theta * 2 - time * 0.7) +
        prof.a3 * Math.sin(theta * 3 + time * 0.6) +
        prof.a4 * Math.sin(theta * 4 - time * 0.5);

      let r = prof.r * (base + alpha * harm);

      if (prof.mirror) {
        const s = Math.sin(theta);
        const m = 1 + alpha * 0.18 * Math.abs(s);
        r *= m;
      }

      const rx = r * lerp(1, prof.sx, alpha);
      const ry = r * lerp(1, prof.sy, alpha);

      const j = 1 + (reduce ? 0 : (w(i * 0.9) - 0.5) * 0.03);
      pts.push({
        x: cx + Math.cos(theta) * rx * j,
        y: cy + Math.sin(theta) * ry * j,
      });
    }

    return closedCatmullRomPath(pts);
  }, [stage, alpha, time, prof]);

  const strokeColor = "rgb(var(--fg))";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.46)]" style={{ minHeight: 280 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(620px 340px at 30% 20%, ${ink}, rgba(0,0,0,0) 60%)`,
          opacity: 0.16,
        }}
      />

      <svg viewBox="0 0 520 300" className="h-[290px] w-full" style={{ display: "block" }} aria-hidden>
        <path
          d="M32 248 C130 210, 170 205, 230 170 C290 136, 362 122, 488 70"
          stroke={strokeColor}
          opacity="0.12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 10"
        />

        <path d={blobPath} fill={ink} opacity={0.18} stroke={strokeColor} strokeOpacity={0.18} strokeWidth={2.2} />

        <g transform="translate(0,0)" style={{ color: strokeColor }}>
          {stage === "egg" && <InnerEggs />}
          {stage === "larva" && <InnerLarvae />}
          {stage === "pupa" && <InnerPupae />}
          {stage === "butterfly" && <InnerButterfly />}
          {stage === "contact" && <InnerEnvelope />}
          {stage === "context" && <InnerSpark />}
        </g>
      </svg>
    </div>
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function closedCatmullRomPath(pts: Array<{ x: number; y: number }>) {
  const n = pts.length;
  if (n < 2) return "";
  const p = (i: number) => pts[(i + n) % n];

  let d = `M ${p(0).x.toFixed(2)} ${p(0).y.toFixed(2)}`;

  for (let i = 0; i < n; i++) {
    const p0 = p(i - 1);
    const p1 = p(i);
    const p2 = p(i + 1);
    const p3 = p(i + 2);

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  d += " Z";
  return d;
}

/* inner motifs */
function InnerEggs() {
  const stroke = "currentColor";
  return (
    <>
      {[
        [240, 134],
        [268, 126],
        [292, 138],
        [255, 156],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y} c10 -16 26 -12 26 10 c0 22 -12 36 -26 36 c-14 0 -26 -14 -26 -36 c0 -9 4 -12 26 -10`}
          fill="none"
          stroke={stroke}
          opacity={0.26}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function InnerLarvae() {
  return (
    <>
      <path d="M220 158 C238 140, 258 140, 276 158 C294 176, 314 176, 332 158" fill="none" stroke="currentColor" opacity={0.28} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M214 182 C236 164, 258 164, 280 182 C302 200, 324 200, 346 182" fill="none" stroke="currentColor" opacity={0.22} strokeWidth={2.2} strokeLinecap="round" />
    </>
  );
}

function InnerPupae() {
  return (
    <>
      {[
        [252, 126],
        [280, 132],
        [306, 126],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y} C${x + 16} ${y + 20}, ${x + 16} ${y + 58}, ${x} ${y + 88} C${x - 16} ${y + 58}, ${x - 16} ${y + 20}, ${x} ${y} Z`}
          fill="none"
          stroke="currentColor"
          opacity={0.26}
          strokeWidth={2.3}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function InnerButterfly() {
  return (
    <>
      <path d="M260 128 v92" fill="none" stroke="currentColor" opacity={0.28} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M260 170 C236 148, 208 144, 190 156 C208 178, 230 190, 260 192" fill="none" stroke="currentColor" opacity={0.26} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M260 170 C284 148, 312 144, 330 156 C312 178, 290 190, 260 192" fill="none" stroke="currentColor" opacity={0.22} strokeWidth={2.4} strokeLinecap="round" />
    </>
  );
}

function InnerEnvelope() {
  return (
    <>
      <path d="M210 150 h100 a10 10 0 0 1 10 10 v50 a10 10 0 0 1 -10 10 h-100 a10 10 0 0 1 -10 -10 v-50 a10 10 0 0 1 10 -10 Z" fill="none" stroke="currentColor" opacity={0.26} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M200 160 L260 202 L320 160" fill="none" stroke="currentColor" opacity={0.22} strokeWidth={2.2} strokeLinecap="round" />
    </>
  );
}

function InnerSpark() {
  return (
    <>
      <path d="M250 150 L270 130" fill="none" stroke="currentColor" opacity={0.22} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M270 150 L250 130" fill="none" stroke="currentColor" opacity={0.22} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M260 124 v16" fill="none" stroke="currentColor" opacity={0.16} strokeWidth={2.0} strokeLinecap="round" />
    </>
  );
}

/* ========== UPDATED DOCK ========== */
function JourneyDock({
  stages,
  active,
  collapsed,
  onToggle,
  jumpTo,
  t,
}: {
  stages: Array<{ key: StageKey; label: string; kicker: string }>;
  active: StageKey;
  collapsed: boolean;
  onToggle: () => void;
  jumpTo: (k: StageKey) => void;
  t: (en: string, hi: string, hing: string) => string;
}) {
  const [hovered, setHovered] = useState(false);
  useMemo(() => prefersReducedMotion(), []); // computed once (kept for future use)

  const isCollapsed = collapsed && !hovered;

  return (
    <>
      {/* Desktop left dock */}
      <div className="hidden lg:block">
        <nav
          data-collapsed={isCollapsed ? "true" : "false"}
          className={[
            "dockNav fixed left-4 top-[calc(var(--siteHeaderH,110px)+22px)] z-[70]",
            isCollapsed ? "w-[72px]" : "w-[190px]",
            "transition-[width,transform,opacity] duration-300",
          ].join(" ")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Journey navigation"
        >
          <div className="dockShell rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.28)] backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-2 pt-2">
              <p
                className={[
                  "px-2 text-[10px] font-semibold uppercase tracking-[0.18em]",
                  "text-[rgb(var(--accent2))] opacity-85",
                  isCollapsed ? "hidden" : "block",
                ].join(" ")}
              >
                {t("Journey map", "Journey map", "Journey map")}
              </p>

              <button
                type="button"
                onClick={onToggle}
                className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.28)] px-2 py-2 text-[11px] text-[rgb(var(--fg)/0.88)] hover:bg-[rgb(var(--surface)/0.45)] transition"
                aria-label={isCollapsed ? "Expand dock" : "Collapse dock"}
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                {isCollapsed ? "→" : "←"}
              </button>
            </div>

            <div className="mt-2 space-y-1 p-2">
              {stages.map((s) => {
                const isActive = active === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => jumpTo(s.key)}
                    className={[
                      "group w-full text-left rounded-2xl px-2 py-2 transition relative",
                      "border border-transparent hover:border-[rgb(var(--accent)/0.22)]",
                      "hover:bg-[rgb(var(--surface)/0.22)]",
                      isActive ? "bg-[rgb(var(--surface)/0.32)] border-[rgb(var(--accent)/0.26)]" : "",
                    ].join(" ")}
                  >
                    {isActive ? <span className="dockActiveGlow absolute inset-0 rounded-2xl" aria-hidden /> : null}

                    <div className="relative z-10 flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex h-9 w-9 items-center justify-center rounded-2xl border",
                          "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.18)]",
                          "group-hover:border-[rgb(var(--accent)/0.30)]",
                          isActive ? "border-[rgb(var(--accent)/0.36)]" : "",
                        ].join(" ")}
                        aria-hidden
                      >
                        <StageGlyph stage={s.key} />
                      </span>

                      <div className={isCollapsed ? "hidden" : "min-w-0"}>
                        <p className="text-[11px] font-semibold text-[rgb(var(--fg))] truncate">{s.label}</p>
                        <p className="text-[10px] text-[rgb(var(--muted))] truncate opacity-85">{s.kicker}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`px-2 pb-2 ${isCollapsed ? "hidden" : "block"}`}>
              <Link href="/" className="inline-flex px-2 py-2 text-[11px] font-semibold text-[rgb(var(--accent2))] hover:opacity-90 transition">
                {t("← Back", "← Back", "← Back")}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile bottom dock */}
      <div className="lg:hidden fixed bottom-3 left-0 right-0 z-[70] px-3">
        <div className="rounded-[22px] border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.30)] backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-2 overflow-x-auto px-2 py-2 noScrollbars">
            {stages.map((s) => {
              const isActive = active === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => jumpTo(s.key)}
                  className={[
                    "shrink-0 rounded-2xl border px-3 py-2 text-[11px] transition flex items-center gap-2",
                    isActive
                      ? "border-[rgb(var(--accent)/0.36)] bg-[rgb(var(--surface)/0.32)] text-[rgb(var(--fg))]"
                      : "border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.18)] text-[rgb(var(--fg)/0.86)]",
                  ].join(" ")}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.12)]">
                    <StageGlyph stage={s.key} />
                  </span>
                  <span className="whitespace-nowrap">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

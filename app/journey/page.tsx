"use client";

import Link from "next/link";
import { useMemo } from "react";
import BackgroundFX from "../components/BackgroundFX";
import SiteHeader from "../components/SiteHeader";
import Reveal from "../components/Reveal";
import { useLang } from "../components/LanguageProvider";

type Stage = { key: string; title: string; months: string; desc: string };

export default function JourneyPage() {
  const { lang } = useLang();

  const copy = useMemo(() => {
    if (lang === "hi") {
      return {
        badge: "हमारी यात्रा",
        title: "धनोटू की एक छोटी learning space से — NEP 2020 से aligned vision तक।",
        intro:
          "DurlabhCLAP Foundation की शुरुआत ग्रामीण हिमाचल में early learning को नए तरीके से देखने की एक छोटी, focused कोशिश के रूप में हुई। जो धनोटू के एक केंद्र से शुरू हुआ, वह अब arts-based, child-centered education के बड़े vision में बदल रहा है।",
        timelineTitle: "Butterfly Model · 4 Stages",
        timelineNote: "Scroll पर headings ‘blur → sharp’ होती हैं + cards 3D hover पर tilt करते हैं.",
        phase4Title: "Looking Forward – A for Arts Playground",
        phase4P1:
          "हमारा long-term vision Himachal Pradesh में एक experimental residential learning campus बनाना है — “A for Arts – Playground”, जहाँ India के different parts से young women को CLAP Fellows के रूप में train किया जा सके।",
        phase4P2:
          "ये fellows अपने villages वापस जाकर arts-based, child-centered learning spaces शुरू करेंगे — और धनोटू के उस छोटे room से शुरू हुई culture को आगे बढ़ाएंगे।",
        back: "← Home पर वापस",
        stages: [
          { key: "egg", title: "Egg", months: "0–6 months", desc: "Community को सुनना, reality समझना, और families के साथ trust build करना।" },
          { key: "larva", title: "Larva", months: "6–12 months", desc: "Arts-based sessions, simple routines और playful structures introduce करना।" },
          { key: "pupa", title: "Pupa", months: "12–18 months", desc: "Learning deepen करना, confidence build करना, और systems के साथ integrate करना।" },
          { key: "butterfly", title: "Butterfly", months: "18–24 months", desc: "Aisa learning space jo continue kare, inspire kare aur replicate ho sake।" },
        ] as Stage[],
      };
    }

    if (lang === "hing") {
      return {
        badge: "Our Journey",
        title: "Dhanotu ki ek chhoti learning space se — NEP 2020 aligned vision tak.",
        intro:
          "DCF ki shuruaat rural Himachal me early learning ko reimagine karne ki focused koshish thi. Jo ek Dhanotu centre se start hua — woh ab arts-based, child-centered education ke broader vision me grow ho raha hai.",
        timelineTitle: "Butterfly Model · 4 Stages",
        timelineNote: "Scroll = blur→sharp, Cards = 3D tilt. Images later.",
        phase4Title: "Looking Forward – A for Arts Playground",
        phase4P1:
          "Long-term vision: Himachal me “A for Arts – Playground” ek experimental residential campus, jahan young women ko CLAP Fellows ki tarah train kiya ja sake.",
        phase4P2:
          "Fellows apne villages back jaake arts-based, child-centered learning spaces start karenge — Dhanotu se start hui culture ko aage le jaate hue.",
        back: "← Back to home",
        stages: [
          { key: "egg", title: "Egg", months: "0–6 months", desc: "Community ko sunna, kids ki reality samajhna, aur families ke saath trust build karna." },
          { key: "larva", title: "Larva", months: "6–12 months", desc: "Arts-based sessions, simple routines aur playful structures introduce karna." },
          { key: "pupa", title: "Pupa", months: "12–18 months", desc: "Learning deep karna, confidence build karna, aur local systems ke saath integrate karna." },
          { key: "butterfly", title: "Butterfly", months: "18–24 months", desc: "Aisa learning space jo continue kare, inspire kare aur replicate ho sake." },
        ] as Stage[],
      };
    }

    return {
      badge: "Our Journey",
      title: "From a small learning space in Dhanotu to a vision aligned with NEP 2020.",
      intro:
        "DurlabhCLAP Foundation began as a small, focused attempt to reimagine early learning in rural Himachal Pradesh. What started as a single centre in Dhanotu has grown into a broader vision for arts-based, child-centered education.",
      timelineTitle: "Butterfly Model · 4 Stages",
      timelineNote: "Scroll = blur→sharp, Cards = 3D tilt. Images later.",
      phase4Title: "Looking Forward – A for Arts Playground",
      phase4P1:
        "Our long-term vision is to create an experimental residential learning campus – “A for Arts – Playground” – in Himachal Pradesh, where young women from different parts of India can be trained as CLAP Fellows.",
      phase4P2:
        "These fellows will go back to their own villages and start learning spaces rooted in arts-based, child-centered education, carrying forward the culture that began in a small room in Dhanotu.",
      back: "← Back to home",
      stages: [
        { key: "egg", title: "Egg", months: "0–6 months", desc: "Listening to the community, understanding children’s realities, and building trust with families." },
        { key: "larva", title: "Larva", months: "6–12 months", desc: "Introducing arts-based sessions, simple routines, and playful structures children look forward to." },
        { key: "pupa", title: "Pupa", months: "12–18 months", desc: "Deepening learning, building confidence, and integrating with schools and local systems." },
        { key: "butterfly", title: "Butterfly", months: "18–24 months", desc: "A learning space that can continue, inspire, and be replicated in other communities." },
      ] as Stage[],
    };
  }, [lang]);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] relative overflow-hidden">
      <BackgroundFX density={40} />
      <SiteHeader variant="journey" />

      <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16 pt-10 md:pt-14">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
            {copy.badge}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mysteryHeading">
            <span className="mysteryGradient">{copy.title}</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-4 max-w-4xl text-sm text-[rgb(var(--fg)/0.78)] md:text-[15px]">
            {copy.intro}
          </p>
        </Reveal>

        {/* 3D Timeline */}
        <section className="mt-10 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-5 md:p-6">
          <Reveal>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-lg font-semibold mysteryHeading">
                <span className="mysteryGradient">{copy.timelineTitle}</span>
              </h2>
              <p className="text-xs text-[rgb(var(--muted))]">{copy.timelineNote}</p>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {copy.stages.map((s, i) => (
              <Reveal key={s.key} delay={120 + i * 90} className="card3d">
                <div className="card3dInner rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.50)] p-5 relative overflow-hidden">
                  {/* subtle internal highlight */}
                  <div className="pointer-events-none absolute -top-20 -right-24 h-48 w-48 rounded-full bg-[rgb(var(--accent2)/0.12)] blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-28 h-56 w-56 rounded-full bg-[rgb(var(--accent)/0.12)] blur-3xl" />

                  <p className="text-sm font-semibold text-[rgb(var(--accent2))]">
                    {i + 1}. {s.title}{" "}
                    <span className="text-[11px] text-[rgb(var(--muted))]">({s.months})</span>
                  </p>

                  <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">{s.desc}</p>

                  <div className="mt-4 inline-flex rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-3 py-1 text-[11px] text-[rgb(var(--muted))]">
                    Add images later ✓
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Phase 4 */}
        <section className="mt-8 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-5 md:p-6">
          <Reveal>
            <h2 className="text-sm font-semibold text-[rgb(var(--accent2))]">{copy.phase4Title}</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">{copy.phase4P1}</p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 text-sm text-[rgb(var(--fg)/0.78)]">{copy.phase4P2}</p>
          </Reveal>
        </section>

        <Reveal delay={160}>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex text-sm font-medium text-[rgb(var(--accent2))] hover:opacity-90 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {copy.back}
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

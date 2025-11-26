"use client";

// app/journey/page.tsx
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { content } from "../../src/data/lang";
import { useLang } from "../components/LanguageProvider";

export default function JourneyPage() {
  const { lang, pref, setPref } = useLang();

  const journeyCopy = useMemo(() => {
    if (lang === "hi") {
      return {
        badge: "हमारी यात्रा",
        title: "धनोटू की एक छोटी learning space से — NEP 2020 से aligned vision तक।",
        intro:
          "DurlabhCLAP Foundation की शुरुआत ग्रामीण हिमाचल में early learning को नए तरीके से देखने की एक छोटी, focused कोशिश के रूप में हुई। जो धनोटू के एक केंद्र से शुरू हुआ, वह अब arts-based, child-centered education के बड़े vision में बदल रहा है।",
        phase1Title: "Phase 1 · शुरुआत – धनोटू पायलट",
        phase1P1:
          "हमारा पहला learning centre Dhanotu village, Shahpur Tehsil, Kangra (Himachal Pradesh) में स्थापित हुआ। लक्ष्य simple भी था और ambitious भी — rural classrooms को joyful, expressive और बच्चों की reality से जुड़ा बनाना।",
        phase1P2:
          "लगभग 1.5 साल में हमने 50+ preschool और primary बच्चों के साथ काम किया, और English, Mathematics, drawing और computers को play, imagination और warmth के जरिए introduce किया।",
        phase2Title: "Phase 2 · NEP 2020 in Practice",
        phase2P1:
          "धनोटू में हमारा काम National Education Policy (NEP) 2020 की भावना से deeply inspired था। rote-heavy teaching के बजाय हमने इन पर emphasis किया:",
        phase2Bullets: [
          "Experiential और play-based learning",
          "Creativity, critical thinking और curiosity",
          "Local stories, languages और culture का उपयोग",
          "बच्चों के लिए safe emotional space",
        ],
        phase3Title: "Phase 3 · Butterfly Model",
        phase3P1:
          "हम learning space की growth को चार stages वाले model से देखते हैं — seed से flight तक:",
        eggT: "Egg (0–6 months)",
        eggD:
          "Community को सुनना, बच्चों की reality समझना, और families के साथ trust build करना।",
        larvaT: "Larva (6–12 months)",
        larvaD:
          "Arts-based sessions, simple routines और playful structures introduce करना जिन्हें बच्चे enjoy करें।",
        pupaT: "Pupa (12–18 months)",
        pupaD:
          "Learning deepen करना, confidence build करना, और schools + local systems के साथ integrate करना।",
        buttT: "Butterfly (18–24 months)",
        buttD:
          "ऐसा learning space जो continue कर सके, inspire करे और अन्य communities में replicate हो सके।",
        phase4Title: "Phase 4 · Looking Forward – A for Arts Playground",
        phase4P1:
          "हमारा long-term vision Himachal Pradesh में एक experimental residential learning campus बनाना है — “A for Arts – Playground”, जहाँ India के different parts से young women को CLAP Fellows के रूप में train किया जा सके।",
        phase4P2:
          "ये fellows अपने villages वापस जाकर arts-based, child-centered learning spaces शुरू करेंगे — और धनोटू के उस छोटे room से शुरू हुई culture को आगे बढ़ाएंगे।",
        back: "← Home पर वापस",
      };
    }

    if (lang === "hing") {
      return {
        badge: "Our Journey",
        title: "Dhanotu ki ek chhoti learning space se — NEP 2020 aligned vision tak.",
        intro:
          "DCF ki shuruaat rural Himachal me early learning ko reimagine karne ki ek focused koshish thi. Jo Dhanotu ke ek centre se start hua, woh ab arts-based, child-centered education ke broader vision me grow ho raha hai.",
        phase1Title: "Phase 1 · The Beginning – Dhanotu Pilot",
        phase1P1:
          "Hamara first learning centre Dhanotu village, Shahpur Tehsil, Kangra (HP) me establish hua. Aim simple bhi tha aur ambitious bhi — rural classrooms ko joyful, expressive aur kids ki realities se rooted banana.",
        phase1P2:
          "Around 1.5 years me, humne 50+ preschool + primary kids ke saath kaam kiya — English, Maths, drawing aur computers ko play, imagination aur warmth se introduce kiya.",
        phase2Title: "Phase 2 · NEP 2020 in Practice",
        phase2P1:
          "Dhanotu ka work NEP 2020 ke spirit se inspired tha. Rote-heavy teaching ke bajay humne focus kiya:",
        phase2Bullets: [
          "Experiential + play-based learning",
          "Creativity, critical thinking + curiosity",
          "Local stories, languages + culture",
          "Safe emotional space for expression",
        ],
        phase3Title: "Phase 3 · The Butterfly Model",
        phase3P1:
          "Hum learning space ki growth ko 4-stage model se visualize karte hain — seed to flight:",
        eggT: "Egg (0–6 months)",
        eggD:
          "Community ko sunna, kids ki reality samajhna, aur families ke saath trust build karna.",
        larvaT: "Larva (6–12 months)",
        larvaD:
          "Arts-based sessions, simple routines aur playful structures introduce karna.",
        pupaT: "Pupa (12–18 months)",
        pupaD:
          "Learning deep karna, confidence build karna, aur local systems ke saath integrate karna.",
        buttT: "Butterfly (18–24 months)",
        buttD:
          "Aisa learning space jo continue kare, inspire kare aur replicate ho sake.",
        phase4Title: "Phase 4 · Looking Forward – A for Arts Playground",
        phase4P1:
          "Long-term vision: Himachal me “A for Arts – Playground” ek experimental residential campus, jahan young women ko CLAP Fellows ki tarah train kiya ja sake.",
        phase4P2:
          "Fellows apne villages back jaake arts-based, child-centered learning spaces start karenge — Dhanotu se start hui culture ko aage le jaate hue.",
        back: "← Back to home",
      };
    }

    return {
      badge: "Our Journey",
      title: "From a small learning space in Dhanotu to a vision aligned with NEP 2020.",
      intro:
        "DurlabhCLAP Foundation began as a small, focused attempt to reimagine early learning in rural Himachal Pradesh. What started as a single centre in Dhanotu has grown into a broader vision for arts-based, child-centered education.",
      phase1Title: "Phase 1 · The Beginning – Dhanotu Pilot",
      phase1P1:
        "Our first learning centre was established in Dhanotu village, Shahpur Tehsil, Kangra (Himachal Pradesh). The aim was simple and ambitious at the same time – to show that rural classrooms can be joyful, expressive and rooted in children’s realities.",
      phase1P2:
        "Over a period of about 1.5 years, we worked with more than 50 preschool and primary children, introducing them to English, Mathematics, drawing and computers through play, imagination and warmth.",
      phase2Title: "Phase 2 · NEP 2020 in Practice",
      phase2P1:
        "Our work in Dhanotu was deeply inspired by the spirit of the National Education Policy (NEP) 2020. Instead of rote-heavy teaching, we emphasised:",
      phase2Bullets: [
        "Experiential and play-based learning",
        "Creativity, critical thinking and curiosity",
        "Use of local stories, languages and culture",
        "Safe emotional space for children to express themselves",
      ],
      phase3Title: "Phase 3 · The Butterfly Model",
      phase3P1:
        "We visualise the journey of a learning space through a four-stage model – from seed to flight:",
      eggT: "Egg (0–6 months)",
      eggD:
        "Listening to the community, understanding children’s realities and building trust with families.",
      larvaT: "Larva (6–12 months)",
      larvaD:
        "Introducing arts-based sessions, simple routines and playful structures that children look forward to.",
      pupaT: "Pupa (12–18 months)",
      pupaD:
        "Deepening learning, building children’s confidence and integrating with schools and local systems.",
      buttT: "Butterfly (18–24 months)",
      buttD:
        "A learning space that can continue, inspire and be replicated in other communities.",
      phase4Title: "Phase 4 · Looking Forward – A for Arts Playground",
      phase4P1:
        "Our long-term vision is to create an experimental residential learning campus – “A for Arts – Playground” – in Himachal Pradesh, where young women from different parts of India can be trained as CLAP Fellows.",
      phase4P2:
        "These fellows will go back to their own villages and start learning spaces rooted in arts-based, child-centered education, carrying forward the culture that began in a small room in Dhanotu.",
      back: "← Back to home",
    };
  }, [lang]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* SIMPLE HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-blue-500/40 bg-slate-900">
              <Image
                src="/dcf-logo.png"
                alt="DurlabhCLAP Foundation Logo"
                fill
                className="object-contain p-1.5"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight">
                DurlabhCLAP Foundation
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === "hi"
                  ? "हमारी यात्रा · धनोटू · NEP 2020"
                  : lang === "hing"
                  ? "Journey · Dhanotu · NEP 2020"
                  : "Our Journey · Dhanotu · NEP 2020"}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
              <Link href="/" className="hover:text-blue-300">
                Home
              </Link>
              <a href="/#programs" className="hover:text-blue-300">
                {content[lang].nav.programs}
              </a>
              <a href="/#founder" className="hover:text-blue-300">
                {content[lang].nav.founder}
              </a>
              <a href="/#contact" className="hover:text-blue-300">
                {content[lang].nav.contact}
              </a>
            </nav>

            {/* Language Toggle */}
            <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300">
              <span className="mr-1 text-slate-400">{content[lang].lang.label}:</span>

              <button
                onClick={() => setPref("auto")}
                className={`rounded-full px-2 py-0.5 hover:text-blue-200 ${
                  pref === "auto" ? "bg-blue-500/15 text-blue-200" : ""
                }`}
              >
                {content[lang].lang.auto}
              </button>
              <button
                onClick={() => setPref("en")}
                className={`rounded-full px-2 py-0.5 hover:text-blue-200 ${
                  pref === "en" ? "bg-blue-500/15 text-blue-200" : ""
                }`}
              >
                {content[lang].lang.en}
              </button>
              <button
                onClick={() => setPref("hi")}
                className={`rounded-full px-2 py-0.5 hover:text-blue-200 ${
                  pref === "hi" ? "bg-blue-500/15 text-blue-200" : ""
                }`}
              >
                {content[lang].lang.hi}
              </button>
              <button
                onClick={() => setPref("hing")}
                className={`rounded-full px-2 py-0.5 hover:text-blue-200 ${
                  pref === "hing" ? "bg-blue-500/15 text-blue-200" : ""
                }`}
              >
                {content[lang].lang.hing}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
          {journeyCopy.badge}
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
          {journeyCopy.title}
        </h1>

        <p className="mt-4 text-sm text-slate-300 md:text-[15px]">
          {journeyCopy.intro}
        </p>

        {/* BLOCK 1 */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            {journeyCopy.phase1Title}
          </h2>
          <p className="mt-2 text-sm text-slate-300">{journeyCopy.phase1P1}</p>
          <p className="mt-3 text-sm text-slate-300">{journeyCopy.phase1P2}</p>
        </section>

        {/* BLOCK 2 */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            {journeyCopy.phase2Title}
          </h2>
          <p className="mt-2 text-sm text-slate-300">{journeyCopy.phase2P1}</p>
          <ul className="mt-3 list-disc space-y-1 text-sm text-slate-300 pl-5">
            {journeyCopy.phase2Bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        {/* BLOCK 3 */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            {journeyCopy.phase3Title}
          </h2>
          <p className="mt-2 text-sm text-slate-300">{journeyCopy.phase3P1}</p>

          <div className="mt-3 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-200 md:grid-cols-2">
            <div>
              <p className="font-semibold text-blue-300">{journeyCopy.eggT}</p>
              <p className="mt-1 text-slate-300">{journeyCopy.eggD}</p>
            </div>

            <div>
              <p className="font-semibold text-blue-300 mt-3 md:mt-0">
                {journeyCopy.larvaT}
              </p>
              <p className="mt-1 text-slate-300">{journeyCopy.larvaD}</p>
            </div>

            <div>
              <p className="font-semibold text-blue-300 mt-3">
                {journeyCopy.pupaT}
              </p>
              <p className="mt-1 text-slate-300">{journeyCopy.pupaD}</p>
            </div>

            <div>
              <p className="font-semibold text-blue-300 mt-3">
                {journeyCopy.buttT}
              </p>
              <p className="mt-1 text-slate-300">{journeyCopy.buttD}</p>
            </div>
          </div>
        </section>

        {/* BLOCK 4 */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            {journeyCopy.phase4Title}
          </h2>
          <p className="mt-2 text-sm text-slate-300">{journeyCopy.phase4P1}</p>
          <p className="mt-3 text-sm text-slate-300">{journeyCopy.phase4P2}</p>
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-blue-300 hover:text-blue-200"
          >
            {journeyCopy.back}
          </Link>
        </div>
      </main>
    </div>
  );
}

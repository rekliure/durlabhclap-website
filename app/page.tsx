"use client";

// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { content } from "../src/data/lang";
import { useLang } from "./components/LanguageProvider";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const { lang, pref, setPref } = useLang();

  const stats = content[lang].stats;
  const programs = content[lang].programs.items;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      {/* NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
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
                Early Learning · Arts · Rural Education
              </p>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#impact" className="hover:text-blue-300">
              {content[lang].nav.impact}
            </a>
            <a href="#programs" className="hover:text-blue-300">
              {content[lang].nav.programs}
            </a>
            <a href="#founder" className="hover:text-blue-300">
              {content[lang].nav.founder}
            </a>
            <Link href="/journey" className="hover:text-blue-300">
              {content[lang].nav.journey}
            </Link>
            <a href="#contact" className="hover:text-blue-300">
              {content[lang].nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* LANGUAGE TOGGLE (saved preference + auto + hinglish) */}
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

            <a
              href="#contact"
              className="rounded-full bg-blue-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-blue-500/30 hover:bg-blue-400"
            >
              {content[lang].nav.connect}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-16">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="inline rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
              {content[lang].hero.badge}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              {content[lang].hero.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {content[lang].hero.highlight}
              </span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              {content[lang].hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/journey"
                className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/30 hover:bg-blue-400"
              >
                {content[lang].hero.primaryCta}
              </Link>

              <a
                href="#programs"
                className="text-sm font-medium text-slate-200 underline-offset-4 hover:underline"
              >
                {content[lang].hero.secondaryCta}
              </a>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 px-3 py-3"
                >
                  <p className="text-lg font-semibold text-blue-300">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HERO MEDIA: GIF / VIDEO SLOT */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-blue-500/10">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/hero-loop.gif"
                  alt="Children learning at DCF centre"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating mini-card */}
            <div className="absolute -bottom-5 left-4 w-[72%] rounded-2xl border border-blue-500/30 bg-slate-950/90 px-4 py-3 text-xs text-slate-200 shadow-lg shadow-blue-500/30 backdrop-blur">
              {content[lang].hero.quote} —{" "}
              <span className="font-semibold">{content[lang].hero.quoteFrom}</span>
            </div>
          </div>
        </section>

        {/* IMPACT SECTION */}
        <section id="impact" className="mt-16 space-y-6">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            {content[lang].impact.title}
          </h2>

          <p className="max-w-2xl text-sm text-slate-300 md:text-[15px]">
            {content[lang].impact.paragraph}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <ImpactCard
              title={content[lang].impact.cards[0].title}
              body={content[lang].impact.cards[0].body}
            />
            <ImpactCard
              title={content[lang].impact.cards[1].title}
              body={content[lang].impact.cards[1].body}
            />
            <ImpactCard
              title={content[lang].impact.cards[2].title}
              body={content[lang].impact.cards[2].body}
            />
          </div>

          <div>
            <Link
              href="/journey"
              className="inline-flex text-xs font-medium text-blue-300 hover:text-blue-200"
            >
              {content[lang].impact.readMore}
            </Link>
          </div>
        </section>

        {/* PROGRAMS SECTION */}
        <section id="programs" className="mt-16 space-y-6">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            {content[lang].programs.title}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    {program.description}
                  </p>
                </div>

                <span className="mt-4 inline-flex text-[11px] font-medium text-blue-300">
                  {content[lang].programs.ageTag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section
          id="founder"
          className="mt-16 grid gap-6 md:grid-cols-[1.4fr,1fr] md:items-center"
        >
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-xs rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="relative mb-3 h-44 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-800/60">
                <Image
                  src="/founder-sahil.jpg"
                  alt="Founder - Sahil Dogra"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-slate-50">Sahil Dogra</p>
              <p className="text-[11px] text-slate-400">
                Founder, DurlabhCLAP Foundation
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              {content[lang].founder.label}
            </p>

            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              “{content[lang].founder.quote}”
            </h2>

            <p className="text-sm text-slate-300">{content[lang].founder.p1}</p>
            <p className="text-sm text-slate-300">{content[lang].founder.p2}</p>
            <p className="text-sm text-slate-300">{content[lang].founder.p3}</p>

            <p className="text-xs text-slate-400">
              —{" "}
              <span className="font-semibold text-slate-200">
                {content[lang].founder.signature}
              </span>
            </p>
          </div>
        </section>

        {/* CONTACT / FOOTER CTA */}
        <section
          id="contact"
          className="mt-16 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-500/15 via-slate-900 to-slate-900 px-6 py-8 md:px-8"
        >
          <div className="grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
                {content[lang].contact.title}
              </h2>

              <p className="mt-3 max-w-xl text-sm text-slate-200">
                {content[lang].contact.paragraph}
              </p>

              <div className="mt-4 space-y-1 text-sm text-slate-200">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:contact@durlabhclapfoundation.org"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    contact@durlabhclapfoundation.org
                  </a>
                </p>
                <p>
                  {content[lang].contact.locationLabel}: Shahpur, Kangra, Himachal
                  Pradesh, India
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
                <a
                  href="https://www.instagram.com/durlabhclapfoundation/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-600 px-3 py-1 hover:border-blue-400 hover:text-blue-200"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100066918507014"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-600 px-3 py-1 hover:border-blue-400 hover:text-blue-200"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/@DurlabhClapFoundation"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-600 px-3 py-1 hover:border-blue-400 hover:text-blue-200"
                >
                  YouTube
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">
                {content[lang].contact.lookingForTitle}
              </p>
              <ul className="mt-2 space-y-1.5">
                {content[lang].contact.lookingFor.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} DurlabhCLAP Foundation. {content[lang].contact.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <span>{content[lang].contact.basedIn}</span>
            <a
              href="mailto:contact@durlabhclapfoundation.org"
              className="hover:text-blue-300"
            >
              contact@durlabhclapfoundation.org
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ImpactCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-xs text-slate-300">{body}</p>
    </div>
  );
}

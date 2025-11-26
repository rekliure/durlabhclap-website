"use client";

import Link from "next/link";
import Image from "next/image";
import BackgroundFX from "./components/BackgroundFX";
import SiteHeader from "./components/SiteHeader";
import Reveal from "./components/Reveal";
import { content } from "../src/data/lang";
import { useLang } from "./components/LanguageProvider";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLang();

  const stats = content[lang].stats;
  const programs = content[lang].programs.items;

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] relative overflow-hidden">
      <BackgroundFX density={46} />
      <SiteHeader variant="home" />

      <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-16 pt-10 md:pt-14">
        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6 space-y-6" delay={0}>
            <p className="inline rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.10)] px-3 py-1 text-xs font-medium text-[rgb(var(--accent2))]">
              {content[lang].hero.badge}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl mysteryHeading">
              <span className="softShimmer">{content[lang].hero.title}</span>{" "}
              <span className="mysteryGradient">{content[lang].hero.highlight}</span>
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-[rgb(var(--fg)/0.78)] md:text-base">
              {content[lang].hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/journey"
                className="rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--bg))] shadow-lg hover:bg-[rgb(var(--accent2))] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {content[lang].hero.primaryCta}
              </Link>

              <a
                href="#programs"
                className="text-sm font-medium underline-offset-4 hover:underline transition-opacity hover:opacity-90"
              >
                {content[lang].hero.secondaryCta}
              </a>
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
              <div className="relative aspect-[4/3] w-full">
                <Image src="/hero-loop.gif" alt="Children learning at DCF centre" fill className="object-cover" />
              </div>
            </div>

            <div className="absolute -bottom-5 left-4 w-[84%] rounded-2xl border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--bg)/0.92)] px-4 py-3 text-xs shadow-lg backdrop-blur">
              {content[lang].hero.quote} —{" "}
              <span className="font-semibold">{content[lang].hero.quoteFrom}</span>
            </div>
          </Reveal>
        </section>

        {/* IMPACT */}
        <section id="impact" className="mt-16 space-y-6">
          <Reveal delay={0}>
            <h2 className="text-2xl font-semibold mysteryHeading">
              <span className="mysteryGradient">{content[lang].impact.title}</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="max-w-3xl text-sm text-[rgb(var(--fg)/0.78)] md:text-[15px]">
              {content[lang].impact.paragraph}
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delay={120}>
              <ImpactCard title={content[lang].impact.cards[0].title} body={content[lang].impact.cards[0].body} />
            </Reveal>
            <Reveal delay={180}>
              <ImpactCard title={content[lang].impact.cards[1].title} body={content[lang].impact.cards[1].body} />
            </Reveal>
            <Reveal delay={240}>
              <ImpactCard title={content[lang].impact.cards[2].title} body={content[lang].impact.cards[2].body} />
            </Reveal>
          </div>

          <Reveal delay={260}>
            <Link href="/journey" className="inline-flex text-xs font-medium text-[rgb(var(--accent2))] hover:opacity-90">
              {content[lang].impact.readMore}
            </Link>
          </Reveal>
        </section>

        {/* PROGRAMS */}
        <section id="programs" className="mt-16 space-y-6">
          <Reveal>
            <h2 className="text-2xl font-semibold mysteryHeading">
              <span className="mysteryGradient">{content[lang].programs.title}</span>
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {programs.map((program, i) => (
              <Reveal key={program.title} delay={80 + i * 70}>
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] p-4 transition-transform duration-200 hover:-translate-y-0.5">
                  <h3 className="text-sm font-semibold">{program.title}</h3>
                  <p className="mt-2 text-xs text-[rgb(var(--fg)/0.78)]">{program.description}</p>
                  <span className="mt-4 inline-flex text-[11px] font-medium text-[rgb(var(--accent2))]">
                    {content[lang].programs.ageTag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FOUNDER */}
        <section id="founder" className="mt-16 grid gap-6 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5 flex justify-center lg:justify-start" delay={0}>
            <div className="w-full max-w-sm rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.60)] p-4">
              <div className="relative mb-3 h-56 w-full overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface2))]">
                <Image src="/founder-sahil.jpg" alt="Founder - Sahil Dogra" fill className="object-cover" />
              </div>
              <p className="text-sm font-semibold">Sahil Dogra</p>
              <p className="text-[11px] text-[rgb(var(--muted))]">Founder, DurlabhCLAP Foundation</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-4" delay={120}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
              {content[lang].founder.label}
            </p>
            <h2 className="text-2xl font-semibold mysteryHeading">
              “<span className="mysteryGradient">{content[lang].founder.quote}</span>”
            </h2>
            <p className="text-sm text-[rgb(var(--fg)/0.78)]">{content[lang].founder.p1}</p>
            <p className="text-sm text-[rgb(var(--fg)/0.78)]">{content[lang].founder.p2}</p>
            <p className="text-sm text-[rgb(var(--fg)/0.78)]">{content[lang].founder.p3}</p>

            <p className="text-xs text-[rgb(var(--muted))]">
              — <span className="font-semibold text-[rgb(var(--fg))]">{content[lang].founder.signature}</span>
            </p>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="mt-16 rounded-3xl border border-[rgb(var(--accent)/0.35)] bg-[linear-gradient(90deg,rgb(var(--accent)/0.12),rgb(var(--surface)/0.75),rgb(var(--surface)/0.75))] px-6 py-8 md:px-8"
        >
          <Reveal delay={0}>
            <h2 className="text-2xl font-semibold mysteryHeading">
              <span className="mysteryGradient">{content[lang].contact.title}</span>
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-3 max-w-3xl text-sm text-[rgb(var(--fg)/0.82)]">
              {content[lang].contact.paragraph}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-4 space-y-1 text-sm text-[rgb(var(--fg)/0.82)]">
              <p>
                Email:{" "}
                <a href="mailto:contact@durlabhclapfoundation.org" className="text-[rgb(var(--accent2))] hover:opacity-90">
                  contact@durlabhclapfoundation.org
                </a>
              </p>
              <p>
                {content[lang].contact.locationLabel}: Shahpur, Kangra, Himachal Pradesh, India
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] py-6">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 flex flex-col gap-3 text-xs text-[rgb(var(--muted))] md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} DurlabhCLAP Foundation. {content[lang].contact.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <span>{content[lang].contact.basedIn}</span>
            <a href="mailto:contact@durlabhclapfoundation.org" className="hover:text-[rgb(var(--accent2))]">
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
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.60)] p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs text-[rgb(var(--fg)/0.78)]">{body}</p>
    </div>
  );
}

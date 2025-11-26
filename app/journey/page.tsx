// app/journey/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export default function JourneyPage() {
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
                Our Journey · Dhanotu · NEP 2020
              </p>
            </div>
          </Link>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="/" className="hover:text-blue-300">
              Home
            </Link>
            <a href="/#programs" className="hover:text-blue-300">
              Programs
            </a>
            <a href="/#founder" className="hover:text-blue-300">
              Founder
            </a>
            <a href="/#contact" className="hover:text-blue-300">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
          Our Journey
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
          From a small learning space in Dhanotu to a vision aligned with NEP
          2020.
        </h1>
        <p className="mt-4 text-sm text-slate-300 md:text-[15px]">
          DurlabhCLAP Foundation began as a small, focused attempt to reimagine
          early learning in rural Himachal Pradesh. What started as a single
          centre in Dhanotu has grown into a broader vision for arts-based,
          child-centered education.
        </p>

        {/* BLOCK 1 */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            Phase 1 · The Beginning – Dhanotu Pilot
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Our first learning centre was established in{" "}
            <span className="font-semibold">
              Dhanotu village, Shahpur Tehsil, Kangra (Himachal Pradesh)
            </span>
            . The aim was simple and ambitious at the same time – to show that
            rural classrooms can be joyful, expressive and rooted in
            children&apos;s realities.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Over a period of about{" "}
            <span className="font-semibold">1.5 years</span>, we worked with
            more than{" "}
            <span className="font-semibold">
              50 preschool and primary children
            </span>
            , introducing them to English, Mathematics, drawing and computers
            through play, imagination and warmth.
          </p>
        </section>

        {/* BLOCK 2 */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            Phase 2 · NEP 2020 in Practice
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Our work in Dhanotu was deeply inspired by the spirit of the{" "}
            <span className="font-semibold">
              National Education Policy (NEP) 2020
            </span>
            . Instead of rote-heavy teaching, we emphasised:
          </p>
          <ul className="mt-3 list-disc space-y-1 text-sm text-slate-300 pl-5">
            <li>Experiential and play-based learning</li>
            <li>Creativity, critical thinking and curiosity</li>
            <li>Use of local stories, languages and culture</li>
            <li>Safe emotional space for children to express themselves</li>
          </ul>
        </section>

        {/* BLOCK 3 */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            Phase 3 · The Butterfly Model
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            We visualise the journey of a learning space through a four-stage
            model – from seed to flight:
          </p>
          <div className="mt-3 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-200 md:grid-cols-2">
            <div>
              <p className="font-semibold text-blue-300">Egg (0–6 months)</p>
              <p className="mt-1 text-slate-300">
                Listening to the community, understanding children&apos;s
                realities and building trust with families.
              </p>
            </div>
            <div>
              <p className="font-semibold text-blue-300 mt-3 md:mt-0">
                Larva (6–12 months)
              </p>
              <p className="mt-1 text-slate-300">
                Introducing arts-based sessions, simple routines and playful
                structures that children look forward to.
              </p>
            </div>
            <div>
              <p className="font-semibold text-blue-300 mt-3">
                Pupa (12–18 months)
              </p>
              <p className="mt-1 text-slate-300">
                Deepening learning, building children&apos;s confidence and
                integrating with schools and local systems.
              </p>
            </div>
            <div>
              <p className="font-semibold text-blue-300 mt-3">
                Butterfly (18–24 months)
              </p>
              <p className="mt-1 text-slate-300">
                A learning space that can continue, inspire and be replicated in
                other communities.
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 4 */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-sm font-semibold text-blue-300">
            Phase 4 · Looking Forward – A for Arts Playground
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Our long-term vision is to create an experimental residential
            learning campus –{" "}
            <span className="font-semibold">“A for Arts – Playground”</span> –
            in Himachal Pradesh, where young women from different parts of India
            can be trained as{" "}
            <span className="font-semibold">CLAP Fellows</span>.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            These fellows will go back to their own villages and start learning
            spaces rooted in arts-based, child-centered education, carrying
            forward the culture that began in a small room in Dhanotu.
          </p>
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-blue-300 hover:text-blue-200"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

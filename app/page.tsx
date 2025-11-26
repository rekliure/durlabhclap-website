// app/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";

const stats = [
  { label: "Children reached", value: "50+" },
  { label: "Centre duration", value: "1.5 years" },
  { label: "Learning spaces", value: "1 pilot centre" },
];

const programs = [
  {
    title: "Early English Exposure",
    description:
      "Introducing spoken English and basic literacy through stories, songs, role play and everyday conversation.",
  },
  {
    title: "Foundational Mathematics",
    description:
      "Building number sense, patterns and basic operations using play, objects, games and age-appropriate activities.",
  },
  {
    title: "Art, Expression & Computers",
    description:
      "Drawing, colouring, local art, basic computer exposure and expressive activities that keep children curious.",
  },
];

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
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
              Impact
            </a>
            <a href="#programs" className="hover:text-blue-300">
              Programs
            </a>
            <a href="#founder" className="hover:text-blue-300">
              Founder
            </a>
            <Link href="/journey" className="hover:text-blue-300">
              Our Journey
            </Link>
            <a href="#contact" className="hover:text-blue-300">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-blue-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-blue-500/30 hover:bg-blue-400"
          >
            Connect with us
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-16">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="inline rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
              Himachal Pradesh · Preschool & Primary · NEP 2020
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Reimagining rural education through{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                creativity, care and culture.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              DurlabhCLAP Foundation (DCF) works with preschool and primary
              children in rural Himachal Pradesh to strengthen their early
              learning foundation through arts-based, joyful and culturally
              rooted education.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/journey"
                className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/30 hover:bg-blue-400"
              >
                Explore our journey
              </Link>
              <a
                href="#programs"
                className="text-sm font-medium text-slate-200 underline-offset-4 hover:underline"
              >
                See what we do
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
              {/* TODO: Replace this with your GIF or looping video from the centre */}
             
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
              “Hamare gaon mein pehli baar aisa khel-khel mein padhne wala
              jagah bana.” —{" "}
              <span className="font-semibold">
                Parent from Shahpur, Kangra
              </span>
            </div>
          </div>
        </section>

        {/* IMPACT SECTION */}
        <section id="impact" className="mt-16 space-y-6">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            Starting strong, staying curious.
          </h2>
          <p className="max-w-2xl text-sm text-slate-300 md:text-[15px]">
            Our work focuses on children who are just beginning their academic
            journey. We want their first experience of “school” to be full of
            curiosity, safety and joy — not fear or pressure. At our Dhanotu
            centre in Shahpur (Kangra), we worked with children from different
            family backgrounds, dialects and mother tongues, and saw how arts
            and play helped them open up to learning.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <ImpactCard
              title="Joyful first classrooms"
              body="For many children, DCF was their first learning space. We focused on warmth, interaction and trust before textbooks."
            />
            <ImpactCard
              title="Languages & dialects respected"
              body="Children came with different dialects and mother tongues. We treated this as a strength, not a barrier."
            />
            <ImpactCard
              title="Aligned with NEP 2020"
              body="Our approach reflects the spirit of NEP 2020 – experiential, creative and rooted in the child’s context."
            />
          </div>
          <div>
            <Link
              href="/journey"
              className="inline-flex text-xs font-medium text-blue-300 hover:text-blue-200"
            >
              Read the full story of our pilot in Himachal →
            </Link>
          </div>
        </section>

        {/* PROGRAMS SECTION */}
        <section id="programs" className="mt-16 space-y-6">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            What we focus on with children.
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
                  Early years · Ages 4–10
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
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              Message from the Founder
            </p>
            <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
              “Education should not silence children. It should give them a
              voice.”
            </h2>
            <p className="text-sm text-slate-300">
              Sahil Dogra, Founder of DurlabhCLAP Foundation, grew up in Delhi
              and has spent a significant part of his journey working closely
              in rural villages across India. Through his on-ground experiences,
              he observed how creativity and emotional expression were slowly
              disappearing from children’s lives – especially in rural
              education systems dominated by rigid structures.
            </p>
            <p className="text-sm text-slate-300">
              Instead of beginning from a big city, he chose to pilot
              DurlabhCLAP Foundation from his grassroots in{" "}
              <span className="font-semibold">
                Shahpur, Kangra, Himachal Pradesh
              </span>
              , where his family roots and social reality are deeply connected.
            </p>
            <p className="text-sm text-slate-300">
              For Sahil, DCF is not just an organisation. It is a long-term
              mission to restore creativity, confidence and cultural pride in
              children by integrating arts, empathy and local context into how
              learning happens in villages.
            </p>
            <p className="text-xs text-slate-400">
              —{" "}
              <span className="font-semibold text-slate-200">
                Sahil Dogra
              </span>
              , Founder, DurlabhCLAP Foundation
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-xs rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="relative mb-3 h-44 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-800/60">
                {/* TODO: Replace placeholder with actual founder photo */}
                <Image
                  src="/founder-sahil.jpg"
                  alt="Founder - Sahil Dogra"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-slate-50">
                Sahil Dogra
              </p>
              <p className="text-[11px] text-slate-400">
                Founder, DurlabhCLAP Foundation
              </p>
            </div>
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
                Let&apos;s build stronger beginnings together.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-200">
                If you&apos;re a parent, educator, institution or someone who
                cares about early childhood education, we would love to
                connect. Together, we can make the first experiences of school
                joyful for many more children.
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
                <p>Location: Shahpur, Kangra, Himachal Pradesh, India</p>
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
                What we are looking for:
              </p>
              <ul className="mt-2 space-y-1.5">
                <li>• Partners for early learning interventions</li>
                <li>• Support for arts-based curriculum development</li>
                <li>• Fellows and volunteers from local communities</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} DurlabhCLAP Foundation. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span>Based in Himachal Pradesh, India</span>
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

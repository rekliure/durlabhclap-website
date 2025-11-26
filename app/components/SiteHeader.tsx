"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { content } from "../../src/data/lang";
import { useTheme, ThemeKey } from "./ThemeProvider";

type Variant = "home" | "journey";
type NavItem = { label: string; href: string; isLink?: boolean };

export default function SiteHeader({ variant }: { variant: Variant }) {
  const { lang, pref, setPref } = useLang();
  const { toggleMode, mode, theme, setTheme, themeLabels } = useTheme();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = useMemo(() => {
    if (variant === "home") {
      return [
        { label: content[lang].nav.impact, href: "#impact" },
        { label: content[lang].nav.programs, href: "#programs" },
        { label: content[lang].nav.founder, href: "#founder" },
        { label: content[lang].nav.journey, href: "/journey", isLink: true },
        { label: content[lang].nav.contact, href: "#contact" },
      ];
    }
    return [
      { label: "Home", href: "/", isLink: true },
      { label: content[lang].nav.programs, href: "/#programs" },
      { label: content[lang].nav.founder, href: "/#founder" },
      { label: content[lang].nav.contact, href: "/#contact" },
    ];
  }, [variant, lang]);

  const labels = useMemo(() => {
    const isHi = lang === "hi";
    return {
      menu: isHi ? "Menu" : "Menu",
      close: isHi ? "Close" : "Close",
      theme: isHi ? "थीम" : "Theme",
      lang: isHi ? "भाषा" : "Language",
    };
  }, [lang]);

  return (
    <header className="border-b border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.84)] backdrop-blur sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            {/* Logo with visible animation */}
            <div className="logoShell relative h-10 w-10 rounded-2xl border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--surface))] shadow-[0_0_0_1px_rgb(var(--accent)/0.10)] overflow-hidden">
              <span className="logoRing" />
              <div className="logoFloatV2 relative h-full w-full">
                <Image
                  src="/dcf-logo.png"
                  alt="DurlabhCLAP Foundation Logo"
                  fill
                  className="object-contain p-1.5"
                  priority
                />
              </div>
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-[rgb(var(--fg))]">
                DurlabhCLAP Foundation
              </p>
              <p className="text-[11px] text-[rgb(var(--muted))]">
                {variant === "journey"
                  ? lang === "hi"
                    ? "हमारी यात्रा · धनोटू · NEP 2020"
                    : lang === "hing"
                    ? "Journey · Dhanotu · NEP 2020"
                    : "Our Journey · Dhanotu · NEP 2020"
                  : "Early Learning · Arts · Rural Education"}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-[rgb(var(--fg)/0.78)]">
            {nav.map((n) =>
              n.isLink ? (
                <Link key={n.href} href={n.href} className="navItem">
                  {n.label}
                </Link>
              ) : (
                <a key={n.href} href={n.href} className="navItem">
                  {n.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden btnGhost px-3 py-2 text-xs"
              aria-label="Toggle menu"
            >
              {open ? labels.close : labels.menu}
            </button>

            <button
              type="button"
              onClick={toggleMode}
              className="btnGhost px-3 py-2 text-xs"
              aria-label="Toggle dark/light"
              title={mode === "dark" ? "Dark" : "Light"}
            >
              {mode === "dark" ? "🌙" : "☀️"}
            </button>

            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-3 py-2">
              <span className="hidden md:inline text-[11px] text-[rgb(var(--muted))]">
                {labels.theme}:
              </span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeKey)}
                className="bg-transparent text-[11px] text-[rgb(var(--fg))] outline-none"
              >
                {Object.entries(themeLabels).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label[lang as "en" | "hi" | "hing"] ?? v.label.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:hidden">
              <select
                value={pref}
                onChange={(e) => setPref(e.target.value as any)}
                className="btnGhost px-3 py-2 text-[11px] outline-none"
              >
                <option value="auto">{content[lang].lang.auto}</option>
                <option value="en">{content[lang].lang.en}</option>
                <option value="hi">{content[lang].lang.hi}</option>
                <option value="hing">{content[lang].lang.hing}</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.55)] px-2 py-1 text-[11px]">
              <span className="mr-1 text-[rgb(var(--muted))]">{labels.lang}:</span>
              {(["auto", "en", "hi", "hing"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setPref(k as any)}
                  className={`rounded-full px-2 py-0.5 btnPill ${
                    pref === k ? "bg-[rgb(var(--accent)/0.15)] text-[rgb(var(--accent2))]" : ""
                  }`}
                >
                  {k === "auto" ? content[lang].lang.auto : (content[lang].lang as any)[k]}
                </button>
              ))}
            </div>

            {variant === "home" ? (
              <a href="#contact" className="btnPrimary px-4 py-2 text-xs">
                {content[lang].nav.connect}
              </a>
            ) : (
              <Link href="/" className="btnPrimary px-4 py-2 text-xs">
                ← Back
              </Link>
            )}
          </div>
        </div>

        {open ? (
          <div className="lg:hidden border-t border-[rgb(var(--border))] pb-3">
            <div className="pt-3 space-y-2 text-sm text-[rgb(var(--fg)/0.82)]">
              {nav.map((n) =>
                n.isLink ? (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="block navMobile"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ) : (
                  <a
                    key={n.href}
                    href={n.href}
                    className="block navMobile"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </a>
                )
              )}

              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-[rgb(var(--muted))]">{labels.theme}:</span>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as ThemeKey)}
                  className="btnGhost px-3 py-2 text-[11px] outline-none"
                >
                  {Object.entries(themeLabels).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label[lang as "en" | "hi" | "hing"] ?? v.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <style jsx global>{`
        .btnGhost {
          border-radius: 9999px;
          border: 1px solid rgb(var(--border));
          background: rgb(var(--surface) / 0.55);
          color: rgb(var(--fg));
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }
        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgb(var(--accent) / 0.35);
          box-shadow: 0 10px 30px rgb(var(--accent) / 0.12);
        }
        .btnGhost:active {
          transform: translateY(0px) scale(0.98);
        }

        .btnPrimary {
          border-radius: 9999px;
          background: rgb(var(--accent));
          color: rgb(var(--bg));
          font-weight: 800;
          transition: transform 180ms ease, filter 180ms ease, box-shadow 180ms ease;
          box-shadow: 0 14px 40px rgb(var(--accent) / 0.20);
        }
        .btnPrimary:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 18px 50px rgb(var(--accent2) / 0.22);
        }
        .btnPrimary:active {
          transform: translateY(0px) scale(0.98);
        }

        .btnPill {
          transition: transform 160ms ease, opacity 160ms ease;
        }
        .btnPill:hover {
          transform: translateY(-1px);
          opacity: 0.95;
        }
        .btnPill:active {
          transform: translateY(0px) scale(0.98);
        }

        .navItem {
          position: relative;
          padding: 6px 0;
          transition: color 160ms ease;
        }
        .navItem:hover {
          color: rgb(var(--accent2));
        }
        .navItem:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 2px;
          width: 0%;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent2)));
          transition: width 220ms ease;
        }
        .navItem:hover:after {
          width: 100%;
        }

        .navMobile {
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgb(var(--border));
          background: rgb(var(--surface) / 0.45);
          transition: transform 180ms ease, border-color 180ms ease;
        }
        .navMobile:hover {
          transform: translateY(-1px);
          border-color: rgb(var(--accent) / 0.35);
        }
      `}</style>
    </header>
  );
}

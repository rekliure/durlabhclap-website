"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LangKey } from "../../src/data/lang";

type LangPref = "auto" | LangKey;

type LangCtx = {
  lang: LangKey;
  pref: LangPref;
  setPref: (p: LangPref) => void;
};

const LS_KEY = "dcf_lang_pref";
const Ctx = createContext<LangCtx | null>(null);

function detectBrowserLang(): LangKey {
  if (typeof navigator === "undefined") return "en";
  const b = (navigator.language || "en").toLowerCase();
  if (b.startsWith("hi")) return "hi";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [pref, setPref] = useState<LangPref>(() => {
    if (typeof window === "undefined") return "auto";
    return (window.localStorage.getItem(LS_KEY) as LangPref) ?? "auto";
  });

  const [detected, setDetected] = useState<LangKey>("en");

  useEffect(() => {
    setDetected(detectBrowserLang());
  }, []);

  const lang: LangKey = useMemo(() => (pref === "auto" ? detected : pref), [pref, detected]);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, pref);
  }, [pref]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "hi" ? "hi" : "en";
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, pref, setPref }), [lang, pref]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang must be used within LanguageProvider");
  return v;
}

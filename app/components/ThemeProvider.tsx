"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Mode = "dark" | "light";
export type ThemeKey = "blue" | "cyan" | "purple" | "emerald" | "rose";

const LS_MODE = "dcf_mode";
const LS_THEME = "dcf_theme";

const THEMES: Record<
  ThemeKey,
  {
    label: { en: string; hi: string; hing: string };
    accent: string; // "R G B"
    accent2: string;
  }
> = {
  blue: {
    label: { en: "Blue", hi: "नीला", hing: "Blue" },
    accent: "59 130 246",
    accent2: "34 211 238",
  },
  cyan: {
    label: { en: "Cyan", hi: "सियान", hing: "Cyan" },
    accent: "34 211 238",
    accent2: "59 130 246",
  },
  purple: {
    label: { en: "Purple", hi: "बैंगनी", hing: "Purple" },
    accent: "168 85 247",
    accent2: "59 130 246",
  },
  emerald: {
    label: { en: "Emerald", hi: "हरा", hing: "Green" },
    accent: "16 185 129",
    accent2: "34 211 238",
  },
  rose: {
    label: { en: "Rose", hi: "गुलाबी", hing: "Rose" },
    accent: "244 63 94",
    accent2: "168 85 247",
  },
};

function getSystemMode(): Mode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function applyTheme(mode: Mode, theme: ThemeKey) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.dataset.mode = mode;
  root.dataset.theme = theme;

  const isDark = mode === "dark";

  root.style.setProperty("--bg", isDark ? "2 6 23" : "248 250 252"); // slate-950 / slate-50
  root.style.setProperty("--fg", isDark ? "248 250 252" : "15 23 42"); // slate-50 / slate-900
  root.style.setProperty("--muted", isDark ? "148 163 184" : "71 85 105"); // slate-400 / slate-600
  root.style.setProperty("--border", isDark ? "30 41 59" : "226 232 240"); // slate-800 / slate-200
  root.style.setProperty("--surface", isDark ? "15 23 42" : "255 255 255"); // slate-900 / white
  root.style.setProperty("--surface2", isDark ? "17 24 39" : "241 245 249"); // slate-ish / slate-100

  root.style.setProperty("--accent", THEMES[theme].accent);
  root.style.setProperty("--accent2", THEMES[theme].accent2);
}

type ThemeCtx = {
  mode: Mode;
  theme: ThemeKey;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setTheme: React.Dispatch<React.SetStateAction<ThemeKey>>;
  toggleMode: () => void;
  themeLabels: typeof THEMES;
};

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "dark";
    return (window.localStorage.getItem(LS_MODE) as Mode | null) ?? getSystemMode();
  });

  const [theme, setTheme] = useState<ThemeKey>(() => {
    if (typeof window === "undefined") return "blue";
    return (window.localStorage.getItem(LS_THEME) as ThemeKey | null) ?? "blue";
  });

  useEffect(() => {
    applyTheme(mode, theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_MODE, mode);
      window.localStorage.setItem(LS_THEME, theme);
    }
  }, [mode, theme]);

  const value = useMemo<ThemeCtx>(
    () => ({
      mode,
      theme,
      setMode,
      setTheme,
      toggleMode: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      themeLabels: THEMES,
    }),
    [mode, theme]
  );

  return (
    <Ctx.Provider value={value}>
      {children}

      {/* global helper styles for smooth UI */}
      <style jsx global>{`
        :root {
          color-scheme: dark;
        }
        :root[data-mode="light"] {
          color-scheme: light;
        }
      `}</style>
    </Ctx.Provider>
  );
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used within ThemeProvider");
  return v;
}

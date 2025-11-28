"use client";

import { useEffect, useRef } from "react";

export default function FocusOnScroll({
  children,
  className = "",
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      el.classList.add("isFocus");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("isFocus");
          if (once) io.disconnect();
        } else if (!once) {
          el.classList.remove("isFocus");
        }
      },
      { threshold: 0.25, rootMargin: "-10% 0px -25% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={`focusReveal ${className}`}>
      {children}
    </div>
  );
}

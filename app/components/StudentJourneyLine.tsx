"use client";

type Step = { title: string; sub: string };

export default function StudentJourneyLine({ progress }: { progress: number }) {
  const steps: Step[] = [
    { title: "Learner", sub: "joins centre" },
    { title: "Helper", sub: "supports sessions" },
    { title: "Mentor", sub: "guides juniors" },
    { title: "Facilitator", sub: "runs activities" },
    { title: "CLAP Fellow", sub: "trained leader" },
    { title: "Centre Lead", sub: "runs own centre" },
  ];

  const p = Math.max(0, Math.min(1, progress));
  const activeIndex = Math.round(p * (steps.length - 1));

  return (
    <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.60)] p-4 md:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent2))]">
        Student Journey (one line)
      </p>
      <p className="mt-2 text-sm text-[rgb(var(--fg)/0.78)]">
        Centre learner → leader → runs their own centre (Butterfly stage).
      </p>

      <div className="relative mt-4">
        {/* track */}
        <div className="absolute left-2 right-2 top-5 h-[2px] bg-[linear-gradient(90deg,rgba(var(--accent),0.0),rgba(var(--accent2),0.95),rgba(var(--accent),0.0))]" />

        {/* moving dot */}
        <div
          className="absolute top-[14px] -translate-y-1/2 journeyDotPulse"
          style={{
            left: `calc(${p * 100}% - 8px)`,
            transition: "left 120ms linear",
          }}
        >
          <div className="h-3.5 w-3.5 rounded-full bg-[rgb(var(--accent2))] shadow-[0_0_26px_rgba(var(--accent),0.65)]" />
        </div>

        {/* nodes */}
        <div className="relative grid grid-cols-6 gap-2">
          {steps.map((s, i) => {
            const on = i <= activeIndex;
            return (
              <div key={s.title} className="text-center">
                <div
                  className={[
                    "mx-auto h-3 w-3 rounded-full border",
                    on
                      ? "border-[rgb(var(--accent)/0.55)] bg-[rgb(var(--accent2))] shadow-[0_0_18px_rgba(var(--accent),0.35)]"
                      : "border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.75)]",
                  ].join(" ")}
                />
                <div className="mt-3 text-[11px] font-semibold text-[rgb(var(--fg)/0.92)]">{s.title}</div>
                <div className="text-[10px] text-[rgb(var(--muted))]">{s.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

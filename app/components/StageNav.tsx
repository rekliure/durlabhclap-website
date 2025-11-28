"use client";

type Item = { id: string; label: string; meta?: string };

export default function StageNav({
  stages,
  activeId,
  onSelect,
}: {
  stages: Item[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 railNoScrollbar">
      {stages.map((s) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={[
              "min-w-[210px] text-left rounded-2xl border px-4 py-3 transition",
              "bg-[rgb(var(--bg)/0.55)] hover:bg-[rgb(var(--surface)/0.70)]",
              active
                ? "border-[rgb(var(--accent)/0.60)] shadow-[0_0_0_1px_rgba(var(--accent),0.18),0_0_28px_rgba(var(--accent),0.12)]"
                : "border-[rgb(var(--border))]",
            ].join(" ")}
          >
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{s.label}</p>
                {s.meta ? <p className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">{s.meta}</p> : null}
              </div>
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  background: active ? "rgb(var(--accent2))" : "rgba(255,255,255,0.18)",
                  boxShadow: active ? "0 0 16px rgba(var(--accent),0.45)" : "none",
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

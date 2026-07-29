const layers = [
  { label: "Your Product", tone: "from-pink-500/30 to-fuchsia-500/20" },
  { label: "Governance", tone: "from-fuchsia-500/30 to-purple-500/20" },
  { label: "Ops", tone: "from-purple-500/30 to-violet-500/20" },
  { label: "Models", tone: "from-violet-500/30 to-blue-500/20" },
  { label: "Data", tone: "from-blue-500/30 to-sky-500/20" },
];

/**
 * Signature visual for Section 03 — the "operating layer" stack.
 * A pulse travels up the layers on loop (see .stack-sweep in styles.css).
 * prefers-reduced-motion freezes it via the global transition/animation-
 * duration override.
 */
export function StackDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="relative overflow-hidden rounded-lg border border-border bg-surface/60 px-5 py-3.5"
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-r opacity-50 ${layer.tone}`}
            />
            <div className="relative flex items-center justify-between">
              <span className="font-display text-sm font-semibold tracking-wide text-foreground">
                {layer.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Layer {layers.length - i}
              </span>
            </div>

            <div
              aria-hidden
              className="stack-sweep pointer-events-none absolute inset-y-0 left-0 w-24"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                animationDelay: `${(layers.length - 1 - i) * 0.35}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* connecting pulse rail */}
      <div
        aria-hidden
        className="bg-gradient-ailo absolute left-1/2 top-0 h-full w-px -translate-x-1/2 opacity-30"
      />
    </div>
  );
}

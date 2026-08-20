import { MediaSlot } from "./media-slot";

/**
 * 5 compact animated visuals for Section 04 — AI Trainings.
 * Same MediaSlot 16:9 envelope so they can be swapped for video later.
 * Animation is plain CSS (see the exp-* keyframes in styles.css);
 * prefers-reduced-motion freezes it via the global override.
 */

export function FundamentalsExplainer() {
  const nodes = [
    { x: 40, y: 56, r: 6 },
    { x: 100, y: 28, r: 7 },
    { x: 100, y: 84, r: 5 },
    { x: 160, y: 56, r: 6 },
    { x: 70, y: 30, r: 4 },
    { x: 130, y: 86, r: 4 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [1, 4],
    [2, 5],
  ];
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        <defs>
          <linearGradient id="fn-g" x1="0" x2="1">
            <stop offset="0" stopColor="#e8b869" />
            <stop offset="1" stopColor="#d9a13b" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            className="exp-edge-draw"
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#fn-g)"
            strokeWidth="0.8"
            pathLength={1}
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            className="exp-node-blink"
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="url(#fn-g)"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </MediaSlot>
  );
}

export function PromptExplainer() {
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Prompt
          </span>
          <div className="exp-bar-grow-hold h-1.5 flex-1 rounded-full bg-foreground/20" />
        </div>
        <div className="flex justify-center">
          <svg
            viewBox="0 0 24 24"
            className="exp-arrow-bob h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Output
          </span>
          <div className="exp-bar-grow-late bg-gradient-ailo h-1.5 flex-1 rounded-full" />
        </div>
      </div>
    </MediaSlot>
  );
}

export function LeadersExplainer() {
  const d = "M10,90 Q40,80 60,60 T110,40 T180,15";
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        <defs>
          <linearGradient id="ld-g" x1="0" x2="1">
            <stop offset="0" stopColor="#e8b869" />
            <stop offset="1" stopColor="#9c6a1f" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[28, 56, 84].map((y) => (
          <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <path
          className="exp-path-draw"
          d={d}
          pathLength={1}
          stroke="url(#ld-g)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          className="exp-dot-path-travel"
          r="3.5"
          fill="#9c6a1f"
          style={{ offsetPath: `path('${d}')` }}
        />
      </svg>
    </MediaSlot>
  );
}

export function RolesExplainer() {
  const roles = ["Ops", "Sales", "Marketing", "Eng", "HR", "Finance"];
  return (
    <MediaSlot>
      <div className="absolute inset-0 grid grid-cols-3 content-center gap-1.5 p-4">
        {roles.map((r, i) => (
          <div
            key={r}
            className="relative overflow-hidden rounded-md border border-border px-2 py-1 text-center text-[9px] uppercase tracking-wider text-muted-foreground"
          >
            <div
              aria-hidden
              className="exp-role-pulse absolute inset-0 bg-[rgba(217,161,59,0.35)]"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            <span className="relative">{r}</span>
          </div>
        ))}
      </div>
    </MediaSlot>
  );
}

export function ToolsExplainer() {
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="exp-tool-bob relative h-9 w-9 rounded-lg border border-white/[0.08] bg-surface"
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            <div
              aria-hidden
              className="exp-tool-ring absolute inset-0 rounded-lg border border-[rgba(217,161,59,0.7)]"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
            <div className="bg-gradient-ailo m-1.5 h-2 w-2 rounded-full opacity-80" />
          </div>
        ))}
      </div>
    </MediaSlot>
  );
}

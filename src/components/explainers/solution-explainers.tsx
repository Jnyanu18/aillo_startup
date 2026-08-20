import { MediaSlot } from "./media-slot";

/**
 * 7 compact animated visuals for Section 02 — AI Solutions.
 * Each one fills a 16:9 slot and is intentionally abstract so it can be
 * swapped 1-for-1 with a video file later without layout shift.
 * Animation is plain CSS (see the exp-* keyframes in styles.css);
 * prefers-reduced-motion freezes it via the global override.
 */

export function AutomationExplainer() {
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        <defs>
          <linearGradient id="auto-g" x1="0" x2="1">
            <stop offset="0" stopColor="#e8b869" />
            <stop offset="0.5" stopColor="#d9a13b" />
            <stop offset="1" stopColor="#9c6a1f" />
          </linearGradient>
        </defs>
        {/* nodes */}
        {[
          { x: 30, y: 56, label: "Trigger" },
          { x: 100, y: 30, label: "Enrich" },
          { x: 100, y: 82, label: "Score" },
          { x: 170, y: 56, label: "Action" },
        ].map((n, i) => (
          <g key={i}>
            <circle
              className="exp-node-pulse"
              cx={n.x}
              cy={n.y}
              r="7"
              fill="url(#auto-g)"
              opacity={0.9}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <text
              x={n.x}
              y={n.y + (n.y < 56 ? -12 : 20)}
              textAnchor="middle"
              className="fill-foreground"
              fontSize="7"
              fontWeight="500"
            >
              {n.label}
            </text>
          </g>
        ))}
        {/* connectors */}
        {[
          "M37,56 L93,30",
          "M37,56 L93,82",
          "M107,30 L163,56",
          "M107,82 L163,56",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <circle
              className="exp-travel"
              r="2.5"
              fill="#fff"
              style={{ offsetPath: `path('${d}')`, animationDelay: `${0.4 + i * 0.25}s` }}
            />
          </g>
        ))}
      </svg>
    </MediaSlot>
  );
}

export function ChatbotExplainer() {
  const lines = [
    { side: "user" as const, text: "Do you ship to EU?", delay: 0 },
    { side: "bot" as const, text: "Yes — 2-day delivery to 27 countries.", delay: 1.0 },
    { side: "user" as const, text: "Book me a demo.", delay: 2.0 },
  ];
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-4">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`exp-chat-line flex ${l.side === "user" ? "justify-end" : "justify-start"}`}
            style={
              {
                "--x-start": `${l.side === "user" ? 12 : -12}px`,
                animationDelay: `${l.delay}s`,
              } as React.CSSProperties
            }
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[10px] leading-tight ${
                l.side === "bot"
                  ? "bg-gradient-ailo text-white"
                  : "bg-foreground/10 text-foreground"
              }`}
            >
              {l.text}
            </div>
          </div>
        ))}
      </div>
    </MediaSlot>
  );
}

export function SupportExplainer() {
  return (
    <MediaSlot>
      <div className="absolute inset-0 grid place-items-center [perspective:600px]">
        <div className="exp-flip relative h-16 w-32 rounded-md border border-border bg-surface px-3 py-2 [transform-style:preserve-3d]">
          <div className="absolute inset-0 flex flex-col justify-center gap-1 p-2 [backface-visibility:hidden]">
            <div className="text-[8px] uppercase tracking-widest text-muted-foreground">Ticket</div>
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/30" />
            <div className="h-1.5 w-1/2 rounded-full bg-foreground/20" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center gap-1.5 p-2 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div className="bg-gradient-ailo h-5 w-5 rounded-full grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold text-foreground">Resolved</span>
          </div>
        </div>
      </div>
    </MediaSlot>
  );
}

export function IntegrationsExplainer() {
  const chips = [
    { x: 25, y: 30, label: "Slack" },
    { x: 25, y: 80, label: "Gmail" },
    { x: 175, y: 30, label: "HubSpot" },
    { x: 175, y: 80, label: "Stripe" },
  ];
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        <defs>
          <linearGradient id="int-g" x1="0" x2="1">
            <stop offset="0" stopColor="#e8b869" />
            <stop offset="1" stopColor="#9c6a1f" />
          </linearGradient>
        </defs>
        {/* hub */}
        <circle cx="100" cy="56" r="14" fill="url(#int-g)" opacity="0.85" />
        <circle cx="100" cy="56" r="14" fill="none" stroke="rgba(255,255,255,0.3)" />
        <text x="100" y="59" textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff">
          AILO
        </text>
        {chips.map((c, i) => (
          <g key={i}>
            <line
              x1={c.x}
              y1={c.y}
              x2="100"
              y2="56"
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray="2 3"
            />
            <g
              className="exp-chip-in"
              style={
                {
                  "--x-start": `${c.x < 100 ? -10 : 10}px`,
                  animationDelay: `${i * 0.35}s`,
                } as React.CSSProperties
              }
            >
              <rect
                x={c.x - 16}
                y={c.y - 6}
                width="32"
                height="12"
                rx="3"
                fill="rgba(255,255,255,0.92)"
              />
              <text
                x={c.x}
                y={c.y + 2.5}
                textAnchor="middle"
                fontSize="7"
                fontWeight="600"
                fill="#0a0b10"
              >
                {c.label}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </MediaSlot>
  );
}

export function WorkflowExplainer() {
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        {[
          { x: 30, label: "Intake" },
          { x: 100, label: "Process" },
          { x: 170, label: "Deliver" },
        ].map(({ x, label }, i) => (
          <g key={x}>
            <rect
              x={x - 14}
              y={42}
              width="28"
              height="28"
              rx="6"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.18)"
            />
            <rect
              className="exp-rect-pulse"
              x={x - 14}
              y={42}
              width="28"
              height="28"
              rx="6"
              fill="none"
              stroke="url(#wf-g)"
              strokeWidth="1.5"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <text x={x} y={86} textAnchor="middle" fontSize="7" fontWeight="600" className="fill-foreground">
              {label}
            </text>
            <text x={x} y={60} textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground/70">
              {i + 1}
            </text>
          </g>
        ))}
        <defs>
          <linearGradient id="wf-g" x1="0" x2="1">
            <stop offset="0" stopColor="#e8b869" />
            <stop offset="1" stopColor="#9c6a1f" />
          </linearGradient>
        </defs>
        <line x1="44" y1="56" x2="86" y2="56" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 2" />
        <line x1="114" y1="56" x2="156" y2="56" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 2" />
        {[44, 114].map((startX, i) => (
          <circle
            key={i}
            className="exp-dot-travel"
            cx={startX}
            cy={56}
            r="2.5"
            fill="#fff"
            style={{ animationDelay: `${0.2 + i * 0.6}s` }}
          />
        ))}
      </svg>
    </MediaSlot>
  );
}

export function AssistantsExplainer() {
  const tools = ["Search", "Draft", "Summarize", "Translate", "Plan", "Email", "Code", "Analyze", "Report"];
  return (
    <MediaSlot>
      <div className="absolute inset-0 grid grid-cols-3 gap-1.5 p-4">
        {tools.map((label, i) => (
          <div
            key={i}
            className="relative grid place-items-center overflow-hidden rounded-md border border-border bg-surface/60 text-[9px] font-semibold text-foreground/80"
          >
            <div
              aria-hidden
              className="exp-tile-pulse absolute inset-0 bg-[rgba(217,161,59,0.35)]"
              style={{ animationDelay: `${(i % 3) * 0.2 + Math.floor(i / 3) * 0.3}s` }}
            />
            <span className="relative">{label}</span>
          </div>
        ))}
      </div>
    </MediaSlot>
  );
}

export function GenerativeExplainer() {
  const widths = [60, 90, 75, 45];
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5">
        {widths.map((w, i) => (
          <div
            key={i}
            className="exp-bar-grow h-2 overflow-hidden rounded-full bg-foreground/10"
            style={{ width: `${w}%`, animationDelay: `${i * 0.3}s` }}
          >
            <div className="bg-gradient-ailo h-full w-full" />
          </div>
        ))}
      </div>
    </MediaSlot>
  );
}

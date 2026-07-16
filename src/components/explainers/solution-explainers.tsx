import { motion, useReducedMotion } from "framer-motion";
import { MediaSlot } from "./media-slot";

/**
 * 7 compact animated visuals for Section 02 — AI Solutions.
 * Each one fills a 16:9 slot and is intentionally abstract so it can be
 * swapped 1-for-1 with a video file later without layout shift.
 */

function loop(reduce: boolean) {
  return reduce ? { repeat: 0 } : { repeat: Infinity };
}

export function AutomationExplainer() {
  const reduce = useReducedMotion();
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        <defs>
          <linearGradient id="auto-g" x1="0" x2="1">
            <stop offset="0" stopColor="#4f7cff" />
            <stop offset="0.5" stopColor="#a855f7" />
            <stop offset="1" stopColor="#ec4899" />
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
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="7"
              fill="url(#auto-g)"
              opacity={0.9}
              animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
              transition={{ duration: 2, delay: i * 0.3, ...loop(!!reduce), ease: "easeInOut" }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
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
            {!reduce && (
              <motion.circle
                r="2.5"
                fill="#fff"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration: 1.8,
                  delay: 0.4 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ offsetPath: `path('${d}')` }}
              />
            )}
          </g>
        ))}
      </svg>
    </MediaSlot>
  );
}

export function ChatbotExplainer() {
  const reduce = useReducedMotion();
  const lines = [
    { side: "user" as const, text: "Do you ship to EU?", delay: 0 },
    { side: "bot" as const, text: "Yes — 2-day delivery to 27 countries.", delay: 1.0 },
    { side: "user" as const, text: "Book me a demo.", delay: 2.0 },
  ];
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-4">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: l.side === "user" ? 12 : -12 }}
            animate={
              reduce
                ? { opacity: 1, x: 0 }
                : { opacity: [0, 1, 1, 0], x: [l.side === "user" ? 12 : -12, 0, 0, 0] }
            }
            transition={{
              duration: 3.2,
              delay: l.delay,
              repeat: reduce ? 0 : Infinity,
              repeatDelay: 0.4,
              times: [0, 0.15, 0.85, 1],
            }}
            className={`flex ${l.side === "user" ? "justify-end" : "justify-start"}`}
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
          </motion.div>
        ))}
      </div>
    </MediaSlot>
  );
}

export function SupportExplainer() {
  const reduce = useReducedMotion();
  return (
    <MediaSlot>
      <div className="absolute inset-0 grid place-items-center [perspective:600px]">
        <motion.div
          className="relative h-16 w-32 rounded-md border border-border bg-surface px-3 py-2 [transform-style:preserve-3d]"
          animate={reduce ? undefined : { rotateY: [0, 0, 180, 180, 360] }}
          transition={{ duration: 4.5, repeat: reduce ? 0 : Infinity, ease: "easeInOut", times: [0, 0.4, 0.5, 0.9, 1] }}
        >
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
        </motion.div>
      </div>
    </MediaSlot>
  );
}

export function IntegrationsExplainer() {
  const reduce = useReducedMotion();
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
            <stop offset="0" stopColor="#4f7cff" />
            <stop offset="1" stopColor="#ec4899" />
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
            <motion.g
              animate={
                reduce
                  ? undefined
                  : { x: [c.x < 100 ? -10 : 10, 0, 0], opacity: [0, 1, 1] }
              }
              transition={{
                duration: 2.4,
                delay: i * 0.35,
                repeat: reduce ? 0 : Infinity,
                repeatDelay: 1.4,
                times: [0, 0.4, 1],
              }}
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
            </motion.g>
          </g>
        ))}
      </svg>
    </MediaSlot>
  );
}

export function WorkflowExplainer() {
  const reduce = useReducedMotion();
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
            <motion.rect
              x={x - 14}
              y={42}
              width="28"
              height="28"
              rx="6"
              fill="none"
              stroke="url(#wf-g)"
              strokeWidth="1.5"
              animate={reduce ? undefined : { opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: i * 0.6, repeat: reduce ? 0 : Infinity }}
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
            <stop offset="0" stopColor="#4f7cff" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <line x1="44" y1="56" x2="86" y2="56" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 2" />
        <line x1="114" y1="56" x2="156" y2="56" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 2" />
        {!reduce &&
          [44, 114].map((startX, i) => (
            <motion.circle
              key={i}
              cy={56}
              r="2.5"
              fill="#fff"
              initial={{ cx: startX }}
              animate={{ cx: startX + 42 }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 + i * 0.6, ease: "easeInOut" }}
            />
          ))}
      </svg>
    </MediaSlot>
  );
}

export function AssistantsExplainer() {
  const reduce = useReducedMotion();
  const tools = ["Search", "Draft", "Summarize", "Translate", "Plan", "Email", "Code", "Analyze", "Report"];
  return (
    <MediaSlot>
      <div className="absolute inset-0 grid grid-cols-3 gap-1.5 p-4">
        {tools.map((label, i) => (
          <motion.div
            key={i}
            className="grid place-items-center rounded-md border border-border bg-surface/60 text-[9px] font-semibold text-foreground/80"
            animate={
              reduce
                ? undefined
                : {
                    background: [
                      "rgba(17,22,42,0.6)",
                      "rgba(168,85,247,0.35)",
                      "rgba(17,22,42,0.6)",
                    ],
                  }
            }
            transition={{
              duration: 2.4,
              delay: (i % 3) * 0.2 + Math.floor(i / 3) * 0.3,
              repeat: reduce ? 0 : Infinity,
              repeatDelay: 1,
            }}
          >
            {label}
          </motion.div>
        ))}
      </div>
    </MediaSlot>
  );
}

export function GenerativeExplainer() {
  const reduce = useReducedMotion();
  const widths = [60, 90, 75, 45];
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5">
        {widths.map((w, i) => (
          <motion.div
            key={i}
            className="h-2 overflow-hidden rounded-full bg-foreground/10"
            initial={{ width: 0 }}
            animate={reduce ? { width: `${w}%` } : { width: [`0%`, `${w}%`, `${w}%`, `0%`] }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: reduce ? 0 : Infinity,
              times: [0, 0.4, 0.85, 1],
              ease: "easeInOut",
            }}
          >
            <div className="bg-gradient-ailo h-full w-full" />
          </motion.div>
        ))}
      </div>
    </MediaSlot>
  );
}

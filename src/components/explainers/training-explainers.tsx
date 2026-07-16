import { motion, useReducedMotion } from "framer-motion";
import { MediaSlot } from "./media-slot";

/**
 * 5 compact animated visuals for Section 04 — AI Trainings.
 * Same MediaSlot 16:9 envelope so they can be swapped for video later.
 */

export function FundamentalsExplainer() {
  const reduce = useReducedMotion();
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
            <stop offset="0" stopColor="#4f7cff" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#fn-g)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: [0, 1], opacity: [0.2, 0.6] }}
            transition={{ duration: 1.8, delay: i * 0.25, repeat: reduce ? 0 : Infinity, repeatDelay: 1.6 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="url(#fn-g)"
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, delay: i * 0.2, repeat: reduce ? 0 : Infinity }}
          />
        ))}
      </svg>
    </MediaSlot>
  );
}

export function PromptExplainer() {
  const reduce = useReducedMotion();
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Prompt
          </span>
          <motion.div
            className="h-1.5 flex-1 rounded-full bg-foreground/20"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={reduce ? { scaleX: 1 } : { scaleX: [0, 1, 1, 1] }}
            transition={{ duration: 3.5, repeat: reduce ? 0 : Infinity, times: [0, 0.35, 0.95, 1] }}
          />
        </div>
        <div className="flex justify-center">
          <motion.svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={reduce ? undefined : { y: [0, 2, 0] }}
            transition={{ duration: 1.4, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Output
          </span>
          <motion.div
            className="bg-gradient-ailo h-1.5 flex-1 rounded-full"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={reduce ? { scaleX: 1 } : { scaleX: [0, 0, 1, 1] }}
            transition={{ duration: 3.5, repeat: reduce ? 0 : Infinity, times: [0, 0.5, 0.85, 1] }}
          />
        </div>
      </div>
    </MediaSlot>
  );
}

export function LeadersExplainer() {
  const reduce = useReducedMotion();
  const d = "M10,90 Q40,80 60,60 T110,40 T180,15";
  return (
    <MediaSlot>
      <svg viewBox="0 0 200 112" className="h-full w-full">
        <defs>
          <linearGradient id="ld-g" x1="0" x2="1">
            <stop offset="0" stopColor="#4f7cff" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[28, 56, 84].map((y) => (
          <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <motion.path
          d={d}
          stroke="url(#ld-g)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1] }}
          transition={{ duration: 2.4, repeat: reduce ? 0 : Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        />
        {!reduce && (
          <motion.circle
            r="3.5"
            fill="#ec4899"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
            style={{ offsetPath: `path('${d}')` }}
          />
        )}
      </svg>
    </MediaSlot>
  );
}

export function RolesExplainer() {
  const reduce = useReducedMotion();
  const roles = ["Ops", "Sales", "Marketing", "Eng", "HR", "Finance"];
  return (
    <MediaSlot>
      <div className="absolute inset-0 grid grid-cols-3 content-center gap-1.5 p-4">
        {roles.map((r, i) => (
          <motion.div
            key={r}
            className="rounded-md border border-border bg-surface/60 px-2 py-1 text-center text-[9px] uppercase tracking-wider text-muted-foreground"
            animate={
              reduce
                ? undefined
                : {
                    backgroundColor: [
                      "rgba(17,22,42,0.6)",
                      "rgba(79,124,255,0.35)",
                      "rgba(17,22,42,0.6)",
                    ],
                    color: [
                      "rgba(138,148,176,1)",
                      "rgba(244,246,251,1)",
                      "rgba(138,148,176,1)",
                    ],
                  }
            }
            transition={{
              duration: 1.6,
              delay: i * 0.35,
              repeat: reduce ? 0 : Infinity,
              repeatDelay: roles.length * 0.35 - 1.2,
            }}
          >
            {r}
          </motion.div>
        ))}
      </div>
    </MediaSlot>
  );
}

export function ToolsExplainer() {
  const reduce = useReducedMotion();
  return (
    <MediaSlot>
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-9 w-9 rounded-lg border border-border bg-surface"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -6, 0],
                    borderColor: [
                      "rgba(255,255,255,0.08)",
                      "rgba(168,85,247,0.7)",
                      "rgba(255,255,255,0.08)",
                    ],
                  }
            }
            transition={{
              duration: 1.6,
              delay: i * 0.25,
              repeat: reduce ? 0 : Infinity,
              repeatDelay: 1,
            }}
          >
            <div className="bg-gradient-ailo m-1.5 h-2 w-2 rounded-full opacity-80" />
          </motion.div>
        ))}
      </div>
    </MediaSlot>
  );
}

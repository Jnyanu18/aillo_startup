/**
 * The hero's one signature visual moment -- a constellation of connected
 * points standing in for AI: data becoming structure. Built as static SVG
 * with a handful of composited-only pulses (opacity/transform), not a
 * WebGL scene, per the site's performance-first constraint. Sits behind
 * the hero copy, right-aligned, low-opacity so it never competes with the
 * text -- the accent color is used here as line/edge/glow only, never a
 * flood.
 */
const NODES = [
  { x: 620, y: 90, r: 3 },
  { x: 700, y: 60, r: 2 },
  { x: 760, y: 140, r: 4 },
  { x: 680, y: 200, r: 2.5 },
  { x: 610, y: 240, r: 3 },
  { x: 780, y: 260, r: 2 },
  { x: 720, y: 320, r: 3.5 },
  { x: 650, y: 370, r: 2 },
  { x: 590, y: 160, r: 2 },
  { x: 830, y: 190, r: 2.5 },
  { x: 740, y: 420, r: 2 },
  { x: 560, y: 320, r: 2.5 },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 8],
  [5, 6],
  [6, 7],
  [2, 9],
  [6, 10],
  [4, 11],
  [0, 8],
];

export function HeroConstellation() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 480"
      className="pointer-events-none absolute -right-10 top-0 hidden h-full w-[56%] opacity-[0.55] md:block"
      preserveAspectRatio="xMaxYMid meet"
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--primary)"
          strokeWidth="0.6"
          opacity="0.28"
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          className="exp-node-pulse"
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="var(--primary)"
          style={{ animationDelay: `${i * 0.35}s`, transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

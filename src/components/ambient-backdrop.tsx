/**
 * Ambient static backdrop — warm near-black ground with a subtle grid,
 * grain, and a few thin accent lines. No color blobs: the brand accent
 * is used as a line/edge/glow ornament here, never as a flood or wash.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #191410 0%, #0c0a09 60%, #080706 100%)" }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,237,228,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,228,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      {/* a single thin accent line, low in the frame -- the only place
          color appears in the ground itself */}
      <div
        className="absolute inset-x-0 bottom-[18%] h-px opacity-[0.14]"
        style={{ background: "linear-gradient(90deg, transparent 5%, #d9a13b 50%, transparent 95%)" }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}

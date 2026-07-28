/**
 * Ambient static backdrop — color blobs + subtle grid behind all content.
 * Sits fixed at z=-10 so glassmorphic surfaces above it pick up the colour.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #131320 0%, #08080d 60%, #050507 100%)" }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
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
      {/* peach glow top-left */}
      <div
        className="ambient-blob absolute -top-44 -left-36 h-[48vw] w-[48vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255, 138, 76, 0.32), transparent 65%)" }}
      />
      {/* warm peach top-right */}
      <div
        className="ambient-blob absolute -top-24 -right-32 h-[44vw] w-[44vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255, 176, 136, 0.22), transparent 68%)" }}
      />
      {/* indigo depth bottom */}
      <div
        className="ambient-blob absolute -bottom-56 left-1/4 h-[52vw] w-[52vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(79, 70, 229, 0.28), transparent 68%)" }}
      />
      {/* deep violet bottom-right for richness */}
      <div
        className="ambient-blob absolute bottom-10 -right-40 h-[40vw] w-[40vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.18), transparent 70%)" }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

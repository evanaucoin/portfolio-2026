// translateY then scale with transformOrigin "center center":
// net bottom = H * (1 + scale) / 2 + translateY
// Each back card's bottom lands ~10px below the one in front of it at max-w-5xl.
const STACK_OFFSETS = [
  { translateY: 0,  scale: 1    },
  { translateY: 20, scale: 0.97 },
  { translateY: 40, scale: 0.94 },
  { translateY: 60, scale: 0.91 },
  { translateY: 80, scale: 0.88 },
];

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center px-12">
      <div className="relative w-full max-w-5xl aspect-[16/10]">
        {STACK_OFFSETS.map((offset, i) => (
          <div
            key={i}
            style={{
              zIndex: STACK_OFFSETS.length - i,
              // translateY first so the scale pivot is the shifted center —
              // this ensures each back card's bottom edge falls below the front card's.
              transform: `translateY(${offset.translateY}px) scale(${offset.scale})`,
              transformOrigin: "center center",
            }}
            className={[
              "absolute inset-0 rounded-[40px] bg-white",
              i === 0 ? "border border-zinc-200" : "border border-zinc-300",
            ].join(" ")}
          />
        ))}
      </div>
    </main>
  );
}

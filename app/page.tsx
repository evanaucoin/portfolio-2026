const STACK_OFFSETS = [
  { translateY: 0,   scale: 1    }, // front
  { translateY: 60,  scale: 0.92 }, // first peek
  { translateY: 120, scale: 0.84 }, // second peek
  { translateY: 120, scale: 0.84 }, // hidden behind card 2
  { translateY: 120, scale: 0.84 }, // hidden behind card 2
];

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center px-12">
      <div className="relative w-full max-w-6xl aspect-[21/9] overflow-visible">
        {STACK_OFFSETS.map((offset, i) => (
          <div
            key={i}
            style={{
              zIndex: STACK_OFFSETS.length - i,
              transform: `translateY(${offset.translateY}px) scale(${offset.scale})`,
              transformOrigin: "top center",
            }}
            className="absolute inset-0 rounded-[32px] border border-zinc-200 bg-white shadow-sm"
          />
        ))}
      </div>
    </main>
  );
}

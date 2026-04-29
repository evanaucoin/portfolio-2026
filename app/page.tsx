// Cards 3 and 4 share Card 2's transform exactly — they sit hidden behind it,
// adding physical depth without introducing extra visible peek layers.
const STACK_OFFSETS = [
  { translateY: 0,  scale: 1    }, // front
  { translateY: 30, scale: 0.97 }, // first peek
  { translateY: 60, scale: 0.94 }, // second peek
  { translateY: 60, scale: 0.94 }, // hidden behind card 2
  { translateY: 60, scale: 0.94 }, // hidden behind card 2
];

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center px-12">
      <div className="relative w-full max-w-6xl aspect-[21/9]">
        {STACK_OFFSETS.map((offset, i) => (
          <div
            key={i}
            style={{
              zIndex: STACK_OFFSETS.length - i,
              transform: `translateY(${offset.translateY}px) scale(${offset.scale})`,
              transformOrigin: "center center",
            }}
            className="absolute inset-0 rounded-[32px] border border-zinc-200 bg-white shadow-sm"
          />
        ))}
      </div>
    </main>
  );
}

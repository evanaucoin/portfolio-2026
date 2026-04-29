// Cards 3 and 4 share Card 2's transform exactly — they sit hidden behind it,
// adding physical depth without introducing extra visible peek layers.
const STACK_OFFSETS = [
  { translateY: 0,  scale: 1    }, // front
  { translateY: 15, scale: 0.97 }, // first peek
  { translateY: 30, scale: 0.94 }, // second peek
  { translateY: 30, scale: 0.94 }, // hidden behind card 2
  { translateY: 30, scale: 0.94 }, // hidden behind card 2
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
            className="absolute inset-0 rounded-[40px] border border-zinc-200 bg-white shadow-sm"
          />
        ))}
      </div>
    </main>
  );
}

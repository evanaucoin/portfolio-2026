// transformOrigin "top center" anchors scaling to the top edge, so the bottom
// shrinks upward by H*(1-scale). translateY must exceed that shrinkage to keep
// each back card's bottom edge below the card in front of it.
// At aspect-[21/9] on max-w-6xl, H ≈ 494px:
//   card 1: 494*0.08 ≈ 40px shrinkage → translateY 50px gives ~10px peek
//   card 2: 494*0.16 ≈ 79px shrinkage → translateY 95px gives ~16px peek from card 1
const STACK_OFFSETS = [
  { translateY: 0,  scale: 1    }, // front
  { translateY: 50, scale: 0.92 }, // first peek
  { translateY: 95, scale: 0.84 }, // second peek
  { translateY: 95, scale: 0.84 }, // hidden behind card 2
  { translateY: 95, scale: 0.84 }, // hidden behind card 2
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
              transformOrigin: "top center",
            }}
            className="absolute inset-0 rounded-[32px] border border-zinc-200 bg-white shadow-sm"
          />
        ))}
      </div>
    </main>
  );
}

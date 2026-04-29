const STACK_OFFSETS = [
  { translateY: 0,  scale: 1     },
  { translateY: 14, scale: 0.97  },
  { translateY: 28, scale: 0.94  },
  { translateY: 42, scale: 0.91  },
  { translateY: 56, scale: 0.88  },
];

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center px-12">
      {/* Deck: sized to the front card; overflow-visible lets back cards peek */}
      <div className="relative w-full max-w-5xl aspect-[16/10]">
        {STACK_OFFSETS.map((offset, i) => (
          <div
            key={i}
            style={{
              zIndex: STACK_OFFSETS.length - i,
              transform: `translateY(${offset.translateY}px) scale(${offset.scale})`,
              transformOrigin: "top center",
            }}
            className="absolute inset-0 rounded-[40px] border border-zinc-200 bg-white"
          />
        ))}
      </div>
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

function makeFadeUp(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.32, 0, 0.08, 1] as const, delay },
    },
  };
}

function FadeIn({
  children,
  scrollRef,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLElement | null>;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ root: scrollRef, once: true, amount: 0.1 }}
      variants={makeFadeUp(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// A mat-framed image that never crops — the image sits fully inside the
// #f0f0ee mat with 48 px padding on all four sides. paddingTop encodes the
// image's true display aspect ratio so object-contain fills edge-to-edge.
function Frame({
  src,
  alt,
  paddingTop,
  scrollRef,
  delay = 0,
  sizes = "(max-width: 672px) calc(100vw - 48px), 624px",
}: {
  src: string;
  alt: string;
  paddingTop: string;
  scrollRef: React.RefObject<HTMLElement | null>;
  delay?: number;
  sizes?: string;
}) {
  return (
    <FadeIn scrollRef={scrollRef} delay={delay}>
      <div className="bg-[#f0f0ee] p-12">
        <div className="relative w-full bg-[#f0f0ee]" style={{ paddingTop }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain"
          />
        </div>
      </div>
    </FadeIn>
  );
}

const introTexts = [
  "Growing up I thought my path was CS or business. I chose GBDA because it seemed like a smart middle ground. I didn't know product design existed.",
  "Second year, something clicked. But I wasn't starting from zero.",
  "The drawings. The photography. The hours spent studying how manga artists use negative space, how directors frame a shot, how a single garment carries a point of view. None of it was called design at the time. But it was all the same muscle.",
];

// Natural display aspect ratios (h ÷ w × 100).
// Art pieces are hand-measured from source files.
// Photos are EXIF-rotated iPhones — all display as 3024 × 4032 portrait.
const PHOTO_PT = "133.3%"; // 4032 ÷ 3024

// A2 (octopus) is the taller art piece; both A2 and A3 share its paddingTop
// so paired frames sit at equal height. A3's ~7 % difference letterboxes
// subtly into the same #f0f0ee mat — imperceptible in practice.
const ART_PAIR_PT = "161.6%"; // 1146 ÷ 709

export default function Playground() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">

        {/* ── Intro ───────────────────────────────────────────────────── */}
        <div className="mb-10">
          <FadeIn scrollRef={mainRef}>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Playground
            </p>
          </FadeIn>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            {introTexts.map((text, i) => (
              <FadeIn key={i} scrollRef={mainRef} delay={i * 0.1}>
                <p>{text}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── Gallery ─────────────────────────────────────────────────── */}
        <div className="border-t border-zinc-200 pt-8 space-y-8">

          {/* 1 — Solo: eye drawing */}
          <Frame
            src="/PlaygroundA1.jpg"
            alt="Eye drawing"
            paddingTop="160.6%"
            scrollRef={mainRef}
          />

          {/* 2 — Paired: octopus + koi (equal height via shared paddingTop) */}
          <div className="flex gap-6 items-start">
            <FadeIn scrollRef={mainRef} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full bg-[#f0f0ee]" style={{ paddingTop: ART_PAIR_PT }}>
                  <Image
                    src="/PlaygroundA2.jpg"
                    alt="Octopus drawing"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 36px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full bg-[#f0f0ee]" style={{ paddingTop: ART_PAIR_PT }}>
                  <Image
                    src="/PlaygroundA3.jpg"
                    alt="Koi fish drawing"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 36px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 3 — Solo: graffiti alley */}
          <Frame
            src="/PlaygroundP1.jpeg"
            alt="Graffiti alley"
            paddingTop={PHOTO_PT}
            scrollRef={mainRef}
          />

          {/* 4 — Paired: London riverside + sea view (same aspect, exact height match) */}
          <div className="flex gap-6 items-start">
            <FadeIn scrollRef={mainRef} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full bg-[#f0f0ee]" style={{ paddingTop: PHOTO_PT }}>
                  <Image
                    src="/PlaygroundP2.jpeg"
                    alt="London riverside at dusk"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 36px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full bg-[#f0f0ee]" style={{ paddingTop: PHOTO_PT }}>
                  <Image
                    src="/PlaygroundP3.jpeg"
                    alt="Sea view from the cliffs"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 36px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 5 — Solo: Chinatown lanterns */}
          <Frame
            src="/PlaygroundP4.jpeg"
            alt="Chinatown lanterns"
            paddingTop={PHOTO_PT}
            scrollRef={mainRef}
          />
        </div>

        {/* ── Closing line ────────────────────────────────────────────── */}
        <FadeIn scrollRef={mainRef} className="mt-16">
          <p className="text-center text-zinc-600 leading-relaxed">
            I didn&apos;t stumble into design. I was practicing it the whole time.
          </p>
        </FadeIn>

      </div>
    </main>
  );
}

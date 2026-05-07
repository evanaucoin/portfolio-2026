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

function Frame({
  src,
  alt,
  aspectStyle,
  caption,
  scrollRef,
  delay = 0,
}: {
  src: string;
  alt: string;
  aspectStyle: React.CSSProperties;
  caption: string;
  scrollRef: React.RefObject<HTMLElement | null>;
  delay?: number;
}) {
  return (
    <FadeIn scrollRef={scrollRef} delay={delay} className="flex flex-col">
      <div className="bg-[#f0f0ee] p-12">
        <div className="relative w-full" style={aspectStyle}>
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
      </div>
      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{caption}</p>
    </FadeIn>
  );
}

const introTexts = [
  "Growing up I thought my path was CS or business. I chose GBDA because it seemed like a smart middle ground. I didn't know product design existed.",
  "Second year, something clicked. But I wasn't starting from zero.",
  "The drawings. The photography. The hours spent studying how manga artists use negative space, how directors frame a shot, how a single garment carries a point of view. None of it was called design at the time. But it was all the same muscle.",
];

const artFrames = [
  {
    src: "/PlaygroundA1.jpg",
    alt: "Artwork A1",
    aspectStyle: { paddingTop: "75%" },
    caption: "Studies in form and line — the sketchbook before the screen.",
  },
  {
    src: "/PlaygroundA2.jpg",
    alt: "Artwork A2",
    aspectStyle: { paddingTop: "133%" },
    caption: "Portrait work from a life drawing session, 2023.",
  },
  {
    src: "/PlaygroundA3.jpg",
    alt: "Artwork A3",
    aspectStyle: { paddingTop: "133%" },
    caption: "Character exploration, influenced by how manga uses negative space.",
  },
];

const photoFrames = [
  {
    src: "/PlaygroundP1.jpeg",
    alt: "Photography P1",
    aspectStyle: { paddingTop: "56.25%" },
    caption: "Taken before I thought of myself as a photographer.",
  },
  {
    src: "/PlaygroundP2.jpeg",
    alt: "Photography P2",
    aspectStyle: { paddingTop: "100%" },
    caption: "Early morning, Stratford.",
  },
  {
    src: "/PlaygroundP3.jpeg",
    alt: "Photography P3",
    aspectStyle: { paddingTop: "100%" },
    caption: "A quiet moment between people and space.",
  },
  {
    src: "/PlaygroundP4.jpeg",
    alt: "Photography P4",
    aspectStyle: { paddingTop: "56.25%" },
    caption: "The edit is the decision.",
  },
];

export default function Playground() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">

        {/* ── Intro ──────────────────────────────────────────────────── */}
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

        {/* ── Art Gallery ────────────────────────────────────────────── */}
        <FadeIn scrollRef={mainRef} className="border-t border-zinc-200 pt-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Art
          </p>
        </FadeIn>

        <div className="space-y-4 mb-4">
          {/* A1 — dominant, full width, 4:3 */}
          <Frame
            src={artFrames[0].src}
            alt={artFrames[0].alt}
            aspectStyle={artFrames[0].aspectStyle}
            caption={artFrames[0].caption}
            scrollRef={mainRef}
          />

          {/* A2 + A3 — side by side, portrait 3:4, A3 frame slightly wider */}
          <div className="flex gap-4 items-start">
            <FadeIn scrollRef={mainRef} className="flex-[2] flex flex-col">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full" style={artFrames[1].aspectStyle}>
                  <Image
                    src={artFrames[1].src}
                    alt={artFrames[1].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {artFrames[1].caption}
              </p>
            </FadeIn>

            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-[3] flex flex-col">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full" style={artFrames[2].aspectStyle}>
                  <Image
                    src={artFrames[2].src}
                    alt={artFrames[2].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {artFrames[2].caption}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* ── Photography Gallery ────────────────────────────────────── */}
        <FadeIn scrollRef={mainRef} className="border-t border-zinc-200 pt-6 mt-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Photography
          </p>
        </FadeIn>

        <div className="space-y-4">
          {/* P1 — full width, cinematic 16:9 */}
          <Frame
            src={photoFrames[0].src}
            alt={photoFrames[0].alt}
            aspectStyle={photoFrames[0].aspectStyle}
            caption={photoFrames[0].caption}
            scrollRef={mainRef}
          />

          {/* P2 + P3 — side by side with optical breathing room */}
          <div className="flex gap-10 items-start">
            {/* P2 — pushed slightly left (wider left margin) */}
            <FadeIn scrollRef={mainRef} className="flex-1 flex flex-col pr-3">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full" style={photoFrames[1].aspectStyle}>
                  <Image
                    src={photoFrames[1].src}
                    alt={photoFrames[1].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {photoFrames[1].caption}
              </p>
            </FadeIn>

            {/* P3 — pushed slightly right (wider right margin) */}
            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1 flex flex-col pl-3">
              <div className="bg-[#f0f0ee] p-12">
                <div className="relative w-full" style={photoFrames[2].aspectStyle}>
                  <Image
                    src={photoFrames[2].src}
                    alt={photoFrames[2].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {photoFrames[2].caption}
              </p>
            </FadeIn>
          </div>

          {/* P4 — full width, cinematic 16:9 */}
          <Frame
            src={photoFrames[3].src}
            alt={photoFrames[3].alt}
            aspectStyle={photoFrames[3].aspectStyle}
            caption={photoFrames[3].caption}
            scrollRef={mainRef}
          />
        </div>

        {/* ── Closing Line ───────────────────────────────────────────── */}
        <FadeIn scrollRef={mainRef} className="mt-16">
          <p className="text-center text-zinc-600 leading-relaxed">
            I didn&apos;t stumble into design. I was practicing it the whole time.
          </p>
        </FadeIn>

      </div>
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.32, 0, 0.08, 1] as const },
  },
};

function FadeIn({
  children,
  scrollRef,
  className,
}: {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ root: scrollRef, once: true, amount: 0.1 }}
      variants={fadeUp}
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
}: {
  src: string;
  alt: string;
  aspectStyle: React.CSSProperties;
  caption: string;
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <FadeIn scrollRef={scrollRef} className="flex flex-col">
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
        <FadeIn scrollRef={mainRef} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Playground
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            {introTexts.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </FadeIn>

        {/* ── Art Gallery ────────────────────────────────────────────── */}
        <div className="border-t border-zinc-200 pt-6 mb-4">
          <div className="space-y-4">
            {/* A1 — dominant, full width, 4:3 */}
            <Frame
              src={artFrames[0].src}
              alt={artFrames[0].alt}
              aspectStyle={artFrames[0].aspectStyle}
              caption={artFrames[0].caption}
              scrollRef={mainRef}
            />

            {/* A2 + A3 — side by side, A3 frame slightly wider */}
            <FadeIn scrollRef={mainRef} className="flex gap-4 items-start">
              {/* A2 — narrower frame */}
              <div className="flex-[2] flex flex-col">
                <div className="bg-[#f0f0ee] p-12">
                  <div className="relative w-full" style={artFrames[1].aspectStyle}>
                    <Image src={artFrames[1].src} alt={artFrames[1].alt} fill className="object-cover" />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {artFrames[1].caption}
                </p>
              </div>

              {/* A3 — wider frame */}
              <div className="flex-[3] flex flex-col">
                <div className="bg-[#f0f0ee] p-12">
                  <div className="relative w-full" style={artFrames[2].aspectStyle}>
                    <Image src={artFrames[2].src} alt={artFrames[2].alt} fill className="object-cover" />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {artFrames[2].caption}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Photography Gallery ────────────────────────────────────── */}
        <div className="border-t border-zinc-200 pt-6 mt-6">
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
            <FadeIn scrollRef={mainRef} className="flex gap-8 items-start">
              {/* P2 — pushed slightly left */}
              <div className="flex-1 flex flex-col mr-2">
                <div className="bg-[#f0f0ee] p-12">
                  <div className="relative w-full" style={photoFrames[1].aspectStyle}>
                    <Image src={photoFrames[1].src} alt={photoFrames[1].alt} fill className="object-cover" />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {photoFrames[1].caption}
                </p>
              </div>

              {/* P3 — pushed slightly right */}
              <div className="flex-1 flex flex-col ml-2">
                <div className="bg-[#f0f0ee] p-12">
                  <div className="relative w-full" style={photoFrames[2].aspectStyle}>
                    <Image src={photoFrames[2].src} alt={photoFrames[2].alt} fill className="object-cover" />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {photoFrames[2].caption}
                </p>
              </div>
            </FadeIn>

            {/* P4 — full width, cinematic 16:9 */}
            <Frame
              src={photoFrames[3].src}
              alt={photoFrames[3].alt}
              aspectStyle={photoFrames[3].aspectStyle}
              caption={photoFrames[3].caption}
              scrollRef={mainRef}
            />
          </div>
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

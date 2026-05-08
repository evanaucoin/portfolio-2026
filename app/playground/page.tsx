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

// Natural display aspect ratios (h ÷ w × 100).
// Art files measured from source dimensions.
// Photos are EXIF-rotated iPhones displaying at 3024 × 4032.
const PHOTO_PT = "133.3%";
const ART_PAIR_PT = "161.6%"; // A2 (octopus) ratio; A3 shares it for equal height

export default function Playground() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">

        {/* ── Section label ────────────────────────────────────────────── */}
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-10">
          Playground
        </p>

        {/* ── Opening ──────────────────────────────────────────────────── */}
        <div className="space-y-4 text-zinc-600 leading-relaxed">
          <p>
            Growing up, I thought my path was computer science or business.
            Those were the options. I picked GBDA because it felt like a good
            mix of both. I didn&apos;t even know product design existed.
          </p>
          <p>It wasn&apos;t until second year that something clicked.</p>
        </div>

        {/* ── Drawing ──────────────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>
            I&apos;ve been drawing my whole life. I used to draw comics as a kid.
            Now just cards for my girlfriend. Along the way I found Vagabond.
            Every panel is a composition decision, every stretch of negative
            space is intentional. It changed how I looked at everything. Not
            just drawing, but layout, weight, where your eye goes and why.
          </p>
          <p>
            <em>
              &ldquo;Preoccupied with a single leaf, you won&apos;t see the tree.
              Preoccupied with a single tree, you&apos;ll miss the entire forest&rdquo;
            </em>
            <span className="text-sm text-zinc-400"> — Takuan Soho</span>
          </p>
          <p>
            It taught me to zoom out. In design that means never getting so
            lost in a component that you lose the experience around it.
          </p>
        </div>

        {/* ── Art triptych: A1, A2, A3 ─────────────────────────────────── */}
        <div className="mt-10 flex gap-4 items-start">
          <FadeIn scrollRef={mainRef} className="flex-1">
            <div className="bg-[#f0f0ee] p-12">
              <div
                className="relative w-full bg-[#f0f0ee]"
                style={{ paddingTop: "160.6%" }}
              >
                <Image
                  src="/PlaygroundA1.jpg"
                  alt="Eye drawing"
                  fill
                  sizes="(max-width: 672px) calc(33vw - 24px), 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1">
            <div className="bg-[#f0f0ee] p-12">
              <div
                className="relative w-full bg-[#f0f0ee]"
                style={{ paddingTop: ART_PAIR_PT }}
              >
                <Image
                  src="/PlaygroundA2.jpg"
                  alt="Octopus drawing"
                  fill
                  sizes="(max-width: 672px) calc(33vw - 24px), 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn scrollRef={mainRef} delay={0.2} className="flex-1">
            <div className="bg-[#f0f0ee] p-12">
              <div
                className="relative w-full bg-[#f0f0ee]"
                style={{ paddingTop: ART_PAIR_PT }}
              >
                <Image
                  src="/PlaygroundA3.jpg"
                  alt="Koi fish drawing"
                  fill
                  sizes="(max-width: 672px) calc(33vw - 24px), 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── After art images ─────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>
            <em>
              &ldquo;Talent is something you make bloom, instinct is something you
              polish&rdquo;
            </em>
            <span className="text-sm text-zinc-400"> — Touru Oikawa</span>
          </p>
          <p>
            I design relentlessly before I ever make a final copy. The
            iterations aren&apos;t mistakes. They&apos;re the point.
          </p>
          <p>
            Photography taught me the same thing. You see the shot before you
            understand why it works. That&apos;s the instinct. That&apos;s what you
            polish.
          </p>
        </div>

        {/* ── Photo pairs: P1+P2, then P3+P4 ──────────────────────────── */}
        <div className="mt-10 space-y-6">
          <div className="flex gap-4 items-start">
            <FadeIn scrollRef={mainRef} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div
                  className="relative w-full bg-[#f0f0ee]"
                  style={{ paddingTop: PHOTO_PT }}
                >
                  <Image
                    src="/PlaygroundP1.jpeg"
                    alt="Graffiti alley"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 32px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div
                  className="relative w-full bg-[#f0f0ee]"
                  style={{ paddingTop: PHOTO_PT }}
                >
                  <Image
                    src="/PlaygroundP2.jpeg"
                    alt="London riverside at dusk"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 32px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="flex gap-4 items-start">
            <FadeIn scrollRef={mainRef} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div
                  className="relative w-full bg-[#f0f0ee]"
                  style={{ paddingTop: PHOTO_PT }}
                >
                  <Image
                    src="/PlaygroundP3.jpeg"
                    alt="Sea view from the cliffs"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 32px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1">
              <div className="bg-[#f0f0ee] p-12">
                <div
                  className="relative w-full bg-[#f0f0ee]"
                  style={{ paddingTop: PHOTO_PT }}
                >
                  <Image
                    src="/PlaygroundP4.jpeg"
                    alt="Chinatown lanterns"
                    fill
                    sizes="(max-width: 672px) calc(50vw - 32px), 306px"
                    className="object-contain"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Connecting ───────────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>
            None of that felt connected to a career at the time. It was just
            what I cared about.
          </p>
          <p>
            But after looking at my interests, I can start to see how I got
            here, even if the path wasn&apos;t conventional. The eye for
            composition. The obsession with how things feel, not just how they
            look. That didn&apos;t start in Figma.
          </p>
          <p>It feels like I got really lucky finding my passion.</p>
          <p>I don&apos;t think it was luck anymore.</p>
        </div>

      </div>
    </main>
  );
}

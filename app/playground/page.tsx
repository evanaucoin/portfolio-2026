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
            That was it — those were the options. I picked GBDA because it felt
            like a good mix of both. I didn&apos;t even know product design existed.
          </p>
          <p>It wasn&apos;t until second year that something clicked.</p>
        </div>

        {/* ── Drawing ──────────────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>But here&apos;s the thing — it wasn&apos;t random.</p>
          <p>
            I&apos;ve been drawing my whole life. Not for any reason, just because I
            always had. Hands, eyes, ink on whatever was nearby. Then I found
            Vagabond. Takehiko Inoue draws the way most people can&apos;t think —
            every panel is a composition decision, every stretch of negative
            space is intentional. It changed how I looked at everything. Not
            just drawing, but layout, weight, where your eye goes and why.
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

        {/* ── Film ─────────────────────────────────────────────────────── */}
        <div className="mt-16 text-zinc-600 leading-relaxed">
          <p>
            Film hit the same way. Good Will Hunting isn&apos;t a visually loud
            movie — it&apos;s the opposite. Every scene is stripped back to exactly
            what it needs. Nothing is there by accident. Watching it I kept
            thinking about restraint, about how much you can say by leaving
            things out. That&apos;s a design idea. I just didn&apos;t have the word for
            it yet.
          </p>
        </div>

        {/* ── Connecting ───────────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>
            None of that felt connected to a career at the time. It was just
            what I cared about.
          </p>
          <p>
            But after looking at my interests, I can start to see how I got
            here — even if the path wasn&apos;t conventional. The eye for
            composition. The obsession with how things feel, not just how they
            look. That didn&apos;t start in Figma.
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

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>It feels like I got really lucky finding my passion.</p>
          <p>I don&apos;t think it was luck anymore.</p>
        </div>

      </div>
    </main>
  );
}

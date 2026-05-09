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

export default function Workflow() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">

        {/* ── Section label ───────────────────────────────────────────── */}
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-10">
          Workflow
        </p>

        {/* ── Opening ─────────────────────────────────────────────────── */}
        <div className="space-y-4 text-zinc-600 leading-relaxed">
          <p>
            Product designers have always had a toolbox. Figma, Illustrator,
            Photoshop — the tools changed over time but the job stayed the same.
            Design something meaningful, make it work, ship it.
          </p>
          <p>The toolbox just got bigger.</p>
          <p>
            LLMs aren&apos;t replacing the designer. They&apos;re extending what a
            designer can execute on alone. A design engineer doesn&apos;t just design
            the thing, they build it too. The gap between a mockup and a shipped
            product used to require handing work off. I close that gap myself.
          </p>
        </div>

        {/* ── The Shortcoming ─────────────────────────────────────────── */}
        <div className="mt-16 space-y-4 text-zinc-600 leading-relaxed">
          <p>This portfolio is my third attempt.</p>
          <p>
            The first two failed because I didn&apos;t understand what I was doing. I
            was aimlessly prompting, fiddling with the terminal, expecting the
            output to be right without doing the work to ask correctly. After two
            weeks on my second attempt I decided something had to change.
          </p>
          <p>
            So I stopped building and started understanding. What is actually
            happening here, and more importantly, why.
          </p>
          <p>That changed everything. This is the process I arrived at.</p>
        </div>

        {/* ── IDEATION ────────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Ideation
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              It starts with Claude. Not as a tool that does the work, but as a
              consultant that challenges it. I bring the brief, the problem, the
              direction — and I want it to push back. Question the assumptions,
              poke holes in the plan, make me explain why I&apos;m making the
              decisions I&apos;m making. A yes man makes you feel good. A consultant
              makes the work better.
            </p>
          </div>
          <FadeIn scrollRef={mainRef} className="mt-10">
            <Image
              src="/PortfolioClaudeUI.png"
              alt="Claude — ideation session"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg border border-zinc-200 shadow-sm"
            />
          </FadeIn>
        </div>

        {/* ── MOOD BOARD ──────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Mood Board
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              Before I touch any UI I need to know what it should feel like. I
              pull references, collect things that capture the right tone, build a
              picture of the direction before I start designing. I&apos;m not solving
              anything yet. I&apos;m just making sure I know what I&apos;m aiming at
              before I pick up the bow.
            </p>
          </div>
          <FadeIn scrollRef={mainRef} className="mt-10 mb-4">
            <Image
              src="/PortfolioMoodboard.jpeg"
              alt="Mood board"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg"
            />
          </FadeIn>
        </div>

        {/* ── WIREFRAME ───────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Wireframe
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              Then I block it out. No colour, no polish, just structure. Where
              does everything live, how does the eye move through it, what
              actually needs to be there. I&apos;d rather figure out what&apos;s wrong at
              this stage than when it&apos;s already built.
            </p>
          </div>
          <FadeIn scrollRef={mainRef} className="mt-10 mb-4">
            <Image
              src="/PortfolioWireframe.png"
              alt="Wireframe"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg"
            />
          </FadeIn>
        </div>

        {/* ── MOCKUP ──────────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Mockup
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              This is where everything I&apos;ve built up over time shows up. The
              taste, the references, the instincts I didn&apos;t know I was developing.
              I&apos;m making real decisions now — layout, weight, feel. No tool does
              this part. It&apos;s just mine.
            </p>
          </div>
          <FadeIn scrollRef={mainRef} className="mt-10 mb-4">
            <Image
              src="/PortfolioMockup.png"
              alt="Mockup"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg"
            />
          </FadeIn>
        </div>

        {/* ── PROMPT ──────────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Prompt
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              Figma Make bridges the design into code. Then comes the part most
              people underestimate. Figuring out exactly what you want to see is
              engineering a prompt — it&apos;s the same skill as writing a design
              brief. If you can&apos;t articulate the problem clearly, you can&apos;t solve
              it clearly. Getting better at prompting made me better at thinking,
              better at communicating, better at knowing what I want before I ask
              for it. That&apos;s not a technical skill. That&apos;s a design skill.
            </p>
          </div>
          <FadeIn scrollRef={mainRef} className="mt-10">
            <Image
              src="/PortfolioCursorUI.png"
              alt="Cursor — prompt engineering"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg border border-zinc-200 shadow-sm"
            />
          </FadeIn>
        </div>

        {/* ── BUILD ───────────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Build
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              Claude and Cursor take it the rest of the way, with multi-agent
              workflows handling the complexity. The clearer the thinking going
              in, the cleaner the build coming out. Everything decided in the
              earlier stages pays off here.
            </p>
          </div>
          <FadeIn scrollRef={mainRef} className="mt-10">
            <Image
              src="/PortfolioGeminiUI.png"
              alt="Gemini — multi-agent build"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg border border-zinc-200 shadow-sm"
            />
          </FadeIn>
        </div>

        {/* ── PUSH AND SHIP ────────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Push and Ship
          </p>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              Everything gets pushed to GitHub and shipped on Vercel. Ideation to
              production. One person.
            </p>
          </div>
          <div className="mt-10 flex gap-4 items-start">
            <FadeIn scrollRef={mainRef} className="flex-1">
              <Image
                src="/PortfolioGitUI2.png"
                alt="GitHub — push"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg border border-zinc-200 shadow-sm"
              />
            </FadeIn>
            <FadeIn scrollRef={mainRef} delay={0.1} className="flex-1">
              <Image
                src="/PortfolioVercelUI.png"
                alt="Vercel — ship"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg border border-zinc-200 shadow-sm"
              />
            </FadeIn>
          </div>
        </div>

        {/* ── Closing ─────────────────────────────────────────────────── */}
        <div className="mt-20 space-y-4 text-zinc-600 leading-relaxed">
          <p>
            The process is repeatable. Every project I&apos;ve worked on has followed
            the same path. The tools are the same, the thinking is the same, the
            standard is the same.
          </p>
          <p>This portfolio isn&apos;t just the output. It&apos;s the proof of concept.</p>
        </div>

      </div>
    </main>
  );
}

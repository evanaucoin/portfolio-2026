"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { cn } from "@/components/ui/cn";

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

type CardLayout = "split" | "stacked";

type ProcessStage = {
  label: string;
  body: string;
  layout: CardLayout;
  images: { src: string; alt: string }[];
};

const STAGES: ProcessStage[] = [
  {
    label: "Ideation",
    body: `It starts with Claude. Not as a tool that does the work, but as a consultant that challenges it. I bring the brief, the problem, the direction — and I want it to push back. Question the assumptions, poke holes in the plan, make me explain why I'm making the decisions I'm making. A yes man makes you feel good. A consultant makes the work better.`,
    layout: "stacked",
    images: [{ src: "/PortfolioClaudeUI.png", alt: "Claude — ideation session" }],
  },
  {
    label: "Mood Board",
    body: `Before I touch any UI I need to know what it should feel like. I pull references, collect things that capture the right tone, build a picture of the direction before I start designing. I'm not solving anything yet. I'm just making sure I know what I'm aiming at before I pick up the bow.`,
    layout: "split",
    images: [{ src: "/PortfolioMoodboard.jpeg", alt: "Mood board" }],
  },
  {
    label: "Wireframe",
    body: `Then I block it out. No colour, no polish, just structure. Where does everything live, how does the eye move through it, what actually needs to be there. I'd rather figure out what's wrong at this stage than when it's already built.`,
    layout: "split",
    images: [{ src: "/PortfolioWireframe.png", alt: "Wireframe" }],
  },
  {
    label: "Mockup",
    body: `This is where everything I've built up over time shows up. The taste, the references, the instincts I didn't know I was developing. I'm making real decisions now — layout, weight, feel. No tool does this part. It's just mine.`,
    layout: "split",
    images: [{ src: "/PortfolioMockup.png", alt: "Mockup" }],
  },
  {
    label: "Prompt",
    body: `Figma Make bridges the design into code. Then comes the part most people underestimate. Figuring out exactly what you want to see is engineering a prompt — it's the same skill as writing a design brief. If you can't articulate the problem clearly, you can't solve it clearly. Getting better at prompting made me better at thinking, better at communicating, better at knowing what I want before I ask for it. That's not a technical skill. That's a design skill.`,
    layout: "stacked",
    images: [{ src: "/PortfolioCursorUI.png", alt: "Cursor — prompt engineering" }],
  },
  {
    label: "Build",
    body: `Claude and Cursor take it the rest of the way, with multi-agent workflows handling the complexity. The clearer the thinking going in, the cleaner the build coming out. Everything decided in the earlier stages pays off here.`,
    layout: "stacked",
    images: [{ src: "/PortfolioGeminiUI.png", alt: "Gemini — multi-agent build" }],
  },
  {
    label: "Push and Ship",
    body: `Everything gets pushed to GitHub and shipped on Vercel. Ideation to production. One person.`,
    layout: "stacked",
    images: [
      { src: "/PortfolioGitUI2.png", alt: "GitHub — push" },
      { src: "/PortfolioVercelUI.png", alt: "Vercel — ship" },
    ],
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 48 : -48,
    opacity: 0,
  }),
};

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/** Encode filename segment so paths like `/PortfolioGit UI2.png` resolve correctly. */
function encodeAssetSrc(src: string): string {
  if (!src.includes(" ")) return src;
  const i = src.lastIndexOf("/");
  const dir = i >= 0 ? src.slice(0, i + 1) : "";
  const file = i >= 0 ? src.slice(i + 1) : src;
  return `${dir}${encodeURIComponent(file)}`;
}

function StageCardContent({ stage }: { stage: ProcessStage }) {
  if (stage.layout === "split") {
    return (
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
        <div className="w-full shrink-0 md:w-[40%] md:min-w-0">
          <p className="text-xs font-semibold tracking-widest text-zinc-400 [font-variant-caps:small-caps]">
            {stage.label}
          </p>
          <p className="mt-4 text-zinc-600 leading-relaxed">{stage.body}</p>
        </div>
        <div className="flex w-full min-h-0 shrink-0 md:w-[60%] md:items-center md:justify-center">
          {stage.images.map((img) => (
            <div key={img.src} className="flex w-full justify-center">
              <Image
                src={encodeAssetSrc(img.src)}
                alt={img.alt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 36vw"
                className="h-auto max-h-[min(520px,70vh)] w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold tracking-widest text-zinc-400 [font-variant-caps:small-caps]">
          {stage.label}
        </p>
        <p className="mt-4 text-zinc-600 leading-relaxed">{stage.body}</p>
      </div>
      <div
        className={cn(
          "flex w-full items-center justify-center gap-4",
          stage.images.length > 1 ? "flex-row flex-wrap md:flex-nowrap" : "flex-col",
        )}
      >
        {stage.images.map((img) => (
          <div
            key={img.src}
            className={cn(
              "flex min-w-0 justify-center",
              stage.images.length > 1 ? "w-full flex-1 basis-[calc(50%-0.5rem)] md:basis-auto" : "w-full",
            )}
          >
            <Image
              src={encodeAssetSrc(img.src)}
              alt={img.alt}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 28vw"
              className="max-h-[280px] w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const leftColumnCopyVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.32, 0, 0.08, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.22, ease: [0.32, 0, 0.08, 1] },
  },
};

function ProcessCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const indexRef = useRef(0);

  const goTo = useCallback((target: number) => {
    const current = indexRef.current;
    if (target === current) return;
    const len = STAGES.length;
    const forward = (target - current + len) % len;
    const backward = (current - target + len) % len;
    setDirection(forward <= backward ? 1 : -1);
    indexRef.current = target;
    setIndex(target);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => {
      const n = (i - 1 + STAGES.length) % STAGES.length;
      indexRef.current = n;
      return n;
    });
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => {
      const n = (i + 1) % STAGES.length;
      indexRef.current = n;
      return n;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable=true]")) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const stage = STAGES[index];

  return (
    <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:gap-8">
      <div className="w-full shrink-0 md:w-[40%] md:sticky md:top-32 md:self-start">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={leftColumnCopyVariants}
          >
            <p className="text-xs font-semibold tracking-widest text-zinc-400 [font-variant-caps:small-caps]">
              {stage.label}
            </p>
            <p className="mt-4 text-zinc-600 leading-relaxed">{stage.body}</p>
          </motion.div>
        </AnimatePresence>

        <nav className="mt-10" aria-label="Process stages">
          <ul className="flex flex-col gap-2">
            {STAGES.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "text-left text-sm transition-colors",
                    i === index
                      ? "font-medium text-blue-600"
                      : "text-zinc-400 hover:text-zinc-600",
                  )}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="w-full min-w-0 md:w-[60%]">
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl bg-[#f5f5f3] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                role="tabpanel"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
              >
                <StageCardContent stage={stage} />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous stage"
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/80 bg-white/95 text-zinc-500 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next stage"
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/80 bg-white/95 text-zinc-500 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div
            className="mt-4 flex justify-center gap-2"
            role="tablist"
            aria-label="Process stages"
          >
            {STAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to stage ${i + 1}`}
                onClick={() => goTo(i)}
                className={
                  i === index
                    ? "h-2 w-2 rounded-full bg-blue-600"
                    : "h-2 w-2 rounded-full bg-zinc-300"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Workflow() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="h-screen overflow-y-auto">
      <div className="pt-32 pb-24">
        {/* ── Opening — narrow column ────────────────────────────────── */}
        <div className="mx-auto max-w-2xl px-6">
          <FadeIn scrollRef={mainRef}>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-10">
              Workflow
            </p>
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

            <div className="border-t border-zinc-200 my-10" aria-hidden />

            <div className="space-y-4 text-zinc-600 leading-relaxed">
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

            <div className="border-t border-zinc-200 my-10" aria-hidden />
          </FadeIn>
        </div>

        {/* ── Process carousel — narrow column ───────────────────────── */}
        <FadeIn scrollRef={mainRef} className="mt-6">
          <div className="mx-auto max-w-2xl px-6">
            <ProcessCarousel />
          </div>
        </FadeIn>

        {/* ── Closing — narrow column ────────────────────────────────── */}
        <div className="mx-auto max-w-2xl px-6 mt-20">
          <FadeIn scrollRef={mainRef} className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              The process is repeatable. Every project I&apos;ve worked on has followed
              the same path. The tools are the same, the thinking is the same, the
              standard is the same.
            </p>
            <p>This portfolio isn&apos;t just the output. It&apos;s the proof of concept.</p>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}

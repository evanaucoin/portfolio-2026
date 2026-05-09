"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
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

type ProcessStage = {
  id: string;
  label: string;
  body: string;
  images: { src: string; alt: string }[];
  /** When set, caps image height at 360px (Wireframe & Mockup). Otherwise 480px. */
  imageTreatment?: "wireframe";
};

const STAGES: ProcessStage[] = [
  {
    id: "ideation",
    label: "Ideation",
    body: `It starts with Claude. Not as a tool that does the work, but as a consultant that challenges it. I bring the brief, the problem, the direction — and I want it to push back. Question the assumptions, poke holes in the plan, make me explain why I'm making the decisions I'm making. A yes man makes you feel good. A consultant makes the work better.`,
    images: [{ src: "/PortfolioClaudeUI.png", alt: "Claude — ideation session" }],
  },
  {
    id: "mood-board",
    label: "Mood Board",
    body: `Before I touch any UI I need to know what it should feel like. I pull references, collect things that capture the right tone, build a picture of the direction before I start designing. I'm not solving anything yet. I'm just making sure I know what I'm aiming at before I pick up the bow.`,
    images: [{ src: "/PortfolioMoodboard.jpeg", alt: "Mood board" }],
  },
  {
    id: "wireframe",
    label: "Wireframe",
    body: `Then I block it out. No colour, no polish, just structure. Where does everything live, how does the eye move through it, what actually needs to be there. I'd rather figure out what's wrong at this stage than when it's already built.`,
    images: [{ src: "/PortfolioWireframe.png", alt: "Wireframe" }],
    imageTreatment: "wireframe",
  },
  {
    id: "mockup",
    label: "Mockup",
    body: `This is where everything I've built up over time shows up. The taste, the references, the instincts I didn't know I was developing. I'm making real decisions now — layout, weight, feel. No tool does this part. It's just mine.`,
    images: [{ src: "/PortfolioMockup.png", alt: "Mockup" }],
    imageTreatment: "wireframe",
  },
  {
    id: "prompt",
    label: "Prompt",
    body: `Figma Make bridges the design into code. Then comes the part most people underestimate. Figuring out exactly what you want to see is engineering a prompt — it's the same skill as writing a design brief. If you can't articulate the problem clearly, you can't solve it clearly. Getting better at prompting made me better at thinking, better at communicating, better at knowing what I want before I ask for it. That's not a technical skill. That's a design skill.`,
    images: [{ src: "/PortfolioCursorUI.png", alt: "Cursor — prompt engineering" }],
  },
  {
    id: "build",
    label: "Build",
    body: `Claude and Cursor take it the rest of the way, with multi-agent workflows handling the complexity. The clearer the thinking going in, the cleaner the build coming out. Everything decided in the earlier stages pays off here.`,
    images: [{ src: "/PortfolioGeminiUI.png", alt: "Gemini — multi-agent build" }],
  },
  {
    id: "push-and-ship",
    label: "Push and Ship",
    body: `Everything gets pushed to GitHub and shipped on Vercel. Ideation to production. One person.`,
    images: [
      { src: "/PortfolioGitUI2.png", alt: "GitHub — push" },
      { src: "/PortfolioVercelUI.png", alt: "Vercel — ship" },
    ],
  },
];

/** Encode filename segment so paths like `/PortfolioGit UI2.png` resolve correctly. */
function encodeAssetSrc(src: string): string {
  if (!src.includes(" ")) return src;
  const i = src.lastIndexOf("/");
  const dir = i >= 0 ? src.slice(0, i + 1) : "";
  const file = i >= 0 ? src.slice(i + 1) : src;
  return `${dir}${encodeURIComponent(file)}`;
}

function StageImageFrame({
  stage,
}: {
  stage: ProcessStage;
}) {
  const multi = stage.images.length > 1;
  const maxH =
    stage.imageTreatment === "wireframe" ? "max-h-[360px]" : "max-h-[480px]";

  return (
    <div
      className={cn(
        "mx-auto mt-8 w-full max-w-[640px] bg-[#f5f5f3] p-10",
        multi &&
          "flex flex-row flex-nowrap items-center justify-center gap-4",
        !multi && "flex justify-center",
      )}
    >
      {stage.images.map((img) => (
        <div
          key={img.src}
          className={cn(
            "flex min-w-0 items-center justify-center",
            multi ? "min-w-0 flex-1" : "w-full",
          )}
        >
          <Image
            src={encodeAssetSrc(img.src)}
            alt={img.alt}
            width={1200}
            height={800}
            sizes={
              multi
                ? "(max-width: 768px) 90vw, 280px"
                : "(max-width: 768px) 100vw, 640px"
            }
            className={cn(
              "h-auto w-auto max-w-full object-contain",
              maxH,
            )}
          />
        </div>
      ))}
    </div>
  );
}

function StageStickyNav({
  scrollRootRef,
}: {
  scrollRootRef: React.RefObject<HTMLElement | null>;
}) {
  const [activeId, setActiveId] = useState(STAGES[0]!.id);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;

    const sectionEls = STAGES.map((s) =>
      root.querySelector(`#${CSS.escape(s.id)}`),
    ).filter((el): el is Element => el instanceof Element);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (intersecting[0]?.target.id) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        root,
        rootMargin: "-10.5rem 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollRootRef]);

  const onNavClick = (id: string) => {
    const root = scrollRootRef.current;
    const el = root?.querySelector(`#${CSS.escape(id)}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Process stages"
      className="sticky top-32 z-40 border-b border-zinc-900/[0.06] bg-white py-3"
    >
      <div className="flex flex-nowrap items-center justify-start gap-x-0 gap-y-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {STAGES.map((stage, i) => (
          <span key={stage.id} className="flex shrink-0 items-center">
            {i > 0 ? (
              <span
                aria-hidden
                className="px-1.5 text-xs font-semibold tracking-widest text-zinc-300"
              >
                ·
              </span>
            ) : null}
            <a
              href={`#${stage.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(stage.id);
              }}
              className={cn(
                "shrink-0 text-left text-xs font-semibold tracking-widest transition-colors",
                activeId === stage.id
                  ? "text-blue-600"
                  : "text-zinc-400 hover:text-zinc-600",
              )}
            >
              {stage.label}
            </a>
          </span>
        ))}
      </div>
    </nav>
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

        {/* ── Sticky stage nav + sections — narrow column ───────────── */}
        <div className="mx-auto max-w-2xl px-6">
          <StageStickyNav scrollRootRef={mainRef} />

          <div className="flex flex-col gap-[clamp(4rem,8vw,6rem)]">
            {STAGES.map((stage) => (
              <FadeIn key={stage.id} scrollRef={mainRef}>
                <section
                  id={stage.id}
                  className="scroll-mt-[10.5rem]"
                >
                  <p className="text-xs font-semibold tracking-widest text-zinc-400 [font-variant-caps:small-caps]">
                    {stage.label}
                  </p>
                  <p className="mt-4 text-zinc-600 leading-relaxed">{stage.body}</p>
                  <StageImageFrame stage={stage} />
                </section>
              </FadeIn>
            ))}
          </div>
        </div>

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

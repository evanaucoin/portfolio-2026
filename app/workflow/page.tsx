"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/components/ui/cn";
import { useView } from "@/components/ViewContext";

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
  /** Wireframe & Mockup: split layout + shorter image cap */
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

type SectionId = (typeof STAGES)[number]["id"];

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
  layout = "default",
}: {
  stage: ProcessStage;
  layout?: "default" | "split";
}) {
  const multi = stage.images.length > 1;
  const maxH =
    stage.imageTreatment === "wireframe" ? "max-h-[360px]" : "max-h-[480px]";

  return (
    <div
      className={cn(
        "w-full bg-[#f5f5f3] p-10",
        layout === "default" && "mx-auto mt-8 max-w-[640px]",
        layout === "split" && "mt-8 md:mt-0",
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

/** Matches case study in-page section label (DZDCaseStudy `SectionLabel`). */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-[0.15em] text-blue-600 uppercase mb-4 block">
      {children}
    </span>
  );
}

export default function Workflow() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>(STAGES[0]!.id);
  const { setView } = useView();

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.35;
      let current: SectionId = STAGES[0]!.id;
      for (const { id } of STAGES) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= trigger) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={mainRef} className="h-screen overflow-y-auto bg-white">
      <div className="flex">
        {/* ── SIDEBAR — same structure/classes as case study pages (DZD) ─── */}
        <aside className="sticky top-0 h-screen w-[250px] flex-shrink-0 hidden lg:flex flex-col justify-between pt-24 pb-10 px-8 border-r border-zinc-100">
          <div>
            <Link
              href="/"
              onClick={() => setView("home")}
              className="mb-10 w-full flex justify-center"
            >
              <span className="inline-block bg-zinc-100 text-zinc-900 font-medium text-base px-6 py-2 rounded-full">
                Home
              </span>
            </Link>

            <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-1 block mt-2">
              Case Study
            </span>
            <p className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">
              Workflow
            </p>

            <nav className="flex flex-col gap-3">
              {STAGES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={`text-left px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 pt-32 pb-24">
            {/* ── Opening — typography matches About narrative ───────────── */}
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

            <div className="flex flex-col gap-[clamp(4rem,8vw,6rem)]">
              {STAGES.map((stage) => {
                const isSplit = stage.imageTreatment === "wireframe";

                if (isSplit) {
                  return (
                    <FadeIn key={stage.id} scrollRef={mainRef}>
                      <section id={stage.id}>
                        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-8">
                          <div className="w-full md:w-1/2 md:flex md:flex-col md:justify-center">
                            <SectionHeading>{stage.label}</SectionHeading>
                            <p className="text-[17px] text-zinc-500 leading-relaxed">
                              {stage.body}
                            </p>
                          </div>
                          <div className="w-full md:w-1/2 md:flex md:flex-col md:justify-center">
                            <StageImageFrame stage={stage} layout="split" />
                          </div>
                        </div>
                      </section>
                    </FadeIn>
                  );
                }

                return (
                  <FadeIn key={stage.id} scrollRef={mainRef}>
                    <section id={stage.id}>
                      <SectionHeading>{stage.label}</SectionHeading>
                      <p className="text-[17px] text-zinc-500 leading-relaxed">
                        {stage.body}
                      </p>
                      <StageImageFrame stage={stage} layout="default" />
                    </section>
                  </FadeIn>
                );
              })}
            </div>

            <div className="mt-20">
              <FadeIn
                scrollRef={mainRef}
                className="space-y-4 text-zinc-600 leading-relaxed"
              >
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
      </div>
    </div>
  );
}

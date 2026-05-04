"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { StatusPod } from "@/components/ui/StatusPod";
import { RotatingText } from "@/components/ui/RotatingText";
import { SplitText } from "@/components/ui/SplitText";
import { useView } from "@/components/ViewContext";
import DZDCaseStudy from "@/components/DZDCaseStudy";
import PRISMCaseStudy from "@/components/PRISMCaseStudy";
import JourneyCaseStudy from "@/components/JourneyCaseStudy";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CARD_COUNT = 5;

const TOP_POD: Record<number, { label: string; tools: string; small?: boolean } | null> = {
  0: null,
  1: { label: "Stack:", tools: "Figma Product Suite • Adobe Creative Cloud • Claude" },
  2: { label: "Stack:", tools: "Figma Product Suite • Claude" },
  3: { label: "Stack:", tools: "Figma Product Suite • Adobe Creative Cloud • Claude" },
  4: { label: "Stack:", tools: "Figma Product Suite • Adobe Creative Cloud • Next.js • TypeScript • TailwindCSS • React • Framer Motion • Cursor • Gemini • Claude • Vercel", small: true },
};

const SLOT_STATES = [
  { y: 0,    scale: 1,    opacity: 1, zIndex: 6 }, // front
  { y: 60,   scale: 0.92, opacity: 1, zIndex: 4 }, // peek 1
  { y: 120,  scale: 0.84, opacity: 1, zIndex: 3 }, // peek 2
  { y: 120,  scale: 0.84, opacity: 0, zIndex: 2 }, // hidden behind peek 2
  { y: -800, scale: 0.84, opacity: 0, zIndex: 7 }, // exit staging (highest z)
];

const easeTransition = { duration: 0.5, ease: "easeOut" } as const;

type Direction = "forward" | "backward";


// Slot 4 forward: flick exit with tilt + staged opacity dissolve.
// Slot 4 backward: invisible reposition — no opacity keyframes to avoid a flash.
// All others: animate to flat resting state.
function getAnimate(slot: number, dir: Direction) {
  const { y, scale, opacity } = SLOT_STATES[slot];
  if (slot === 4 && dir === "forward") {
    return {
      y,
      scale,
      opacity: [1, 1, 1, 0] as number[],
      rotateX: 25,
      rotateZ: -10,
    };
  }
  if (slot === 4) {
    // Backward: park invisibly at the exit position with tilt pre-set so it's
    // ready to flick on the next forward scroll.
    return { y, scale, opacity, rotateX: 25, rotateZ: -10 };
  }
  return { y, scale, opacity, rotateX: 0, rotateZ: 0 };
}

function getTransition(_slot: number, _dir: Direction) {
  return easeTransition;
}

export default function Home() {
  const { view, setView } = useView();
  const viewRef = useRef(view);
  viewRef.current = view;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isScrolling = useRef(false);
  // Ref (not state) so direction is set synchronously before setActiveIndex —
  // the re-render triggered by the state update reads the already-updated value.
  const direction = useRef<Direction>("forward");

  // Cursor follower — raw motion values updated on every mousemove, spring-smoothed for display.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 250, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 30 });
  // Offset so the tooltip sits to the bottom-right of the actual pointer tip.
  const followerX = useTransform(springX, (v) => v + 24);
  const followerY = useTransform(springY, (v) => v + 24);

  // Reset scroll position and card index before revealing the deck,
  // preventing a flash of the last-visited card during browser scroll restoration.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setActiveIndex(0);
    setIsReady(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (viewRef.current !== "home") return;
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) <= 50) return;

      direction.current = e.deltaY > 0 ? "forward" : "backward";
      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 650);

      setActiveIndex((prev) =>
        e.deltaY > 0
          ? (prev + 1) % CARD_COUNT
          : (prev - 1 + CARD_COUNT) % CARD_COUNT
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main className="flex flex-col h-screen overflow-hidden px-12">
      {/* Top pod — always mounted; ghost pill on intro, expanded with content on all other states */}
      <div className="flex justify-center mt-8 mb-0">
        <motion.div
          layout
          transition={{ layout: { type: "spring", stiffness: 150, damping: 40 } }}
          className={`flex items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white/80 backdrop-blur-sm${TOP_POD[activeIndex] ? " w-fit" : ""}`}
          style={{
            height: 56,
            ...(TOP_POD[activeIndex] ? {} : { width: 88 }),
            boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
          }}
        >
          <AnimatePresence mode="wait">
            {TOP_POD[activeIndex] && (
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
                className={`select-none whitespace-nowrap px-10 leading-none ${TOP_POD[activeIndex]!.small ? "text-[11px]" : "text-sm"}`}
              >
                <span className="text-zinc-500">{TOP_POD[activeIndex]!.label}&nbsp;</span>
                <span className="text-zinc-900 font-semibold">{TOP_POD[activeIndex]!.tools}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Card deck — flex-1 eats remaining space and keeps the card floating in the middle */}
      <div className="flex-1 flex items-center justify-center pb-24">
      <div
        className={`relative w-full max-w-6xl aspect-[21/9] overflow-visible transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const slot = (i - activeIndex + CARD_COUNT) % CARD_COUNT;
          const { zIndex } = SLOT_STATES[slot];

          return (
            <motion.div
              key={i}
              initial={false}
              animate={getAnimate(slot, direction.current)}
              transition={getTransition(slot, direction.current)}
              onClick={
                i === 1 && slot === 0 ? () => setView("dzd")
                : i === 2 && slot === 0 ? () => setView("prism")
                : i === 3 && slot === 0 ? () => setView("journey")
                : undefined
              }
              style={{
                zIndex,
                transformOrigin: "top center",
                transformPerspective: 1000,
                pointerEvents: slot >= 3 ? "none" : "auto",
                cursor: (i === 1 || i === 2 || i === 3) && slot === 0 ? "pointer" : "default",
                boxShadow: i === 4
                  ? "inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 -2px 4px rgba(0,0,0,0.15)"
                  : "inset 0 0 0 1px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.2)",
                willChange: "transform",
              }}
              className={`absolute inset-0 rounded-[32px] border shadow-sm overflow-hidden isolate transform-gpu ${
                i === 4 ? "border-white/10 bg-blue-600" : "border-zinc-200 bg-white"
              }`}
            >
              {i === 0 && (
                <div className="flex h-full w-full flex-col items-center justify-between py-16 px-12">
                  <span className="text-sm font-medium text-zinc-400 text-center">
                    Evan AuCoin
                  </span>
                  <div className="flex flex-1 items-center justify-center">
                    <p className="text-5xl font-medium tracking-tight text-zinc-900 leading-tight text-center">
                      I create{" "}
                      <RotatingText
                        texts={["Design", "Solutions", "Products"]}
                        mainClassName="inline-flex px-6 py-2 bg-blue-600 text-white rounded-full overflow-hidden font-medium tracking-tight"
                      />
                      {" "}that matter.
                    </p>
                  </div>
                  <span className="text-sm font-medium text-zinc-400 text-center">
                    GBDA @ UWaterloo
                  </span>
                </div>
              )}
              {i === 3 && (
                <>
                  <Image
                    src="/JOURNEY_Card.png"
                    alt="Journey — Redesigning navigation for the modern traveler"
                    fill
                    sizes="(max-width: 1280px) 100vw, 1152px"
                    className="object-cover w-full h-full scale-[1.02]"
                    priority
                  />
                  {/* Layer A — full-height blur, gradient-masked from bottom */}
                  <div
                    className="absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[2px] bg-zinc-950/20"
                    style={{
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 90%, black 100%)",
                      maskImage: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 90%, black 100%)",
                      willChange: "backdrop-filter",
                      transform: "translateZ(0)",
                    }}
                  />
                  {/* Layer B — sharp text, no filters */}
                  <div
                    className="absolute bottom-0 left-0 w-full flex flex-col justify-end px-12 pb-16 z-20"
                    style={{ transform: "translateZ(0)" }}
                  >
                    <h2 className="text-6xl font-medium text-white">JOURNEY</h2>
                    <p className="text-sm font-normal text-zinc-300 mt-1 mb-2">
                      Project: Itinerary travel app
                    </p>
                    <p className="text-lg text-zinc-200 max-w-lg">
                      An AI-driven experience that emphasizes the journey, not just the destination.
                    </p>
                  </div>
                </>
              )}
              {i === 2 && (
                <>
                  <Image
                    src="/PRISM_Card.png"
                    alt="PRISM — Designed to build user's social intelligence"
                    fill
                    sizes="(max-width: 1280px) 100vw, 1152px"
                    className="object-cover w-full h-full scale-[1.02]"
                    priority
                  />
                  {/* Layer A — full-height blur, gradient-masked from bottom */}
                  <div
                    className="absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[2px] bg-black/50"
                    style={{
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 90%, black 100%)",
                      maskImage: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 90%, black 100%)",
                      willChange: "backdrop-filter",
                      transform: "translateZ(0)",
                    }}
                  />
                  {/* Layer B — sharp text, no filters */}
                  <div
                    className="absolute bottom-0 left-0 w-full flex flex-col justify-end px-12 pb-16 z-20"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)", transform: "translateZ(0)" }}
                  >
                    <h2 className="text-6xl font-medium text-white">PRISM</h2>
                    <p className="text-sm font-normal text-zinc-300 mt-1 mb-2">
                      Project: Social coaching app
                    </p>
                    <p className="text-lg text-zinc-200 max-w-lg">
                      Turning &apos;invisible&apos; social cues into clear, actionable insights.
                    </p>
                  </div>
                </>
              )}
              {i === 1 && (
                <>
                  <Image
                    src="/dzd_3d.png"
                    alt="DZD — Redesigning the search experience for active living"
                    fill
                    sizes="(max-width: 1280px) 100vw, 1152px"
                    className="object-cover w-full h-full scale-[1.02]"
                    priority
                  />
                  {/* Layer A — full-height blur, gradient-masked from bottom */}
                  <div
                    className="absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[2px] bg-black/10"
                    style={{
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 90%, black 100%)",
                      maskImage: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 90%, black 100%)",
                      willChange: "backdrop-filter",
                      transform: "translateZ(0)",
                    }}
                  />
                  {/* Layer B — sharp text, no filters */}
                  <div
                    className="absolute bottom-0 left-0 w-full flex flex-col justify-end px-12 pb-16 z-20"
                    style={{ transform: "translateZ(0)" }}
                  >
                    <h2 className="text-6xl font-medium text-white">DZD</h2>
                    <p className="text-sm font-normal text-zinc-300 mt-1 mb-2">
                      Project: Fitness companion app
                    </p>
                    <p className="text-lg text-zinc-200 max-w-lg">
                      Redesigning the search experience for active living.
                    </p>
                  </div>
                </>
              )}
              {i === 4 && (
                <div className="flex h-full w-full flex-col items-center justify-center space-y-16">
                  <SplitText
                    text="Let's connect"
                    className="text-8xl font-bold text-white tracking-tighter"
                    delay={100}
                    isActive={slot === 0}
                  />
                  <div className="flex items-center gap-6">
                    {/* LinkedIn */}
                    <motion.a
                      href="https://www.linkedin.com/in/evan-aucoin-184229354"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <LinkedinIcon className="w-8 h-8" />
                    </motion.a>
                    {/* Email */}
                    <motion.a
                      href="mailto:eaucoin@uwaterloo.ca"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <Mail className="w-8 h-8" />
                    </motion.a>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      </div>

      {/* Bottom pod — fixed at viewport bottom, independent of central layout */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center">
        <StatusPod activeIndex={activeIndex} />
      </div>

      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{ x: followerX, y: followerY, willChange: "transform" }}
        animate={{ opacity: isHovering && view === "home" ? 1 : 0, scale: isHovering ? 1 : 0.7 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-blue-600 border border-white/40 text-white text-sm font-medium whitespace-nowrap shadow-xl">
          {activeIndex === 0
            ? "Swipe down"
            : activeIndex <= 3
            ? "Click to open"
            : "Reach out!"}
        </div>
      </motion.div>

      {/* DZD Case Study overlay */}
      <AnimatePresence>
        {view === "dzd" && (
          <motion.div
            key="dzd-overlay"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[40] bg-white"
          >
            <DZDCaseStudy />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRISM Case Study overlay */}
      <AnimatePresence>
        {view === "prism" && (
          <motion.div
            key="prism-overlay"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[40] bg-white"
          >
            <PRISMCaseStudy />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journey Case Study overlay */}
      <AnimatePresence>
        {view === "journey" && (
          <motion.div
            key="journey-overlay"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[40] bg-white"
          >
            <JourneyCaseStudy />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

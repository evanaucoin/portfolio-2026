"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StatusPod } from "@/components/ui/StatusPod";
import { RotatingText } from "@/components/ui/RotatingText";

const CARD_COUNT = 5;

const SLOT_STATES = [
  { y: 0,    scale: 1,    opacity: 1, zIndex: 6 }, // front
  { y: 60,   scale: 0.92, opacity: 1, zIndex: 4 }, // peek 1
  { y: 120,  scale: 0.84, opacity: 1, zIndex: 3 }, // peek 2
  { y: 120,  scale: 0.84, opacity: 0, zIndex: 2 }, // hidden behind peek 2
  { y: -800, scale: 0.84, opacity: 0, zIndex: 7 }, // exit staging (highest z)
];

// Forward deck motion — cards step up through the stack.
const cardSpring = { type: "spring" as const, stiffness: 180, damping: 38 };
// Forward exit — the flicked card launches off the top.
const exitSpring = { type: "spring" as const, stiffness: 160, damping: 36 };
// Backward motion — slower, heavier feel as the deck reverses.
const backSpring = { type: "spring" as const, stiffness: 150, damping: 40 };

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

function getTransition(slot: number, dir: Direction) {
  // ── Forward exit ────────────────────────────────────────────────────────────
  if (slot === 4 && dir === "forward") {
    return {
      y:       exitSpring,
      scale:   exitSpring,
      rotateX: exitSpring,
      rotateZ: exitSpring,
      opacity: {
        type: "tween" as const,
        duration: 0.6,
        times: [0, 0.4, 0.75, 1],
        ease: "easeIn",
      },
    };
  }

  // ── Backward pass ───────────────────────────────────────────────────────────
  if (dir === "backward") {
    return {
      y:       backSpring,
      scale:   backSpring,
      rotateX: backSpring,
      rotateZ: backSpring,
      // Re-entering card (slot 0) fades in gracefully; others snap.
      opacity: slot === 0
        ? { type: "tween" as const, duration: 0.4, ease: "easeOut" }
        : { type: "tween" as const, duration: 0.15, ease: "easeOut" },
    };
  }

  // ── Default forward ─────────────────────────────────────────────────────────
  return {
    y:       cardSpring,
    scale:   cardSpring,
    rotateX: cardSpring,
    rotateZ: cardSpring,
    opacity: { type: "tween" as const, duration: 0.15, ease: "easeOut" },
  };
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  // Ref (not state) so direction is set synchronously before setActiveIndex —
  // the re-render triggered by the state update reads the already-updated value.
  const direction = useRef<Direction>("forward");

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) <= 50) return;

      direction.current = e.deltaY > 0 ? "forward" : "backward";
      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);

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
    <main className="flex h-screen flex-col items-center px-12">
      {/* Top spacer — mirrors the bottom section so the deck lands dead-center. */}
      <div className="flex-1" />

      {/* Card deck */}
      <div className="relative w-full max-w-6xl aspect-[21/9] overflow-visible">
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const slot = (i - activeIndex + CARD_COUNT) % CARD_COUNT;
          const { zIndex } = SLOT_STATES[slot];

          return (
            <motion.div
              key={i}
              animate={getAnimate(slot, direction.current)}
              transition={getTransition(slot, direction.current)}
              style={{
                zIndex,
                transformOrigin: "top center",
                transformPerspective: 1000,
                pointerEvents: slot >= 3 ? "none" : "auto",
              }}
              className="absolute inset-0 rounded-[32px] border border-zinc-200 bg-white shadow-sm overflow-hidden"
            >
              {i === 0 && (
                <div className="flex h-full flex-col justify-between px-14 py-10">
                  <span className="text-sm font-medium text-zinc-400">
                    Evan AuCoin
                  </span>
                  <p className="text-5xl font-medium tracking-tight text-zinc-900 leading-tight">
                    I create{" "}
                    <RotatingText
                      texts={["Design", "Solutions", "Products"]}
                      mainClassName="inline-flex px-6 py-2 bg-blue-600 text-white rounded-full overflow-hidden font-medium tracking-tight"
                    />
                    {" "}that matter.
                  </p>
                  <span className="text-sm font-medium text-zinc-400">
                    GBDA @ UWaterloo
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom section — equal height to top spacer; pod floats in its center. */}
      <div className="flex flex-1 items-center justify-center">
        <StatusPod activeIndex={activeIndex} />
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CARD_COUNT = 5;

// Slot 4 sits above the stack (y: -150) and owns the highest zIndex so the
// exiting card always slides *over* the remaining cards as it leaves — no
// clipping from cards below.
const SLOT_STATES = [
  { y: 0,    scale: 1,    opacity: 1, zIndex: 6 }, // front
  { y: 60,   scale: 0.92, opacity: 1, zIndex: 4 }, // peek 1
  { y: 120,  scale: 0.84, opacity: 1, zIndex: 3 }, // peek 2
  { y: 120,  scale: 0.84, opacity: 0, zIndex: 2 }, // hidden behind peek 2
  { y: -800, scale: 0.84, opacity: 0, zIndex: 7 }, // exiting above (highest z)
];

const cardSpring = { type: "spring" as const, stiffness: 180, damping: 38 };
const exitSpring = { type: "spring" as const, stiffness: 160, damping: 36 };

// Build the full animate target for a given slot.
// Slot 4 gets the "flick" treatment: tilt + 3-stop opacity keyframes.
function getAnimate(slot: number) {
  const { y, scale, opacity } = SLOT_STATES[slot];
  if (slot === 4) {
    return {
      y,
      scale,
      opacity: [1, 1, 1, 0] as number[],
      rotateX: 25,
      rotateZ: -10,
    };
  }
  return { y, scale, opacity, rotateX: 0, rotateZ: 0 };
}

// Slot 4 uses the snappier exit spring for translate/rotate.
// Opacity is a tween with `times` so the card stays fully visible for the
// first 55 % of its travel, then dissolves quickly at the end.
function getTransition(slot: number) {
  if (slot === 4) {
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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) <= 50) return;

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
    <main className="flex h-screen items-center justify-center px-12">
      <div className="relative w-full max-w-6xl aspect-[21/9] overflow-visible">
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const slot = (i - activeIndex + CARD_COUNT) % CARD_COUNT;
          const { zIndex } = SLOT_STATES[slot];

          return (
            <motion.div
              key={i}
              animate={getAnimate(slot)}
              transition={getTransition(slot)}
              style={{
                zIndex,
                transformOrigin: "top center",
                transformPerspective: 1000,
                pointerEvents: slot >= 3 ? "none" : "auto",
              }}
              className="absolute inset-0 rounded-[32px] border border-zinc-200 bg-white shadow-sm"
            />
          );
        })}
      </div>
    </main>
  );
}

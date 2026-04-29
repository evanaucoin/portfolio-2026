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
  { y: -150, scale: 0.84, opacity: 0, zIndex: 7 }, // exiting above (highest z)
];

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 30 };

// Exiting card (slot 4): spring the Y immediately but delay the fade so the
// card is visibly travelling upward before it dissolves.
function getTransition(slot: number) {
  const isExiting = slot === 4;
  return {
    y:      cardSpring,
    scale:  cardSpring,
    opacity: isExiting
      ? { type: "tween" as const, duration: 0.2, delay: 0.15, ease: "easeIn" }
      : { type: "tween" as const, duration: 0.15, ease: "easeOut" },
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
          const { y, scale, opacity, zIndex } = SLOT_STATES[slot];

          return (
            <motion.div
              key={i}
              animate={{ y, scale, opacity }}
              transition={getTransition(slot)}
              style={{
                zIndex,
                transformOrigin: "top center",
                // Invisible cards must not swallow pointer events
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

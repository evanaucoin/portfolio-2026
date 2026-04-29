"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CARD_COUNT = 5;

// Visual state for each "slot" relative to the active card.
// Slot 4 is the off-screen-above position cards animate through when exiting.
const SLOT_STATES = [
  { y: 0,    scale: 1,    opacity: 1, zIndex: 5 }, // front
  { y: 60,   scale: 0.92, opacity: 1, zIndex: 4 }, // peek 1
  { y: 120,  scale: 0.84, opacity: 1, zIndex: 3 }, // peek 2
  { y: 120,  scale: 0.84, opacity: 0, zIndex: 2 }, // hidden behind peek 2
  { y: -200, scale: 0.84, opacity: 0, zIndex: 1 }, // exited above
];

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isThrottled = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isThrottled.current) return;

      setActiveIndex((prev) =>
        e.deltaY > 0
          ? (prev + 1) % CARD_COUNT
          : (prev - 1 + CARD_COUNT) % CARD_COUNT
      );

      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 700);
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
              transition={spring}
              style={{ zIndex, transformOrigin: "top center" }}
              className="absolute inset-0 rounded-[32px] border border-zinc-200 bg-white shadow-sm"
            />
          );
        })}
      </div>
    </main>
  );
}

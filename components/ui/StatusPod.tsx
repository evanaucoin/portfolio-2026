"use client";

import { motion, AnimatePresence } from "framer-motion";

const podSpring = { type: "spring" as const, stiffness: 150, damping: 40 };

// Empty (intro/connect): pill at rest width.
// Work (cards 1–3): pill expands to fill more horizontal space.
const EMPTY_WIDTH = 160; // ~w-40
const WORK_WIDTH  = 384; // max-w-sm

interface StatusPodProps {
  activeIndex: number;
}

export function StatusPod({ activeIndex }: StatusPodProps) {
  const isWork = activeIndex >= 1 && activeIndex <= 3;

  return (
    <motion.div
      animate={{ width: isWork ? WORK_WIDTH : EMPTY_WIDTH }}
      transition={podSpring}
      className="flex items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white"
      style={{
        height: 48,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      <AnimatePresence mode="wait">
        {isWork && (
          <motion.span
            key="work-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
            className="select-none whitespace-nowrap px-5 text-sm text-zinc-400"
          >
            {activeIndex} of 3{" "}
            <span className="text-zinc-800">work</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

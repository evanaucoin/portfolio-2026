"use client";

import { motion, AnimatePresence } from "framer-motion";

const podSpring = { type: "spring" as const, stiffness: 150, damping: 40 };

// Pill dimensions. Height is constant; width is explicit in the empty state
// and content-driven (via w-fit) in the expanded state so layout can diff them.
const EMPTY_W = 88;  // w-22 — visible compact pill
const PILL_H  = 56;  // h-14 — tall enough to anchor the bottom zone

interface StatusPodProps {
  activeIndex: number;
}

export function StatusPod({ activeIndex }: StatusPodProps) {
  const isWork = activeIndex >= 1 && activeIndex <= 3;

  return (
    <motion.div
      layout
      transition={{ layout: podSpring }}
      className={`flex items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white${isWork ? " w-fit" : ""}`}
      style={{
        height: PILL_H,
        ...(isWork ? {} : { width: EMPTY_W }),
        boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
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
            className="select-none whitespace-nowrap px-10 text-[22px] leading-none text-zinc-400"
          >
            {activeIndex} of 3{" "}
            <span className="text-zinc-800">work</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

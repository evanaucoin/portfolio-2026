"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/ui/cn";

const podSpring = { type: "spring" as const, stiffness: 150, damping: 40 };

interface StatusPodProps {
  activeIndex: number;
}

export function StatusPod({ activeIndex }: StatusPodProps) {
  const isWork = activeIndex >= 1 && activeIndex <= 3;

  return (
    <motion.div
      layout
      transition={{ layout: podSpring }}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white",
        isWork ? "w-fit" : "w-12",
      )}
      style={{
        height: 42,
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
            className="select-none whitespace-nowrap px-6 text-[18px] leading-none text-zinc-400"
          >
            {activeIndex} of 3{" "}
            <span className="text-zinc-800">work</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

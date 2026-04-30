"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Initial delay before first character animates, in milliseconds */
  delay?: number;
  isActive?: boolean;
}

const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // power4.out approximation
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function SplitText({ text, className, delay = 0, isActive = false }: SplitTextProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay / 1000,
      },
    },
  };

  return (
    <motion.span
      aria-label={text}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

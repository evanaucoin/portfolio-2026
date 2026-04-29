"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
}

export function RotatingText({ texts, mainClassName }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <motion.span layout className={mainClassName}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={texts[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

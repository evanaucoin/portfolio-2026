"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FolderItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface FolderProps {
  color?: string;
  size?: number;
  items?: FolderItem[];
  /** When true the folder auto-opens after a short delay */
  isActive?: boolean;
}

// Base dimensions at size=1
const B = { w: 140, h: 92, tabW: 52, tabH: 14, r: 14 };

export function Folder({ color = "#ffffff30", size = 1, items = [], isActive = false }: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const w    = B.w    * size;
  const h    = B.h    * size;
  const tabW = B.tabW * size;
  const tabH = B.tabH * size;
  const r    = B.r    * size;

  // Auto-open when card becomes front; close when it leaves
  useEffect(() => {
    if (!isActive) {
      setIsOpen(false);
      return;
    }
    const t = setTimeout(() => setIsOpen(true), 550);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Folder shape */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="relative cursor-pointer focus:outline-none"
        style={{ width: w, paddingTop: tabH }}
        aria-label={isOpen ? "Close links" : "Open links"}
      >
        {/* Tab — sits above the body */}
        <div
          className="absolute left-4 top-0"
          style={{
            width: tabW,
            height: tabH + r,
            background: color,
            borderRadius: `${r * 0.55}px ${r * 0.55}px 0 0`,
          }}
        />

        {/* Body */}
        <motion.div
          animate={{ rotateX: isOpen ? -10 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="relative"
          style={{
            width: w,
            height: h,
            background: color,
            borderRadius: r,
            transformOrigin: "top center",
          }}
        >
          {/* Decorative doc lines */}
          <div
            className="absolute inset-0 flex flex-col justify-center gap-[9px] px-5"
            style={{ opacity: 0.5 }}
          >
            <div className="h-[2px] rounded-full bg-white" style={{ width: "52%" }} />
            <div className="h-[2px] rounded-full bg-white" style={{ width: "38%" }} />
            <div className="h-[2px] rounded-full bg-white" style={{ width: "46%" }} />
          </div>
        </motion.div>
      </button>

      {/* Item cards fan out below the folder */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex items-end gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {items.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -14, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{
                  delay: idx * 0.07,
                  type: "spring",
                  stiffness: 340,
                  damping: 26,
                }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-5 py-4 shadow-lg select-none"
              >
                <div className="text-blue-600">{item.icon}</div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

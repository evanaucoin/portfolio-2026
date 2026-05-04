"use client";

import { motion, type Variants } from "framer-motion";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.32, 0, 0.08, 1] as const },
  }),
};

export default function Connect() {
  return (
    <main className="relative h-screen px-6">

      {/* ── Vertically centered content ──────────────────────────────── */}
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full max-w-2xl">

          {/* ── Header ───────────────────────────────────────────────── */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-10"
          >
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-1">
              Let&apos;s connect.
            </h1>
            <p className="text-zinc-500">
              Open to internship opportunities — Fall 2026
            </p>
          </motion.div>

          {/* ── Top pod + contact card ────────────────────────────────── */}
          <div>

            {/* Top stack pod — same height as the bottom pod, w-fit, centered */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mx-auto mb-8 flex h-14 w-fit items-center rounded-full border border-zinc-200 bg-white px-6 shadow-sm"
            >
              <span className="whitespace-nowrap text-[10px] font-medium text-zinc-500">
                Portfolio Stack:&nbsp;
              </span>
              <span className="whitespace-nowrap text-[10px] font-semibold text-zinc-900">
                Figma • Next.js • TypeScript • Framer Motion • Cursor • Gemini • Claude • Vercel
              </span>
            </motion.div>

            {/* Contact links card */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8 flex flex-col items-center gap-4"
            >
              <a
                href="https://www.linkedin.com/in/evan-aucoin-184229354"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="mailto:eaucoin@uwaterloo.ca"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
              >
                <MailIcon className="w-4 h-4" />
                eaucoin@uwaterloo.ca
              </a>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Bottom pod — fixed empty white pill, anchored to viewport bottom ── */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <div
          className="rounded-full border border-zinc-200 bg-white"
          style={{
            height: 56,
            width: 88,
            boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
          }}
        />
      </div>

    </main>
  );
}

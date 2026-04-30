"use client";

import { motion } from "framer-motion";

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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.32, 0, 0.08, 1] },
  }),
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="border-t border-zinc-200 pt-6"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
        {title}
      </p>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <main className="h-screen overflow-y-auto">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-1">
            Hi, I&apos;m Evan.
          </h1>
          <p className="text-zinc-500">
            Product Designer | Seeking Fall 2026 Internships
          </p>
        </motion.div>

        {/* ── Narrative ──────────────────────────────────────────────── */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 space-y-4 text-zinc-600 leading-relaxed"
        >
          <p>
            I&apos;m a third-year Global Business and Digital Arts student at the
            University of Waterloo, minoring in Entrepreneurship. I live at the
            intersection of business strategy, human-centric design, and AI
            orchestration.
          </p>
          <p>
            My goal is to understand how organizations truly scale. Whether I&apos;m
            leading the GBDA Society or sprinting through a 3-day design
            competition, I focus on bridging the gap between complex technical
            systems and meaningful user experiences.
          </p>
        </motion.div>

        {/* ── Leadership ─────────────────────────────────────────────── */}
        <Section title="Leadership" delay={2}>
          <div className="space-y-4">
            {[
              {
                role: "President, GBDA Society",
                location: "Waterloo, ON",
                period: "APR 2026 – PRESENT",
              },
              {
                role: "Dir. of Operations, GBDA Society",
                location: "Waterloo, ON",
                period: "DEC 2025 – APR 2026",
              },
              {
                role: "Ops. Coordinator, GBDA Society",
                location: "Waterloo, ON",
                period: "SEP 2025 – DEC 2025",
              },
            ].map((item) => (
              <div key={item.period} className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{item.role}</p>
                  <p className="text-xs text-zinc-400">{item.location}</p>
                </div>
                <p className="text-xs text-zinc-400 whitespace-nowrap shrink-0">{item.period}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Competitions ───────────────────────────────────────────── */}
        <Section title="Competitions" delay={3}>
          <div className="space-y-4">
            {[
              {
                event: "Laurier UXL",
                project: "AI Itinerary Travel App (Journey)",
                period: "MAR 2026",
              },
              {
                event: "FIGMA FigBuild",
                project: "Product Design with Figma Make AI",
                period: "FEB 2026",
              },
              {
                event: "UW Design Mosaic",
                project: "Workplace Solution Sprint",
                period: "APR 2024",
              },
            ].map((item) => (
              <div key={item.period} className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{item.event}</p>
                  <p className="text-xs text-zinc-400">{item.project}</p>
                </div>
                <p className="text-xs text-zinc-400 whitespace-nowrap shrink-0">{item.period}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Education ──────────────────────────────────────────────── */}
        <Section title="Education" delay={4}>
          <div className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-900">University of Waterloo</p>
                <p className="text-xs text-zinc-400">B.A. Global Business and Digital Arts</p>
              </div>
              <p className="text-xs text-zinc-400 whitespace-nowrap shrink-0">2024 – 2028</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900">Minor in Entrepreneurship</p>
              <p className="text-xs text-zinc-400">Honours Co-op Program</p>
            </div>
          </div>
        </Section>

        {/* ── Certifications ─────────────────────────────────────────── */}
        <Section title="Certifications" delay={5}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { issuer: "Google", name: "UX Design Professional Certificate" },
              { issuer: "Microsoft", name: "Designing for User Experience" },
              { issuer: "Microsoft", name: "Fundamentals of UI/UX Design" },
              { issuer: "Salesforce", name: "Career Journey with Deloitte" },
            ].map((cert) => (
              <div
                key={cert.name}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs font-medium text-zinc-700 leading-snug">{cert.name}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Personal ───────────────────────────────────────────────── */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="border-t border-zinc-200 pt-6"
        >
          <p className="text-sm text-zinc-500 leading-relaxed">
            Outside of design, I&apos;m deep-diving into AI prompt engineering,
            participating in case competitions, or exploring the intersection of
            entrepreneurship and digital culture.
          </p>
        </motion.div>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="border-t border-zinc-200 pt-6 mt-6"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Contact
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/evan-aucoin-184229354"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="mailto:eaucoin@uwaterloo.ca"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
            >
              <MailIcon className="w-4 h-4" />
              eaucoin@uwaterloo.ca
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}

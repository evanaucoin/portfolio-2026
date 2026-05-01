"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [thriftingOpen, setThriftingOpen] = useState(false);

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
            Aspiring Product Designer | Seeking Fall 2026 Internships
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
          {/* Paragraph 1 — academic intro with inline links */}
          <p>
            I&apos;m a third-year{" "}
            <a
              href="https://uwaterloo.ca/stratford-school-of-interaction-design-and-business/global-business-and-digital-arts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-blue-500 transition-colors"
            >
              Global Business and Digital Arts (GBDA)
            </a>{" "}
            student at the University of Waterloo, minoring in{" "}
            <a
              href="https://uwaterloo.ca/conrad-school-entrepreneurship-business/undergraduate-students/minor-entrepreneurship"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-blue-500 transition-colors"
            >
              Entrepreneurship (BET)
            </a>
            . Whether I&apos;m leading the GBDA Society or sprinting through a 3-day
            design competition, I focus on bridging the gap between technical
            systems and meaningful user experiences.
          </p>

          {/* Paragraph 2 — personal interests with thrifting accordion trigger */}
          <p>
            Outside of academics I have a passion for ping pong, weight lifting,
            collecting fragrances and funko pops, then also{" "}
            <button
              onClick={() => setThriftingOpen((v) => !v)}
              className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-blue-600 font-medium transition-colors ${
                thriftingOpen
                  ? "bg-blue-100"
                  : "bg-blue-50 hover:bg-blue-100"
              }`}
            >
              thrifting :)
              <motion.span
                animate={{ rotate: thriftingOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="inline-block text-xs leading-none"
              >
                ▾
              </motion.span>
            </button>
          </p>

          {/* Thrifting accordion */}
          <AnimatePresence initial={false}>
            {thriftingOpen && (
              <motion.div
                key="thrifting-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0, 0.08, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="pt-2 pb-1 space-y-4">
                  {/* YouTube embed — responsive 16:9 wrapper */}
                  <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/-me5MWMKBX0?si=yNa6nmsAKq4hQGwB"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  {/* Mission text */}
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <span className="font-semibold text-zinc-700">MISSION:</span>{" "}
                    What is The Greater Toronto Area&apos;s impact within the circular
                    economy? At 6am three of my buddies and I hopped in a car and
                    drove from Waterloo to downtown Toronto. We had the amazing
                    opportunity to speak and interview with the founder of{" "}
                    <a
                      href="https://www.designwith.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 font-medium underline underline-offset-2 decoration-zinc-300 hover:decoration-blue-500 transition-colors"
                    >
                      DESIGNwith
                    </a>
                    . There we learned how this circular design and research lab is
                    playing an active role in improving Toronto&apos;s sustainability and
                    aiding the community through employing immigrant and refugee
                    women. We also had the chance to see what is being done locally
                    to UWaterloo. We had the opportunity to receive backstage access
                    and learn from one of UWaterloo and Laurier&apos;s largest
                    initiatives,{" "}
                    <a
                      href="https://www.instagram.com/fashionforchange/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 font-medium underline underline-offset-2 decoration-zinc-300 hover:decoration-blue-500 transition-colors"
                    >
                      Fashion for Change
                    </a>
                    . This is where students build and play a role in the KW
                    region&apos;s sustainability efforts by repurposing clothing by
                    bringing it new life. Ultimately, I feel extremely grateful for
                    having a hand in this documentary&apos;s production as someone who
                    enjoys thrifting and having a helping hand in whatever way I
                    can for the community.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

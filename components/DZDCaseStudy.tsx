"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useView } from "@/components/ViewContext";

const SECTIONS = [
  { id: "intro",      label: "Intro"       },
  { id: "problem",    label: "Problem"     },
  { id: "solution",   label: "Solution"    },
  { id: "dashboard",  label: "Dashboard"   },
  { id: "nutrition",  label: "Nutrition"   },
  { id: "training",   label: "Training"    },
  { id: "data",       label: "Data"        },
  { id: "process",    label: "Process"     },
  { id: "reflection", label: "Reflection"  },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function DZDCaseStudy() {
  const [activeSection, setActiveSection] = useState<SectionId>("intro");
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setView } = useView();

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  // Scroll-spy: mark the section whose top edge has crossed 35 % of the viewport.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.35;
      let current: SectionId = "intro";
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= trigger) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="h-full overflow-y-auto bg-white">
      <div className="flex">

        {/* ── SIDEBAR ──────────────────────────────────────────────── */}
        <aside className="sticky top-0 h-screen w-[250px] flex-shrink-0 hidden lg:flex flex-col justify-between pt-24 pb-10 px-8 border-r border-zinc-100">
          <div>
            {/* Home — static escape hatch, above section links */}
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-sm font-medium text-zinc-400 hover:text-blue-600 transition-colors group w-full text-left"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
              Home
            </button>

            <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-1 block">
              Case Study
            </span>
            <p className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">DZD</p>

            <nav className="flex flex-col gap-3">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer back link — same action, consistent escape hatch */}
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-blue-600 transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
            Back to work
          </button>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 pt-32 pb-40">

            {/* ── INTRO ──────────────────────────────────────────────── */}
            <section id="intro" className="mb-32">

              {/* Project summary — intentional 12-col gutter grid */}
              <div className="grid grid-cols-12 gap-16 mb-20">

                {/* cols 1–7: title + description */}
                <div className="col-span-7">
                  <h1 className="text-5xl font-semibold text-zinc-900 tracking-tight mb-6 leading-tight">
                    DZD
                  </h1>
                  <p className="text-[17px] text-zinc-500 leading-loose">
                    DZD is an AI fitness companion. It cuts through the noise of TikTok and
                    ChatGPT to give you a clear plan. I built this concept to fix the
                    &lsquo;analysis paralysis&rsquo; that stops people from starting.
                    Built with Figma.
                  </p>
                </div>

                {/* col 8: intentional gutter — empty */}

                {/* cols 9–12: metadata */}
                <div className="col-span-4 col-start-9 flex flex-col pt-1">
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-4">Team</p>
                  <ul className="space-y-2 text-[15px] text-zinc-500">
                    <li>1 Designer (Me)</li>
                    <li>1 Developer (Me)</li>
                  </ul>
                  <p className="mt-auto pt-8 text-[15px] text-zinc-400">2026</p>
                </div>
              </div>

              {/* Walkthrough video — gallery frame */}
              <div className="relative rounded-3xl bg-zinc-100 p-10">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="absolute top-5 right-5 z-10 bg-white/80 backdrop-blur border border-zinc-200 p-2 rounded-full text-zinc-800 hover:bg-white transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="max-w-sm mx-auto w-full rounded-3xl shadow-lg block"
                >
                  <source src="/dzd_hero.mp4" type="video/mp4" />
                </video>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROBLEM ────────────────────────────────────────────── */}
            <section id="problem" className="py-32">
              <SectionLabel>Problem</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Analysis Paralysis
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                Most seekers are overwhelmed before they even hit the gym. You spend more time
                researching macros than actually lifting. People quit because they&rsquo;re
                tired of thinking, not because they&rsquo;re lazy.
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── SOLUTION ───────────────────────────────────────────── */}
            <section id="solution" className="py-32">
              <SectionLabel>Solution</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Remove the Decisions
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                DZD focuses on three daily habits: hit your protein, log your lift, and keep
                your streak. It turns complex science into a simple directive.{" "}
                <strong className="text-zinc-700 font-semibold">
                  If you don&rsquo;t have a goal, the AI builds one for you based on your
                  metrics so you can start immediately. It then tracks your progress in
                  real-time, automatically adjusting targets and suggesting exercise swaps so
                  the plan stays easy and evolves with you.
                </strong>
              </p>

              <div className="grid grid-cols-2 gap-6">
                <PhoneFrame>
                  <Image
                    src="/DZD01.AA-1.png"
                    alt="DZD onboarding — simplified goal setting"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 380px"
                  />
                </PhoneFrame>
                <PhoneFrame>
                  <Image
                    src="/DZD01.AA-2.png"
                    alt="DZD onboarding — goal clarity screen"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 380px"
                  />
                </PhoneFrame>
              </div>
              <Caption>Onboarding distills a fitness philosophy into a single directive.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── DASHBOARD ──────────────────────────────────────────── */}
            <section id="dashboard" className="py-32">
              <SectionLabel>Dashboard</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                The 14-Day Streak
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                14 days of consistency is the threshold where habits become automatic. The
                dashboard makes the streak the only number that matters — miss a day, it
                resets; hit 14, you level up.
              </p>

              <div className="flex justify-center">
                <PhoneFrame className="max-w-[280px] w-full">
                  <Image
                    src="/dzd_dashboard.png"
                    alt="DZD dashboard — 14-day streak and daily targets"
                    fill
                    className="object-contain"
                    sizes="280px"
                  />
                </PhoneFrame>
              </div>
              <Caption>One number. Consistency over perfection.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── NUTRITION ──────────────────────────────────────────── */}
            <section id="nutrition" className="py-32">
              <SectionLabel>Nutrition</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Frictionless Food Logging
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                The Anabolic Meter collapses all of nutrition into one question:{" "}
                <em>did you hit your protein?</em> The chatbot log accepts plain language —
                no barcode scanning, no database trawling.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <PhoneFrame>
                  <Image
                    src="/dzd_nutrition.png"
                    alt="DZD Anabolic Meter — radial protein progress indicator"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 380px"
                  />
                </PhoneFrame>
                <PhoneFrame>
                  <Image
                    src="/DZD02.frictionlessnutrution-2.png"
                    alt="DZD conversational food log — NLP meal tracking"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 380px"
                  />
                </PhoneFrame>
              </div>
              <Caption>Left: Anabolic Meter. Right: Conversational food log.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── TRAINING ───────────────────────────────────────────── */}
            <section id="training" className="py-32">
              <SectionLabel>Training</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Easy Subs — No Excuses
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                No equipment? No problem. The Easy Subs feature swaps exercises so you never
                have an excuse to skip a workout.
              </p>

              {/* ── Program UI component ─────────────────────────────── */}
              <div className="rounded-3xl bg-zinc-50 border border-zinc-100 p-8 space-y-8">

                {/* Split badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mr-2">Split</span>
                  {["Push", "Pull", "Legs", "Upper", "Lower"].map((s, i) => (
                    <span
                      key={s}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        i < 3
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-zinc-500 border-zinc-200"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Weekly calendar */}
                <div>
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">This week</p>
                  <div className="flex gap-2.5">
                    {[
                      { day: "M", active: true  },
                      { day: "T", active: true  },
                      { day: "W", active: false },
                      { day: "T", active: true  },
                      { day: "F", active: true  },
                      { day: "S", active: false },
                      { day: "S", active: false },
                    ].map(({ day, active }, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${
                          active
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-zinc-200 text-zinc-400"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Day card */}
                <div className="rounded-2xl bg-white border border-zinc-100 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <span className="text-sm font-semibold text-zinc-900">Push Day</span>
                    <span className="text-[10px] font-semibold tracking-widest text-blue-600 uppercase">Today</span>
                  </div>
                  <div className="divide-y divide-zinc-50">
                    {[
                      { name: "Bench Press",      sets: "3 × 5", sub: null },
                      { name: "Overhead Press",   sets: "2 × 6", sub: null },
                      { name: "Incline DB Press", sets: "3 × 8", sub: "Tap to swap → Cable Fly" },
                    ].map(({ name, sets, sub }) => (
                      <div key={name} className="flex items-center justify-between px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-zinc-800">{name}</p>
                          {sub && <p className="text-xs text-blue-500 mt-0.5">{sub}</p>}
                        </div>
                        <span className="text-xs font-semibold text-zinc-400 tabular-nums">{sets}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── DATA VIZ ───────────────────────────────────────────── */}
            <section id="data" className="py-32">
              <SectionLabel>Data</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Progress You Can See
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                Weight trends, workout frequency, and nutrition adherence — surfaced in a clean
                weekly view. Just enough signal to show the habits are compounding.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <PhoneFrame>
                  <Image
                    src="/dzd_progress.png"
                    alt="DZD progress chart — weight and workout trends over time"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 380px"
                  />
                </PhoneFrame>
                <PhoneFrame>
                  <Image
                    src="/DZD03.dataviz-2.png"
                    alt="DZD data visualization — adherence and performance metrics"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 380px"
                  />
                </PhoneFrame>
              </div>
              <Caption>Weekly progress data, designed to celebrate consistency.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROCESS ────────────────────────────────────────────────── */}
            <section id="process" className="py-32">
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                The Iterative Grind
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-16">
                DZD didn&rsquo;t start with abstract personas&mdash;it started with a personal need to
                solve real friction. The early work was messy: Kanban boards, scrapped UI directions,
                and mid-fidelity flows that got thrown out when the logic didn&rsquo;t hold. Every
                artifact here represents a decision point where clarity won over aesthetics.
              </p>

              {/* Work pod — grey container holding all process artifacts */}
              <div className="rounded-2xl bg-zinc-100 p-8 border border-zinc-200">

                {/* Row 1 — work1 large, work2 peeking below with slight tilt */}
                <div className="relative mb-4">
                  <div
                    className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-md z-10"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    <Image
                      src="/DZD.work1.png"
                      alt="DZD — Kanban planning and early scoping"
                      width={1200}
                      height={800}
                      className="w-full h-auto block"
                      sizes="(max-width: 1280px) 100vw, 768px"
                    />
                  </div>
                  <div
                    className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-sm z-0 -mt-14 ml-8"
                    style={{ transform: "rotate(1deg)" }}
                  >
                    <Image
                      src="/DZD.work2.png"
                      alt="DZD — early information architecture and user flows"
                      width={1200}
                      height={800}
                      className="w-full h-auto block"
                      sizes="(max-width: 1280px) 100vw, 768px"
                    />
                  </div>
                </div>

                {/* Row 2 — three-up grid: work3, work4, work5 */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/DZD.work3.png"
                      alt="DZD — scrapped UI direction"
                      width={600}
                      height={500}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 33vw, 256px"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/DZD.work4.png"
                      alt="DZD — mid-fidelity wireframe iteration"
                      width={600}
                      height={500}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 33vw, 256px"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/DZD.work5.png"
                      alt="DZD — component exploration"
                      width={600}
                      height={500}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 33vw, 256px"
                    />
                  </div>
                </div>

                {/* Row 3 — two-up grid: work6, work7 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/DZD.work6.png"
                      alt="DZD — interaction and navigation patterns"
                      width={800}
                      height={600}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 50vw, 384px"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/DZD.work7.png"
                      alt="DZD — final flow consolidation"
                      width={800}
                      height={600}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 50vw, 384px"
                    />
                  </div>
                </div>

                <p className="text-sm text-zinc-400 text-center mt-6 leading-snug">
                  Process artifacts: from Kanban planning to scrapped UI and mid-fidelity flows.
                </p>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── REFLECTION ───────────────────────────────────────────── */}
            <section id="reflection" className="py-32">
              <SectionLabel>Reflection</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                What I&rsquo;d Do Next
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                If I were to take this further, I&rsquo;d want to test the Anabolic Meter with
                real users to see if the color-coding actually changes their food choices. The
                hypothesis is that a single glanceable signal reduces cognitive load better than
                any calorie count — but that needs to be validated, not assumed.
              </p>
            </section>

            {/* ── NEXT PROJECT ─────────────────────────────────────────── */}
            <section className="pt-20 border-t border-zinc-100">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-12 block">
                Next Project
              </span>
              <div className="flex items-center justify-between gap-8 flex-wrap">
                <div>
                  <h2 className="text-7xl font-semibold text-zinc-900 tracking-tight leading-none mb-3">
                    PRISM
                  </h2>
                  <p className="text-zinc-500 text-lg">Designed to build social intelligence</p>
                  <Link
                    href="/prism"
                    onClick={(e) => { e.preventDefault(); setView("prism"); }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="relative w-72 h-44 rounded-2xl overflow-hidden border border-zinc-100 flex-shrink-0">
                  <Image
                    src="/PRISM_Card.png"
                    alt="PRISM project thumbnail"
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-[0.15em] text-blue-600 uppercase mb-4 block">
      {children}
    </span>
  );
}

function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 ${className}`}
    >
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-zinc-400 text-center mt-4 leading-snug">{children}</p>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useView } from "@/components/ViewContext";

const SECTIONS = [
  { id: "intro",     label: "Intro"      },
  { id: "problem",   label: "Problem"    },
  { id: "solution",  label: "Solution"   },
  { id: "dashboard", label: "Dashboard"  },
  { id: "nutrition", label: "Nutrition"  },
  { id: "training",  label: "Training"   },
  { id: "data",      label: "Data"       },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function DZDCaseStudy() {
  const [activeSection, setActiveSection] = useState<SectionId>("intro");
  const containerRef = useRef<HTMLDivElement>(null);
  const { setView } = useView();

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
            <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-1 block">
              Case Study
            </span>
            <p className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">DZD</p>

            <nav className="flex flex-col gap-1">
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

          <button
            onClick={() => setView("home")}
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Back to work
          </button>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-8 lg:px-14 pt-28 pb-32">

            {/* ── INTRO ──────────────────────────────────────────────── */}
            <section id="intro" className="mb-20">
              {/* Hero video */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-100 mb-10">
                <video autoPlay muted loop playsInline className="w-full block">
                  <source src="/dzd_hero.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["UX / Product Design", "iOS", "Health & Fitness", "2024"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl font-semibold text-zinc-900 tracking-tight mb-5 leading-tight">
                DZD
              </h1>
              <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl">
                A fitness companion that cuts through conflicting online health advice — turning
                complex nutrition science and adaptive workout programming into three simple
                daily habits.
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROBLEM ────────────────────────────────────────────── */}
            <section id="problem" className="py-20">
              <SectionLabel>Problem</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-6">
                Analysis Paralysis
              </h2>
              <div className="space-y-4 text-zinc-600 text-[17px] leading-relaxed">
                <p>
                  The modern fitness seeker is overwhelmed before they even lace up. TDEE
                  calculators return wildly different numbers depending on which formula they use.
                  TikTok pushes a new "optimal protocol" every week. Bodybuilding forums argue
                  macros to the decimal point.
                </p>
                <p>
                  The result isn't action — it's paralysis. Users spend hours researching the
                  perfect plan instead of taking imperfect action. By the time they've figured out
                  their ideal meal-prep schedule, they've lost the motivation to cook.
                </p>
                <p>
                  Existing apps compound the problem. MyFitnessPal returns 400+ results for
                  "chicken breast." Logging a meal becomes a 10-minute research session. Most
                  users quit within two weeks — not from lack of motivation, but from decision
                  fatigue.
                </p>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── SOLUTION ───────────────────────────────────────────── */}
            <section id="solution" className="py-20">
              <SectionLabel>Solution</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-6">
                Remove the Decisions
              </h2>
              <p className="text-zinc-600 text-[17px] leading-relaxed mb-10">
                DZD strips complexity to its essentials. The interface is built around three
                daily habits: hit your protein target, complete your workout, log your meals.
                No calorie arithmetic. No exercise science degree required. The onboarding
                distills an entire fitness philosophy into a single, actionable directive.
              </p>

              <div className="grid grid-cols-2 gap-4">
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
              <Caption>Onboarding distills complex fitness goals into a single clear directive.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── DASHBOARD ──────────────────────────────────────────── */}
            <section id="dashboard" className="py-20">
              <SectionLabel>Dashboard</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-6">
                The 14-Day Streak
              </h2>
              <p className="text-zinc-600 text-[17px] leading-relaxed mb-10">
                Behavioral science shows that habit formation requires roughly 14 days of
                consistent repetition before it becomes automatic. The dashboard elevates the
                streak as the primary KPI — one number that tells users everything they need to
                know about their consistency. Miss a day, the streak resets. Hit 14, unlock the
                next phase.
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
              <Caption>The streak is the central motivating mechanic — consistency over perfection.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── NUTRITION ──────────────────────────────────────────── */}
            <section id="nutrition" className="py-20">
              <SectionLabel>Nutrition</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-6">
                Frictionless Food Logging
              </h2>
              <p className="text-zinc-600 text-[17px] leading-relaxed mb-10">
                The Anabolic Meter is a radial progress indicator that condenses all of
                nutrition down to one question: <em>have you hit your protein today?</em> The
                chatbot-powered food log accepts natural language — "I had two eggs and toast"
                — eliminating barcode scanning and infinite database searches entirely.
              </p>

              <div className="grid grid-cols-2 gap-4">
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
              <Caption>Left: Anabolic Meter. Right: Conversational food log — no barcode scanning required.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── TRAINING ───────────────────────────────────────────── */}
            <section id="training" className="py-20">
              <SectionLabel>Training</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-6">
                Easy Subs — No Excuses
              </h2>
              <p className="text-zinc-600 text-[17px] leading-relaxed mb-10">
                "I don't have the equipment" is the most common reason people skip workouts.
                DZD eliminates this excuse with intelligent substitution logic. Can't do cable
                rows? The app swaps to dumbbell rows — same stimulus, different tool. Every
                exercise has a pre-vetted alternative so the session always gets completed.
              </p>

              <div className="flex justify-center">
                <PhoneFrame className="max-w-[280px] w-full">
                  <Image
                    src="/DZD_Workout.png"
                    alt="DZD workout screen with Easy Subs exercise substitution"
                    fill
                    className="object-contain"
                    sizes="280px"
                  />
                </PhoneFrame>
              </div>
              <Caption>Easy Subs removes the last barrier between a user and a completed workout.</Caption>
            </section>

            <hr className="border-zinc-100" />

            {/* ── DATA VIZ ───────────────────────────────────────────── */}
            <section id="data" className="py-20">
              <SectionLabel>Data</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-6">
                Progress You Can See
              </h2>
              <p className="text-zinc-600 text-[17px] leading-relaxed mb-10">
                The data layer is designed to motivate, not intimidate. Weight trends, workout
                frequency, and nutrition adherence surface in a clean weekly view. No
                overwhelming dashboards — just enough signal to confirm that the habits are
                compounding.
              </p>

              <div className="grid grid-cols-2 gap-4">
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
              <Caption>Weekly progress data, designed to celebrate consistency over time.</Caption>
            </section>

            {/* ── NEXT PROJECT ─────────────────────────────────────────── */}
            <section className="pt-16 border-t border-zinc-100">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-10 block">
                Next Project
              </span>
              <div className="flex items-center justify-between gap-8 flex-wrap">
                <div>
                  <h2 className="text-7xl font-semibold text-zinc-900 tracking-tight leading-none mb-3">
                    PRISM
                  </h2>
                  <p className="text-zinc-500 text-lg">Designed to build social intelligence</p>
                  <button
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
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

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useView } from "@/components/ViewContext";

const SECTIONS = [
  { id: "intro",      label: "Intro"      },
  { id: "problem",    label: "Problem"    },
  { id: "solution",   label: "Solution"   },
  { id: "process",    label: "Process"    },
  { id: "interface",  label: "Interface"  },
  { id: "reflection", label: "Reflection" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function JourneyCaseStudy() {
  const [activeSection, setActiveSection] = useState<SectionId>("intro");
  const containerRef = useRef<HTMLDivElement>(null);
  const { setView } = useView();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.35;
      let current: SectionId = "intro";
      for (const { id } of SECTIONS) {
        const el = document.getElementById(`journey-${id}`);
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
    const el = document.getElementById(`journey-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="h-full overflow-y-auto bg-white">
      <div className="flex">

        {/* ── SIDEBAR ──────────────────────────────────────────────── */}
        <aside className="sticky top-0 h-screen w-[250px] flex-shrink-0 hidden lg:flex flex-col justify-between pt-24 pb-10 px-8 border-r border-zinc-100">
          <div>
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-sm font-medium text-zinc-400 hover:text-amber-600 transition-colors group w-full text-left"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
              Home
            </button>

            <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-1 block">
              Case Study
            </span>
            <p className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">JOURNEY</p>

            <nav className="flex flex-col gap-3">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-amber-600 text-white"
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
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-amber-600 transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
            Back to work
          </button>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 pt-32 pb-40">

            {/* ── INTRO ──────────────────────────────────────────────── */}
            <section id="journey-intro" className="mb-24">

              {/* 12-col gutter grid */}
              <div className="grid grid-cols-12 gap-16 mb-20">

                {/* cols 1–7 */}
                <div className="col-span-7">
                  <h1 className="text-5xl font-semibold text-zinc-900 tracking-tight mb-6 leading-tight">
                    JOURNEY
                  </h1>
                  <p className="text-[17px] text-zinc-500 leading-loose">
                    Navigation apps are built for speed, but Journey is built for the experience.
                    Using AI, it turns travel from Toronto to NYC into a curated itinerary of stops
                    that actually matter to you. This project was my favorite because we prioritized
                    deep UX thinking over quick UI.
                  </p>
                </div>

                {/* col 8: intentional gutter */}

                {/* cols 9–12 */}
                <div className="col-span-4 col-start-9 flex flex-col pt-1">
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-4">Team</p>
                  <ul className="space-y-2 text-[15px] text-zinc-500">
                    <li>1 Design Lead</li>
                    <li>2 Designers (Me)</li>
                    <li>3 Researchers (Me)</li>
                  </ul>
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-2 mt-8">Role</p>
                  <p className="text-[15px] text-zinc-500">UX Architecture &amp; Wireframing</p>
                </div>
              </div>

              {/* ── HERO — editorial bleed, no container ── */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/Journey_preview.png"
                  alt="Journey — AI-curated road trip itinerary app"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 896px"
                  priority
                />
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROBLEM ────────────────────────────────────────────── */}
            <section id="journey-problem" className="py-32">
              <SectionLabel>Problem</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                The Route Problem
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                Navigation apps optimize for speed, making travel feel like a chore. We wanted
                to design an experience that emphasizes the journey itself, not just the
                destination.
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── SOLUTION ───────────────────────────────────────────── */}
            <section id="journey-solution" className="py-32">
              <SectionLabel>Solution</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                A Route That Knows You
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                Tell the AI you&rsquo;re driving from Toronto to NYC, and it builds a route
                based on your family&rsquo;s preferences — turning a boring drive into an
                adventure.
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROCESS ────────────────────────────────────────────── */}
            <section id="journey-process" className="py-32">
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                UX Before Pixels
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-16">
                I led the UX research and wireframing while the Design Lead focused on the
                final visual system. We spent weeks in ideation, using Kanban to manage our
                &ldquo;fail-fast&rdquo; iterations.
              </p>

              {/* ── Stacked Desk — kanban on top, wireframe peeking behind ── */}
              <div className="relative">
                {/* Kanban — front layer */}
                <div
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl z-10"
                  style={{ transform: "rotate(-0.75deg)" }}
                >
                  <Image
                    src="/Journey_kanban.png"
                    alt="Journey ideation — kanban board and task mapping"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 896px"
                  />
                </div>
                {/* Wireframe — back layer, peeking from below */}
                <div
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-xl z-0 -mt-20 ml-6"
                  style={{ transform: "rotate(1.25deg)" }}
                >
                  <Image
                    src="/Journey_wireframe.png"
                    alt="Journey wireframes — low-fidelity UX exploration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 896px"
                  />
                </div>
              </div>
              <p className="text-sm text-zinc-400 text-center mt-8 leading-snug">
                Kanban ideation (front) over low-fidelity wireframes (behind).
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── INTERFACE — merged itinerary + social ────────────────── */}
            <section id="journey-interface" className="py-32">
              <SectionLabel>Interface</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                The Final System
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-16">
                The final system combines AI-curated itineraries with a social layer for
                sharing travel snapshots.
              </p>

              {/* Side-by-side floating panels — no grey frames */}
              <div className="flex gap-8 items-start justify-center flex-wrap">
                <div className="max-w-sm w-full flex-1 min-w-[240px]">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/Journey_UI.png"
                      alt="Journey UI — AI-curated itinerary interface"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 text-center mt-4">Itinerary view</p>
                </div>
                <div className="max-w-sm w-full flex-1 min-w-[240px]">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/Journey_Social.png"
                      alt="Journey social feed — sharing curated travel stops"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 text-center mt-4">Social feed</p>
                </div>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── REFLECTION ─────────────────────────────────────────────── */}
            <section id="journey-reflection" className="py-32">
              <SectionLabel>Reflection</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Rigor Over Speed
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                Journey taught me that rigorous UX research is the foundation of a great
                product. By separating roles, we built a deeper itinerary system that AI can
                actually use to generate meaningful travel.
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
                    DZD
                  </h2>
                  <p className="text-zinc-500 text-lg">Redesigning the search experience for active living</p>
                  <Link
                    href="/dzd"
                    onClick={(e) => { e.preventDefault(); setView("dzd"); }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="relative w-72 h-44 rounded-2xl overflow-hidden border border-zinc-100 flex-shrink-0">
                  <Image
                    src="/dzd_3d.png"
                    alt="DZD project thumbnail"
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

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-[0.15em] text-amber-600 uppercase mb-4 block">
      {children}
    </span>
  );
}

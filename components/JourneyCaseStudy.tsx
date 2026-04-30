"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useView } from "@/components/ViewContext";

const SECTIONS = [
  { id: "intro",      label: "Intro"      },
  { id: "problem",    label: "Problem"    },
  { id: "solution",   label: "Solution"   },
  { id: "process",    label: "Process"    },
  { id: "interface",  label: "Interface"  },
  { id: "social",     label: "Social"     },
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
            <section id="journey-intro" className="mb-32">

              {/* Project summary — 12-col gutter grid */}
              <div className="grid grid-cols-12 gap-16 mb-20">

                {/* cols 1–7: title + description */}
                <div className="col-span-7">
                  <h1 className="text-5xl font-semibold text-zinc-900 tracking-tight mb-6 leading-tight">
                    JOURNEY
                  </h1>
                  <p className="text-[17px] text-zinc-500 leading-loose">
                    In a world obsessed with instant gratification, Journey redesigns the standard
                    navigation app. Instead of just giving you the fastest route from A to B, it
                    uses AI to curate a personalized itinerary of meaningful stops along the way.
                    It brings the magic back to the road trip.
                  </p>
                </div>

                {/* col 8: intentional gutter — empty */}

                {/* cols 9–12: metadata */}
                <div className="col-span-4 col-start-9 flex flex-col pt-1">
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-4">Team</p>
                  <ul className="space-y-2 text-[15px] text-zinc-500">
                    <li>1 Design Lead</li>
                    <li>2 Designers (Me)</li>
                    <li>3 Researchers (Me)</li>
                    <li>Team of 4</li>
                  </ul>
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-2 mt-8">Focus</p>
                  <p className="text-[15px] text-zinc-500">UX Research &amp; Wireframing</p>
                </div>
              </div>

              {/* Hero — wide gallery (no video) */}
              <div className="bg-zinc-50 rounded-[2.5rem] p-12 w-full">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/50">
                  <Image
                    src="/Journey_preview.png"
                    alt="Journey — AI-curated road trip itinerary app"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 896px"
                    priority
                  />
                </div>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROBLEM ────────────────────────────────────────────── */}
            <section id="journey-problem" className="py-32">
              <SectionLabel>Problem</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                The Joy Is in the Journey
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
                based on your family&rsquo;s preferences, turning a boring drive into an
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
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                While the Design Lead handled the final UI, I focused heavily on the UX. We
                spent weeks in ideation. This was my favorite project because we prioritized
                thoughtful systems over quick pixels.
              </p>

              <div className="rounded-[2.5rem] bg-zinc-50 border border-zinc-200/50 p-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
                    <Image
                      src="/Journey_kanban.png"
                      alt="Journey ideation — kanban board and task mapping"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
                    <Image
                      src="/Journey_wireframe.png"
                      alt="Journey wireframes — low-fidelity UX exploration"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
                <p className="text-sm text-zinc-400 text-center mt-8 leading-snug">
                  Left: Kanban ideation board. Right: Low-fidelity wireframes.
                </p>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── INTERFACE ──────────────────────────────────────────── */}
            <section id="journey-interface" className="py-32">
              <SectionLabel>Interface</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                The AI-Curated Itinerary
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                The final AI-curated itinerary.
              </p>

              <div className="rounded-[2.5rem] bg-zinc-50 border border-zinc-200/50 p-10">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100">
                  <Image
                    src="/Journey_UI.png"
                    alt="Journey UI — final AI-curated itinerary interface"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 800px"
                  />
                </div>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── SOCIAL ─────────────────────────────────────────────── */}
            <section id="journey-social" className="py-32">
              <SectionLabel>Social</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Share the Road
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                Travel is better shared. The social feed lets users share snapshots of their
                curated stops.
              </p>

              <div className="rounded-[2.5rem] bg-zinc-50 border border-zinc-200/50 p-10">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100">
                  <Image
                    src="/Journey_Social.png"
                    alt="Journey social feed — sharing curated travel stops"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 800px"
                  />
                </div>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── REFLECTION ─────────────────────────────────────────── */}
            <section id="journey-reflection" className="py-32">
              <SectionLabel>Reflection</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Rigor Over Speed
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                This team taught me the value of rigorous ideation. By separating the UX and UI
                roles, we were able to build a much deeper, more thoughtful product than if we
                had rushed straight to high-fidelity designs.
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
                  <button
                    onClick={() => setView("dzd")}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
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

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-[0.15em] text-amber-600 uppercase mb-4 block">
      {children}
    </span>
  );
}

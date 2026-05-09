"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useView } from "@/components/ViewContext";

const SECTIONS = [
  { id: "intro",      label: "Intro"      },
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
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 pt-32 pb-40">

            {/* ── INTRO ──────────────────────────────────────────────── */}
            <section id="journey-intro" className="mb-32">

              {/* 12-col gutter grid */}
              <div className="grid grid-cols-12 gap-16">

                {/* cols 1–7 */}
                <div className="col-span-7">
                  <h1 className="text-5xl font-semibold text-zinc-900 tracking-tight mb-6 leading-tight">
                    JOURNEY
                  </h1>
                  <p className="text-[17px] text-zinc-500 leading-loose mb-6">
                    Navigation apps are built for speed, but Journey is built for the experience.
                    Using AI, it turns travel from Toronto to NYC into a curated itinerary of stops
                    that actually matter to you. This project was my favorite because we prioritized
                    deep UX thinking over quick UI.
                  </p>
                  <p className="text-[17px] text-zinc-500 leading-loose mb-8">
                    This mobile app concept was built using Figma Design, Adobe Photoshop, and Claude
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                      <span className="text-[9px] font-semibold tracking-widest text-zinc-400 uppercase block mb-1.5">Problem</span>
                      <p className="text-[13px] text-zinc-600 leading-snug">Navigation apps optimize for speed, reducing travel to a chore instead of an experience.</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
                      <span className="text-[9px] font-semibold tracking-widest text-amber-600 uppercase block mb-1.5">Solution</span>
                      <p className="text-[13px] text-zinc-700 leading-snug">An AI that builds personalized routes around your interests &mdash; turning the drive into the destination.</p>
                    </div>
                  </div>
                </div>

                {/* cols 9–12 */}
                <div className="col-span-4 col-start-9 flex flex-col pt-1">
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-4">Team</p>
                  <ul className="space-y-2 text-[15px] text-zinc-500">
                    <li>1 Design Lead</li>
                    <li>2 Designers (Me)</li>
                    <li>3 Researchers (Me)</li>
                    <li>3 Ideated with</li>
                  </ul>
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-4 mt-8">Role</p>
                  <p className="text-[15px] text-zinc-500">User Research, Ideation, Wireframing, UX design</p>
                </div>
              </div>
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

              {/* Featured mockup + Problem/Solution pods */}
              <div className="flex gap-6 items-center mb-14">
                <div className="flex-1 min-w-0 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Journey_UI.png"
                    alt="Journey UI — AI-curated itinerary interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
                <div className="flex flex-col gap-4 w-[240px] flex-shrink-0">
                  <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
                    <span className="text-[9px] font-semibold tracking-widest text-zinc-400 uppercase block mb-2">Problem</span>
                    <p className="text-[13px] text-zinc-700 leading-snug">Navigation apps optimize for speed, making travel feel like a chore instead of an experience worth having.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 shadow-sm">
                    <span className="text-[9px] font-semibold tracking-widest text-amber-600 uppercase block mb-2">Solution</span>
                    <p className="text-[13px] text-zinc-700 leading-snug">Tell the AI your route and it curates stops around your preferences &mdash; turning a boring drive into an adventure.</p>
                  </div>
                </div>
              </div>

              {/* Preview hero */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-8">
                <Image
                  src="/Journey_preview.png"
                  alt="Journey — AI-curated road trip itinerary app"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 896px"
                />
              </div>

              {/* Social feed */}
              <div className="max-w-sm mx-auto">
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

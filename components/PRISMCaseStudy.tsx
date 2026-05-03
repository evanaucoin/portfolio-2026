"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useView } from "@/components/ViewContext";

const SECTIONS = [
  { id: "intro",      label: "Intro"        },
  { id: "problem",    label: "Problem"      },
  { id: "personas",   label: "Personas"     },
  { id: "process",    label: "Process"      },
  { id: "solution",   label: "Solution"     },
  { id: "dashboard",  label: "Dashboard"    },
  { id: "practice",   label: "Practice"     },
  { id: "insights",   label: "Insights"     },
  { id: "privacy",    label: "Privacy"      },
  { id: "reflection", label: "Reflection"   },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function PRISMCaseStudy() {
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.35;
      let current: SectionId = "intro";
      for (const { id } of SECTIONS) {
        const el = document.getElementById(`prism-${id}`);
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
    const el = document.getElementById(`prism-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="h-full overflow-y-auto bg-zinc-50">
      <div className="flex">

        {/* ── SIDEBAR ──────────────────────────────────────────────── */}
        <aside className="sticky top-0 h-screen w-[250px] flex-shrink-0 hidden lg:flex flex-col justify-between pt-24 pb-10 px-8 bg-white border-r border-zinc-100">
          <div>
            {/* Home — escape hatch */}
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-sm font-medium text-zinc-400 hover:text-emerald-700 transition-colors group w-full text-left"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
              Home
            </button>

            <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-1 block">
              Case Study
            </span>
            <p className="text-xl font-semibold text-zinc-900 mb-8 tracking-tight">PRISM</p>

            <nav className="flex flex-col gap-3">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-emerald-700 text-white"
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
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-emerald-700 transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
            Back to work
          </button>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 lg:px-16 pt-32 pb-40">

            {/* ── INTRO ──────────────────────────────────────────────── */}
            <section id="prism-intro" className="mb-32">

              {/* Project summary — 12-col gutter grid */}
              <div className="grid grid-cols-12 gap-16 mb-20">

                {/* cols 1–7: title + description */}
                <div className="col-span-7">
                  <h1 className="text-5xl font-semibold text-zinc-900 tracking-tight mb-6 leading-tight">
                    PRISM
                  </h1>
                  <p className="text-[17px] text-zinc-500 leading-loose">
                    Why does 10 minutes of conversation sometimes feel like a test? PRISM is a
                    social intelligence platform that turns invisible cues into clear insights.
                    It helps the socially overwhelmed navigate interpersonal success. Built with
                    Figma Design and Figma Make.
                  </p>
                </div>

                {/* col 8: intentional gutter — empty */}

                {/* cols 9–12: metadata */}
                <div className="col-span-4 col-start-9 flex flex-col pt-1">
                  <p className="text-xs font-semibold text-zinc-900 tracking-widest uppercase mb-4">Team</p>
                  <ul className="space-y-2 text-[15px] text-zinc-500">
                    <li>3 Designers (Me)</li>
                    <li>1 Developer (Me)</li>
                    <li>1 Researcher</li>
                    <li>3 Ideated with</li>
                  </ul>
                  <p className="mt-auto pt-8 text-[15px] text-zinc-400">2026</p>
                </div>
              </div>

              {/* Hero video — phone pod */}
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
                  <source src="/PRISM_demo.mp4" type="video/mp4" />
                </video>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROBLEM ────────────────────────────────────────────── */}
            <section id="prism-problem" className="py-32">
              <SectionLabel>Problem</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Social Exhaustion
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                Social cues are often biological barriers, not just social ones. 40% of young
                professionals report &lsquo;social exhaustion&rsquo; as their main barrier to
                success. PRISM bridges the gap.
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PERSONAS ───────────────────────────────────────────── */}
            <section id="prism-personas" className="py-32">
              <SectionLabel>Discovery</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Defining the User
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-16">
                Social friction is universal, but its impact is most critical in the workplace. I
                anchored the design in three archetypes: Alex, whose indecision is eased by
                reviewing specific word choices; Sarah, who manages anxiety with leadership through
                real-time conversational progression; and Elliot, a manager building self-assurance
                by confirming his conviction against how he&rsquo;s actually perceived. Solving for
                these professional anxieties shifted PRISM from a generic data tracker to a tool for
                building confidence.
              </p>

              {/* Persona artifact — constrained, embedded feel */}
              <div className="mx-auto max-w-2xl">
                <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
                  <div className="relative w-full">
                    <Image
                      src="/PRISM_persona.png"
                      alt="PRISM user personas — Alex, Sarah, and Elliot"
                      width={1200}
                      height={800}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                </div>
                <p className="text-sm text-zinc-400 text-center mt-4 leading-snug">
                  The three personas whose social challenges shaped every design decision.
                </p>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PROCESS ────────────────────────────────────────────── */}
            <section id="prism-process" className="py-32">
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Three Days of Friction
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-16">
                We built the PRISM concept during a compressed 3-day sprint, prioritizing system
                logic over polished aesthetics. Day 1 was spent scoping competitors and translating
                user stories into raw wireframes. By Day 2, we were pressure-testing user flows
                through mid-fidelity prototypes, eventually unifying the architecture on Day 3. This
                &ldquo;fail-fast&rdquo; approach ensured every design decision was rooted in
                functional UX before we ever touched the final UI.
              </p>

              {/* Stacked workspace — light container, images layered like pinned artifacts */}
              <div className="rounded-2xl bg-zinc-100 p-8 border border-zinc-200">
                <div className="relative">
                  {/* Front layer — work1, slight counter-clockwise tilt */}
                  <div
                    className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-md z-10"
                    style={{ transform: "rotate(-0.75deg)" }}
                  >
                    <Image
                      src="/PRISM.work1.png"
                      alt="PRISM — competitor scoping and system logic"
                      width={1200}
                      height={800}
                      className="w-full h-auto block"
                      sizes="(max-width: 1280px) 100vw, 768px"
                    />
                  </div>
                  {/* Back layer — work2, peeking from below */}
                  <div
                    className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-sm z-0 -mt-16 ml-6"
                    style={{ transform: "rotate(1.25deg)" }}
                  >
                    <Image
                      src="/PRISM.work2.png"
                      alt="PRISM — architecture and user flow mapping"
                      width={1200}
                      height={800}
                      className="w-full h-auto block"
                      sizes="(max-width: 1280px) 100vw, 768px"
                    />
                  </div>
                </div>

                {/* Bottom strip — work3 + work4 side by side */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/PRISM.work3.png"
                      alt="PRISM — mid-fidelity wireframe iteration"
                      width={800}
                      height={600}
                      className="w-full h-auto block"
                      sizes="(max-width: 640px) 50vw, 384px"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-200">
                    <Image
                      src="/PRISM.work4.png"
                      alt="PRISM — visual metaphor and interaction sketches"
                      width={800}
                      height={600}
                      className="w-full h-auto block"
                      sizes="(max-width: 640px) 50vw, 384px"
                    />
                  </div>
                </div>

                <p className="text-sm text-zinc-400 text-center mt-6 leading-snug">
                  3-day sprint artifacts: from competitor scoping to mid-fidelity flows.
                </p>
              </div>
            </section>

            <hr className="border-zinc-100" />

            {/* ── SOLUTION ───────────────────────────────────────────── */}
            <section id="prism-solution" className="py-32">
              <SectionLabel>Solution</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Refract the Signal
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                PRISM captures interactions via smartphone or Meta Glasses to reveal
                communication patterns.{" "}
                <strong className="text-zinc-700 font-semibold">
                  It uses AI to refract chaotic social &lsquo;vibes&rsquo; into a visible
                  spectrum of data. If you&rsquo;re stuck, it suggests specific skill-building
                  quizzes so you can master conversations in real-time.
                </strong>
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── DASHBOARD ──────────────────────────────────────────── */}
            <section id="prism-dashboard" className="py-32">
              <SectionLabel>Dashboard</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Your Social Spectrum
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                The dashboard surfaces your communication patterns at a glance — turning
                recorded sessions into an actionable breakdown of tone, cadence, and
                engagement.
              </p>

              <GalleryContainer caption="Left: Dashboard overview. Right: Active recording session.">
                <ScreenPod src="/prism_dashboard.png" alt="PRISM dashboard — social spectrum overview" />
                <ScreenPod src="/prism_recording.png" alt="PRISM recording session — live interaction capture" />
              </GalleryContainer>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PRACTICE ───────────────────────────────────────────── */}
            <section id="prism-practice" className="py-32">
              <SectionLabel>Practice</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Skill-Building in Real-Time
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                When patterns suggest a skill gap, PRISM surfaces targeted quizzes and
                scenarios. Practice sessions simulate real conversations so improvements carry
                over immediately.
              </p>

              <GalleryContainer caption="Targeted quizzes surface the exact skill needed in the moment.">
                <ScreenPod src="/prism_practice_hub.png" alt="PRISM practice hub — skill selection" />
                <ScreenPod src="/prism_practice_quiz.png" alt="PRISM practice quiz — guided scenario" />
              </GalleryContainer>
            </section>

            <hr className="border-zinc-100" />

            {/* ── INSIGHTS ───────────────────────────────────────────── */}
            <section id="prism-insights" className="py-32">
              <SectionLabel>Insights</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                See the Full Spectrum
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl mb-14">
                Post-session insights break down every dimension of an interaction — what
                worked, what to refine, and how your social intelligence is trending over time.
              </p>

              <GalleryContainer caption="Longitudinal insights track how your communication evolves.">
                <ScreenPod src="/prism_insights_main.png" alt="PRISM insights — post-session breakdown" />
                <ScreenPod src="/prism_insights_detail.png" alt="PRISM insights — detail view" />
              </GalleryContainer>
            </section>

            <hr className="border-zinc-100" />

            {/* ── PRIVACY ────────────────────────────────────────────── */}
            <section id="prism-privacy" className="py-32">
              <SectionLabel>Privacy</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Consent First
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                Consent is the first screen. The app requires confirmation that the other party
                is aware of the recording. The glasses LED is always active. There is no silent
                mode.
              </p>
            </section>

            <hr className="border-zinc-100" />

            {/* ── REFLECTION ─────────────────────────────────────────── */}
            <section id="prism-reflection" className="py-32">
              <SectionLabel>Reflection</SectionLabel>
              <h2 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-8">
                Light Through the Lens
              </h2>
              <p className="text-zinc-500 text-[17px] leading-loose max-w-xl">
                PRISM acts as the lens that refracts social light. By turning intangible vibes
                into data, we empower users to see the full color of every conversation. My
                next step is testing how haptic feedback affects social anxiety in real-time.
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
                    JOURNEY
                  </h2>
                  <p className="text-zinc-500 text-lg">Redesigning navigation for the modern traveler</p>
                  <Link
                    href="/journey"
                    onClick={(e) => { e.preventDefault(); setView("journey"); }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="relative w-72 h-44 rounded-2xl overflow-hidden border border-zinc-100 flex-shrink-0">
                  <Image
                    src="/JOURNEY_Card.png"
                    alt="Journey project thumbnail"
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
    <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-700 uppercase mb-4 block">
      {children}
    </span>
  );
}

function GalleryContainer({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="rounded-[2.5rem] bg-white border border-zinc-200/50 shadow-sm p-12">
      <div className="grid grid-cols-2 gap-8">
        {children}
      </div>
      {caption && (
        <p className="text-sm text-zinc-400 text-center mt-8 leading-snug">{caption}</p>
      )}
    </div>
  );
}

function ScreenPod({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[9/19.5] rounded-3xl overflow-hidden bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 50vw, 380px"
      />
    </div>
  );
}

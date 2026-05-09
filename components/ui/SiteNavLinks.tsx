import Link from "next/link";

const linkClass =
  "text-left px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-200 block w-full";

export default function SiteNavLinks() {
  return (
    <nav className="flex flex-col gap-1 mb-10" aria-label="Site">
      <span className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase mb-2 block">
        Site
      </span>
      <Link href="/about" className={linkClass}>
        About
      </Link>
      <Link href="/playground" className={linkClass}>
        Playground
      </Link>
      <Link href="/workflow" className={linkClass}>
        Workflow
      </Link>
      <a
        href="https://www.linkedin.com/in/evan-aucoin-184229354"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LinkedIn
      </a>
      <a
        href="mailto:eaucoin@uwaterloo.ca"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Email
      </a>
    </nav>
  );
}

import Link from "next/link";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="flex items-center justify-between px-12 py-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900"
        >
          Evan Aucoin
        </Link>
        <ul className="flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

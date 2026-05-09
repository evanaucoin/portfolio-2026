'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import './BubbleMenu.css';
import { useView } from '@/components/ViewContext';

interface MenuItem {
  label: string;
  href: string;
  rotation: number;
  target?: string;
  rel?: string;
}

interface BubbleMenuProps {
  items?: MenuItem[];
  logo?: React.ReactNode;
}

const defaultItems: MenuItem[] = [
  { label: 'about',      href: '/about',                                                   rotation:  5 },
  { label: 'playground', href: '/playground',                                             rotation:  3 },
  { label: 'workflow',   href: '/workflow',                                               rotation: -4 },
  { label: 'linkedin',   href: 'https://www.linkedin.com/in/evan-aucoin-184229354',        rotation:  7, target: '_blank', rel: 'noopener noreferrer' },
  { label: 'email',      href: 'mailto:eaucoin@uwaterloo.ca',                              rotation: -6, target: '_blank' },
];

export default function BubbleMenu({
  items = defaultItems,
  logo = <span>Evan AuCoin</span>,
}: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();
  const { view, setView } = useView();
  const showCenterNav = pathname === '/' && view === 'home';

  // Hide all bubbles on mount before first interaction
  useEffect(() => {
    const els = bubblesRef.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(els, { scale: 0, opacity: 0, y: -8 });
  }, []);

  // Animate bubbles in or out when menu state changes
  useEffect(() => {
    if (isOpen) {
      items.forEach((item, i) => {
        const el = bubblesRef.current[i];
        if (!el) return;
        gsap.to(el, {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: item.rotation,
          delay: i * 0.08,
          ease: 'back.out(1.7)',
          duration: 0.45,
        });
      });
    } else {
      const els = [...bubblesRef.current].reverse();
      els.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          scale: 0,
          opacity: 0,
          y: -8,
          rotation: 0,
          delay: i * 0.05,
          ease: 'power2.in',
          duration: 0.25,
        });
      });
    }
  }, [isOpen, items]);

  return (
    <nav className="bubble-nav">
      <Link
        href="/"
        className="bubble-logo"
        aria-label="Evan AuCoin home"
        onClick={(e) => {
          if (pathname === '/' && view !== 'home') {
            e.preventDefault();
            setView('home');
          }
        }}
      >
        {logo}
      </Link>

      {/* Center nav — home deck only (not case study views); hidden on mobile, visible md+ */}
      {showCenterNav && (
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          <Link href="/about" className="text-zinc-400 font-medium text-sm hover:text-zinc-900 transition-colors">About</Link>
          <Link href="/playground" className="text-zinc-400 font-medium text-sm hover:text-zinc-900 transition-colors">Playground</Link>
          <Link href="/workflow" className="text-zinc-400 font-medium text-sm hover:text-zinc-900 transition-colors">Workflow</Link>
        </div>
      )}

      <div className="bubble-controls">
        <div
          className="bubble-items"
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          {items.map((item, i) => (
            <div
              key={item.href}
              ref={(el) => {
                bubblesRef.current[i] = el;
              }}
              className="bubble"
            >
              <Link
                href={item.href}
                className="pill-link"
                target={item.target}
                rel={item.rel}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Hamburger → ✕ toggle — do not modify this logic */}
        <button
          className={`bubble-toggle${isOpen ? ' open' : ''}`}
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span className="line line-1" />
          <span className="line line-2" />
        </button>
      </div>
    </nav>
  );
}

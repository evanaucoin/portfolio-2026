'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
  { label: 'home',     href: '/',                                                        rotation: -8 },
  { label: 'about',    href: '/about',                                                   rotation:  5 },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/evan-aucoin-184229354',        rotation:  7, target: '_blank', rel: 'noopener noreferrer' },
  { label: 'email',    href: 'mailto:eaucoin@uwaterloo.ca',                              rotation: -6, target: '_blank' },
];

export default function BubbleMenu({
  items = defaultItems,
  logo = <span>Evan AuCoin</span>,
}: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const { view, setView } = useView();

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
      <Link href="/" className="bubble-logo">
        {logo}
      </Link>

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
                onClick={(e) => {
                  if (item.href === '/' && view !== 'home') {
                    e.preventDefault();
                    setView('home');
                  }
                  setIsOpen(false);
                }}
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

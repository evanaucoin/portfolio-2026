import BubbleMenu from './BubbleMenu';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <BubbleMenu
        items={[
          { label: 'home',     href: '/',                                                 rotation: -8 },
          { label: 'about',    href: '/about',                                            rotation:  5 },
          { label: 'linkedin', href: 'https://www.linkedin.com/in/evan-aucoin-184229354', rotation:  7, target: '_blank', rel: 'noopener noreferrer' },
          { label: 'email',    href: 'mailto:eaucoin@uwaterloo.ca',                       rotation: -6, target: '_blank' },
        ]}
        logo={
          <div className="flex flex-col">
            <span>Evan AuCoin</span>
            <div className="font-mono text-[9px] text-zinc-400 mt-1 leading-relaxed">
              <p className="font-semibold">BUILD_MANIFEST_v1.0</p>
              <p>BUILT WITH: Vibe Coding / Cursor / LLM</p>
              <p>STACK: Next.js 15 / React 19 / TS</p>
              <p>UI: Tailwind / Framer Motion</p>
              <p>DEPLOY: Vercel / Git</p>
            </div>
          </div>
        }
      />
    </header>
  );
}

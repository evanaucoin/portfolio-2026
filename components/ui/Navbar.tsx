import BubbleMenu from './BubbleMenu';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <BubbleMenu
        items={[
          { label: 'about', href: '/about', rotation: -5 },
          { label: 'resume', href: '/resume', rotation: 5 },
        ]}
        logo={<span>Evan AuCoin</span>}
      />
    </header>
  );
}

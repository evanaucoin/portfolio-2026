import BubbleMenu from './BubbleMenu';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <BubbleMenu
        items={[
          { label: 'home',     href: '/',                                  rotation: -8 },
          { label: 'about',    href: '/about',                             rotation:  5 },
          { label: 'resume',   href: '/resume',                            rotation: -3 },
          { label: 'linkedin', href: 'https://linkedin.com/in/evanaucoin', rotation:  7 },
          { label: 'email',    href: 'mailto:evan@evanaucoin.com',         rotation: -6 },
        ]}
        logo={<span>Evan AuCoin</span>}
      />
    </header>
  );
}

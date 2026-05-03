import BubbleMenu from './BubbleMenu';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <BubbleMenu
        items={[
          { label: '← home',   href: '/',                                                 rotation:  0 },
          { label: 'about',    href: '/about',                                            rotation:  5 },
          { label: 'linkedin', href: 'https://www.linkedin.com/in/evan-aucoin-184229354', rotation:  7, target: '_blank', rel: 'noopener noreferrer' },
          { label: 'email',    href: 'mailto:eaucoin@uwaterloo.ca',                       rotation: -6, target: '_blank' },
        ]}
        logo={<span>Evan AuCoin</span>}
      />
    </header>
  );
}

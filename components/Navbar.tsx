'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0e14]/80 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/profile1.jpg"
            alt="Ifesinachi Sunday Udekwe"
            className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors shadow-lg"
          />
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 overflow-x-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-blue-400 font-semibold'
                    : 'hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
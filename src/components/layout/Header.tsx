'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const [tokenBalance] = useState(0);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/games', label: 'Play' },
    { href: '/shop', label: 'Shop' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/withdraw', label: 'Withdraw' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(139,92,246,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-shadow">
                <span className="text-white font-bold text-xl">B</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white">Brawl</span>
              <span className="text-lg font-bold text-gradient">Tokens</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* Token Balance */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13131a] border border-[rgba(139,92,246,0.2)]">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#f6a21a] to-[#ffd700]"></div>
                  <span className="text-[#fbbf24] font-semibold">{tokenBalance.toLocaleString()}</span>
                </div>

                {/* Profile */}
                <Link href="/profile" className="avatar w-10 h-10 bg-[#13131a] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#8b5cf6]/30 to-[#06b6d4]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 text-muted hover:text-white transition-colors text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[rgba(139,92,246,0.1)] transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(139,92,246,0.1)]">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link mt-2 pt-2 border-t border-[rgba(139,92,246,0.1)]"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

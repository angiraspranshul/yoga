'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Settings } from '@/types';
import BrandLogo from '@/components/brand/BrandLogo';
import { NAV_LINKS, SERVICES } from '@/content/home';

interface NavbarProps {
  /** Accepted for compatibility with existing pages; not needed for the nav itself. */
  settings?: Settings | null;
}

export default function Navbar(_props: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';
  const bookRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Close menus after navigating to another page.
  useEffect(() => {
    setIsOpen(false);
    setBookOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes either menu; clicking outside closes the Book Now panel;
  // growing to desktop width closes the mobile menu.
  useEffect(() => {
    if (!isOpen && !bookOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setBookOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (bookRef.current && !bookRef.current.contains(e.target as Node)) setBookOpen(false);
    };
    const mq = window.matchMedia('(min-width: 1280px)');
    const onMq = () => mq.matches && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      mq.removeEventListener('change', onMq);
    };
  }, [isOpen, bookOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-rose transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_0_rgba(62,42,38,0.12),0_8px_24px_-16px_rgba(62,42,38,0.45)]' : ''
      }`}
    >
      <div className="brand-container flex h-[72px] items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-umber"
          aria-label="Dharana home"
        >
          <BrandLogo variant="lockup" className="w-[118px] sm:w-[136px]" priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative font-sans text-[15px] text-umber after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-umber after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline-none ${
                isActive(link.href) ? 'font-medium after:scale-x-100' : 'after:scale-x-0'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Book Now: lists every kind of offering, not just online classes. */}
          <div ref={bookRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setBookOpen((v) => !v)}
              aria-expanded={bookOpen}
              aria-controls="book-menu"
              className="btn-primary gap-1.5 px-6 py-2.5 duration-150"
            >
              Book Now
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${bookOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {bookOpen && (
              <div
                id="book-menu"
                className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-line bg-cream p-2 shadow-[0_24px_48px_-20px_rgba(62,42,38,0.45)]"
              >
                <p className="px-3 pb-1 pt-2 text-xs uppercase tracking-[0.18em] text-umber-muted">Choose an offering</p>
                <ul>
                  {SERVICES.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={() => setBookOpen(false)}
                        className="block rounded-xl px-3 py-2.5 transition-colors duration-100 hover:bg-blush-light focus-visible:bg-blush-light focus-visible:outline-none"
                      >
                        <span className="block font-medium text-umber">{s.title}</span>
                        <span className="block text-sm font-light leading-snug text-umber-muted">{s.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="rounded-full p-2 text-umber transition-colors duration-150 hover:bg-umber/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-umber xl:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-umber/15 bg-rose xl:hidden"
        >
          <ul className="brand-container flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block border-b border-umber/10 py-3 font-serif text-2xl text-umber ${
                    isActive(link.href) ? 'font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pb-4 pt-5">
              <p className="brand-eyebrow pb-3 text-umber">Book now</p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl bg-umber px-3 py-3 text-center text-sm font-medium text-ivory transition-colors duration-100 active:bg-umber-light"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

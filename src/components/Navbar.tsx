'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating navbar once user scrolls past roughly 40% of the viewport (sliding past the hero)
      const threshold = window.innerHeight * 0.45;
      const scrolledPast = window.scrollY > threshold;
      setIsVisible(scrolledPast);
      if (!scrolledPast && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <div
      className={`fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-8'
      }`}
    >
      <header className="w-full max-w-5xl rounded-full bg-cream/90 backdrop-blur-xl border border-cream-dark/80 shadow-xl shadow-olive/10 py-2.5 px-5 sm:px-7 pointer-events-auto flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="font-serif italic font-normal text-lg sm:text-xl text-olive tracking-tight group-hover:text-sage-dark transition-colors">
            Yoga with Dhaarna
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-olive/75">
          <a href="#practice" className="hover:text-olive transition-colors">
            The Practice
          </a>
          <a href="#story" className="hover:text-olive transition-colors">
            Story
          </a>
          <a href="#journey" className="hover:text-olive transition-colors">
            The Journey
          </a>
          <a href="#classes" className="hover:text-olive transition-colors">
            Classes
          </a>
          <a href="#moments" className="hover:text-olive transition-colors">
            Moments
          </a>
          <a href="#faq" className="hover:text-olive transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="/admin"
            className="hidden lg:flex items-center gap-1 text-xs font-medium text-olive/60 hover:text-olive transition-colors px-2.5 py-1 rounded-full hover:bg-olive/5"
            title="Instructor Admin Portal"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </a>

          <a
            href="#classes"
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-olive hover:bg-olive-light text-cream transition-all shadow-sm active:scale-95"
          >
            Book Session
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-olive hover:opacity-75 transition-opacity"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Floating Card */}
      {isOpen && (
        <div className="w-full max-w-sm mt-2 rounded-3xl bg-cream/95 backdrop-blur-2xl border border-cream-dark/80 shadow-2xl p-6 pointer-events-auto animate-fadeIn md:hidden">
          <div className="flex flex-col gap-3 text-sm font-normal text-olive">
            <a
              href="#practice"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50"
            >
              The Practice
            </a>
            <a
              href="#story"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50"
            >
              Watch Dhaarna&apos;s Story
            </a>
            <a
              href="#journey"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50"
            >
              The Journey of One Hour
            </a>
            <a
              href="#classes"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50"
            >
              Classes &amp; Offerings
            </a>
            <a
              href="#moments"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50"
            >
              Moments from the Mat
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50"
            >
              FAQ
            </a>
            <a
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="py-2 border-b border-cream-dark/50 flex items-center gap-2 text-xs text-olive/60"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Instructor Admin Portal</span>
            </a>
            <a
              href="#classes"
              onClick={() => setIsOpen(false)}
              className="w-full mt-2 py-3 rounded-full text-center text-sm font-medium bg-olive text-cream shadow-sm"
            >
              Book your session
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

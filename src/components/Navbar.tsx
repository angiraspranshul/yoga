'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowUpRight, Instagram } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. ANNOUNCEMENT TICKER */}
      <div className="w-full bg-[#f4efe6] border-b border-[#e8e2d5] text-olive/80 text-[11px] sm:text-xs py-2 px-4 text-center font-sans tracking-tight flex items-center justify-center gap-2 relative z-50">
        <span>Live Online Cohorts · October 2026 · Intimate groups of 15 students</span>
        <a
          href="#classes"
          className="font-medium text-olive hover:text-sage-dark inline-flex items-center gap-0.5 ml-1 transition-colors group underline underline-offset-2"
        >
          <span>Reserve your spot</span>
          <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </a>
      </div>

      {/* 2. PRIMARY NAVBAR */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-sm border-b border-cream-dark py-3'
            : 'bg-cream/80 backdrop-blur-sm border-b border-cream-dark/60 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="font-serif italic font-normal text-xl sm:text-2xl text-olive tracking-tight group-hover:text-sage-dark transition-colors">
              Yoga with Dhaarna
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-olive/75">
            <a href="#practice" className="hover:text-olive transition-colors">
              The Practice
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
          <div className="flex items-center gap-3">
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
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-olive hover:bg-olive-light text-cream transition-all shadow-sm active:scale-95"
            >
              Book your session
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-olive hover:opacity-75 transition-opacity"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-cream border-b border-cream-dark px-6 py-6 shadow-lg animate-fadeIn">
            <div className="flex flex-col gap-4 text-base font-normal text-olive">
              <a
                href="#practice"
                onClick={() => setIsOpen(false)}
                className="py-2 border-b border-cream-dark/50"
              >
                The Practice
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
      </header>
    </>
  );
}

'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-olive">
      {/* Background Photography (Himachal Pradesh sunrise mountain atmosphere) */}
      <img
        src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2000&q=80"
        alt="Serene yoga practice at sunrise in Himachal Pradesh"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Atmospheric Olive & Gentle Dark Scrim Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-olive/40 to-olive/70 backdrop-blur-[0.3px]" />

      {/* Top spacer to vertically balance the centered title */}
      <div className="relative z-10 pt-20 sm:pt-24" />

      {/* Hero Content Box: Only Image & Elegantly Arranged Headline Text */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-12 sm:py-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-cream/90 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span>ONLINE &amp; IN-PERSON YOGA · HIMACHAL PRADESH</span>
        </div>

        <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-normal leading-[1.04] text-cream drop-shadow-md tracking-tight">
          Find stillness.<br />
          Move with breath.
        </h1>

        <p className="mt-8 text-base sm:text-xl text-cream/80 max-w-lg mx-auto font-sans font-light leading-relaxed tracking-wide">
          Classical Hatha tradition &amp; mindful biomechanics
        </p>
      </div>

      {/* Bottom Area: Subtle Scroll Cue + Wave Transition */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Subtle scroll cue */}
        <a
          href="#practice"
          className="group mb-8 flex flex-col items-center gap-1.5 text-cream/70 hover:text-cream text-xs font-sans tracking-[0.2em] uppercase transition-colors"
          aria-label="Scroll to explore The Practice"
        >
          <span className="text-[11px] font-light">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cream/80" />
        </a>

        {/* Organic Curved Wave Transition into #faf8f4 (Cream) */}
        <div className="relative w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 md:h-20"
            aria-hidden="true"
          >
            <path
              fill="#faf8f4"
              d="M0,64 C240,116 480,8 720,36 C960,64 1200,124 1440,60 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-olive flex flex-col justify-end sm:justify-center">
      {/* Background Photography (Himachal Pradesh sunrise mountain atmosphere) */}
      <img
        src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2000&q=80"
        alt="Serene yoga practice at sunrise in Himachal Pradesh"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Atmospheric Responsive Scrim:
          - Mobile: Bottom-up gradient protecting text at the bottom, leaving upper 60% totally open for her raised hands
          - Desktop: Left-to-right gradient protecting text on the left, leaving center & right mountains bright */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/35 sm:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-olive/70 via-transparent to-black/25 pointer-events-none" />

      {/* Hero Content Container:
          - Mobile: Pinned to the bottom (pb-8) below her hands and posture
          - Desktop: Vertically centered on the left side */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pb-8 sm:pb-0">
        <div className="max-w-xl text-left space-y-4 sm:space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-cream/90 text-[10px] sm:text-[13px] font-sans tracking-[0.2em] sm:tracking-[0.22em] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>ONLINE &amp; IN-PERSON YOGA · HIMACHAL PRADESH</span>
          </div>

          {/* Signature Serif Headline */}
          <h1 className="font-serif italic text-3xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.08] sm:leading-[1.06] text-cream drop-shadow-md tracking-tight">
            Find stillness.<br />
            Move with breath.
          </h1>

          {/* Clean Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-cream/85 font-sans font-light leading-relaxed tracking-wide max-w-md">
            Classical Hatha tradition &amp; mindful biomechanics.
          </p>

          {/* Scroll Cue */}
          <div className="pt-2 sm:pt-6">
            <a
              href="#practice"
              className="group inline-flex items-center gap-2 text-cream/70 hover:text-cream text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase transition-colors"
              aria-label="Scroll to explore The Practice"
            >
              <span className="font-light">Scroll to explore</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-cream/80 group-hover:text-cream" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

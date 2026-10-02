'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen min-h-[620px] w-full overflow-hidden bg-olive flex items-center">
      {/* Background Photography (Himachal Pradesh sunrise mountain atmosphere) */}
      <img
        src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2000&q=80"
        alt="Serene yoga practice at sunrise in Himachal Pradesh"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Atmospheric Directional Scrim:
          - Deep subtle vignette on the left to ensure crisp text readability
          - Completely open in the center and right so the meditating yogi is fully visible and luminous */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 sm:via-black/20 to-transparent backdrop-blur-[0.2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-olive/80 via-transparent to-black/30 pointer-events-none" />

      {/* Hero Content Container:
          Positioned on the left side so the centered yoga practitioner is 100% visible */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="max-w-xl text-left space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-cream/90 text-xs sm:text-[13px] font-sans tracking-[0.22em] uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>ONLINE &amp; IN-PERSON YOGA · HIMACHAL PRADESH</span>
          </div>

          {/* Signature Serif Headline */}
          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.06] text-cream drop-shadow-md tracking-tight">
            Find stillness.<br />
            Move with breath.
          </h1>

          {/* Clean Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-cream/85 font-sans font-light leading-relaxed tracking-wide max-w-md">
            Classical Hatha tradition &amp; mindful biomechanics.
          </p>

          {/* Left-aligned Scroll Cue */}
          <div className="pt-4 sm:pt-6">
            <a
              href="#practice"
              className="group inline-flex items-center gap-2.5 text-cream/70 hover:text-cream text-xs font-sans tracking-[0.2em] uppercase transition-colors"
              aria-label="Scroll to explore The Practice"
            >
              <span className="text-[11px] font-light">Scroll to explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-cream/80 group-hover:text-cream" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

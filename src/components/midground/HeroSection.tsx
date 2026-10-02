'use client';

import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-olive">
      {/* Background Photography (Himachal Pradesh sunrise mountain atmosphere) */}
      <img
        src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2000&q=80"
        alt="Serene yoga practice at sunrise in Himachal Pradesh"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Atmospheric Olive Overlay */}
      <div className="absolute inset-0 bg-olive/50 backdrop-blur-[0.5px]" />

      {/* Hero Content Box */}
      <div className="relative z-10 flex min-h-[82vh] sm:min-h-[88vh] items-center justify-center">
        <div className="mx-auto max-w-3xl px-6 text-center py-20">
          <p className="text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.25em] text-cream/70 mb-4">
            ONLINE &amp; IN-PERSON YOGA · HIMACHAL PRADESH
          </p>

          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.08] text-cream drop-shadow-sm">
            Find stillness.<br />Move with breath.
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#classes"
              className="inline-flex items-center justify-center rounded-full bg-gold hover:bg-gold-dark text-olive px-9 py-4 text-sm sm:text-base font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-black/20"
            >
              Book your session
            </a>

            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full bg-cream/15 hover:bg-cream/25 text-cream border border-cream/20 backdrop-blur-md px-7 py-4 text-sm font-medium transition-all"
            >
              <Play className="w-4 h-4 fill-current text-cream" />
              <span>Watch Dhaarna&apos;s story</span>
            </a>
          </div>

          <p className="mt-5 text-xs sm:text-sm text-cream/60 font-light">
            No commitment. Just a conversation.
          </p>
        </div>
      </div>

      {/* Organic Curved Wave Transition into #faf8f4 */}
      <div className="relative w-full overflow-hidden leading-none z-10">
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
    </section>
  );
}

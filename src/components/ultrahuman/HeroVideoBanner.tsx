'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function HeroVideoBanner() {
  return (
    <div className="w-full space-y-3 pb-8">
      {/* ========================================================
          CARD 1: ULTRAHUMAN SIGNATURE TOP HERO CARD (WARM SAND #F5F2E9)
          Exact Ultrahuman layout: Contained rounded-3xl card, condensed
          italic display headline, macro organic backdrop, white pill CTA
          ======================================================== */}
      <section
        className="mx-2.5 sm:mx-4 md:mx-6 rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex items-center bg-[#F5F2E9] border border-[#E5E0D5] shadow-sm"
        aria-label="Yoga With Dhaarna Live Cohorts"
      >
        {/* Background Visual Texture */}
        <picture className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=85"
            alt="Mindful yoga alignment posture"
            className="w-full h-full object-cover object-center mix-blend-multiply opacity-50"
            fetchPriority="high"
          />
        </picture>

        {/* Ambient Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2E9]/95 via-[#F5F2E9]/75 to-transparent z-[1]" />

        {/* Left Copy: Eyebrow + Huge Condensed Italic Display Title + Pill CTA */}
        <div className="relative z-10 p-8 sm:p-14 md:p-20 max-w-2xl space-y-5">
          <p className="text-xs sm:text-[13px] font-sans font-medium uppercase tracking-[0.2em] text-neutral-600">
            LIVE COHORTS • OCTOBER 2026
          </p>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black uppercase italic tracking-[-0.04em] leading-[0.88] text-black font-display">
            STRENGTH IN<br />
            ALIGNMENT
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-700 font-sans font-normal leading-relaxed max-w-lg">
            Zero flexibility required. Intimate live cohorts of 15 students personally guided by
            RYT-500 Master Teacher Dhaarna Sharma.
          </p>

          <div className="pt-3">
            <a
              href="#offerings"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-neutral-100 transition-all shadow-[0_2px_15px_rgba(0,0,0,0.08)] active:scale-95"
            >
              Explore Batches
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          CARD 2: ULTRAHUMAN HERO SECTION 2 (WARM CHAMPAGNE / LINEN #C4BEB1)
          Exact Ultrahuman layout: Ambient looping video, "Power Moves."
          Neo-grotesk headline, electric blue button & translucent button
          ======================================================== */}
      <section
        className="mx-2.5 sm:mx-4 md:mx-6 rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex items-center bg-[#C4BEB1] border border-[#B3ACA0]/60 shadow-sm"
        aria-label="Power Moves and Alignment"
      >
        {/* Full-bleed video backdrop with authentic yoga movement loop */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-85"
            poster="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85"
          >
            <source
              src="/videos/yoga-hero.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle gradient scrim on the left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#C4BEB1]/90 via-[#C4BEB1]/40 to-transparent" />
        </div>

        {/* Left Copy: Eyebrow + "Power Moves." + Blue CTA */}
        <div className="relative z-10 p-8 sm:p-14 md:p-20 max-w-2xl space-y-5">
          <p className="text-xs sm:text-[13px] font-sans font-semibold uppercase tracking-[0.2em] text-neutral-800">
            PRIVATE MENTORSHIP
          </p>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] leading-[0.98] text-black font-sans">
            Power Moves.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-800 font-sans font-normal leading-relaxed max-w-lg">
            The biggest leap in functional spine mobility, conscious breathwork, and posture restoration.
            Engineered for modern bodies that spend hours at a desk.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="#offerings"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium bg-[#1c3fe4] hover:bg-[#1430b8] text-white transition-all shadow-md active:scale-95"
            >
              Claim Your Spot
            </a>
            <a
              href="#measures"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium bg-black/10 hover:bg-black/15 text-black border border-black/10 backdrop-blur-sm transition-all"
            >
              Explore Alignment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import { ArrowUpRight, Activity, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

export default function BiomarkersScienceSection() {
  return (
    <section className="w-full bg-white text-black py-24 sm:py-32 px-4 sm:px-6 md:px-8 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Centered Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-black font-sans">
            Every posture, built on biomechanics.
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-normal">
            The science behind Yoga with Dhaarna, explained.
          </p>
          <div className="pt-2">
            <a
              href="#closer-look"
              className="inline-flex items-center gap-1 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-black text-white hover:bg-neutral-800 transition-all shadow-sm"
            >
              <span>Read the science</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Floating Science Visual Cards (Ultrahuman Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {/* Card 1: Cervical Spine Alignment */}
          <div className="rounded-3xl bg-[#f7f6f2] border border-[#e8e4d8] p-8 space-y-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80"
                alt="Cervical spine alignment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#1c3fe4]" />
                <span>BIOMECHANIC 01</span>
              </div>
              <h3 className="text-2xl font-semibold text-black tracking-tight">
                Cervical Spine Decompression
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Relieves forward-head slouch from laptop screens. Micro-adjustments in chin tuck and thoracic extension restore natural curve.
              </p>
            </div>
          </div>

          {/* Card 2: Parasympathetic Vagal Reset */}
          <div className="rounded-3xl bg-[#f7f6f2] border border-[#e8e4d8] p-8 space-y-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                alt="Breathwork and nervous system"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                <HeartPulse className="w-3.5 h-3.5 text-[#1c3fe4]" />
                <span>BIOMECHANIC 02</span>
              </div>
              <h3 className="text-2xl font-semibold text-black tracking-tight">
                Vagus Nerve Regulation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Slow ratio pranayama (4-count inhale, 7-count exhale) shifts the body from sympathetic fight-or-flight to restful deep recovery.
              </p>
            </div>
          </div>

          {/* Card 3: Lumbar & Pelvic Stability */}
          <div className="rounded-3xl bg-[#f7f6f2] border border-[#e8e4d8] p-8 space-y-6 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
                alt="Pelvic and lumbar stability"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1c3fe4]" />
                <span>BIOMECHANIC 03</span>
              </div>
              <h3 className="text-2xl font-semibold text-black tracking-tight">
                Pelvic & Lumbar Stability
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Counters 8+ hours of chair sitting by gently releasing tight psoas and gluteus stabilizers without aggressive hyperextensions.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Ultrahuman Giant Stat Banner */}
        <div className="pt-16 border-t border-neutral-200 text-center space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
            DOCUMENTED RECOVERY
          </p>
          <div className="text-5xl sm:text-7xl md:text-8xl font-black text-black tracking-tight font-display italic uppercase">
            98.4% SPINE RELIEF
          </div>
          <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto pt-2">
            Over 98% of students in Dhaarna&apos;s cohorts report sustained pain relief and improved posture within 14 days of practice.
          </p>
        </div>
      </div>
    </section>
  );
}

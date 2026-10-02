'use client';

import React from 'react';
import { Globe, Users, ArrowUpRight } from 'lucide-react';

const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi NCR',
  'Dubai',
  'London',
  'New York',
  'San Francisco',
  'Singapore',
  'Sydney',
];

export default function GlobalImpactCounter() {
  return (
    <section className="w-full py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-white text-black border-b border-neutral-100">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Ultrahuman Section 9 Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-black font-sans">
            The world&apos;s alignment, on a single system.
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 font-normal">
            Students across 14 countries tune in daily to find stillness, decompress vertebrae, and practice safe alignment.
          </p>
        </div>

        {/* Big Telemetry Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center border-y border-neutral-200 py-12">
          <div className="space-y-2">
            <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block">
              HOURS OF GUIDED ALIGNMENT
            </span>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black font-mono">
              14,280+
            </div>
            <span className="text-xs text-neutral-500 block">Verified student practice hours</span>
          </div>

          <div className="space-y-2">
            <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block">
              DESK WORKER POSTURAL RELIEF
            </span>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1c3fe4] font-mono">
              98.4%
            </div>
            <span className="text-xs text-neutral-500 block">Sustained back & neck improvement</span>
          </div>

          <div className="space-y-2">
            <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block">
              GLOBAL RETENTION RATE
            </span>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black font-mono">
              92.6%
            </div>
            <span className="text-xs text-neutral-500 block">Re-enrolled month over month</span>
          </div>
        </div>

        {/* Global Cities Grid */}
        <div className="space-y-4 text-center">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            ACTIVE COMMUNITY HUBS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {CITIES.map((city) => (
              <span
                key={city}
                className="px-4 py-2 rounded-full text-xs font-medium bg-[#f7f6f2] text-neutral-800 border border-[#e8e4d8]"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

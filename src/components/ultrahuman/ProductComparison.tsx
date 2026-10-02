'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Video,
  Clock,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Calendar,
  Layers,
  HeartPulse,
} from 'lucide-react';

export default function ProductComparison() {
  const [privateTier, setPrivateTier] = useState<4 | 8 | 12>(4);
  const [batchSlot, setBatchSlot] = useState<'morning' | 'evening'>('morning');

  const privatePrices = {
    4: { inr: 4999, usd: 65, duration: '4 Private Sessions (60 Min each)' },
    8: { inr: 8999, usd: 115, duration: '8 Private Sessions (60 Min each)' },
    12: { inr: 12499, usd: 160, duration: '12 Private Sessions (60 Min each)' },
  };

  return (
    <div id="closer-look" className="w-full">
      {/* ========================================================
          BLOCK 1: ULTRAHUMAN SECTION 6 (DARK THEME - 1-ON-1 COACHING)
          Exact Ultrahuman style: Pure black background, headline,
          subhead, left visual card, right "A CLOSER LOOK" list
          ======================================================== */}
      <section className="w-full bg-black text-white py-24 sm:py-32 px-4 sm:px-6 md:px-8 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-white font-sans">
              1-on-1 Mentorship
            </h2>
            <p className="text-2xl sm:text-3xl text-neutral-400 font-normal">
              More power to you
            </p>
          </div>

          {/* Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Visual & Interactive Package Selector */}
            <div className="lg:col-span-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 relative">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                    alt="Private Yoga Mentorship"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                    4 SPOTS LEFT
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Dedicated Private Alignment
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    The most personalized yoga experience, yet. Dhaarna designs a tailored biomechanic
                    protocol addressing your exact posture, spine curve, and mobility goals.
                  </p>
                </div>

                {/* Session package switcher */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Choose Session Package:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[4, 8, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPrivateTier(num as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all ${
                          privateTier === num
                            ? 'bg-white text-black font-bold'
                            : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {num} Sessions
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline justify-between border-t border-neutral-800">
                  <div>
                    <span className="text-3xl sm:text-4xl font-bold text-white font-mono">
                      ₹{privatePrices[privateTier].inr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 block">
                      (~${privatePrices[privateTier].usd} USD)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {privatePrices[privateTier].duration}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="/checkout/plan_2"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#1c3fe4] hover:bg-[#1430b8] text-white transition-all shadow-md active:scale-95"
                >
                  Book 1-on-1 Now
                </a>
                <a
                  href="#offerings"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 text-white transition-all border border-white/10"
                >
                  View Details
                </a>
              </div>
            </div>

            {/* Right Card: Ultrahuman "A CLOSER LOOK AT..." Specs List */}
            <div className="lg:col-span-6 rounded-3xl bg-[#161616] border border-neutral-800 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-6">
                  A CLOSER LOOK AT 1-ON-1 COACHING
                </p>

                <div className="divide-y divide-neutral-800 space-y-6">
                  {/* Feature 1 */}
                  <div className="pt-6 first:pt-0 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">
                        Full Orthopedic & Posture Intake Review
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                        Every session begins with a comprehensive screen of your work posture, cervical vertebrae strain, and lumbar tightness.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="pt-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">
                        Direct WhatsApp Desk with Dhaarna
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                        Send short practice videos anytime. Dhaarna reviews your spine curvature and replies with voice cues.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="pt-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">
                        Custom Pranayama & Vagal Protocols
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                        Breathwork programmed specifically for your nervous system to down-regulate stress and improve deep sleep quality.
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="pt-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">
                        Flexible Calendar Scheduling
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                        Schedule slots around busy travel, timezone differences, and unpredictable work hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BLOCK 2: ULTRAHUMAN SECTION 7 (LIGHT THEME - MORNING COHORT)
          Exact Ultrahuman style: Pure white background, headline,
          subhead, left visual card, right "A CLOSER LOOK" list
          ======================================================== */}
      <section className="w-full bg-white text-black py-24 sm:py-32 px-4 sm:px-6 md:px-8 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-black font-sans">
              Morning Flow & Foundations
            </h2>
            <p className="text-2xl sm:text-3xl text-neutral-500 font-normal">
              Compact powerhouse of daily health
            </p>
          </div>

          {/* Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Visual & Interactive Slot Selector */}
            <div className="lg:col-span-6 rounded-3xl bg-[#f7f6f2] border border-[#e8e4d8] p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-300 relative">
                  <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80"
                    alt="Morning Group Yoga Cohort"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono text-black border border-neutral-200">
                    15 STUDENTS MAX
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-black tracking-tight">
                    Daily Live Online Cohort
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                    The lightest, most consistent way to build lifelong spine health. 20 live Zoom sessions
                    per month with real-time spoken guidance and posture adjustments.
                  </p>
                </div>

                {/* Batch slot toggle */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                    Choose Batch Time:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBatchSlot('morning')}
                      className={`py-2 px-3 rounded-xl text-xs font-mono transition-all ${
                        batchSlot === 'morning'
                          ? 'bg-black text-white font-bold'
                          : 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                      }`}
                    >
                      Morning 7:00 AM IST
                    </button>
                    <button
                      onClick={() => setBatchSlot('evening')}
                      className={`py-2 px-3 rounded-xl text-xs font-mono transition-all ${
                        batchSlot === 'evening'
                          ? 'bg-black text-white font-bold'
                          : 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                      }`}
                    >
                      Evening 6:30 PM IST
                    </button>
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline justify-between border-t border-neutral-200">
                  <div>
                    <span className="text-3xl sm:text-4xl font-bold text-black font-mono">
                      ₹3,499
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 block">
                      (~${45} USD)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-600">
                    Monthly Pass (20 Live Sessions)
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="/checkout/plan_3"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#1c3fe4] hover:bg-[#1430b8] text-white transition-all shadow-md active:scale-95"
                >
                  Enroll in Cohort
                </a>
                <a
                  href="#offerings"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-neutral-200 hover:bg-neutral-300 text-black transition-all"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Card: Ultrahuman "A CLOSER LOOK AT..." Specs List */}
            <div className="lg:col-span-6 rounded-3xl bg-[#f7f6f2] border border-[#e8e4d8] p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-6">
                  A CLOSER LOOK AT DAILY COHORTS
                </p>

                <div className="divide-y divide-[#e8e4d8] space-y-6">
                  {/* Feature 1 */}
                  <div className="pt-6 first:pt-0 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-black">
                        Strictly Capped at 15 Students
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                        Never an anonymous crowded webinar. Dhaarna watches every student on camera to offer spoken alignment corrections.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="pt-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-black">
                        20 Live Interactive Morning Sessions
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                        Cultivate genuine habit consistency. Designed to wake up stiff joints and center the mind before your workday.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="pt-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-black">
                        On-Demand Catch-Up Access
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                        Busy morning? High-definition session recordings are archived securely so you never miss your practice.
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="pt-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-black">
                        Zero Flexibility Prerequisite
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                        Every pose is taught with micro-modifications for complete beginners. No prior yoga experience required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

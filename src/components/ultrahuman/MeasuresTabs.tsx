'use client';

import React, { useState } from 'react';
import {
  Activity,
  Wind,
  ShieldCheck,
  HeartPulse,
  Monitor,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface TabData {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  headline: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  highlights: string[];
  graphicType: 'spine' | 'breath' | 'batch' | 'recovery' | 'desk';
}

const TABS: TabData[] = [
  {
    id: 'spine',
    name: 'Spine Alignment',
    icon: Activity,
    tagline: 'STRUCTURAL BIOMECHANICS',
    headline: 'Decompress Vertebrae. Never Compress.',
    description:
      'Most people dump into their lower back during backbends, causing chronic ache. In Yoga with Dhaarna, we isolate thoracic extension, engage the pelvic floor, and ensure zero lumbar compression in postures like Bhujangasana and Ustrasana.',
    metricLabel: 'LUMBAR STRAIN REDUCTION',
    metricValue: '100%',
    metricSub: 'Safe alignment protocol applied across all asanas',
    highlights: [
      'Pelvic tucking cues to protect the L4-L5 vertebrae',
      'Shoulder blade retraction to open tight chest muscles',
      'Gentle traction cues to lengthen the spine before arching',
    ],
    graphicType: 'spine',
  },
  {
    id: 'breath',
    name: 'Pranayama',
    icon: Wind,
    tagline: 'AUTONOMIC REGULATION',
    headline: 'Conscious Breathwork to Down-Regulate Stress.',
    description:
      'Shallow chest breathing triggers chronic sympathetic fight-or-flight overdrive. Dhaarna guides rhythmic diaphragmatic Pranayama (Nadi Shodhana, Sama Vritti, Bhramari) to stimulate the vagus nerve and restore cardiovascular balance.',
    metricLabel: 'PARASYMPATHETIC ACTIVATION',
    metricValue: '+34%',
    metricSub: 'Measured HRV elevation following 15-min breathwork',
    highlights: [
      '4-4-4 Box breathing for pre-meeting anxiety release',
      'Alternate nostril breathing to harmonize brain hemispheres',
      'Cooling exhalations to lower systemic inflammation',
    ],
    graphicType: 'breath',
  },
  {
    id: 'batches',
    name: 'Live Batches',
    icon: Sparkles,
    tagline: 'INTERACTIVE MENTORSHIP',
    headline: 'Small Cohorts. Real-Time Posture Adjustments.',
    description:
      'Unlike massive webinars with 100 muted attendees, Dhaarna caps live batches at 15 students. Cameras remain on, microphones are unmuted for questions, and you receive instant verbal cues tailored to your camera feed.',
    metricLabel: 'COHORT MAXIMUM',
    metricValue: '15 Max',
    metricSub: 'Strict limit to ensure individual instructor attention',
    highlights: [
      'Live camera feedback on knee, wrist, and hip angles',
      'HD class recordings accessible 24/7 if you miss a morning session',
      'Supportive private WhatsApp circle for weekly wellness queries',
    ],
    graphicType: 'batch',
  },
  {
    id: 'recovery',
    name: 'Nervous Recovery',
    icon: HeartPulse,
    tagline: 'SOMATIC DEEP REST',
    headline: 'Release Tension Stored in the Fascia.',
    description:
      'Emotional stress and athletic fatigue accumulate in deep connective tissue. Dhaarna combines long-held restorative Yin postures with somatic unwinding to release deep hip tightness, jaw clenching, and sleep disturbances.',
    metricLabel: 'RECOVERY READINESS',
    metricValue: '96/100',
    metricSub: 'Reported morning energy and restful sleep post-class',
    highlights: [
      'Psoas muscle decompression to unlock tight hip flexors',
      'Yoga Nidra guided meditation for deep subconscious calm',
      'Restorative poses with cushions and blocks for effortless release',
    ],
    graphicType: 'recovery',
  },
  {
    id: 'desk',
    name: 'Desk Worker Health',
    icon: Monitor,
    tagline: 'POSTURE CORRECTION',
    headline: 'The Antidote to 9-Hour Screen Slouch.',
    description:
      'Sedentary work collapses chest cavities, strains the cervical neck, and weakens glutes. Our targeted micro-routines reverse tech-neck, open tight thoracic zones, and bring vitality back into your daily work routine.',
    metricLabel: 'POSTURE IMPROVEMENT',
    metricValue: '98%',
    metricSub: 'Documented relief from cervical neck & back ache',
    highlights: [
      'Chin tucks and occipital release for forward head posture',
      'Thoracic foam/block openers to undo hunchback stiffness',
      'Wrist and forearm mobility stretches for keyboard fatigue',
    ],
    graphicType: 'desk',
  },
];

export default function MeasuresTabs() {
  const [activeTabId, setActiveTabId] = useState('spine');
  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  return (
    <section id="measures" className="w-full py-28 sm:py-36 px-4 sm:px-6 md:px-8 bg-black text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header (Ultrahuman Style) */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-white font-sans">
            PRO beyond measure
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-normal">
            Every signal the practice restores, and what each one tells you about your body.
          </p>
        </div>

        {/* ULTRAHUMAN PILL TAB SELECTOR (CENTERED PILL GROUP) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'bg-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE TAB DISPLAY: ASYMMETRIC ULTRAHUMAN BENTO VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Narrative & Highlights */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col justify-between space-y-8 bg-neutral-900/40">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 block">
                {activeTab.tagline}
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                {activeTab.headline}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {activeTab.description}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                Signature Methodologies:
              </span>
              <ul className="space-y-2.5">
                {activeTab.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_#10b981]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="#offerings"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 group"
              >
                <span>Enroll in classes featuring this protocol</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Ultrahuman Biometric Visualization Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden bg-black/60 shadow-2xl">
            {/* Ambient Radial Mesh Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                {activeTab.metricLabel}
              </span>
              <div className="text-5xl sm:text-6xl font-extrabold font-mono text-white tracking-tight">
                {activeTab.metricValue}
              </div>
              <p className="text-xs text-neutral-400">{activeTab.metricSub}</p>
            </div>

            {/* Interactive SVG Biometric Visual */}
            <div className="my-8 py-6 relative z-10 flex flex-col items-center justify-center">
              {activeTab.graphicType === 'spine' && (
                <div className="w-full space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Cervical (Neck) Alignment</span>
                    <span className="text-emerald-400">Neutral 0°</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="w-[88%] h-full bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                  </div>
                  <div className="flex justify-between text-neutral-400 pt-2">
                    <span>Thoracic Expansion</span>
                    <span className="text-emerald-400">+24° Mobility</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="w-[94%] h-full bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                  </div>
                  <div className="flex justify-between text-neutral-400 pt-2">
                    <span>Lumbar Compression Risk</span>
                    <span className="text-emerald-400">0% Safe</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="w-[4%] h-full bg-emerald-400 rounded-full" />
                  </div>
                </div>
              )}

              {activeTab.graphicType === 'breath' && (
                <div className="w-40 h-40 rounded-full border-2 border-emerald-500/30 flex items-center justify-center relative animate-pulse">
                  <div className="w-28 h-28 rounded-full border border-emerald-400/50 flex items-center justify-center">
                    <div className="text-center font-mono">
                      <Wind className="w-6 h-6 text-emerald-400 mx-auto mb-1 animate-spin" />
                      <span className="text-xs text-white block">Inhale 4s</span>
                      <span className="text-[10px] text-neutral-400">Exhale 6s</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab.graphicType === 'batch' && (
                <div className="w-full grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mx-auto block" />
                      <span className="text-[10px] text-neutral-300 block">Student {idx + 1}</span>
                      <span className="text-[9px] text-emerald-400 block">Camera Live</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab.graphicType === 'recovery' && (
                <div className="w-full space-y-4 font-mono">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-300">Vagal Tone Stimulated</span>
                    <span className="text-xs text-emerald-400 font-bold">Optimal</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-300">Restorative Yin Duration</span>
                    <span className="text-xs text-white">45 Mins</span>
                  </div>
                </div>
              )}

              {activeTab.graphicType === 'desk' && (
                <div className="w-full space-y-2 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                    <span>Forward Head Shift</span>
                    <span className="font-bold">-2.4 cm Corrected</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-neutral-300 flex items-center justify-between">
                    <span>Pectoral Muscle Tightness</span>
                    <span className="font-bold">Released</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-500 font-mono relative z-10">
              <span>DATA TELEMETRY</span>
              <span className="text-emerald-400">VERIFIED PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

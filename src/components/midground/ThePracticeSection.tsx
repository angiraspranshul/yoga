'use client';

import React from 'react';
import { Wind, Shield, Users, Heart } from 'lucide-react';

export default function ThePracticeSection() {
  const pillars = [
    {
      icon: Wind,
      title: 'Breath-Led Movement',
      desc: 'Pranayama to soften mental noise, stimulate the vagus nerve, and steady the body.',
    },
    {
      icon: Shield,
      title: 'Spine & Joint Health',
      desc: 'Safe alignment cues that protect the lower back and decompress vertebrae from desk sitting.',
    },
    {
      icon: Users,
      title: 'Intimate Cohorts',
      desc: 'Strictly capped at 15 students so cameras stay on and you receive personal verbal adjustments.',
    },
  ];

  return (
    <section id="practice" className="mx-auto max-w-4xl px-6 py-20 sm:py-28 text-center bg-cream">
      {/* Eyebrow */}
      <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-sage">
        The practice
      </p>

      {/* Signature Serif Italic Headline */}
      <h2 className="mt-4 font-serif italic text-3xl sm:text-5xl md:text-6xl text-olive leading-tight">
        Yoga is not a workout.<br />
        It is a work-in.
      </h2>

      {/* Editorial Short Paragraphs */}
      <div className="mt-8 max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-olive/75 leading-relaxed font-sans font-light">
        <p>
          Dhaarna teaches yoga the way it was meant to be practised — slowly, attentively, and with
          the breath leading every movement. Her classes are not about touching your toes. They are
          about what you learn on the way down.
        </p>
        <p>
          Rooted in the quiet of Himachal Pradesh and shaped by classical Hatha tradition, each
          session is an invitation to slow down, listen inward, and return to yourself.
        </p>
      </div>

      {/* 3 Minimal Pillars */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-cream-dark/80 shadow-sm shadow-olive/5 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-sage-light text-sage-dark flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-olive font-normal">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-olive/65 leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import React from 'react';

const JOURNEY = [
  { step: '01', title: 'Arrive', desc: 'Settle onto your mat. Leave the day at the door.' },
  { step: '02', title: 'Breathe', desc: 'Pranayama to soften the mind and steady the body.' },
  { step: '03', title: 'Flow', desc: 'Mindful movement, guided gently at your own pace.' },
  { step: '04', title: 'Restore', desc: 'Deep rest and stillness to carry with you after.' },
];

export default function SessionJourneySection() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-20 sm:py-28 bg-cream border-t border-cream-dark/60">
      <div className="text-center max-w-xl mx-auto">
        <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-sage">
          A session with Dhaarna
        </p>
        <h2 className="mt-4 font-serif italic text-3xl sm:text-5xl text-olive">
          The journey of one hour
        </h2>
        <p className="mt-3 text-sm text-olive/60 font-light">
          Every live class follows a deliberate physiological curve designed to restore your nervous system.
        </p>
      </div>

      <div className="relative mt-16 sm:mt-20">
        {/* Subtle connecting line on desktop */}
        <div
          className="absolute left-8 right-8 top-7 hidden h-px bg-sage/20 md:block"
          aria-hidden="true"
        />

        <div className="grid gap-10 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {JOURNEY.map((j) => (
            <div key={j.step} className="relative text-center md:text-left space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage font-serif text-cream text-lg shadow-sm md:mx-0">
                {j.step}
              </div>
              <div>
                <h3 className="font-serif text-xl text-olive font-normal">
                  {j.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-olive/65 font-light">
                  {j.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

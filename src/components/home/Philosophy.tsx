import React from 'react';
import SectionHeading from '@/components/brand/SectionHeading';
import { APPROACH, INNER_LIMBS } from '@/content/home';

export default function Philosophy() {
  return (
    <section id="approach" className="bg-clay py-20 text-ivory sm:py-28">
      <div className="brand-container space-y-16">
        <SectionHeading
          tone="dark"
          eyebrow="Philosophy and approach"
          title="Concentration, meditation, absorption"
          intro="Our tagline names the three inner limbs of yoga described by Patanjali. Together they are the path our classes follow, from a focused breath to a quiet mind."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-ivory/20 bg-ivory/20 md:grid-cols-3">
          {INNER_LIMBS.map((limb) => (
            <div key={limb.term} className="space-y-3 bg-clay p-8">
              <p lang="hi" className="font-serif text-3xl text-blush">
                {limb.devanagari}
              </p>
              <h3 className="font-serif text-2xl text-ivory">
                {limb.term} <span className="text-ivory/85">· {limb.meaning}</span>
              </h3>
              <p className="font-light leading-relaxed text-ivory/90">{limb.text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <h3 className="text-center font-serif text-3xl text-ivory">How a class unfolds</h3>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((step, i) => (
              <li key={step.title} className="space-y-2 border-t border-ivory/30 pt-5">
                <span className="font-sans text-sm text-blush">Step {i + 1}</span>
                <p className="font-serif text-2xl text-ivory">{step.title}</p>
                <p className="font-light leading-relaxed text-ivory/90">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/brand/SectionHeading';
import { CORPORATE_POINTS } from '@/content/home';

export default function Corporate() {
  return (
    <section id="corporate" className="bg-clay py-20 text-ivory sm:py-28">
      <div className="brand-container grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-8">
          <SectionHeading
            align="left"
            tone="dark"
            eyebrow="Corporate wellness"
            title="Calmer, healthier teams"
            intro="Yoga and breathwork designed for working days: easing desk stiffness, lowering stress and helping people focus."
          />
          <Link href="/contact" className="btn-ivory">
            Plan a session for your team
          </Link>
        </div>

        <ul className="space-y-4">
          {CORPORATE_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-4 rounded-xl border border-ivory/20 p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-blush" aria-hidden />
              <span className="font-light leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

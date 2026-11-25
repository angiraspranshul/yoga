import React from 'react';
import SectionHeading from '@/components/brand/SectionHeading';
import { TESTIMONIALS } from '@/content/home';

export default function Testimonials() {
  const hasSamples = TESTIMONIALS.some((t) => t.sample);

  return (
    <section id="testimonials" className="bg-blush-light py-20 sm:py-28">
      <div className="brand-container space-y-14">
        <SectionHeading eyebrow="Testimonials" title="In our students’ words" />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="flex flex-col justify-between gap-8 rounded-2xl border border-line bg-white/80 p-8">
              <blockquote className="font-serif text-xl leading-snug text-umber">
                <span className="mb-2 block font-serif text-5xl leading-none text-rose" aria-hidden>
                  “
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-line pt-4">
                <p className="font-medium text-umber">{t.name}</p>
                <p className="text-sm text-umber-muted">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {hasSamples && (
          <p className="text-center text-sm text-umber-muted">
            Sample text shown for layout. Real testimonials will replace it before launch.
          </p>
        )}
      </div>
    </section>
  );
}

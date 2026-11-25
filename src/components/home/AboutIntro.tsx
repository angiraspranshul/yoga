import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/brand/SectionHeading';

export default function AboutIntro({ showMoreLink = false }: { showMoreLink?: boolean }) {
  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="brand-container grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <SectionHeading
            align="left"
            eyebrow="About Dharana"
            title="A practice of steady attention"
          />
        </div>

        <div className="space-y-6 text-base font-light leading-relaxed text-umber-light sm:text-lg md:col-span-7">
          <p>
            Dharana is a yoga academy for people who want more than a workout. Each class joins breath, movement and
            stillness, so the body grows stronger and the mind learns to settle.
          </p>
          <p>
            We teach in small groups and one-to-one, online and in person, with time for questions and personal
            corrections. Beginners, returning students and those working around stiffness or injury are all welcome.
          </p>

          <figure className="border-l-2 border-rose pl-6">
            <p className="font-serif text-2xl leading-snug text-umber">
              <span lang="hi">धारणा</span> · <em>dhāraṇā</em>
            </p>
            <figcaption className="mt-2 text-base text-umber-muted">
              Sanskrit for “concentration”, the sixth limb of yoga in Patanjali’s Yoga Sutras: holding the mind
              steadily on one point.
            </figcaption>
          </figure>

          {showMoreLink && (
            <Link href="/about" className="inline-flex items-center gap-2 font-medium text-clay underline-offset-4 hover:underline">
              Meet the instructor and our philosophy
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

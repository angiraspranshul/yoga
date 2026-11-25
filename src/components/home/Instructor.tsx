import React from 'react';
import SectionHeading from '@/components/brand/SectionHeading';

interface InstructorProps {
  name: string;
  instagramUrl: string;
  instagramHandle: string;
}

export default function Instructor({ name, instagramUrl, instagramHandle }: InstructorProps) {
  const firstName = name.split(' ')[0] || name;

  return (
    <section id="instructor" className="bg-sand py-20 sm:py-28">
      <div className="brand-container grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait slot: replace with the client's own photograph. */}
        <div className="md:col-span-5">
          <div
            className="flex aspect-[4/5] w-full max-w-md items-end rounded-t-full border border-line bg-blush p-8"
            role="img"
            aria-label={`Portrait of ${name} (photo to be added)`}
          >
            <p className="w-full text-center text-sm font-light text-umber-muted">Portrait of {name}, to be added</p>
          </div>
        </div>

        <div className="space-y-6 md:col-span-7">
          <SectionHeading align="left" eyebrow="Meet the instructor" title={name} />
          <div className="space-y-4 text-base font-light leading-relaxed text-umber-light sm:text-lg">
            <p>
              {firstName} teaches yoga the way it was meant to be practised: slowly, attentively, and with the breath
              leading every movement. Her classes are not about touching your toes, but about what you notice on the
              way down.
            </p>
            <p>
              Rooted in classical Hatha tradition and the quiet of Himachal Pradesh, she pays close attention to safe
              alignment, spine health and steady breathing, adapting every class to the people in the room.
            </p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-clay underline-offset-4 hover:underline"
          >
            Follow {instagramHandle} on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

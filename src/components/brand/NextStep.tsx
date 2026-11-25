import React from 'react';
import Link from 'next/link';
import OfferingLinks from '@/components/brand/OfferingLinks';

interface NextStepProps {
  title?: string;
  text?: string;
}

/** Closing call to action: the four offerings plus a way to ask a question. */
export default function NextStep({
  title = 'Ready to begin?',
  text = 'Your first class is a conversation, not a commitment. No flexibility needed. Come as you are.',
}: NextStepProps) {
  return (
    <section className="bg-clay py-16 text-ivory sm:py-20">
      <div className="brand-container flex flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-4xl font-medium sm:text-5xl">{title}</h2>
        <p className="max-w-xl font-light leading-relaxed text-ivory/90">{text}</p>
        <OfferingLinks surface="cream" className="w-full max-w-3xl" />
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-ivory/50 px-7 py-3 text-sm font-medium text-ivory transition-colors duration-150 hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
        >
          Ask a question
        </Link>
      </div>
    </section>
  );
}

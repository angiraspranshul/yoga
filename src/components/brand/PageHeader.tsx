import React from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

/** Title band at the top of each inner page, in the brand's primary colour. */
export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="bg-rose">
      <div className="brand-container space-y-4 pb-14 pt-12 text-center sm:pb-20 sm:pt-16">
        <p className="brand-eyebrow text-umber">{eyebrow}</p>
        <h1 className="mx-auto max-w-3xl font-serif text-4xl font-medium leading-[1.1] text-umber [text-wrap:balance] sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-umber sm:text-lg">{intro}</p>
        )}
      </div>
    </section>
  );
}

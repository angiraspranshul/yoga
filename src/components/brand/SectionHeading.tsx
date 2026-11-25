import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'center' | 'left';
  /** "light" for cream/blush backgrounds, "dark" for clay backgrounds. */
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={`max-w-2xl space-y-4 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`brand-eyebrow ${dark ? 'text-blush' : 'text-clay'}`}>{eyebrow}</p>
      <Tag
        className={`font-serif text-4xl font-medium leading-[1.1] tracking-tight [text-wrap:balance] sm:text-5xl ${
          dark ? 'text-ivory' : 'text-umber'
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`text-base font-light leading-relaxed sm:text-lg ${dark ? 'text-ivory/85' : 'text-umber-muted'}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

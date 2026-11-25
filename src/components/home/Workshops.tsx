import React from 'react';
import Link from 'next/link';
import { WORKSHOPS } from '@/content/home';

export default function Workshops() {
  return (
    <section id="workshops" className="bg-cream py-16 sm:py-20">
      <div className="brand-container max-w-4xl">
        <ul className="divide-y divide-line border-y border-line">
          {WORKSHOPS.map((w) => (
            <li key={w.title} className="grid gap-3 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
              <div className="space-y-2">
                <p className="text-sm text-umber-muted">
                  {w.when} · {w.format}
                </p>
                <h3 className="font-serif text-2xl text-umber">{w.title}</h3>
                <p className="font-light leading-relaxed text-umber-light">{w.text}</p>
              </div>
              <Link href="/contact" className="btn-outline justify-self-start px-5 py-2.5 sm:justify-self-end">
                Enquire
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

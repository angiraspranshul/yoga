import React from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { RETREATS } from '@/content/home';

export default function Retreats() {
  return (
    <section id="retreats" className="bg-cream py-16 sm:py-20">
      <div className="brand-container">
        <div className="grid gap-6 md:grid-cols-2">
          {RETREATS.map((retreat) => (
            <article
              key={retreat.title}
              className="flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-line bg-white/70"
            >
              <div className="space-y-4 p-8 sm:p-10">
                <span className="block h-1 w-12 rounded-full bg-rose" aria-hidden />
                <h3 className="font-serif text-3xl text-umber">{retreat.title}</h3>
                <p className="font-light leading-relaxed text-umber-light">{retreat.text}</p>
              </div>
              <div className="flex flex-col gap-4 border-t border-line bg-sand/60 px-8 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-umber-muted">
                  <li className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden />
                    {retreat.place}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden />
                    {retreat.length}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" aria-hidden />
                    {retreat.when}
                  </li>
                </ul>
                <Link href="/contact" className="shrink-0 text-sm font-medium text-clay underline-offset-4 hover:underline">
                  Register interest
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/content/home';

interface OfferingLinksProps {
  /** "rose" for the terracotta hero, "cream" for light sections. */
  surface?: 'rose' | 'cream';
  className?: string;
}

/** The four ways to practise, as direct links. Used instead of a single "Book a class" button. */
export default function OfferingLinks({ surface = 'rose', className = '' }: OfferingLinksProps) {
  const tile =
    surface === 'rose'
      ? 'border-umber/20 bg-ivory/60 hover:border-umber/50 hover:bg-ivory'
      : 'border-line bg-white/80 hover:border-rose hover:bg-white';

  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      {SERVICES.map((service) => (
        <li key={service.title} className="flex">
          <Link
            href={service.href}
            className={`group flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left text-umber transition-colors duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-umber ${tile}`}
          >
            <span className="text-sm font-medium leading-snug sm:text-[15px]">{service.title}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

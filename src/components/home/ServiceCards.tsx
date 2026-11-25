import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/brand/SectionHeading';
import { SERVICES } from '@/content/home';

export default function ServiceCards() {
  return (
    <section id="services" className="bg-cream py-20 sm:py-28">
      <div className="brand-container space-y-14">
        <SectionHeading
          eyebrow="What we offer"
          title="Four ways to practise with us"
          intro="Choose the format that fits your life, from a weekly class to a few days away."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col justify-between gap-8 rounded-2xl border border-line bg-white/70 p-7 transition-all duration-150 hover:-translate-y-1 hover:border-rose hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(62,42,38,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
            >
              <div className="space-y-3">
                <span className="block h-px w-10 bg-rose transition-all duration-150 group-hover:w-16" aria-hidden />
                <h3 className="font-serif text-2xl text-umber">{service.title}</h3>
                <p className="font-light leading-relaxed text-umber-muted">{service.text}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-clay">
                {service.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

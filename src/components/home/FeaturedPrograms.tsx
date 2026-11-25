import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/brand/SectionHeading';
import PlanCard from '@/components/PlanCard';
import { Plan } from '@/types';
import { BOOK_NOW_HREF } from '@/content/home';

interface FeaturedProgramsProps {
  plans: Plan[];
}

/** Shows up to three active plans, with those marked "featured" in the admin dashboard first. */
export default function FeaturedPrograms({ plans }: FeaturedProgramsProps) {
  const shown = [...plans.filter((p) => p.isFeatured), ...plans.filter((p) => !p.isFeatured)].slice(0, 3);

  return (
    <section id="programs" className="bg-blush-light py-20 sm:py-28">
      <div className="brand-container space-y-14">
        <SectionHeading
          eyebrow="Featured yoga programs"
          title="Begin your practice"
          intro="Live classes in small groups or one-to-one. Every booking includes a short health form so your practice can be adapted to you."
        />

        {shown.length > 0 ? (
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {shown.map((plan) => (
              <div key={plan.id} className="flex w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] [&>*]:w-full">
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mx-auto max-w-md rounded-2xl border border-line bg-white/70 p-8 text-center font-light text-umber-muted">
            New programs are being prepared. Please check back soon or get in touch below.
          </p>
        )}

        <div className="text-center">
          <Link href={BOOK_NOW_HREF} className="btn-outline">
            View all programs
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

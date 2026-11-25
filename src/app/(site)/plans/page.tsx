import React from 'react';
import type { Metadata } from 'next';
import PlanGrid from '@/components/PlanGrid';
import PageHeader from '@/components/brand/PageHeader';
import { getPublicPlans } from '@/lib/public-data';

export const metadata: Metadata = {
  title: 'Yoga Programs',
  description: 'Small-group batches, one-to-one guidance, monthly memberships and weekend workshops.',
};

export default async function PlansPage() {
  const plans = await getPublicPlans();

  return (
    <>
      <PageHeader
        eyebrow="Yoga programs"
        title="Choose your practice"
        intro="Small-group batches, one-to-one guidance, monthly memberships and weekend workshops. Pick a program to book your place."
      />
      <section className="bg-cream py-16 sm:py-20">
        <div className="brand-container">
          <PlanGrid initialPlans={plans} />
        </div>
      </section>
    </>
  );
}

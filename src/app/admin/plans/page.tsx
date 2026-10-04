import React from 'react';
import { getPlans } from '@/lib/db';
import PlansManagerClient from './PlansManagerClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPlansPage() {
  const plans = await getPlans(true); // Include inactive plans

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <PlansManagerClient initialPlans={plans} />
    </div>
  );
}

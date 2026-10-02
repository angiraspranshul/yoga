'use client';

import React, { useState } from 'react';
import { Plan } from '@/types';
import PlanCard from './PlanCard';

interface PlanGridProps {
  initialPlans: Plan[];
}

export default function PlanGrid({ initialPlans }: PlanGridProps) {
  const [filter, setFilter] = useState<'ALL' | 'BATCH' | 'PRIVATE' | 'MEMBERSHIP' | 'WORKSHOP'>('ALL');

  const filteredPlans = initialPlans.filter((p) => {
    if (filter === 'ALL') return true;
    return p.type === filter;
  });

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { key: 'ALL', label: `All Offerings (${initialPlans.length})` },
          { key: 'BATCH', label: 'Morning & Evening Batches' },
          { key: 'PRIVATE', label: '1-on-1 Mentorship' },
          { key: 'MEMBERSHIP', label: 'Monthly Passes' },
          { key: 'WORKSHOP', label: 'Weekend Immersions' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              filter === item.key
                ? 'bg-olive text-cream shadow-sm'
                : 'bg-white text-olive/70 hover:text-olive border border-cream-dark'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Plans Matrix */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 rounded-3xl p-8 max-w-md mx-auto bg-[#f7f6f2] border border-[#e8e4d8]">
          <p>No plans found under this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}

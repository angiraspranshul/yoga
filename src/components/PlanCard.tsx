import React from 'react';
import { Plan } from '@/types';
import { Check, Clock, Sparkles, ArrowRight, Activity } from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const isFeatured = plan.isFeatured;

  return (
    <div
      className={`rounded-[1.75rem] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 bg-white border ${
        isFeatured
          ? 'border-sage shadow-md ring-1 ring-sage/30'
          : 'border-cream-dark shadow-sm shadow-olive/5 hover:border-sage/40 hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-sans tracking-wider uppercase px-3 py-1 rounded-full bg-cream text-olive/70 border border-cream-dark">
            {plan.type}
          </span>
          {plan.badge && (
            <span className="flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-sage-light text-sage-dark">
              <Sparkles className="w-3 h-3 text-sage" />
              {plan.badge}
            </span>
          )}
        </div>

        {/* Plan Title & Description */}
        <h3 className="text-xl sm:text-2xl font-serif text-olive mb-2 leading-snug">
          {plan.title}
        </h3>
        <p className="text-xs sm:text-sm text-olive/65 leading-relaxed mb-6 font-light font-sans">
          {plan.description}
        </p>

        {/* Plan Metadata Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs text-olive/80 bg-cream px-3 py-1 rounded-full border border-cream-dark">
            <Clock className="w-3.5 h-3.5 text-sage" />
            {plan.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-olive/80 bg-cream px-3 py-1 rounded-full border border-cream-dark">
            <Activity className="w-3.5 h-3.5 text-sage" />
            {plan.level === 'BEGINNER' ? 'Beginner Friendly' : 'All Levels'}
          </span>
        </div>

        {/* Pricing Block */}
        <div className="py-4 border-y border-cream-dark mb-6 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif text-olive">
                ₹{plan.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-olive/50 font-sans">
                / {plan.type === 'MEMBERSHIP' ? 'month' : 'program'}
              </span>
            </div>
            <span className="text-xs text-olive/50 mt-1 block font-sans font-light">
              (~${plan.priceUsd || Math.round(plan.price / 78)} USD)
            </span>
          </div>
        </div>

        {/* Included Features List */}
        <div className="space-y-2.5 mb-8">
          <p className="text-xs font-sans font-medium uppercase tracking-wider text-olive/50">
            What is Included
          </p>
          <ul className="space-y-2">
            {plan.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-olive/75 font-light">
                <div className="mt-0.5 rounded-full p-0.5 bg-sage-light text-sage-dark shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={`/checkout/${plan.id}`}
        className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm ${
          isFeatured
            ? 'bg-olive text-cream hover:bg-olive-light'
            : 'bg-sage text-cream hover:bg-sage-dark'
        }`}
      >
        <span>Book your spot</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

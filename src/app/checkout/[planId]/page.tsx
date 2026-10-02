import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutClient from './CheckoutClient';
import { getPlanById } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Check, Clock, Sparkles } from 'lucide-react';

export const revalidate = 0;

interface CheckoutPageProps {
  params: {
    planId: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const plan = await getPlanById(params.planId);

  if (!plan) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="pt-32 sm:pt-40 pb-24 px-6 max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <a
          href="/#offerings"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Plans
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 sticky top-28">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                  {plan.type}
                </span>
                {plan.badge && (
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {plan.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {plan.title}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {plan.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-300 py-3 border-y border-white/5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{plan.duration}</span>
            </div>

            {/* Features preview */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                Included in Your Enrollment:
              </p>
              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Plan Tuition</span>
                <span>₹{plan.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Personal Health Intake Review</span>
                <span className="text-emerald-400 font-mono">Complimentary</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Class Recordings & Resources</span>
                <span className="text-emerald-400 font-mono">Included</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                <span>Total Due</span>
                <span className="text-emerald-400 font-mono">₹{plan.price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-neutral-500 text-right">
                (~${plan.priceUsd || Math.round(plan.price / 78)} USD)
              </p>
            </div>

            {/* Instructor Guarantee */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Dhaarna personally reviews every intake note before class begins.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: INTAKE & CHECKOUT FORM */}
          <div className="lg:col-span-7">
            <CheckoutClient plan={plan} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

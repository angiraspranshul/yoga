import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutClient from './CheckoutClient';
import { getPlanById } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Check, Clock } from 'lucide-react';

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
    <main className="min-h-screen bg-cream text-olive selection:bg-sage/30 selection:text-olive">
      <Navbar />

      <div className="pt-32 sm:pt-40 pb-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <a
          href="/#classes"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-olive/60 hover:text-olive transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Classes &amp; Offerings</span>
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: ENROLLMENT SUMMARY */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-olive/10 shadow-sm space-y-6 sticky top-28">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-olive/5 border border-olive/10 text-olive/70">
                  {plan.type}
                </span>
                {plan.badge && (
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sage/20 border border-sage/30 text-olive">
                    {plan.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-serif italic text-olive tracking-tight leading-snug">
                {plan.title}
              </h2>
              <p className="text-xs text-olive/70 leading-relaxed font-light">
                {plan.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-olive/80 py-3 border-y border-olive/10 font-medium">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <span>{plan.duration}</span>
            </div>

            {/* Features preview */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-olive/60">
                Included in Your Enrollment:
              </p>
              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-olive/80 font-light">
                    <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tuition Breakdown */}
            <div className="border-t border-olive/10 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-olive/70">
                <span>Tuition</span>
                <span className="font-medium text-olive">₹{plan.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-olive/70">
                <span>Personal Alignment Review</span>
                <span className="text-olive/80 font-medium">Included</span>
              </div>
              <div className="flex justify-between text-xs text-olive/70">
                <span>Recordings &amp; Cohort Access</span>
                <span className="text-olive/80 font-medium">Included</span>
              </div>
              <div className="flex justify-between text-base font-serif italic text-olive pt-2 border-t border-olive/10">
                <span>Total Enrollment Fee</span>
                <span className="font-sans font-semibold text-olive">
                  ₹{plan.price.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-olive/50 text-right">
                (~${plan.priceUsd || Math.round(plan.price / 78)} USD)
              </p>
            </div>

            {/* Instructor Guarantee */}
            <div className="p-3.5 rounded-2xl bg-cream/60 border border-olive/10 flex items-center gap-3 text-xs text-olive/80">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
              <span className="font-light leading-snug">
                Dhaarna personally reviews every intake note before class begins.
              </span>
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

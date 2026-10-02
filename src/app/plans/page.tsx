import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlanGrid from '@/components/PlanGrid';
import { getPlans } from '@/lib/db';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function PlansPage() {
  const plans = await getPlans(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="pt-32 sm:pt-40 pb-24 px-6 max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </a>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                All Offerings
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Curated Yoga Programs
              </h1>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Choose from small-group beginner batches, dedicated 1-on-1 spine health coaching,
              and immersive weekend workshops led by Dhaarna Sharma.
            </p>
          </div>
        </div>

        {/* Interactive Grid with Filters */}
        <PlanGrid initialPlans={plans} />
      </div>

      <Footer />
    </main>
  );
}

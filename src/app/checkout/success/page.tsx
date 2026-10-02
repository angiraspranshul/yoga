import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getOrders } from '@/lib/db';
import { CheckCircle2, Calendar, MessageSquare, Instagram, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export const revalidate = 0;

interface SuccessPageProps {
  searchParams: {
    bookingId?: string;
  };
}

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const bookingId = searchParams.bookingId;
  const orders = await getOrders();
  const order = orders.find((o) => o.id === bookingId) || orders[0];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <div className="pt-32 sm:pt-40 pb-24 px-6 max-w-3xl mx-auto space-y-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_#10b981]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Enrollment Confirmed
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Welcome to Yoga with Dhaarna!
              </h1>
              <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">
                Your spot has been reserved. Dhaarna Sharma has been notified of your registration and health intake.
              </p>
            </div>

            {/* Boarding Pass Receipt */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 text-left space-y-4 max-w-lg mx-auto bg-white/[0.02]">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono text-neutral-400">Booking Reference</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{order?.id || 'YOGA-REC-892'}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block">Student</span>
                  <span className="font-semibold text-white">{order?.client?.fullName || 'Student'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Plan</span>
                  <span className="font-semibold text-white">{order?.plan?.title || 'Yoga Program'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Schedule Slot</span>
                  <span className="font-semibold text-white">{order?.preferredSlot || 'Morning 7:00 AM IST'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Amount Paid</span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    ₹{order?.amount?.toLocaleString('en-IN') || '2,499'}
                  </span>
                </div>
              </div>

              {order?.healthNotes && (
                <div className="pt-2 border-t border-white/5 text-xs">
                  <span className="text-neutral-500 block">Intake Notes Submitted:</span>
                  <span className="text-neutral-300 italic">{order.healthNotes}</span>
                </div>
              )}
            </div>

            {/* What's Next Steps */}
            <div className="text-left max-w-lg mx-auto space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                What Happens Next:
              </h3>
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">1.</span>
                  <span>Confirmation receipt and Zoom link have been dispatched to your email.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">2.</span>
                  <span>Dhaarna will review your alignment/injury notes to prepare custom cues for your class.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">3.</span>
                  <span>You will be added to the student community updates WhatsApp broadcast.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                Return to Home
              </a>
              <a
                href="https://www.instagram.com/yogawithdhaarna"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-medium tracking-wide text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>DM @yogawithdhaarna</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

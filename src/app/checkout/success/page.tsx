import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getOrders } from '@/lib/db';
import { CheckCircle2, Instagram, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

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
    <main className="min-h-screen bg-cream text-olive selection:bg-sage/30 selection:text-olive">
      <Navbar />

      <div className="pt-32 sm:pt-40 pb-24 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto space-y-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-olive/10 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 space-y-6">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-sage/20 border border-sage/40 text-olive flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-olive" />
            </div>

            <div>
              <span className="text-xs font-sans uppercase tracking-widest text-gold font-medium">
                Enrollment Confirmed
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif italic text-olive tracking-tight mt-1">
                Welcome to Yoga with Dhaarna!
              </h1>
              <p className="text-sm text-olive/70 mt-2 max-w-md mx-auto font-light leading-relaxed">
                Your spot has been reserved. Dhaarna Sharma has received your registration and health intake.
              </p>
            </div>

            {/* Boarding Pass / Receipt Card */}
            <div className="bg-cream/50 rounded-2xl p-6 border border-olive/10 text-left space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-olive/10 pb-3">
                <span className="text-xs font-sans text-olive/60">Booking Reference</span>
                <span className="text-xs font-mono font-bold text-olive">{order?.id || 'YOGA-REC-892'}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-olive/60 block">Student</span>
                  <span className="font-semibold text-olive">{order?.client?.fullName || 'Student'}</span>
                </div>
                <div>
                  <span className="text-olive/60 block">Plan</span>
                  <span className="font-semibold text-olive">{order?.plan?.title || 'Yoga Program'}</span>
                </div>
                <div>
                  <span className="text-olive/60 block">Schedule Slot</span>
                  <span className="font-semibold text-olive">{order?.preferredSlot || 'Morning 7:00 AM IST'}</span>
                </div>
                <div>
                  <span className="text-olive/60 block">Payment Status</span>
                  <span className="font-semibold text-olive font-mono">
                    Paid • ₹{order?.amount?.toLocaleString('en-IN') || '2,499'}
                  </span>
                </div>
              </div>

              {order?.healthNotes && (
                <div className="pt-2 border-t border-olive/10 text-xs">
                  <span className="text-olive/60 block">Intake Notes Submitted:</span>
                  <span className="text-olive/80 italic font-light">{order.healthNotes}</span>
                </div>
              )}
            </div>

            {/* What's Next Steps */}
            <div className="text-left max-w-lg mx-auto space-y-3 pt-2">
              <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-olive/70">
                What Happens Next:
              </h3>
              <div className="space-y-2.5 text-xs text-olive/80 font-light">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-gold font-bold">1.</span>
                  <span>Confirmation receipt and live class link have been dispatched to your email.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-gold font-bold">2.</span>
                  <span>Dhaarna will review your alignment/injury notes to prepare custom cues for your practice.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-gold font-bold">3.</span>
                  <span>You will be added to the student community broadcast for daily class reminders.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/"
                className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-medium tracking-wide bg-olive text-cream hover:bg-olive-light transition-all shadow-md shadow-olive/10"
              >
                Return to Home
              </a>
              <a
                href="https://www.instagram.com/yogawithdhaarna"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-medium tracking-wide text-olive hover:text-olive bg-cream/70 hover:bg-cream border border-olive/15 transition-colors flex items-center justify-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-gold" />
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

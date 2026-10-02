'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/types';
import {
  User,
  Mail,
  Phone,
  Activity,
  AlertCircle,
  Clock,
  MessageSquare,
  CreditCard,
  Lock,
  Sparkles,
  Loader2,
  CheckCircle,
} from 'lucide-react';

interface CheckoutClientProps {
  plan: Plan;
}

export default function CheckoutClient({ plan }: CheckoutClientProps) {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner (New to Yoga)');
  const [healthNotes, setHealthNotes] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning 7:00 AM IST');
  const [clientMessage, setClientMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'DEMO_CHECKOUT' | 'STRIPE_TEST' | 'UPI'>('DEMO_CHECKOUT');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim()) {
      setError('Please provide your full name and email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          fullName,
          email,
          phone,
          experienceLevel,
          healthNotes,
          preferredSlot,
          clientMessage,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete booking');
      }

      // Success: Redirect to booking confirmation screen
      router.push(`/checkout/success?bookingId=${data.bookingId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
          Step 1 of 1 • Booking & Intake
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Complete Your Registration
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          All health details are kept strictly confidential between you and Dhaarna Sharma.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: CONTACT INFORMATION */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 border-b border-white/5 pb-2 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            1. Student Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">
                Full Name <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">
                Email Address <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-400">
              WhatsApp / Phone Number <span className="text-neutral-500">(For batch updates & reminders)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: YOGA & HEALTH INTAKE */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 border-b border-white/5 pb-2 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            2. Confidential Health & Alignment Intake
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">Your Yoga Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              >
                <option value="Beginner (New to Yoga)">Beginner (New to Yoga / Inflexible)</option>
                <option value="Intermediate (Some Practice)">Intermediate (Some practice)</option>
                <option value="Regular Practitioner">Regular Practitioner</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">Preferred Batch / Time Slot</label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              >
                <option value="Morning 7:00 AM IST">Morning 7:00 AM IST (Live Batch)</option>
                <option value="Evening 6:30 PM IST">Evening 6:30 PM IST (Live Batch)</option>
                <option value="Weekend Mornings">Weekend Mornings</option>
                <option value="Flexible / 1-on-1 Consultation">Flexible / 1-on-1 Consultation</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-400 flex items-center justify-between">
              <span>Prior Injuries or Physical Sensitivities</span>
              <span className="text-[11px] text-emerald-400">Essential for safe modifications</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Lower back stiffness, past neck strain, wrist sensitivity, pregnancy, or none."
              value={healthNotes}
              onChange={(e) => setHealthNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-400">
              Personal Goals or Message for Dhaarna <span className="text-neutral-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Want to relieve desk fatigue and learn safe cobra pose."
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* SECTION 3: PAYMENT METHOD */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 border-b border-white/5 pb-2 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            3. Payment Method
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              onClick={() => setPaymentMethod('DEMO_CHECKOUT')}
              className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                paymentMethod === 'DEMO_CHECKOUT'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                  : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
              }`}
            >
              <div className="mt-0.5 w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
                {paymentMethod === 'DEMO_CHECKOUT' && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Instant Test Checkout</span>
                <span className="text-[11px] text-neutral-400 leading-snug block">
                  Simulate instant order &amp; verify admin notifications immediately.
                </span>
              </div>
            </label>

            <label
              onClick={() => setPaymentMethod('STRIPE_TEST')}
              className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                paymentMethod === 'STRIPE_TEST'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                  : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
              }`}
            >
              <div className="mt-0.5 w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center">
                {paymentMethod === 'STRIPE_TEST' && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Credit Card / International</span>
                <span className="text-[11px] text-neutral-400 leading-snug block">
                  Simulated Stripe sandbox processing.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-full text-sm font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Processing Enrollment &amp; Notifying Dhaarna...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Confirm &amp; Enroll • ₹{plan.price.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Checkout • Dhaarna is notified immediately</span>
          </div>
        </div>
      </form>
    </div>
  );
}

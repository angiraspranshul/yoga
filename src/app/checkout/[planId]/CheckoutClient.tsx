'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plan, WebsiteSettings } from '@/types';
import {
  User,
  Mail,
  Phone,
  Activity,
  AlertCircle,
  CreditCard,
  Lock,
  Sparkles,
  Loader2,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

interface CheckoutClientProps {
  plan: Plan;
  settings?: WebsiteSettings;
}

export default function CheckoutClient({ plan, settings }: CheckoutClientProps) {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner (New to Yoga)');
  const [healthNotes, setHealthNotes] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning 7:00 AM IST');
  const [clientMessage, setClientMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI'>('CARD');

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
        throw new Error(data.error || 'Failed to complete registration');
      }

      // Success: Redirect to booking confirmation screen
      router.push(`/checkout/success?bookingId=${data.bookingId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-olive/10 shadow-sm space-y-8">
      <div>
        <span className="text-xs font-sans uppercase tracking-widest text-gold font-medium">
          Step 1 of 1 • Booking &amp; Intake
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif italic text-olive tracking-tight mt-1">
          Complete Your Registration
        </h2>
        <p className="text-xs text-olive/70 mt-1 font-light">
          All health and alignment details are kept strictly confidential between you and {settings?.instructorName || 'Dhaarna Sharma'}.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: CONTACT INFORMATION */}
        <div className="space-y-4">
          <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-olive/80 border-b border-olive/10 pb-2 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-gold" />
            1. Student Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-olive/80">
                Full Name <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-olive/40 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/40 border border-olive/15 text-olive placeholder-olive/40 text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-olive/80">
                Email Address <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-olive/40 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/40 border border-olive/15 text-olive placeholder-olive/40 text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-olive/80">
              WhatsApp / Phone Number <span className="text-olive/50 font-normal">(For batch link &amp; morning updates)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-olive/40 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/40 border border-olive/15 text-olive placeholder-olive/40 text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: YOGA & HEALTH INTAKE */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-olive/80 border-b border-olive/10 pb-2 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-gold" />
            2. Confidential Health &amp; Alignment Intake
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-olive/80">Your Yoga Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-cream/60 border border-olive/15 text-olive text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
              >
                <option value="Beginner (New to Yoga)">Beginner (New to Yoga / Inflexible)</option>
                <option value="Intermediate (Some Practice)">Intermediate (Some practice)</option>
                <option value="Regular Practitioner">Regular Practitioner</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-olive/80">Preferred Batch / Time Slot</label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-cream/60 border border-olive/15 text-olive text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
              >
                <option value="Morning 7:00 AM IST">Morning 7:00 AM IST (Live Batch)</option>
                <option value="Evening 6:30 PM IST">Evening 6:30 PM IST (Live Batch)</option>
                <option value="Weekend Mornings">Weekend Mornings</option>
                <option value="Flexible / 1-on-1 Consultation">Flexible / 1-on-1 Consultation</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-olive/80 flex items-center justify-between">
              <span>Prior Injuries or Physical Sensitivities</span>
              <span className="text-[11px] text-gold font-normal">Used for safe individual cues</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Lower back stiffness, past neck strain, wrist sensitivity, or none."
              value={healthNotes}
              onChange={(e) => setHealthNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-cream/40 border border-olive/15 text-olive placeholder-olive/40 text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-olive/80">
              Personal Goals or Note for {settings?.instructorName?.split(' ')[0] || 'Dhaarna'} <span className="text-olive/50 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Want to relieve desk stiffness and build daily consistency."
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-cream/40 border border-olive/15 text-olive placeholder-olive/40 text-sm focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive transition-all"
            />
          </div>
        </div>

        {/* SECTION 3: PAYMENT METHOD */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-olive/80 border-b border-olive/10 pb-2 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-gold" />
            3. Payment Method
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              onClick={() => setPaymentMethod('CARD')}
              className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                paymentMethod === 'CARD'
                  ? 'bg-cream border-olive/40 shadow-sm'
                  : 'bg-cream/30 border-olive/15 hover:border-olive/30'
              }`}
            >
              <div className="mt-0.5 w-4 h-4 rounded-full border border-olive flex items-center justify-center shrink-0">
                {paymentMethod === 'CARD' && <div className="w-2 h-2 rounded-full bg-olive" />}
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-olive block">Credit / Debit Card &amp; NetBanking</span>
                <span className="text-[11px] text-olive/60 leading-snug block">
                  Visa, Mastercard, RuPay &amp; Amex with 256-bit SSL bank-grade encryption.
                </span>
              </div>
            </label>

            <label
              onClick={() => setPaymentMethod('UPI')}
              className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                paymentMethod === 'UPI'
                  ? 'bg-cream border-olive/40 shadow-sm'
                  : 'bg-cream/30 border-olive/15 hover:border-olive/30'
              }`}
            >
              <div className="mt-0.5 w-4 h-4 rounded-full border border-olive flex items-center justify-center shrink-0">
                {paymentMethod === 'UPI' && <div className="w-2 h-2 rounded-full bg-olive" />}
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-olive block">UPI / Instant Pay</span>
                <span className="text-[11px] text-olive/60 leading-snug block">
                  Google Pay, PhonePe, Paytm, or direct BHIM UPI transfer.
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
            className="w-full py-4 px-6 rounded-full text-sm font-medium tracking-wide bg-olive text-cream hover:bg-olive-light transition-all duration-300 shadow-lg shadow-olive/15 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-cream" />
                <span>Confirming Enrollment &amp; Registering Student...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Complete Enrollment • ₹{plan.price.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-olive/60">
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span>256-bit SSL Secure Checkout • Immediate access &amp; intake dispatch</span>
          </div>
        </div>
      </form>
    </div>
  );
}

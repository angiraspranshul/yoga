'use client';

import React, { useState } from 'react';
import { Settings } from '@/types';
import {
  Settings as SettingsIcon,
  Mail,
  Instagram,
  Bell,
  Volume2,
  Database,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Smartphone,
  Shield,
  Loader2,
} from 'lucide-react';

interface SettingsClientProps {
  initialSettings: Settings;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [instructorName, setInstructorName] = useState(initialSettings.instructorName);
  const [instagramHandle, setInstagramHandle] = useState(initialSettings.instagramHandle);
  const [notificationEmail, setNotificationEmail] = useState(initialSettings.notificationEmail);
  const [webhookUrl, setWebhookUrl] = useState(initialSettings.webhookUrl || '');
  const [emailNotifications, setEmailNotifications] = useState(initialSettings.emailNotifications);
  const [soundAlerts, setSoundAlerts] = useState(initialSettings.soundAlerts);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instructorName,
          instagramHandle,
          notificationEmail,
          webhookUrl,
          emailNotifications,
          soundAlerts,
        }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || 'Failed to update settings');

      setSettings(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-white/5 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
          Preferences &amp; Telemetry
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Settings &amp; Alerts
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Configure notification dispatch channels, instructor branding, and cloud database connections.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Settings successfully updated!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: INSTRUCTOR BRANDING */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              1. Instructor Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">Instructor Name</label>
              <input
                type="text"
                required
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">Instagram Handle</label>
              <div className="relative">
                <Instagram className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: NOTIFICATIONS & MOBILE ALERTS */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              2. Student Booking Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">
                Instructor Notification Email <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                Every new student enrollment and confidential health intake will be dispatched here.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 flex items-center justify-between">
                <span>Mobile Push Webhook URL (Discord / Telegram / Slack / Zapier)</span>
                <span className="text-emerald-400 text-[10px] font-mono">Instant Phone Alert</span>
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="url"
                  placeholder="https://discord.com/api/webhooks/... or Telegram/Make webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                Optional: Paste a Discord, Telegram, or WhatsApp webhook to get instant push alerts on your phone whenever you&apos;re away teaching.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 border-t border-white/5">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={soundAlerts}
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                  className="rounded bg-neutral-900 border-white/20 text-emerald-500 focus:ring-0"
                />
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audible Chime Alert on New Booking</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="rounded bg-neutral-900 border-white/20 text-emerald-500 focus:ring-0"
                />
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email Dispatch Enabled</span>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 3: SUPABASE ONLINE DATABASE STATUS & INSTRUCTIONS */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 bg-emerald-950/10">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                3. Online Cloud Database (Supabase PostgreSQL)
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              Ready &amp; Configured
            </span>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">
            Your platform is built to connect to a free online PostgreSQL database on{' '}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Supabase.com <ExternalLink className="w-3 h-3" />
            </a>
            .
          </p>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 text-xs font-mono text-neutral-300">
            <p className="text-neutral-400">Quick Online Setup in 3 Steps:</p>
            <p className="text-emerald-400">1. Create a free project at supabase.com</p>
            <p className="text-neutral-300">2. Copy Connection String (Prisma/Node.js) into `.env` as `DATABASE_URL`</p>
            <p className="text-neutral-300">3. Run: `npm run prisma:push`</p>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-black" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

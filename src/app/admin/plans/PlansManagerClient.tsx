'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/types';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Star,
  Loader2,
} from 'lucide-react';

interface PlansManagerClientProps {
  initialPlans: Plan[];
}

export default function PlansManagerClient({ initialPlans }: PlansManagerClientProps) {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('2499');
  const [priceUsd, setPriceUsd] = useState('32');
  const [duration, setDuration] = useState('4 Weeks (12 Sessions)');
  const [type, setType] = useState<Plan['type']>('BATCH');
  const [level, setLevel] = useState<Plan['level']>('BEGINNER');
  const [badge, setBadge] = useState('MOST POPULAR');
  const [features, setFeatures] = useState<string[]>([
    'Safe posture alignment & live corrections',
    'Breathwork (Pranayama) sequences included',
    'HD practice recordings with replay access',
  ]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const openCreateModal = () => {
    setEditingPlan(null);
    setTitle('');
    setDescription('');
    setPrice('2499');
    setPriceUsd('32');
    setDuration('4 Weeks (12 Sessions)');
    setType('BATCH');
    setLevel('BEGINNER');
    setBadge('MOST POPULAR');
    setFeatures([
      'Safe posture alignment & live corrections',
      'Breathwork (Pranayama) sequences included',
      'HD practice recordings with replay access',
    ]);
    setIsActive(true);
    setIsFeatured(false);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description);
    setPrice(plan.price.toString());
    setPriceUsd((plan.priceUsd || Math.round(plan.price / 78)).toString());
    setDuration(plan.duration);
    setType(plan.type);
    setLevel(plan.level);
    setBadge(plan.badge || '');
    setFeatures(plan.features || []);
    setIsActive(plan.isActive);
    setIsFeatured(plan.isFeatured);
    setError(null);
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFeatures([...features, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        title,
        description,
        price: Number(price),
        priceUsd: Number(priceUsd),
        currency: 'INR',
        duration,
        type,
        level,
        badge: badge.trim() || null,
        features,
        isActive,
        isFeatured,
      };

      if (editingPlan) {
        // Update existing plan
        const res = await fetch(`/api/plans/${editingPlan.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error || 'Failed to update plan');

        setPlans(plans.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        // Create new plan
        const res = await fetch('/api/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (!res.ok) throw new Error(created.error || 'Failed to create plan');

        setPlans([created, ...plans]);
      }

      setIsModalOpen(false);
      setNotice({
        type: 'success',
        message: editingPlan ? 'Plan successfully updated and synchronized with frontend.' : 'New plan created and published.',
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error saving plan');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (plan: Plan) => {
    try {
      const res = await fetch(`/api/plans/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !plan.isActive }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update visibility');
      }
      setPlans(plans.map((p) => (p.id === data.id ? data : p)));
      setNotice({
        type: 'success',
        message: data.isActive
          ? `"${plan.title}" is now visible to students on the public website.`
          : `"${plan.title}" has been hidden from public booking.`,
      });
      router.refresh();
    } catch (e: any) {
      console.error('Failed to toggle status:', e);
      setNotice({ type: 'error', message: e.message || 'Failed to toggle plan visibility.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this yoga plan offering?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/plans/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete plan');
      }
      setPlans(plans.filter((p) => p.id !== id));
      setNotice({ type: 'success', message: 'Plan successfully deleted and removed from website.' });
      router.refresh();
    } catch (e: any) {
      console.error('Failed to delete:', e);
      setNotice({ type: 'error', message: e.message || 'Failed to delete plan. Please try again.' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Offerings Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Yoga Plans &amp; Batches
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Create, update pricing, customize curriculum features, and publish offerings.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Plan</span>
        </button>
      </div>

      {/* Global Notice / Feedback Banner */}
      {notice && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 transition-all ${
            notice.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            )}
            <span>{notice.message}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="p-1 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Plans List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-panel rounded-3xl p-6 border transition-all ${
              plan.isActive ? 'border-white/10 hover:border-emerald-500/30' : 'border-red-500/20 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {plan.type}
                  </span>
                  {plan.badge && (
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {plan.badge}
                    </span>
                  )}
                  {plan.isFeatured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{plan.title}</h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleToggleActive(plan)}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    plan.isActive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-white/5 border-white/10 text-neutral-500 hover:text-white'
                  }`}
                  title={plan.isActive ? 'Active on public site' : 'Inactive (Draft)'}
                >
                  {plan.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => openEditModal(plan)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                  title="Edit Plan"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={deletingId === plan.id}
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors disabled:opacity-50"
                  title="Delete Plan"
                >
                  {deletingId === plan.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-400 mb-4 line-clamp-2">{plan.description}</p>

            <div className="flex items-center justify-between py-3 border-y border-white/5 text-xs">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {plan.duration}
              </span>
              <span className="font-mono font-bold text-white text-sm">
                ₹{plan.price.toLocaleString('en-IN')}
                <span className="text-[10px] text-neutral-500 font-normal ml-1">
                  (~${plan.priceUsd || Math.round(plan.price / 78)})
                </span>
              </span>
            </div>

            <div className="mt-4 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                Features ({plan.features?.length || 0}):
              </span>
              <ul className="space-y-1 text-xs text-neutral-300">
                {plan.features?.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT PLAN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-950 my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingPlan ? 'Edit Yoga Offering' : 'Create New Yoga Offering'}
                </h2>
                <p className="text-xs text-neutral-400">
                  Update plans displayed to students on the public website.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Offering Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunset Mobility Flow"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Duration / Schedule *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Weeks (12 Sessions)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of what the student will learn and gain..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">USD Equiv ($)</label>
                  <input
                    type="number"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Offering Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="BATCH">Batch</option>
                    <option value="PRIVATE">1-on-1</option>
                    <option value="MEMBERSHIP">Membership</option>
                    <option value="WORKSHOP">Workshop</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Skill Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="ALL_LEVELS">All Levels</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Pill Badge (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. MOST POPULAR, LIMITED SPOTS"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* FEATURES BUILDER */}
              <div className="space-y-2 border-t border-white/5 pt-3">
                <label className="text-xs text-neutral-400 block font-semibold">
                  Included Features / Curriculum Points
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add feature bullet point..."
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 pt-1 max-h-36 overflow-y-auto">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-neutral-300"
                    >
                      <span className="truncate">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOGGLES */}
              <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded bg-neutral-900 border-white/20 text-emerald-500 focus:ring-0"
                  />
                  <span>Active (Visible on public site)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded bg-neutral-900 border-white/20 text-emerald-500 focus:ring-0"
                  />
                  <span>Featured Offering</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <span>{editingPlan ? 'Save Changes' : 'Publish Plan'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

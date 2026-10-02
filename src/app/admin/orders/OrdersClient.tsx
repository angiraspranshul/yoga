'use client';

import React, { useState } from 'react';
import { Order } from '@/types';
import {
  CalendarCheck,
  User,
  Mail,
  Phone,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';

interface OrdersClientProps {
  initialOrders: Order[];
}

export default function OrdersClient({ initialOrders }: OrdersClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
      }
    } catch (e) {
      console.error('Failed to update order status:', e);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter !== 'ALL' && o.status !== filter) return false;
    if (search.trim()) {
      const query = search.toLowerCase();
      const matchName = o.client?.fullName.toLowerCase().includes(query);
      const matchEmail = o.client?.email.toLowerCase().includes(query);
      const matchPlan = o.plan?.title.toLowerCase().includes(query);
      const matchId = o.id.toLowerCase().includes(query);
      return matchName || matchEmail || matchPlan || matchId;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Student Intake &amp; Enrolments
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Client Bookings &amp; Orders
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Inspect confidential student health notes, review experience levels, and manage schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:border-emerald-500 focus:outline-none w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['ALL', 'NEW', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filter === tab
                ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            {tab} (
            {tab === 'ALL'
              ? orders.length
              : orders.filter((o) => o.status === tab).length}
            )
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center text-neutral-500 text-xs">
          No bookings match the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedId === order.id;

            return (
              <div
                key={order.id}
                className={`glass-panel rounded-2xl border transition-all ${
                  order.status === 'NEW'
                    ? 'border-amber-500/40 bg-amber-500/[0.02]'
                    : 'border-white/10'
                }`}
              >
                {/* Primary Row */}
                <div
                  onClick={() => toggleExpand(order.id)}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        order.status === 'NEW'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : order.status === 'CONFIRMED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-neutral-400 border border-white/10'
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">
                          {order.client?.fullName || 'Student'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                            order.status === 'NEW'
                              ? 'bg-amber-500/20 text-amber-300'
                              : order.status === 'CONFIRMED'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : order.status === 'COMPLETED'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                        <span>{order.client?.email}</span>
                        {order.client?.phone && <span>• {order.client.phone}</span>}
                        <span className="font-mono text-neutral-500">
                          ID: {order.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-xs font-medium text-white">
                        {order.plan?.title || 'Yoga Offering'}
                      </div>
                      <div className="font-mono text-emerald-400 text-xs font-semibold">
                        ₹{order.amount.toLocaleString('en-IN')} • {order.preferredSlot || 'Flexible'}
                      </div>
                    </div>

                    <div className="text-neutral-500 hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-white/5 space-y-6 bg-white/[0.01]">
                    {/* Health & Alignment Intake Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Health Intake Box */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                          <Activity className="w-3.5 h-3.5" />
                          <span>Confidential Health &amp; Injury Intake</span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {order.healthNotes ? (
                            <span className="italic font-medium text-amber-200">
                              &ldquo;{order.healthNotes}&rdquo;
                            </span>
                          ) : (
                            <span className="text-neutral-500">No injuries or physical sensitivities reported.</span>
                          )}
                        </p>
                      </div>

                      {/* Goals & Experience Box */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Experience &amp; Goals</span>
                        </div>
                        <div className="text-xs text-neutral-300 space-y-1">
                          <p>
                            <span className="text-neutral-500">Experience:</span>{' '}
                            {order.experienceLevel || 'Beginner'}
                          </p>
                          <p>
                            <span className="text-neutral-500">Time Preference:</span>{' '}
                            {order.preferredSlot || 'Flexible'}
                          </p>
                          {order.clientMessage && (
                            <p>
                              <span className="text-neutral-500">Note for Dhaarna:</span>{' '}
                              <span className="italic">&ldquo;{order.clientMessage}&rdquo;</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        {order.client?.phone && (
                          <a
                            href={`https://wa.me/${order.client.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WhatsApp Student</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${order.client?.email}?subject=Welcome to Yoga with Dhaarna: ${order.plan?.title}`}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Student</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.status !== 'CONFIRMED' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confirm Intake</span>
                          </button>
                        )}
                        {order.status !== 'COMPLETED' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'COMPLETED')}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 text-xs flex items-center gap-1"
                          >
                            <span>Mark Completed</span>
                          </button>
                        )}
                        {order.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs flex items-center gap-1"
                          >
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

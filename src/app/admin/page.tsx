import React from 'react';
import { getStats, getOrders } from '@/lib/db';
import {
  DollarSign,
  Users,
  Package,
  Bell,
  ArrowUpRight,
  Clock,
  Sparkles,
  CalendarCheck,
  CheckCircle,
  Activity,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const orders = await getOrders();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Instructor Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Welcome back, Dhaarna
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time telemetry for your yoga practice, student intakes, and live batches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin/plans"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Package className="w-4 h-4" />
            <span>Manage Plans</span>
          </a>
        </div>
      </div>

      {/* METRICS GRID (ULTRAHUMAN BENTO STYLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1">
              Online Payments Received
            </span>
          </div>
        </div>

        {/* Metric 2: Bookings */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Total Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {stats.totalBookings}
            </span>
            <span className="text-[11px] text-neutral-400 block mt-1">
              {stats.activeOrders} Active / Pending Sessions
            </span>
          </div>
        </div>

        {/* Metric 3: Active Plans */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Active Offerings</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {stats.activePlans}
            </span>
            <span className="text-[11px] text-neutral-400 block mt-1">
              Live On Website
            </span>
          </div>
        </div>

        {/* Metric 4: Unread Alerts */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Unread Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {stats.unreadNotifs}
            </span>
            <span className="text-[11px] text-neutral-400 block mt-1">
              New Student Enrollments
            </span>
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Recent Student Bookings</h2>
            <p className="text-xs text-neutral-400">Latest students registered with health intake notes</p>
          </div>
          <a
            href="/admin/orders"
            className="text-xs font-mono uppercase text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-neutral-500 text-center py-8">No bookings recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-neutral-400 font-mono uppercase tracking-wider">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Slot Preference</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="font-semibold text-white">{order.client?.fullName || 'Student'}</div>
                      <div className="text-[11px] text-neutral-500">{order.client?.email}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-neutral-200">{order.plan?.title || 'Yoga Plan'}</div>
                      <div className="text-[10px] font-mono text-neutral-500">{order.plan?.duration}</div>
                    </td>
                    <td className="py-4 text-neutral-300">
                      {order.preferredSlot || 'Flexible'}
                    </td>
                    <td className="py-4 font-mono font-semibold text-emerald-400">
                      ₹{order.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider ${
                          order.status === 'NEW'
                            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                            : order.status === 'CONFIRMED'
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                            : 'bg-white/10 text-neutral-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <a
                        href="/admin/orders"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-neutral-300 hover:text-white transition-colors"
                      >
                        Inspect Intake
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

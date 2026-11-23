import { prisma, isOnlineDbConnected } from './prisma';
import { Plan, Order, Client, NotificationItem, Settings } from '@/types';

// -------------------------------------------------------------------
// DATABASE-ONLY DATA LAYER — No filesystem fallback
// The Supabase PostgreSQL database is the single source of truth.
// If the database is unreachable, operations throw clear errors
// instead of silently returning stale/hardcoded data.
// -------------------------------------------------------------------

const INITIAL_SETTINGS: Settings = {
  id: 'default',
  instructorName: 'Dhaarna Sharma',
  instagramHandle: '@yogawithdhaarna',
  instagramUrl: 'https://www.instagram.com/yogawithdhaarna',
  notificationEmail: 'dhaarna@yogawithdhaarna.com',
  webhookUrl: '',
  emailNotifications: true,
  soundAlerts: true,
};

function requireDb() {
  if (!isOnlineDbConnected || !prisma) {
    throw new Error(
      'Database connection is not available. Please check your DATABASE_URL environment variable.'
    );
  }
  return prisma;
}

// -------------------------------------------------------------
// FORMATTERS
// -------------------------------------------------------------

function formatPlan(p: any): Plan {
  return {
    ...p,
    type: p.type as Plan['type'],
    level: p.level as Plan['level'],
    features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || []),
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : p.createdAt.toISOString(),
    updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : p.updatedAt.toISOString(),
  };
}

function formatOrder(r: any): Order {
  return {
    ...r,
    plan: r.plan ? formatPlan(r.plan) : undefined,
    client: r.client
      ? {
          ...r.client,
          createdAt: typeof r.client.createdAt === 'string' ? r.client.createdAt : r.client.createdAt.toISOString(),
        }
      : undefined,
    status: r.status as Order['status'],
    createdAt: typeof r.createdAt === 'string' ? r.createdAt : r.createdAt.toISOString(),
    updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : r.updatedAt.toISOString(),
  };
}

// -------------------------------------------------------------
// PLANS
// -------------------------------------------------------------

/** Rough conversion used only when an admin leaves the USD price empty. */
export const INR_PER_USD = 85;

/** Archived plans (deleted but kept for order history) are never listed. */
export async function getPlans(includeInactive = false): Promise<Plan[]> {
  const db = requireDb();
  const records = await db.plan.findMany({
    where: includeInactive ? { archivedAt: null } : { isActive: true, archivedAt: null },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  });
  return records.map(formatPlan);
}

/** A plan customers may view and book: active and not archived. */
export async function getBookablePlanById(id: string): Promise<Plan | null> {
  const db = requireDb();
  const p = await db.plan.findFirst({ where: { id, isActive: true, archivedAt: null } });
  return p ? formatPlan(p) : null;
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  const db = requireDb();
  const p = await db.plan.findUnique({ where: { slug } });
  return p ? formatPlan(p) : null;
}

export async function getPlanById(id: string): Promise<Plan | null> {
  const db = requireDb();
  const p = await db.plan.findUnique({ where: { id } });
  return p ? formatPlan(p) : null;
}

export async function createPlan(data: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> {
  const db = requireDb();
  const created = await db.plan.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      currency: data.currency || 'INR',
      priceUsd: data.priceUsd || Math.round(data.price / INR_PER_USD),
      duration: data.duration,
      type: data.type,
      level: data.level,
      features: JSON.stringify(data.features),
      imageUrl: data.imageUrl,
      badge: data.badge,
      isActive: data.isActive,
      isFeatured: data.isFeatured,
    },
  });
  return formatPlan(created);
}

/** Editable plan fields only (already validated by planUpdateSchema). */
export type PlanUpdate = Partial<
  Pick<Plan, 'title' | 'slug' | 'description' | 'price' | 'priceUsd' | 'currency' | 'duration' | 'type' | 'level' | 'features' | 'badge' | 'imageUrl' | 'isActive' | 'isFeatured'>
>;

export async function updatePlan(id: string, data: PlanUpdate): Promise<Plan | null> {
  const db = requireDb();
  try {
    const { features, ...rest } = data;
    const updated = await db.plan.update({
      where: { id, archivedAt: null },
      data: {
        ...rest,
        ...(features !== undefined ? { features: JSON.stringify(features) } : {}),
      },
    });
    return formatPlan(updated);
  } catch (e: any) {
    if (e?.code === 'P2025') return null; // Record not found (or archived)
    throw e;
  }
}

/**
 * Deletes a plan. If it has bookings, it is archived instead (hidden everywhere,
 * but kept so its orders and revenue history are not lost).
 */
export async function deletePlan(id: string): Promise<'deleted' | 'archived' | 'not_found'> {
  const db = requireDb();
  return db.$transaction(async (tx) => {
    const plan = await tx.plan.findFirst({ where: { id, archivedAt: null }, select: { id: true } });
    if (!plan) return 'not_found';
    const orderCount = await tx.order.count({ where: { planId: id } });
    if (orderCount === 0) {
      await tx.plan.delete({ where: { id } });
      return 'deleted';
    }
    await tx.plan.update({
      where: { id },
      data: { archivedAt: new Date(), isActive: false, isFeatured: false },
    });
    return 'archived';
  });
}

// -------------------------------------------------------------
// ORDERS
// -------------------------------------------------------------

function formatClient(c: { id: string; fullName: string; email: string; phone: string | null; createdAt: Date }): Client {
  return { id: c.id, fullName: c.fullName, email: c.email, phone: c.phone, createdAt: c.createdAt.toISOString() };
}

/**
 * Creates the client (if new), order and admin notification in one transaction.
 * With an idempotency key, a repeated submission returns the original order
 * (`created: false`) instead of booking twice.
 * The caller must pass a plan that is bookable (see getBookablePlanById).
 */
export async function createOrder(payload: {
  plan: Plan;
  fullName: string;
  email: string;
  phone?: string;
  paymentMethod: string;
  experienceLevel?: string;
  healthNotes?: string;
  preferredSlot?: string;
  clientMessage?: string;
  idempotencyKey?: string;
}): Promise<{ order: Order; client: Client; created: boolean }> {
  const db = requireDb();
  const { plan } = payload;

  const findExisting = async () => {
    if (!payload.idempotencyKey) return null;
    const existing = await db.order.findUnique({
      where: { idempotencyKey: payload.idempotencyKey },
      include: { plan: true, client: true },
    });
    return existing ? { order: formatOrder(existing), client: formatClient(existing.client), created: false } : null;
  };

  const duplicate = await findExisting();
  if (duplicate) return duplicate;

  try {
    return await db.$transaction(async (tx) => {
      // Existing students keep their stored name/phone: an unauthenticated form
      // must not be able to overwrite another person's details.
      const dbClient = await tx.client.upsert({
        where: { email: payload.email },
        update: {},
        create: { fullName: payload.fullName, email: payload.email, phone: payload.phone },
      });

      const dbOrder = await tx.order.create({
        data: {
          planId: plan.id,
          clientId: dbClient.id,
          amount: plan.price,
          currency: plan.currency,
          status: 'NEW',
          paymentMethod: payload.paymentMethod,
          // No payment gateway yet (Phase 2): nothing has been charged.
          paymentStatus: 'PENDING',
          experienceLevel: payload.experienceLevel,
          healthNotes: payload.healthNotes,
          preferredSlot: payload.preferredSlot,
          clientMessage: payload.clientMessage,
          idempotencyKey: payload.idempotencyKey,
        },
        include: { plan: true, client: true },
      });

      await tx.notification.create({
        data: {
          title: `New Yoga Booking: ${plan.title}`,
          message: `${payload.fullName} enrolled in ${plan.title} (₹${plan.price.toLocaleString('en-IN')}).`,
          orderId: dbOrder.id,
        },
      });

      return { order: formatOrder(dbOrder), client: formatClient(dbClient), created: true };
    });
  } catch (e: any) {
    // Two identical submissions raced: the other one won, return its order.
    if (e?.code === 'P2002' && payload.idempotencyKey) {
      const raced = await findExisting();
      if (raced) return raced;
    }
    throw e;
  }
}

export async function getOrders(): Promise<Order[]> {
  const db = requireDb();
  const records = await db.order.findMany({
    include: { plan: true, client: true },
    orderBy: { createdAt: 'desc' },
  });
  return records.map(formatOrder);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const db = requireDb();
  const record = await db.order.findUnique({
    where: { id },
    include: { plan: true, client: true },
  });
  return record ? formatOrder(record) : null;
}

export async function updateOrder(
  orderId: string,
  data: { status?: Order['status']; paymentStatus?: 'PENDING' | 'PAID' | 'REFUNDED' }
): Promise<Order | null> {
  const db = requireDb();
  try {
    const updated = await db.order.update({
      where: { id: orderId },
      data,
      include: { plan: true, client: true },
    });
    return formatOrder(updated);
  } catch (e: any) {
    if (e?.code === 'P2025') return null;
    throw e;
  }
}

// -------------------------------------------------------------
// NOTIFICATIONS
// -------------------------------------------------------------

export async function getNotifications(): Promise<NotificationItem[]> {
  const db = requireDb();
  const records = await db.notification.findMany({
    orderBy: { createdAt: 'desc' },
    take: 30,
  });
  return records.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }));
}

export async function markNotificationRead(id: string): Promise<boolean> {
  const db = requireDb();
  try {
    await db.notification.update({
      where: { id },
      data: { isRead: true },
    });
    return true;
  } catch (e: any) {
    if (e?.code === 'P2025') return false;
    throw e;
  }
}

// -------------------------------------------------------------
// SETTINGS
// -------------------------------------------------------------

export async function getSettings(): Promise<Settings> {
  const db = requireDb();
  const s = await db.settings.findFirst();
  return s || INITIAL_SETTINGS;
}

export async function updateSettings(data: Partial<Omit<Settings, 'id'>>): Promise<Settings> {
  // If instagramHandle was provided, sync the url
  if (data.instagramHandle) {
    const cleanHandle = data.instagramHandle.replace('@', '').trim();
    data.instagramUrl = `https://www.instagram.com/${cleanHandle}`;
  }

  const db = requireDb();
  const updated = await db.settings.upsert({
    where: { id: 'default' },
    create: { ...INITIAL_SETTINGS, ...data },
    update: data,
  });
  return updated;
}

// -------------------------------------------------------------
// STATS
// -------------------------------------------------------------

export async function getStats() {
  const db = requireDb();
  const [revenue, pending, totalBookings, activeOrders, activePlans, unreadNotifs, recent] = await Promise.all([
    // Revenue counts only orders marked PAID that were not cancelled.
    db.order.aggregate({ _sum: { amount: true }, where: { paymentStatus: 'PAID', status: { not: 'CANCELLED' } } }),
    db.order.aggregate({ _sum: { amount: true }, where: { paymentStatus: 'PENDING', status: { not: 'CANCELLED' } } }),
    db.order.count(),
    db.order.count({ where: { status: { in: ['NEW', 'CONFIRMED'] } } }),
    db.plan.count({ where: { isActive: true, archivedAt: null } }),
    db.notification.count({ where: { isRead: false } }),
    db.order.findMany({ include: { plan: true, client: true }, orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  return {
    totalRevenue: revenue._sum.amount ?? 0,
    pendingRevenue: pending._sum.amount ?? 0,
    totalBookings,
    activeOrders,
    activePlans,
    unreadNotifs,
    recentOrders: recent.map(formatOrder),
  };
}

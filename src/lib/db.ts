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

export async function getPlans(includeInactive = false): Promise<Plan[]> {
  const db = requireDb();
  const records = await db.plan.findMany({
    where: includeInactive ? undefined : { isActive: true },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  });
  return records.map(formatPlan);
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
      priceUsd: data.priceUsd || Math.round(data.price / 80),
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

export async function updatePlan(id: string, data: Partial<Plan>): Promise<Plan | null> {
  const db = requireDb();
  try {
    const updated = await db.plan.update({
      where: { id },
      data: {
        ...data,
        features: data.features ? JSON.stringify(data.features) : undefined,
      },
    });
    return formatPlan(updated);
  } catch (e: any) {
    if (e?.code === 'P2025') return null; // Record not found
    throw e;
  }
}

export async function deletePlan(id: string): Promise<boolean> {
  const db = requireDb();
  try {
    // First delete associated orders to prevent foreign key constraint violations
    await db.order.deleteMany({ where: { planId: id } });
    await db.plan.delete({ where: { id } });
    return true;
  } catch (e: any) {
    if (e?.code === 'P2025') return false; // Record not found
    throw e;
  }
}

// -------------------------------------------------------------
// ORDERS
// -------------------------------------------------------------

export async function createOrder(payload: {
  planId: string;
  fullName: string;
  email: string;
  phone?: string;
  paymentMethod?: string;
  experienceLevel?: string;
  healthNotes?: string;
  preferredSlot?: string;
  clientMessage?: string;
}): Promise<{ order: Order; client: Client; notification: NotificationItem }> {
  const db = requireDb();
  const plan = await getPlanById(payload.planId);
  if (!plan) {
    throw new Error(`Plan with id "${payload.planId}" not found`);
  }

  // Find or create client
  let dbClient = await db.client.findFirst({ where: { email: payload.email } });
  if (!dbClient) {
    dbClient = await db.client.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
      },
    });
  }

  // Create order
  const dbOrder = await db.order.create({
    data: {
      planId: plan.id,
      clientId: dbClient.id,
      amount: plan.price,
      currency: plan.currency,
      status: 'NEW',
      paymentMethod: payload.paymentMethod || 'CARD',
      paymentStatus: 'PAID',
      experienceLevel: payload.experienceLevel,
      healthNotes: payload.healthNotes,
      preferredSlot: payload.preferredSlot,
      clientMessage: payload.clientMessage,
    },
    include: { plan: true, client: true },
  });

  // Create notification
  const dbNotif = await db.notification.create({
    data: {
      title: `New Yoga Booking: ${plan.title}`,
      message: `${payload.fullName} enrolled in ${plan.title} (₹${plan.price.toLocaleString('en-IN')}).`,
      orderId: dbOrder.id,
      isRead: false,
    },
  });

  return {
    order: formatOrder(dbOrder),
    client: {
      id: dbClient.id,
      fullName: dbClient.fullName,
      email: dbClient.email,
      phone: dbClient.phone,
      createdAt: dbClient.createdAt.toISOString(),
    },
    notification: {
      id: dbNotif.id,
      title: dbNotif.title,
      message: dbNotif.message,
      orderId: dbOrder.id,
      isRead: false,
      createdAt: dbNotif.createdAt.toISOString(),
    },
  };
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

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
  const db = requireDb();
  try {
    const updated = await db.order.update({
      where: { id: orderId },
      data: { status },
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

export async function updateSettings(data: Partial<Settings>): Promise<Settings> {
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
  const orders = await getOrders();
  const plans = await getPlans(true);
  const notifications = await getNotifications();

  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === 'PAID' ? sum + o.amount : sum), 0);
  const activeOrders = orders.filter((o) => o.status === 'NEW' || o.status === 'CONFIRMED').length;
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  return {
    totalRevenue,
    totalBookings: orders.length,
    activeOrders,
    activePlans: plans.filter((p) => p.isActive).length,
    unreadNotifs,
    recentOrders: orders.slice(0, 5),
  };
}

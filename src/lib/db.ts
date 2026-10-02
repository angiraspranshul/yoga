import fs from 'fs';
import path from 'path';
import { prisma, isOnlineDbConnected } from './prisma';
import { Plan, Order, Client, NotificationItem, Settings } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_PLANS: Plan[] = [
  {
    id: 'plan_1',
    title: 'Beginner Foundations & Safe Alignment',
    slug: 'beginner-foundations-safe-alignment',
    description: 'Designed specifically for beginners or those returning to yoga after injury. Build functional strength, learn proper joint alignment, and cultivate breath awareness without fear of straining your lower back.',
    price: 2499,
    priceUsd: 32,
    currency: 'INR',
    duration: '4 Weeks (12 Live Sessions)',
    type: 'BATCH',
    level: 'BEGINNER',
    badge: 'MOST POPULAR',
    features: [
      'Master foundational postures (Tadasana, Bhujangasana, Virabhadrasana)',
      'Gentle spine decompression & wrist/knee injury prevention',
      'Live posture correction & personal Q&A every session',
      'HD recordings + guided practice homework included',
      'No prior flexibility or yoga experience required',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plan_2',
    title: '1-on-1 Personal Spine Health & Mobility Coaching',
    slug: '1-on-1-spine-health-mobility',
    description: "Private dedicated coaching tailored to your body's unique anatomy and lifestyle. Ideal for desk workers, individuals managing neck/back stiffness, or those seeking dedicated 1-on-1 attention.",
    price: 4999,
    priceUsd: 65,
    currency: 'INR',
    duration: '4 Private Sessions (60 Min each)',
    type: 'PRIVATE',
    level: 'ALL_LEVELS',
    badge: 'LIMITED (4 SPOTS/WEEK)',
    features: [
      'Comprehensive posture & spinal mobility assessment',
      'Customized sequence for desk slouch, back pain, or stiffness',
      'Direct WhatsApp guidance & daily posture habit tracker',
      'Flexible scheduling according to your timezone',
      'Personalized Pranayama (breathwork) sequence for stress',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plan_3',
    title: 'Monthly Morning Flow & Pranayama Pass',
    slug: 'monthly-morning-flow-pranayama',
    description: 'Start each morning grounded, energized, and centered. A balanced rhythm of energizing movement, nervous system regulation, and mindful stillness before your workday begins.',
    price: 3499,
    priceUsd: 45,
    currency: 'INR',
    duration: 'Monthly Pass (Mon-Fri 7:00 AM IST)',
    type: 'MEMBERSHIP',
    level: 'ALL_LEVELS',
    badge: 'DAILY RITUAL',
    features: [
      '20 Live interactive morning classes per month',
      'Dynamic Vinyasa flow + soothing restorative cool-down',
      '15 minutes dedicated conscious breathwork & meditation',
      'Community WhatsApp circle with weekly wellness prompts',
      'Full access to on-demand catch-up recordings',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plan_4',
    title: 'Mindful Mini-Retreat & Breathwork Immersion',
    slug: 'mindful-mini-retreat-breathwork',
    description: 'An immersive weekend journey into deep rest, mindfulness, and nervous system regulation. Step away from daily noise to recharge your mind and body.',
    price: 5999,
    priceUsd: 79,
    currency: 'INR',
    duration: 'Weekend Intensive (Saturday & Sunday)',
    type: 'WORKSHOP',
    level: 'ALL_LEVELS',
    badge: 'SPECIAL IMMERSION',
    features: [
      'Deep parasympathetic nervous system reset',
      'Intensive alignment workshop & gentle somatic movement',
      'Guided sound meditation & restorative Yin yoga',
      'Personalized wellness workbook & reflection journal',
      'Small intimate cohort (max 15 participants)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1200&q=80',
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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

interface LocalStore {
  plans: Plan[];
  clients: Client[];
  orders: Order[];
  notifications: NotificationItem[];
  settings: Settings;
}

function ensureDataFile(): LocalStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const initial: LocalStore = {
        plans: INITIAL_PLANS,
        clients: [
          {
            id: 'client_1',
            fullName: 'Ananya Roy',
            email: 'ananya.roy@example.com',
            phone: '+91 98765 43210',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
          {
            id: 'client_2',
            fullName: 'Marcus Vance',
            email: 'marcus.v@example.com',
            phone: '+1 415 555 0192',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
        orders: [
          {
            id: 'ord_1',
            planId: 'plan_1',
            clientId: 'client_1',
            amount: 2499,
            currency: 'INR',
            status: 'CONFIRMED',
            paymentMethod: 'DEMO_CHECKOUT',
            paymentStatus: 'PAID',
            experienceLevel: 'Beginner (New to Yoga)',
            healthNotes: 'Mild lower back stiffness from sitting 9 hours at work.',
            preferredSlot: 'Morning 7:00 AM IST',
            clientMessage: 'Looking forward to safe alignment and learning the basics!',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
          {
            id: 'ord_2',
            planId: 'plan_2',
            clientId: 'client_2',
            amount: 4999,
            currency: 'INR',
            status: 'NEW',
            paymentMethod: 'DEMO_CHECKOUT',
            paymentStatus: 'PAID',
            experienceLevel: 'Regular Practitioner',
            healthNotes: 'Past shoulder impingement, need posture correction.',
            preferredSlot: 'Weekend Mornings',
            clientMessage: 'Need help refining Bhujangasana and spine mobility.',
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
            updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          },
        ],
        notifications: [
          {
            id: 'notif_1',
            title: 'New Booking: 1-on-1 Spine Health',
            message: 'Marcus Vance purchased 1-on-1 Personal Spine Health Coaching (INR 4,999).',
            orderId: 'ord_2',
            isRead: false,
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          },
          {
            id: 'notif_2',
            title: 'New Booking: Beginner Foundations',
            message: 'Ananya Roy enrolled in Beginner Foundations & Safe Alignment (INR 2,499).',
            orderId: 'ord_1',
            isRead: true,
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ],
        settings: INITIAL_SETTINGS,
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
    return data;
  } catch {
    return {
      plans: INITIAL_PLANS,
      clients: [],
      orders: [],
      notifications: [],
      settings: INITIAL_SETTINGS,
    };
  }
}

function saveStore(data: LocalStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save store:', err);
  }
}

// -------------------------------------------------------------
// PUBLIC & ADMIN DATABASE METHODS
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

export async function getPlans(includeInactive = false): Promise<Plan[]> {
  if (isOnlineDbConnected && prisma) {
    try {
      const records = await prisma.plan.findMany({
        where: includeInactive ? undefined : { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      });
      return records.map(formatPlan);
    } catch (e) {
      console.warn('Prisma query failed, falling back to store:', e);
    }
  }

  const store = ensureDataFile();
  return includeInactive ? store.plans : store.plans.filter((p) => p.isActive);
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  if (isOnlineDbConnected && prisma) {
    try {
      const p = await prisma.plan.findUnique({ where: { slug } });
      if (p) {
        return formatPlan(p);
      }
    } catch (e) {
      console.warn('Prisma query failed, falling back to store:', e);
    }
  }

  const store = ensureDataFile();
  return store.plans.find((p) => p.slug === slug) || null;
}

export async function getPlanById(id: string): Promise<Plan | null> {
  if (isOnlineDbConnected && prisma) {
    try {
      const p = await prisma.plan.findUnique({ where: { id } });
      if (p) {
        return formatPlan(p);
      }
    } catch (e) {
      console.warn('Prisma query failed, falling back to store:', e);
    }
  }

  const store = ensureDataFile();
  return store.plans.find((p) => p.id === id) || null;
}

export async function createPlan(data: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> {
  const newPlan: Plan = {
    ...data,
    id: 'plan_' + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isOnlineDbConnected && prisma) {
    try {
      const created = await prisma.plan.create({
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
    } catch (e) {
      console.warn('Prisma create failed, falling back to local store:', e);
    }
  }

  const store = ensureDataFile();
  store.plans.unshift(newPlan);
  saveStore(store);
  return newPlan;
}

export async function updatePlan(id: string, data: Partial<Plan>): Promise<Plan | null> {
  if (isOnlineDbConnected && prisma) {
    try {
      const updated = await prisma.plan.update({
        where: { id },
        data: {
          ...data,
          features: data.features ? JSON.stringify(data.features) : undefined,
        },
      });
      return formatPlan(updated);
    } catch (e) {
      console.warn('Prisma update failed, falling back to local store:', e);
    }
  }

  const store = ensureDataFile();
  const idx = store.plans.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store.plans[idx] = {
    ...store.plans[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);
  return store.plans[idx];
}

export async function deletePlan(id: string): Promise<boolean> {
  if (isOnlineDbConnected && prisma) {
    try {
      await prisma.plan.delete({ where: { id } });
      return true;
    } catch (e) {
      console.warn('Prisma delete failed, falling back to local store:', e);
    }
  }

  const store = ensureDataFile();
  const initialLen = store.plans.length;
  store.plans = store.plans.filter((p) => p.id !== id);
  saveStore(store);
  return store.plans.length < initialLen;
}

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
  const store = ensureDataFile();
  const plan = (await getPlanById(payload.planId)) || store.plans[0];

  const clientId = 'cli_' + Date.now();
  const client: Client = {
    id: clientId,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone || null,
    createdAt: new Date().toISOString(),
  };

  const orderId = 'ord_' + Date.now();
  const order: Order = {
    id: orderId,
    planId: plan.id,
    plan,
    clientId,
    client,
    amount: plan.price,
    currency: plan.currency || 'INR',
    status: 'NEW',
    paymentMethod: payload.paymentMethod || 'DEMO_CHECKOUT',
    paymentStatus: 'PAID',
    experienceLevel: payload.experienceLevel || null,
    healthNotes: payload.healthNotes || null,
    preferredSlot: payload.preferredSlot || null,
    clientMessage: payload.clientMessage || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const notifId = 'notif_' + Date.now();
  const notification: NotificationItem = {
    id: notifId,
    title: `New Yoga Booking: ${plan.title}`,
    message: `${client.fullName} enrolled in ${plan.title} (₹${plan.price.toLocaleString('en-IN')}).`,
    orderId,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  if (isOnlineDbConnected && prisma) {
    try {
      let dbClient = await prisma.client.findFirst({ where: { email: payload.email } });
      if (!dbClient) {
        dbClient = await prisma.client.create({
          data: {
            fullName: payload.fullName,
            email: payload.email,
            phone: payload.phone,
          },
        });
      }

      const dbOrder = await prisma.order.create({
        data: {
          planId: plan.id,
          clientId: dbClient.id,
          amount: plan.price,
          currency: plan.currency,
          status: 'NEW',
          paymentMethod: payload.paymentMethod || 'DEMO_CHECKOUT',
          paymentStatus: 'PAID',
          experienceLevel: payload.experienceLevel,
          healthNotes: payload.healthNotes,
          preferredSlot: payload.preferredSlot,
          clientMessage: payload.clientMessage,
        },
      });

      const dbNotif = await prisma.notification.create({
        data: {
          title: notification.title,
          message: notification.message,
          orderId: dbOrder.id,
          isRead: false,
        },
      });

      return {
        order: {
          ...order,
          id: dbOrder.id,
          createdAt: dbOrder.createdAt.toISOString(),
          updatedAt: dbOrder.updatedAt.toISOString(),
        },
        client: {
          ...client,
          id: dbClient.id,
          createdAt: dbClient.createdAt.toISOString(),
        },
        notification: {
          ...notification,
          id: dbNotif.id,
          orderId: dbOrder.id,
          createdAt: dbNotif.createdAt.toISOString(),
        },
      };
    } catch (e) {
      console.warn('Prisma create order failed, saving locally:', e);
    }
  }

  store.clients.unshift(client);
  store.orders.unshift(order);
  store.notifications.unshift(notification);
  saveStore(store);

  return { order, client, notification };
}

export async function getOrders(): Promise<Order[]> {
  if (isOnlineDbConnected && prisma) {
    try {
      const records = await prisma.order.findMany({
        include: { plan: true, client: true },
        orderBy: { createdAt: 'desc' },
      });
      return records.map(formatOrder);
    } catch (e) {
      console.warn('Prisma getOrders failed, fallback to local store:', e);
    }
  }

  const store = ensureDataFile();
  return store.orders.map((o) => ({
    ...o,
    plan: store.plans.find((p) => p.id === o.planId),
    client: store.clients.find((c) => c.id === o.clientId),
  }));
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
  if (isOnlineDbConnected && prisma) {
    try {
      const updated = await prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: { plan: true, client: true },
      });
      return formatOrder(updated);
    } catch (e) {
      console.warn('Prisma update order failed, fallback to local store:', e);
    }
  }

  const store = ensureDataFile();
  const idx = store.orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;
  store.orders[idx].status = status;
  store.orders[idx].updatedAt = new Date().toISOString();
  saveStore(store);
  return store.orders[idx];
}

export async function getNotifications(): Promise<NotificationItem[]> {
  if (isOnlineDbConnected && prisma) {
    try {
      const records = await prisma.notification.findMany({
        orderBy: { createdAt: 'desc' },
        take: 30,
      });
      return records.map((n) => ({
        ...n,
        createdAt: n.createdAt.toISOString(),
      }));
    } catch (e) {
      console.warn('Prisma getNotifications failed, fallback to store:', e);
    }
  }

  const store = ensureDataFile();
  return store.notifications;
}

export async function markNotificationRead(id: string): Promise<boolean> {
  if (isOnlineDbConnected && prisma) {
    try {
      await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });
      return true;
    } catch (e) {
      console.warn('Prisma markNotificationRead failed, fallback to store:', e);
    }
  }

  const store = ensureDataFile();
  const notif = store.notifications.find((n) => n.id === id);
  if (notif) {
    notif.isRead = true;
    saveStore(store);
    return true;
  }
  return false;
}

export async function getSettings(): Promise<Settings> {
  if (isOnlineDbConnected && prisma) {
    try {
      const s = await prisma.settings.findFirst();
      if (s) return s;
    } catch (e) {
      console.warn('Prisma getSettings failed, fallback to store:', e);
    }
  }

  const store = ensureDataFile();
  return store.settings || INITIAL_SETTINGS;
}

export async function updateSettings(data: Partial<Settings>): Promise<Settings> {
  if (isOnlineDbConnected && prisma) {
    try {
      const updated = await prisma.settings.upsert({
        where: { id: 'default' },
        create: { ...INITIAL_SETTINGS, ...data },
        update: data,
      });
      return updated;
    } catch (e) {
      console.warn('Prisma updateSettings failed, fallback to store:', e);
    }
  }

  const store = ensureDataFile();
  store.settings = { ...store.settings, ...data };
  saveStore(store);
  return store.settings;
}

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

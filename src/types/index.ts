export interface Plan {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  priceUsd: number;
  duration: string;
  type: 'PRIVATE' | 'BATCH' | 'WORKSHOP' | 'MEMBERSHIP';
  level: 'BEGINNER' | 'ALL_LEVELS' | 'INTERMEDIATE';
  features: string[]; // parsed array
  imageUrl?: string | null;
  badge?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  planId: string;
  plan?: Plan;
  clientId: string;
  client?: Client;
  amount: number;
  currency: string;
  status: 'NEW' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentMethod: string;
  paymentStatus: string;
  experienceLevel?: string | null;
  healthNotes?: string | null;
  preferredSlot?: string | null;
  clientMessage?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  orderId?: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface Settings {
  id: string;
  instructorName: string;
  instagramHandle: string;
  instagramUrl: string;
  notificationEmail: string;
  webhookUrl?: string | null;
  emailNotifications: boolean;
  soundAlerts: boolean;
}

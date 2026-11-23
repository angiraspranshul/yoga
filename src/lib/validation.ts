import { NextResponse } from 'next/server';
import { z, ZodTypeAny } from 'zod';

// No control characters (blocks header/log injection via names, notes, etc.).
const NO_CONTROL = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/;
const SINGLE_LINE = /^[^\u0000-\u001F\u007F]*$/;

const text = (min: number, max: number, singleLine = true) =>
  z.string().trim().min(min).max(max).regex(singleLine ? SINGLE_LINE : NO_CONTROL, 'contains invalid characters');

/** Optional text: empty string becomes undefined. */
const optionalText = (max: number, singleLine = true) =>
  z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    text(1, max, singleLine).optional()
  );

const id = z.string().trim().min(1).max(64).regex(/^[A-Za-z0-9_-]+$/, 'invalid id');
const email = z.string().trim().toLowerCase().max(254).email();

export const EXPERIENCE_LEVELS = ['Beginner (New to Yoga)', 'Intermediate (Some Practice)', 'Regular Practitioner'] as const;
export const TIME_SLOTS = ['Morning 7:00 AM IST', 'Evening 6:30 PM IST', 'Weekend Mornings', 'Flexible / 1-on-1 Consultation'] as const;
export const ORDER_STATUSES = ['NEW', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const;
export const PAYMENT_STATUSES = ['PENDING', 'PAID', 'REFUNDED'] as const;
export const PLAN_TYPES = ['PRIVATE', 'BATCH', 'WORKSHOP', 'MEMBERSHIP'] as const;
export const PLAN_LEVELS = ['BEGINNER', 'ALL_LEVELS', 'INTERMEDIATE'] as const;

// ---------------------------------------------------------------- checkout
export const checkoutSchema = z.object({
  planId: id,
  fullName: text(2, 100),
  email,
  phone: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/, 'invalid phone number').optional()
  ),
  experienceLevel: z.enum(EXPERIENCE_LEVELS).optional(),
  healthNotes: optionalText(1000, false),
  preferredSlot: z.enum(TIME_SLOTS).optional(),
  clientMessage: optionalText(500),
  paymentMethod: z.enum(['CARD', 'UPI']).default('CARD'),
  idempotencyKey: z.string().uuid().optional(),
});

// ---------------------------------------------------------------- plans
const planFields = {
  title: text(3, 120),
  slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be lowercase words joined by hyphens'),
  description: text(10, 2000, false),
  price: z.coerce.number().positive().max(1_000_000),
  priceUsd: z.coerce.number().min(0).max(20_000),
  currency: z.literal('INR'),
  duration: text(1, 100),
  type: z.enum(PLAN_TYPES),
  level: z.enum(PLAN_LEVELS),
  features: z.array(text(1, 200)).max(20),
  badge: z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? null : v), text(1, 40).nullable()),
  imageUrl: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? null : v),
    z.string().trim().url().max(500).startsWith('https://', 'image URL must use https').nullable()
  ),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
};

/** Unknown fields are dropped, so clients cannot set id, timestamps or relations. */
export const planCreateSchema = z.object({
  ...planFields,
  slug: planFields.slug.optional(),
  priceUsd: planFields.priceUsd.optional(),
  currency: planFields.currency.default('INR'),
  type: planFields.type.default('BATCH'),
  level: planFields.level.default('ALL_LEVELS'),
  features: planFields.features.default([]),
  badge: planFields.badge.optional(),
  imageUrl: planFields.imageUrl.optional(),
  isActive: planFields.isActive.default(true),
  isFeatured: planFields.isFeatured.default(false),
});

export const planUpdateSchema = z
  .object(planFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, 'no fields to update');

// ---------------------------------------------------------------- admin
export const settingsUpdateSchema = z
  .object({
    instructorName: text(2, 80),
    instagramHandle: z.string().trim().regex(/^@?[A-Za-z0-9._]{1,30}$/, 'invalid Instagram handle'),
    notificationEmail: email,
    webhookUrl: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() === '' ? null : v),
      z.string().trim().url().max(500).startsWith('https://', 'webhook URL must use https').nullable()
    ),
    emailNotifications: z.boolean(),
    soundAlerts: z.boolean(),
  })
  .partial();

export const orderUpdateSchema = z
  .object({
    orderId: id,
    status: z.enum(ORDER_STATUSES).optional(),
    paymentStatus: z.enum(PAYMENT_STATUSES).optional(),
  })
  .refine((v) => v.status || v.paymentStatus, 'status or paymentStatus is required');

export const notificationUpdateSchema = z.object({ id });

// ---------------------------------------------------------------- chat
export const chatSchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().min(1).max(2000) }))
    .min(1)
    .max(20)
    .refine((m) => m[m.length - 1].role === 'user', 'last message must be from the user'),
});

// ---------------------------------------------------------------- helper
type ParseResult<S extends ZodTypeAny> = { data: z.infer<S>; error?: never } | { data?: never; error: NextResponse };

/** Parses a JSON request body against a schema; returns a 400 response on failure. */
export async function parseJson<S extends ZodTypeAny>(request: Request, schema: S): Promise<ParseResult<S>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 }) };
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const issue = result.error.issues[0];
    const field = issue.path.join('.');
    return {
      error: NextResponse.json(
        { error: field ? `Invalid ${field}: ${issue.message}` : issue.message },
        { status: 400 }
      ),
    };
  }
  return { data: result.data };
}

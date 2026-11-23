import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createOrder, getSettings, getBookablePlanById } from '@/lib/db';
import { dispatchOrderNotifications } from '@/lib/notification';
import { checkoutSchema, parseJson } from '@/lib/validation';
import { clientIp, enforceRateLimits } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const parsed = await parseJson(request, checkoutSchema);
    if (parsed.error) return parsed.error;
    const input = parsed.data;

    // Limits booking spam and abuse of the confirmation email.
    const limited = await enforceRateLimits([
      { name: 'checkout-ip', subject: clientIp(request), limit: 5, windowSeconds: 60 * 60 },
      { name: 'checkout-email', subject: input.email, limit: 3, windowSeconds: 60 * 60 },
    ]);
    if (limited) return limited;

    const plan = await getBookablePlanById(input.planId);
    if (!plan) {
      return NextResponse.json({ error: 'This plan is not available for booking.' }, { status: 404 });
    }

    const { order, client, created } = await createOrder({
      plan,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      paymentMethod: input.paymentMethod,
      experienceLevel: input.experienceLevel,
      healthNotes: input.healthNotes,
      preferredSlot: input.preferredSlot,
      clientMessage: input.clientMessage,
      idempotencyKey: input.idempotencyKey,
    });

    // A repeated submission of the same form: don't notify twice.
    if (created) {
      const settings = await getSettings();
      await dispatchOrderNotifications({
        order,
        client,
        plan,
        instructorEmail: settings.notificationEmail || process.env.INSTRUCTOR_EMAIL || 'dhaarna@yogawithdhaarna.com',
        webhookUrl: settings.webhookUrl || process.env.DISCORD_WEBHOOK_URL,
        settings,
      });

      revalidatePath('/admin', 'page');
      revalidatePath('/admin/orders', 'page');
    }

    // Only the booking reference goes back to the browser.
    return NextResponse.json({ success: true, bookingId: order.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}

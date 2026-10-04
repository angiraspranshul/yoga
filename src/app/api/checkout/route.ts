import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createOrder, getSettings, getPlanById } from '@/lib/db';
import { dispatchOrderNotifications } from '@/lib/notification';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      planId,
      fullName,
      email,
      phone,
      experienceLevel,
      healthNotes,
      preferredSlot,
      clientMessage,
      paymentMethod = 'CARD',
    } = body;

    if (!planId || !fullName || !email) {
      return NextResponse.json(
        { error: 'Please provide full name, email, and selected plan.' },
        { status: 400 }
      );
    }

    const plan = await getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Selected yoga plan was not found.' }, { status: 404 });
    }

    // 1. Atomically create Order, Client & In-App Notification
    const { order, client, notification } = await createOrder({
      planId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      paymentMethod,
      experienceLevel,
      healthNotes,
      preferredSlot,
      clientMessage,
    });

    // 2. Fetch instructor settings for notification preferences
    const settings = await getSettings();

    // 3. Dispatch multi-channel notifications (Email + Webhook)
    await dispatchOrderNotifications({
      order,
      client,
      plan,
      instructorEmail: settings.notificationEmail || process.env.INSTRUCTOR_EMAIL || 'dhaarna@yogawithdhaarna.com',
      webhookUrl: settings.webhookUrl || process.env.DISCORD_WEBHOOK_URL,
    });

    revalidatePath('/admin', 'page');
    revalidatePath('/admin/orders', 'page');
    revalidatePath('/checkout/success', 'page');

    return NextResponse.json({
      success: true,
      bookingId: order.id,
      order,
      client,
      notification,
      message: 'Booking confirmed! Welcome to Yoga with Dhaarna.',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}

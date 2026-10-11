import { Order, Client, Plan, Settings } from '@/types';
import { sendEmail, isEmailServiceConfigured } from './email';
import { getStudentBookingEmailHtml, getInstructorAlertEmailHtml } from './email-templates';

export async function dispatchOrderNotifications(params: {
  order: Order;
  client: Client;
  plan: Plan;
  instructorEmail: string;
  webhookUrl?: string | null;
  settings?: Settings | null;
}) {
  const { order, client, plan, instructorEmail, webhookUrl, settings } = params;
  const instructorName = settings?.instructorName || 'Dhaarna Sharma';
  const instagramHandle = settings?.instagramHandle || '@yogawithdhaarna';
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yoga-three-sage.vercel.app';
  const adminDashboardUrl = `${baseUrl}/admin/orders`;

  console.log(`\n======================================================`);
  console.log(`🔔 DISPATCHING ORDER NOTIFICATIONS FOR: ${order.id}`);
  console.log(`Student:     ${client.fullName} <${client.email}>`);
  console.log(`Plan:        ${plan.title} (₹${order.amount.toLocaleString('en-IN')})`);
  console.log(`Instructor:  ${instructorEmail}`);
  console.log(`Email Service Active: ${isEmailServiceConfigured() ? 'YES (Resend)' : 'NO (Console simulator)'}`);
  console.log(`======================================================`);

  // Prepare Email 1: To the Student (Confirmation & Practice Guidelines)
  const studentEmailPromise = (async () => {
    try {
      const studentHtml = getStudentBookingEmailHtml({
        order,
        client,
        plan,
        instructorName,
        instagramHandle,
        instructorEmail,
      });

      const res = await sendEmail({
        to: client.email,
        subject: `🧘 Booking Confirmed: Welcome to ${plan.title} • Yoga with ${instructorName}`,
        html: studentHtml,
        replyTo: instructorEmail,
      });

      if (!res.success) {
        console.warn(`⚠️ Could not deliver confirmation email to student:`, res.error);
      }
    } catch (err) {
      console.error('❌ Failed to prepare/send student confirmation email:', err);
    }
  })();

  // Prepare Email 2: To the Instructor (Intake & Enrollment Alert)
  const instructorEmailPromise = (async () => {
    try {
      const instructorHtml = getInstructorAlertEmailHtml({
        order,
        client,
        plan,
        adminDashboardUrl,
      });

      const res = await sendEmail({
        to: instructorEmail,
        subject: `✨ New Student: ${client.fullName} enrolled in ${plan.title} (₹${order.amount.toLocaleString('en-IN')})`,
        html: instructorHtml,
      });

      if (!res.success) {
        console.warn(`⚠️ Could not deliver alert email to instructor:`, res.error);
      }
    } catch (err) {
      console.error('❌ Failed to prepare/send instructor alert email:', err);
    }
  })();

  // Prepare 3: Webhook Alert (Discord / Telegram / Slack)
  const webhookPromise = (async () => {
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const payload = {
          content: `🧘 **New Yoga Booking Alert for @yogawithdhaarna!**`,
          embeds: [
            {
              title: `New Student: ${client.fullName}`,
              description: `Enrolled in **${plan.title}**`,
              color: 0x10b981, // Emerald green
              fields: [
                { name: '💰 Amount', value: `₹${order.amount.toLocaleString('en-IN')}`, inline: true },
                { name: '📞 Phone', value: client.phone || 'N/A', inline: true },
                { name: '📧 Email', value: client.email, inline: true },
                { name: '🧘 Experience', value: order.experienceLevel || 'Beginner', inline: true },
                { name: '⏰ Preferred Slot', value: order.preferredSlot || 'Flexible', inline: true },
                { name: '🩺 Health Notes', value: order.healthNotes || 'None' },
              ],
              footer: { text: `Order ID: ${order.id} • Yoga with Dhaarna Platform` },
              timestamp: new Date().toISOString(),
            },
          ],
        };

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        console.log('✅ Webhook alert dispatched successfully.');
      } catch (err) {
        console.error('⚠️ Failed to dispatch webhook alert:', err);
      }
    }
  })();

  // Run all dispatch channels concurrently with zero blocking
  await Promise.allSettled([studentEmailPromise, instructorEmailPromise, webhookPromise]);
  console.log(`🏁 All order notifications finished processing.\n`);
}

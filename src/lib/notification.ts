import { Order, Client, Plan } from '@/types';

export async function dispatchOrderNotifications(params: {
  order: Order;
  client: Client;
  plan: Plan;
  instructorEmail: string;
  webhookUrl?: string | null;
}) {
  const { order, client, plan, instructorEmail, webhookUrl } = params;

  // 1. Console & Email Simulator for Dev / Staging
  console.log(`\n======================================================`);
  console.log(`📩 [INSTRUCTOR EMAIL NOTIFICATION] Sent to: ${instructorEmail}`);
  console.log(`Subject: 🧘 New Yoga Booking Received: ${plan.title}`);
  console.log(`------------------------------------------------------`);
  console.log(`Student Name:     ${client.fullName}`);
  console.log(`Student Email:    ${client.email}`);
  console.log(`Student Phone:    ${client.phone || 'N/A'}`);
  console.log(`Plan Enrolled:    ${plan.title} (${plan.duration})`);
  console.log(`Amount Paid:      ₹${order.amount.toLocaleString('en-IN')}`);
  console.log(`Experience Level: ${order.experienceLevel || 'Not specified'}`);
  console.log(`Health Notes:     ${order.healthNotes || 'None reported'}`);
  console.log(`Preferred Time:   ${order.preferredSlot || 'Flexible'}`);
  console.log(`Student Message:  ${order.clientMessage || 'None'}`);
  console.log(`======================================================\n`);

  // 2. Webhook Dispatch (e.g. Discord, Telegram bot, Slack, or WhatsApp gateway)
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
}

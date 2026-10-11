import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getSettings } from '@/lib/db';
import { sendEmail, isEmailServiceConfigured } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await getSettings();
    const targetEmail = settings.notificationEmail || process.env.INSTRUCTOR_EMAIL || 'dhaarna@yogawithdhaarna.com';
    const instructorName = settings.instructorName || 'Dhaarna Sharma';

    const isConfigured = isEmailServiceConfigured();

    const testHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #FBF9F5; font-family: -apple-system, sans-serif; color: #2E3A2B;">
  <div style="max-width: 540px; margin: 40px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #EAE5DC; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
    <div style="background-color: #10B981; color: white; display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
      Verified &bull; Test Message
    </div>
    <h2 style="margin: 0 0 12px 0; color: #2E3A2B; font-family: Georgia, serif; font-size: 24px; font-style: italic;">
      Email System is Working Perfectly! ✨
    </h2>
    <p style="margin: 0 0 16px 0; color: #4A5647; font-size: 14px; line-height: 1.6;">
      Namaste ${instructorName}, this is a test notification from your <strong>Yoga with Dhaarna</strong> automated email dispatch system.
    </p>
    <div style="background-color: #F8F6F1; border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid #EAE5DC; font-size: 13px;">
      <p style="margin: 0 0 8px 0;"><strong>Recipient:</strong> ${targetEmail}</p>
      <p style="margin: 0 0 8px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      <p style="margin: 0;"><strong>Provider:</strong> ${isConfigured ? 'Resend API (Live Active)' : 'Dev Simulator Mode'}</p>
    </div>
    <p style="margin: 0; font-size: 12px; color: #7B8578;">
      When students complete their booking on your website, both you and the student will receive automated notifications like this.
    </p>
  </div>
</body>
</html>
    `.trim();

    const result = await sendEmail({
      to: targetEmail,
      subject: `🧘 Test Verification: Yoga with ${instructorName} Email Service`,
      html: testHtml,
    });

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to send test email',
        isConfigured,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      simulated: result.simulated || false,
      messageId: result.messageId,
      recipient: targetEmail,
      message: result.simulated
        ? `Email system tested in Simulator mode (Add RESEND_API_KEY in .env to deliver real emails to ${targetEmail})`
        : `Live test email dispatched successfully to ${targetEmail}!`,
    });
  } catch (error: any) {
    console.error('Test email route error:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}

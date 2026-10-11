import { Resend } from 'resend';

// Initialize Resend client only if API key is present
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Determine sender address
// When custom domain is verified on Resend: e.g. "Yoga with Dhaarna <bookings@yogawithdhaarna.com>"
// Default testing address provided by Resend: "Yoga with Dhaarna <onboarding@resend.dev>"
const DEFAULT_FROM = process.env.EMAIL_FROM || 'Yoga with Dhaarna <onboarding@resend.dev>';

export interface SendEmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  simulated?: boolean;
}

export function isEmailServiceConfigured(): boolean {
  return Boolean(resend);
}

export async function sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { to, subject, html, text, replyTo } = payload;
  const recipient = Array.isArray(to) ? to.join(', ') : to;

  if (!resend) {
    console.log(`\n---------------------------------------------------------`);
    console.log(`ℹ️ [RESEND EMAIL SIMULATOR] RESEND_API_KEY is not configured.`);
    console.log(`To:       ${recipient}`);
    console.log(`Subject:  ${subject}`);
    console.log(`Add RESEND_API_KEY to .env to deliver real emails to inbox.`);
    console.log(`---------------------------------------------------------\n`);
    return {
      success: true,
      simulated: true,
    };
  }

  try {
    const fromAddress = DEFAULT_FROM;

    const response = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ''), // fallback plain text
      replyTo: replyTo || process.env.INSTRUCTOR_EMAIL || 'dhaarna@yogawithdhaarna.com',
    });

    if (response.error) {
      console.error('❌ Resend API error:', response.error);
      return {
        success: false,
        error: response.error.message || 'Failed to dispatch email via Resend',
      };
    }

    console.log(`✅ [RESEND EMAIL DISPATCHED] ID: ${response.data?.id} -> ${recipient}`);
    return {
      success: true,
      messageId: response.data?.id,
    };
  } catch (err: any) {
    console.error('❌ Unexpected error sending email:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Unexpected email delivery error',
    };
  }
}

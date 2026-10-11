import { Order, Client, Plan } from '@/types';

interface StudentEmailParams {
  order: Order;
  client: Client;
  plan: Plan;
  instructorName: string;
  instagramHandle: string;
  instructorEmail: string;
}

interface InstructorEmailParams {
  order: Order;
  client: Client;
  plan: Plan;
  adminDashboardUrl?: string;
}

export function getStudentBookingEmailHtml(params: StudentEmailParams): string {
  const { order, client, plan, instructorName, instagramHandle, instructorEmail } = params;
  const firstName = client.fullName.split(' ')[0] || 'Friend';
  const cleanHandle = instagramHandle.replace('@', '');
  const instagramUrl = `https://instagram.com/${cleanHandle}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Yoga with ${instructorName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2E3A2B; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FBF9F5; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid #EAE5DC; box-shadow: 0 10px 30px rgba(46, 58, 43, 0.04);">
          
          <!-- Top Header Accent -->
          <tr>
            <td style="background-color: #2E3A2B; padding: 32px 30px; text-align: center;">
              <p style="margin: 0 0 6px 0; color: #C5A880; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Namaste &bull; Welcome to the Mat</p>
              <h1 style="margin: 0; color: #FFFFFF; font-family: Georgia, serif; font-size: 26px; font-style: italic; font-weight: normal;">Yoga with ${instructorName}</h1>
            </td>
          </tr>

          <!-- Confirmation Banner -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <h2 style="margin: 0 0 12px 0; color: #2E3A2B; font-family: Georgia, serif; font-size: 22px; font-style: italic;">
                Your enrollment is confirmed, ${firstName} 🙏
              </h2>
              <p style="margin: 0 0 24px 0; color: #4A5647; font-size: 15px; font-weight: 300;">
                Thank you for placing your trust in this practice. I have personally received your intake details and reserved your space in <strong>${plan.title}</strong>.
              </p>

              <!-- Booking Receipt Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8F6F1; border-radius: 16px; border: 1px solid #EAE5DC; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid #E4DFD5;">
                          <span style="font-size: 11px; color: #7B8578; text-transform: uppercase; letter-spacing: 1px; display: block;">Booking Reference</span>
                          <strong style="font-size: 14px; color: #2E3A2B; font-family: monospace;">${order.id}</strong>
                        </td>
                        <td align="right" style="padding-bottom: 12px; border-bottom: 1px solid #E4DFD5;">
                          <span style="font-size: 11px; color: #7B8578; text-transform: uppercase; letter-spacing: 1px; display: block;">Status</span>
                          <span style="display: inline-block; padding: 2px 10px; background-color: #E2ECE0; color: #235A22; border-radius: 12px; font-size: 11px; font-weight: 600;">Confirmed</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0 6px 0;">
                          <span style="font-size: 11px; color: #7B8578; text-transform: uppercase; letter-spacing: 1px; display: block;">Program</span>
                          <strong style="font-size: 14px; color: #2E3A2B;">${plan.title}</strong>
                          <span style="font-size: 12px; color: #4A5647; display: block;">${plan.duration}</span>
                        </td>
                        <td align="right" style="padding: 12px 0 6px 0;">
                          <span style="font-size: 11px; color: #7B8578; text-transform: uppercase; letter-spacing: 1px; display: block;">Amount Paid</span>
                          <strong style="font-size: 16px; color: #2E3A2B;">₹${order.amount.toLocaleString('en-IN')}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 10px; border-top: 1px solid #E4DFD5;">
                          <span style="font-size: 11px; color: #7B8578; text-transform: uppercase; letter-spacing: 1px; display: block;">Batch / Timing Slot</span>
                          <span style="font-size: 13px; color: #2E3A2B; font-weight: 500;">⏰ ${order.preferredSlot || 'Scheduled as per batch'}</span>
                        </td>
                      </tr>
                      ${order.healthNotes ? `
                      <tr>
                        <td colspan="2" style="padding-top: 10px; border-top: 1px solid #E4DFD5;">
                          <span style="font-size: 11px; color: #7B8578; text-transform: uppercase; letter-spacing: 1px; display: block;">Your Intake / Health Notes</span>
                          <span style="font-size: 12px; color: #4A5647; font-style: italic;">"${order.healthNotes}"</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Mindful Preparation Guidelines -->
              <h3 style="margin: 0 0 12px 0; color: #2E3A2B; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                🌿 Preparing For Your Practice
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #4A5647;">
                    &bull; <strong>Meals:</strong> Please practice on an empty stomach. Leave 2 to 2.5 hours after a heavy meal, or 45 mins after light fruit/coconut water.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #4A5647;">
                    &bull; <strong>Attire:</strong> Wear comfortable, breathable, stretchable clothing allowing free diaphragmatic breathing and hip movement.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #4A5647;">
                    &bull; <strong>Props:</strong> Have a non-slip yoga mat (4–6mm). Keeping two yoga blocks and a strap (or towel) nearby is wonderfully supportive.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #4A5647;">
                    &bull; <strong>Environment:</strong> Set up your device camera in a quiet, well-lit corner where your whole body can be seen in standing and seated postures.
                  </td>
                </tr>
              </table>

              <!-- Next Steps Callout -->
              <div style="background-color: #F3F1EC; border-left: 4px solid #C5A880; border-radius: 4px; padding: 14px 18px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 13px; color: #2E3A2B; line-height: 1.5;">
                  <strong>What happens next:</strong> ${instructorName} will reach out to you via WhatsApp / Email at <strong>${client.phone || client.email}</strong> with your live session link and batch broadcast circle.
                </p>
              </div>

              <!-- Closing -->
              <p style="margin: 0 0 6px 0; color: #4A5647; font-size: 14px;">
                With gratitude and warmth,
              </p>
              <p style="margin: 0; color: #2E3A2B; font-family: Georgia, serif; font-size: 16px; font-style: italic;">
                ${instructorName}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8F6F1; border-top: 1px solid #EAE5DC; padding: 24px 30px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #7B8578;">
                Follow our daily reflections on Instagram: <a href="${instagramUrl}" style="color: #2E3A2B; font-weight: 600; text-decoration: none;">${instagramHandle}</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #A0A99E;">
                Have questions? Reply directly to this email or reach us at <a href="mailto:${instructorEmail}" style="color: #4A5647; text-decoration: underline;">${instructorEmail}</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getInstructorAlertEmailHtml(params: InstructorEmailParams): string {
  const { order, client, plan, adminDashboardUrl } = params;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Student Enrollment Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A1A1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E5E5E5; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #141414; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #1F1F1F; border-radius: 20px; overflow: hidden; border: 1px solid #2D2D2D;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #10B981; padding: 24px 30px; text-align: left;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #064E3B; font-weight: 700; display: block; margin-bottom: 4px;">Studio Alert</span>
              <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 700;">🧘 New Yoga Booking Received!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #A3A3A3;">
                A new student has enrolled on the platform. Here are their registration and confidential intake details:
              </p>

              <!-- Student Details Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #262626; border-radius: 12px; border: 1px solid #333333; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 10px; width: 40%; font-size: 12px; color: #888888; text-transform: uppercase;">Student Name</td>
                        <td style="padding-bottom: 10px; font-size: 15px; color: #FFFFFF; font-weight: 600;">${client.fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 12px; color: #888888; text-transform: uppercase;">Email</td>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #10B981;">
                          <a href="mailto:${client.email}" style="color: #10B981; text-decoration: none;">${client.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 12px; color: #888888; text-transform: uppercase;">WhatsApp / Phone</td>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #FFFFFF; font-weight: 500;">
                          ${client.phone ? `<a href="https://wa.me/${client.phone.replace(/[^0-9]/g, '')}" style="color: #22C55E; text-decoration: none;">💬 ${client.phone} (WhatsApp)</a>` : 'Not provided'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 12px; color: #888888; text-transform: uppercase;">Plan Enrolled</td>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #FFFFFF; font-weight: 600;">${plan.title}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 12px; color: #888888; text-transform: uppercase;">Amount</td>
                        <td style="padding-bottom: 10px; font-size: 16px; color: #10B981; font-weight: 700;">₹${order.amount.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 12px; color: #888888; text-transform: uppercase;">Preferred Slot</td>
                        <td style="padding-bottom: 10px; font-size: 13px; color: #FFFFFF;">${order.preferredSlot || 'Flexible'}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 12px; color: #888888; text-transform: uppercase;">Experience Level</td>
                        <td style="padding-bottom: 10px; font-size: 13px; color: #E5E5E5;">${order.experienceLevel || 'Beginner'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: #888888; text-transform: uppercase;">Order ID</td>
                        <td style="font-size: 12px; color: #A3A3A3; font-family: monospace;">${order.id}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Health & Injuries Alert Box -->
              <div style="background-color: #2A1D15; border: 1px solid #78350F; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #F59E0B; font-weight: 700; display: block; margin-bottom: 6px;">
                  🩺 Confidential Health &amp; Alignment Notes:
                </span>
                <p style="margin: 0; font-size: 13px; color: #FDE68A; line-height: 1.5;">
                  ${order.healthNotes ? order.healthNotes : '<em>No prior injuries or sensitivities reported by student.</em>'}
                </p>
                ${order.clientMessage ? `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(245, 158, 11, 0.2);">
                  <span style="font-size: 11px; text-transform: uppercase; color: #D97706; font-weight: 600; display: block; margin-bottom: 4px;">Personal Goal / Student Note:</span>
                  <span style="font-size: 12px; color: #FDE68A; font-style: italic;">"${order.clientMessage}"</span>
                </div>
                ` : ''}
              </div>

              ${adminDashboardUrl ? `
              <div style="text-align: center; margin-bottom: 10px;">
                <a href="${adminDashboardUrl}" style="display: inline-block; background-color: #10B981; color: #042F2E; padding: 12px 28px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                  Open In Admin Dashboard &rarr;
                </a>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1A1A; border-top: 1px solid #2D2D2D; padding: 16px 30px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #737373;">
                Automated studio dispatch &bull; Yoga with Dhaarna Platform
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendCardEmailParams {
  recipientEmail: string;
  recipientName: string;
  senderName: string;
  cardUrl: string;
  customMessage?: string;
}

/**
 * Send birthday card email notification
 */
export async function sendCardEmail(params: SendCardEmailParams) {
  const { recipientEmail, recipientName, senderName, cardUrl, customMessage } = params;

  const { data, error } = await resend.emails.send({
    from: 'SunoCards <cards@sunocards.app>',
    to: recipientEmail,
    subject: `🎂 ${senderName} sent you a birthday song!`,
    html: generateEmailHtml({
      recipientName,
      senderName,
      cardUrl,
      customMessage,
    }),
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

function generateEmailHtml(params: {
  recipientName: string;
  senderName: string;
  cardUrl: string;
  customMessage?: string;
}): string {
  const { recipientName, senderName, cardUrl, customMessage } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Birthday Song for ${recipientName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f4ff;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="font-size: 48px; margin-bottom: 16px;">🎂</div>
      <h1 style="color: #6b21a8; font-size: 28px; margin: 0 0 8px 0;">
        You've got a birthday surprise!
      </h1>
      <p style="color: #7c3aed; font-size: 18px; margin: 0;">
        ${senderName} created a special song just for you
      </p>
    </div>

    <!-- Card Preview -->
    <div style="background: linear-gradient(135deg, #a855f7, #6366f1); border-radius: 16px; padding: 32px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 64px; margin-bottom: 16px;">🎵</div>
      <h2 style="color: white; font-size: 24px; margin: 0 0 8px 0;">
        Happy Birthday, ${recipientName}!
      </h2>
      <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">
        A personalized birthday song awaits you
      </p>
    </div>

    ${customMessage ? `
    <!-- Custom Message -->
    <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #a855f7;">
      <p style="color: #4b5563; font-size: 16px; margin: 0; font-style: italic;">
        "${customMessage}"
      </p>
      <p style="color: #7c3aed; font-size: 14px; margin: 12px 0 0 0; font-weight: 600;">
        — ${senderName}
      </p>
    </div>
    ` : ''}

    <!-- CTA Button -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${cardUrl}" style="display: inline-block; background: linear-gradient(135deg, #a855f7, #6366f1); color: white; text-decoration: none; padding: 16px 48px; border-radius: 50px; font-size: 18px; font-weight: 600; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);">
        Open Your Card 🎁
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; color: #9ca3af; font-size: 14px;">
      <p style="margin: 0 0 8px 0;">
        Made with ❤️ by SunoCards
      </p>
      <p style="margin: 0;">
        AI-powered personalized birthday songs
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

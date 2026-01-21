import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendCardEmail } from '@/lib/resend';
import { checkRateLimit, incrementRateLimit, getClientIp } from '@/lib/rate-limit';
import { sendEmailSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Check rate limit
    const { limited, remaining, resetAt } = await checkRateLimit(ip, 'send_email');
    if (limited) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many emails sent. Please try again later.',
          resetAt: resetAt.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': resetAt.toISOString(),
          },
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = sendEmailSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { cardId, recipientEmail } = validationResult.data;
    const supabase = createServerClient();

    // Fetch card details
    const { data: card, error: fetchError } = await supabase
      .from('cards')
      .select('*')
      .eq('id', cardId)
      .single();

    if (fetchError || !card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    // Generate card URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const cardUrl = `${baseUrl}/card/${card.share_id}`;

    // Send email
    const emailResult = await sendCardEmail({
      recipientEmail,
      recipientName: card.recipient_name,
      senderName: card.sender_name,
      cardUrl,
      customMessage: card.custom_message || undefined,
    });

    // Log email delivery
    await supabase.from('email_logs').insert({
      card_id: cardId,
      recipient_email: recipientEmail,
      status: 'sent',
      resend_id: emailResult?.id || null,
      sent_at: new Date().toISOString(),
    });

    // Increment rate limit counter
    await incrementRateLimit(ip, 'send_email');

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: emailResult?.id,
    });
  } catch (error) {
    console.error('Error sending card email:', error);

    // Log failed email attempt if we have the data
    try {
      const body = await request.clone().json();
      if (body.cardId && body.recipientEmail) {
        const supabase = createServerClient();
        await supabase.from('email_logs').insert({
          card_id: body.cardId,
          recipient_email: body.recipientEmail,
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    } catch {
      // Ignore logging errors
    }

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

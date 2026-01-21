import { NextRequest, NextResponse } from 'next/server';

// Stub route for demo - email sending disabled
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, recipientEmail } = body;

    if (!cardId || !recipientEmail) {
      return NextResponse.json(
        { error: 'Card ID and recipient email are required' },
        { status: 400 }
      );
    }

    // For demo, return a message that this feature requires API keys
    return NextResponse.json({
      success: false,
      error: 'Email sending is not available in demo mode',
      message: 'Configure RESEND_API_KEY and SUPABASE_URL to enable this feature',
    }, { status: 501 });
  } catch (error) {
    console.error('Error in send-card:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// Stub route for demo - lyrics generation disabled
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId } = body;

    if (!cardId) {
      return NextResponse.json(
        { error: 'Card ID is required' },
        { status: 400 }
      );
    }

    // For demo, return a message that this feature requires API keys
    return NextResponse.json({
      success: false,
      error: 'Lyrics generation is not available in demo mode',
      message: 'Configure OPENAI_API_KEY and SUPABASE_URL to enable this feature',
    }, { status: 501 });
  } catch (error) {
    console.error('Error in generate-lyrics:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

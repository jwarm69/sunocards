import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

// Stub route for demo - song status check disabled
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // For demo, return a message that this feature requires API keys
    return NextResponse.json({
      success: false,
      error: 'Song status check is not available in demo mode',
      message: 'Configure SUNO_API_KEY and SUPABASE_URL to enable this feature',
    }, { status: 501 });
  } catch (error) {
    console.error('Error in song-status:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

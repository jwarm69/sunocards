import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { generateLyrics } from '@/lib/openai';
import { checkRateLimit, incrementRateLimit, getClientIp } from '@/lib/rate-limit';
import { MUSIC_STYLES, MusicStyleKey } from '@/lib/suno';
import { z } from 'zod';

const requestSchema = z.object({
  cardId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Check rate limit
    const { limited, remaining, resetAt } = await checkRateLimit(ip, 'generate_lyrics');
    if (limited) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many lyrics generations. Please try again later.',
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
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid card ID' },
        { status: 400 }
      );
    }

    const { cardId } = validationResult.data;
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

    // Check if lyrics already exist
    if (card.lyrics) {
      return NextResponse.json({
        success: true,
        lyrics: card.lyrics,
        message: 'Lyrics already generated',
      });
    }

    // Update status to generating_lyrics
    await supabase
      .from('cards')
      .update({ song_status: 'generating_lyrics' })
      .eq('id', cardId);

    // Get music style name
    const musicStyleKey = card.music_style as MusicStyleKey;
    const musicStyleName = MUSIC_STYLES[musicStyleKey]?.name || 'Pop';

    // Generate lyrics using OpenAI
    const lyrics = await generateLyrics({
      recipientName: card.recipient_name,
      personalityTraits: card.personality_traits || [],
      interests: card.interests || [],
      relationship: card.relationship,
      senderName: card.sender_name,
      musicStyle: musicStyleName,
    });

    // Update card with lyrics
    const { error: updateError } = await supabase
      .from('cards')
      .update({
        lyrics,
        song_status: 'pending', // Ready for song generation
      })
      .eq('id', cardId);

    if (updateError) {
      console.error('Error updating card with lyrics:', updateError);
      return NextResponse.json(
        { error: 'Failed to save lyrics' },
        { status: 500 }
      );
    }

    // Increment rate limit counter
    await incrementRateLimit(ip, 'generate_lyrics');

    return NextResponse.json({
      success: true,
      lyrics,
    });
  } catch (error) {
    console.error('Error generating lyrics:', error);

    // Update card status to failed if we have the cardId
    try {
      const body = await request.clone().json();
      if (body.cardId) {
        const supabase = createServerClient();
        await supabase
          .from('cards')
          .update({ song_status: 'failed' })
          .eq('id', body.cardId);
      }
    } catch {
      // Ignore cleanup errors
    }

    return NextResponse.json(
      { error: 'Failed to generate lyrics' },
      { status: 500 }
    );
  }
}

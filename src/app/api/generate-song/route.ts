import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { generateCustomSong, MUSIC_STYLES, MusicStyleKey } from '@/lib/suno';
import { checkRateLimit, incrementRateLimit, getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const requestSchema = z.object({
  cardId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Check rate limit
    const { limited, remaining, resetAt } = await checkRateLimit(ip, 'generate_song');
    if (limited) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many song generations. Please try again later.',
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

    // Check if song URL already exists
    if (card.song_url) {
      return NextResponse.json({
        success: true,
        songUrl: card.song_url,
        message: 'Song already generated',
      });
    }

    // Check if lyrics exist
    if (!card.lyrics) {
      return NextResponse.json(
        { error: 'Lyrics must be generated first' },
        { status: 400 }
      );
    }

    // Get music style prompt
    const musicStyleKey = card.music_style as MusicStyleKey;
    const musicStyle = MUSIC_STYLES[musicStyleKey];
    const stylePrompt = musicStyle?.sunoPrompt || 'upbeat pop, birthday song, celebratory';

    // Update status to generating_song
    await supabase
      .from('cards')
      .update({ song_status: 'generating_song' })
      .eq('id', cardId);

    // Generate song using Suno API
    const sunoResponse = await generateCustomSong({
      prompt: card.lyrics,
      tags: stylePrompt,
      title: `Happy Birthday ${card.recipient_name}`,
    });

    // Update card with Suno job ID
    await supabase
      .from('cards')
      .update({
        suno_job_id: sunoResponse.id,
      })
      .eq('id', cardId);

    // Create generation job record
    await supabase.from('generation_jobs').insert({
      card_id: cardId,
      suno_job_id: sunoResponse.id,
      status: 'processing',
    });

    // Increment rate limit counter
    await incrementRateLimit(ip, 'generate_song');

    return NextResponse.json({
      success: true,
      jobId: sunoResponse.id,
      status: 'processing',
    });
  } catch (error) {
    console.error('Error generating song:', error);

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
      { error: 'Failed to generate song' },
      { status: 500 }
    );
  }
}

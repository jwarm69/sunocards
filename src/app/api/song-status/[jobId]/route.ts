import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getSongStatus } from '@/lib/suno';

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Find the generation job
    const { data: job, error: jobError } = await supabase
      .from('generation_jobs')
      .select('*, cards(*)')
      .eq('suno_job_id', jobId)
      .single();

    if (jobError || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // If already complete, return cached result
    if (job.status === 'complete' && job.cards?.song_url) {
      return NextResponse.json({
        success: true,
        status: 'complete',
        songUrl: job.cards.song_url,
        cardId: job.card_id,
      });
    }

    // If failed, return error
    if (job.status === 'failed') {
      return NextResponse.json({
        success: false,
        status: 'failed',
        error: job.error_message || 'Song generation failed',
        cardId: job.card_id,
      });
    }

    // Poll Suno API for status
    const sunoStatus = await getSongStatus(jobId);

    // Update job status
    if (sunoStatus.status !== job.status) {
      await supabase
        .from('generation_jobs')
        .update({
          status: sunoStatus.status,
          error_message: sunoStatus.error || null,
        })
        .eq('id', job.id);
    }

    // If complete, update the card with the song URL
    if (sunoStatus.status === 'complete' && sunoStatus.audio_url) {
      await supabase
        .from('cards')
        .update({
          song_status: 'complete',
          song_url: sunoStatus.audio_url,
        })
        .eq('id', job.card_id);

      await supabase
        .from('generation_jobs')
        .update({ status: 'complete' })
        .eq('id', job.id);

      return NextResponse.json({
        success: true,
        status: 'complete',
        songUrl: sunoStatus.audio_url,
        cardId: job.card_id,
      });
    }

    // If failed, update the card status
    if (sunoStatus.status === 'failed') {
      await supabase
        .from('cards')
        .update({ song_status: 'failed' })
        .eq('id', job.card_id);

      await supabase
        .from('generation_jobs')
        .update({
          status: 'failed',
          error_message: sunoStatus.error || 'Unknown error',
        })
        .eq('id', job.id);

      return NextResponse.json({
        success: false,
        status: 'failed',
        error: sunoStatus.error || 'Song generation failed',
        cardId: job.card_id,
      });
    }

    // Still processing
    return NextResponse.json({
      success: true,
      status: sunoStatus.status,
      cardId: job.card_id,
    });
  } catch (error) {
    console.error('Error checking song status:', error);
    return NextResponse.json(
      { error: 'Failed to check song status' },
      { status: 500 }
    );
  }
}

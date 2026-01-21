import { SunoGenerateResponse } from '@/types';

const SUNO_API_BASE = process.env.SUNO_API_BASE_URL || 'https://api.sunoapi.org';
const SUNO_API_KEY = process.env.SUNO_API_KEY!;

interface SunoCustomGenerateParams {
  prompt: string; // Lyrics
  tags: string;   // Style/genre tags
  title: string;
  make_instrumental?: boolean;
}

interface SunoJobStatus {
  id: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  audio_url?: string;
  image_url?: string;
  duration?: number;
  error?: string;
}

/**
 * Generate a custom song with provided lyrics
 */
export async function generateCustomSong(params: SunoCustomGenerateParams): Promise<SunoGenerateResponse> {
  const response = await fetch(`${SUNO_API_BASE}/api/custom_generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUNO_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: params.prompt,
      tags: params.tags,
      title: params.title,
      make_instrumental: params.make_instrumental ?? false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Suno API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Handle array response (Suno returns array of jobs)
  const job = Array.isArray(data) ? data[0] : data;

  return {
    id: job.id,
    status: job.status || 'pending',
    audio_url: job.audio_url,
    error: job.error,
  };
}

/**
 * Check the status of a song generation job
 */
export async function getSongStatus(jobId: string): Promise<SunoJobStatus> {
  const response = await fetch(`${SUNO_API_BASE}/api/get?ids=${jobId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${SUNO_API_KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Suno API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Handle array response
  const job = Array.isArray(data) ? data[0] : data;

  // Map Suno status to our status
  let status: SunoJobStatus['status'] = 'pending';
  if (job.status === 'streaming' || job.status === 'processing') {
    status = 'processing';
  } else if (job.status === 'complete' || job.audio_url) {
    status = 'complete';
  } else if (job.status === 'error' || job.error) {
    status = 'failed';
  }

  return {
    id: job.id,
    status,
    audio_url: job.audio_url,
    image_url: job.image_url,
    duration: job.duration,
    error: job.error,
  };
}

/**
 * Music style configurations with optimized Suno prompts
 */
export const MUSIC_STYLES = {
  upbeat_pop: {
    id: 'upbeat_pop',
    name: 'Upbeat Pop',
    icon: '🎉',
    sunoPrompt: 'upbeat pop, catchy melody, happy vocals, birthday celebration, energetic, fun',
  },
  acoustic_folk: {
    id: 'acoustic_folk',
    name: 'Acoustic Folk',
    icon: '🎸',
    sunoPrompt: 'acoustic folk, warm vocals, guitar, heartfelt, birthday song, intimate',
  },
  smooth_jazz: {
    id: 'smooth_jazz',
    name: 'Smooth Jazz',
    icon: '🎷',
    sunoPrompt: 'smooth jazz, saxophone, piano, sophisticated, birthday celebration, elegant',
  },
  edm: {
    id: 'edm',
    name: 'EDM',
    icon: '🎧',
    sunoPrompt: 'edm, electronic dance, energetic drops, birthday anthem, party vibes',
  },
  rnb_soul: {
    id: 'rnb_soul',
    name: 'R&B Soul',
    icon: '💜',
    sunoPrompt: 'r&b soul, smooth vocals, emotional, birthday ballad, soulful',
  },
  classic_rock: {
    id: 'classic_rock',
    name: 'Classic Rock',
    icon: '🎤',
    sunoPrompt: 'classic rock, electric guitar, powerful vocals, birthday rock anthem',
  },
  hip_hop: {
    id: 'hip_hop',
    name: 'Hip Hop',
    icon: '🎤',
    sunoPrompt: 'hip hop, rhythmic flow, birthday rap, celebration beat, uplifting',
  },
  classical: {
    id: 'classical',
    name: 'Classical',
    icon: '🎻',
    sunoPrompt: 'classical, orchestral, elegant, birthday waltz, sophisticated melody',
  },
} as const;

export type MusicStyleKey = keyof typeof MUSIC_STYLES;

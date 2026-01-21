export interface Card {
  id: string;
  share_id: string;
  recipient_name: string;
  personality_traits: string[];
  interests: string[];
  relationship: string;
  music_style: MusicStyle;
  theme_id: ThemeId;
  custom_message: string;
  sender_name: string;
  sender_email?: string;
  suno_job_id?: string;
  song_status: SongStatus;
  song_url?: string;
  lyrics?: string;
  created_at: string;
  updated_at: string;
}

export type SongStatus = 'pending' | 'generating_lyrics' | 'generating_song' | 'complete' | 'failed';

export type MusicStyle =
  | 'upbeat_pop'
  | 'acoustic_folk'
  | 'smooth_jazz'
  | 'edm'
  | 'rnb_soul'
  | 'classic_rock'
  | 'hip_hop'
  | 'classical';

export type ThemeId =
  | 'classic'
  | 'modern'
  | 'playful'
  | 'elegant'
  | 'retro'
  | 'nature';

export interface MusicStyleOption {
  id: MusicStyle;
  name: string;
  icon: string;
  sunoPrompt: string;
}

export interface ThemeOption {
  id: ThemeId;
  name: string;
  preview: string;
  description: string;
}

export interface GenerationJob {
  id: string;
  card_id: string;
  suno_job_id: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  progress?: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  card_id: string;
  recipient_email: string;
  status: 'pending' | 'sent' | 'failed';
  resend_id?: string;
  error_message?: string;
  sent_at?: string;
  created_at: string;
}

export interface RateLimit {
  id: string;
  ip_address: string;
  action: 'create_card' | 'generate_lyrics' | 'generate_song' | 'send_email';
  count: number;
  window_start: string;
}

export interface CreateCardInput {
  recipientName: string;
  personalityTraits: string[];
  interests: string[];
  relationship: string;
  musicStyle: MusicStyle;
  themeId: ThemeId;
  customMessage: string;
  senderName: string;
  senderEmail?: string;
}

export interface SunoGenerateResponse {
  id: string;
  status: string;
  audio_url?: string;
  error?: string;
}

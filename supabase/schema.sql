-- CardSong Database Schema
-- Run this in the Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cards table (main entity)
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  share_id VARCHAR(12) UNIQUE NOT NULL,

  -- Recipient info
  recipient_name VARCHAR(50) NOT NULL,
  personality_traits TEXT[] NOT NULL DEFAULT '{}',
  interests TEXT[] NOT NULL DEFAULT '{}',
  relationship VARCHAR(30) NOT NULL,

  -- Card configuration
  music_style VARCHAR(20) NOT NULL,
  theme_id VARCHAR(20) NOT NULL,
  custom_message TEXT,

  -- Sender info
  sender_name VARCHAR(50) NOT NULL,
  sender_email VARCHAR(255),

  -- Song generation
  suno_job_id VARCHAR(100),
  song_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  song_url TEXT,
  lyrics TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_song_status CHECK (
    song_status IN ('pending', 'generating_lyrics', 'generating_song', 'complete', 'failed')
  ),
  CONSTRAINT valid_music_style CHECK (
    music_style IN ('upbeat_pop', 'acoustic_folk', 'smooth_jazz', 'edm', 'rnb_soul', 'classic_rock', 'hip_hop', 'classical')
  ),
  CONSTRAINT valid_theme_id CHECK (
    theme_id IN ('classic', 'modern', 'playful', 'elegant', 'retro', 'nature',
                 'neon', 'minimalist', 'cosmic', 'watercolor')
  )
);

-- Generation jobs table (track Suno job status)
CREATE TABLE generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  suno_job_id VARCHAR(100) NOT NULL,

  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  error_message TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_job_status CHECK (
    status IN ('pending', 'processing', 'complete', 'failed')
  ),
  CONSTRAINT valid_progress CHECK (progress >= 0 AND progress <= 100)
);

-- Email logs table (track email delivery)
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  recipient_email VARCHAR(255) NOT NULL,

  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  resend_id VARCHAR(100),
  error_message TEXT,

  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_email_status CHECK (
    status IN ('pending', 'sent', 'failed')
  )
);

-- Rate limits table (abuse prevention)
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address VARCHAR(45) NOT NULL,
  action VARCHAR(30) NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  CONSTRAINT valid_action CHECK (
    action IN ('create_card', 'generate_lyrics', 'generate_song', 'send_email')
  )
);

-- Indexes for performance
CREATE INDEX idx_cards_share_id ON cards(share_id);
CREATE INDEX idx_cards_song_status ON cards(song_status);
CREATE INDEX idx_cards_created_at ON cards(created_at DESC);

CREATE INDEX idx_generation_jobs_card_id ON generation_jobs(card_id);
CREATE INDEX idx_generation_jobs_suno_job_id ON generation_jobs(suno_job_id);
CREATE INDEX idx_generation_jobs_status ON generation_jobs(status);

CREATE INDEX idx_email_logs_card_id ON email_logs(card_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);

CREATE INDEX idx_rate_limits_ip_action ON rate_limits(ip_address, action);
CREATE INDEX idx_rate_limits_window ON rate_limits(window_start);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generation_jobs_updated_at
  BEFORE UPDATE ON generation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to cards via share_id (for public card viewing)
CREATE POLICY "Public cards are viewable by everyone"
  ON cards FOR SELECT
  USING (true);

-- Allow anonymous insert (card creation)
CREATE POLICY "Anyone can create a card"
  ON cards FOR INSERT
  WITH CHECK (true);

-- Allow updates only via service role (will be handled by API)
CREATE POLICY "Service role can update cards"
  ON cards FOR UPDATE
  USING (true);

-- Generation jobs - service role only
CREATE POLICY "Service role can manage generation jobs"
  ON generation_jobs FOR ALL
  USING (true);

-- Email logs - service role only
CREATE POLICY "Service role can manage email logs"
  ON email_logs FOR ALL
  USING (true);

-- Rate limits - service role only
CREATE POLICY "Service role can manage rate limits"
  ON rate_limits FOR ALL
  USING (true);

-- Clean up old rate limit records (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits
  WHERE window_start < NOW() - INTERVAL '2 hours';
END;
$$ LANGUAGE plpgsql;

import { createServerClient } from './supabase';

type ActionType = 'create_card' | 'generate_lyrics' | 'generate_song' | 'send_email';

const RATE_LIMITS: Record<ActionType, { limit: number; windowMinutes: number }> = {
  create_card: { limit: 5, windowMinutes: 60 },
  generate_lyrics: { limit: 10, windowMinutes: 60 },
  generate_song: { limit: 5, windowMinutes: 60 },
  send_email: { limit: 3, windowMinutes: 60 },
};

/**
 * Check if an action is rate limited
 * @returns true if the action should be blocked
 */
export async function checkRateLimit(
  ipAddress: string,
  action: ActionType
): Promise<{ limited: boolean; remaining: number; resetAt: Date }> {
  const supabase = createServerClient();
  const config = RATE_LIMITS[action];
  const windowStart = new Date(Date.now() - config.windowMinutes * 60 * 1000);

  // Get current count for this IP/action in the window
  const { data: existing } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('ip_address', ipAddress)
    .eq('action', action)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (existing) {
    const remaining = Math.max(0, config.limit - existing.count);
    const resetAt = new Date(new Date(existing.window_start).getTime() + config.windowMinutes * 60 * 1000);

    return {
      limited: existing.count >= config.limit,
      remaining,
      resetAt,
    };
  }

  return {
    limited: false,
    remaining: config.limit,
    resetAt: new Date(Date.now() + config.windowMinutes * 60 * 1000),
  };
}

/**
 * Increment the rate limit counter for an action
 */
export async function incrementRateLimit(
  ipAddress: string,
  action: ActionType
): Promise<void> {
  const supabase = createServerClient();
  const config = RATE_LIMITS[action];
  const windowStart = new Date(Date.now() - config.windowMinutes * 60 * 1000);

  // Try to find existing record in current window
  const { data: existing } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('ip_address', ipAddress)
    .eq('action', action)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (existing) {
    // Increment existing counter
    await supabase
      .from('rate_limits')
      .update({ count: existing.count + 1 })
      .eq('id', existing.id);
  } else {
    // Create new record
    await supabase.from('rate_limits').insert({
      ip_address: ipAddress,
      action,
      count: 1,
      window_start: new Date().toISOString(),
    });
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return '127.0.0.1';
}

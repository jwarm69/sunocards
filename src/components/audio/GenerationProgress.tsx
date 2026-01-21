'use client';

import { cn } from '@/lib/utils';
import { ProgressBar, LoadingSpinner } from '@/components/ui';
import { SongStatus } from '@/types';

interface GenerationProgressProps {
  status: SongStatus;
  className?: string;
}

const STATUS_CONFIG: Record<SongStatus, { message: string; emoji: string; progress: number }> = {
  pending: {
    message: 'Preparing your birthday song...',
    emoji: '📝',
    progress: 10,
  },
  generating_lyrics: {
    message: 'Writing personalized lyrics...',
    emoji: '✍️',
    progress: 35,
  },
  generating_song: {
    message: 'Creating your unique melody...',
    emoji: '🎵',
    progress: 70,
  },
  complete: {
    message: 'Your song is ready!',
    emoji: '🎉',
    progress: 100,
  },
  failed: {
    message: 'Something went wrong',
    emoji: '😔',
    progress: 0,
  },
};

export function GenerationProgress({ status, className }: GenerationProgressProps) {
  const config = STATUS_CONFIG[status];
  const isActive = status !== 'complete' && status !== 'failed';

  return (
    <div
      className={cn(
        'bg-white rounded-xl p-6 shadow-lg border border-gray-100',
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* Animated emoji */}
        <div className={cn('text-5xl mb-4', isActive && 'animate-bounce')}>
          {config.emoji}
        </div>

        {/* Status message */}
        <h3 className="font-semibold text-gray-900 mb-2">{config.message}</h3>

        {/* Progress bar */}
        {status !== 'failed' && (
          <div className="w-full max-w-xs mb-4">
            <ProgressBar
              value={config.progress}
              variant={isActive ? 'striped' : 'gradient'}
              showPercentage
            />
          </div>
        )}

        {/* Loading spinner for active states */}
        {isActive && (
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <LoadingSpinner size="sm" />
            <span>This usually takes 1-2 minutes</span>
          </div>
        )}

        {/* Error state */}
        {status === 'failed' && (
          <p className="text-red-500 text-sm">
            We couldn&apos;t generate your song. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

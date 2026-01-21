'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/types';
import { CardThemeRenderer } from './CardThemeRenderer';

interface CardPreviewProps {
  card: Partial<Card>;
  showAudioPlayer?: boolean;
  audioComponent?: React.ReactNode;
  className?: string;
}

export function CardPreview({
  card,
  showAudioPlayer = false,
  audioComponent,
  className,
}: CardPreviewProps) {
  return (
    <div className={cn('w-full max-w-lg mx-auto', className)}>
      {/* Card */}
      <CardThemeRenderer card={card} className="aspect-[4/5] md:aspect-[3/4]" />

      {/* Audio Player Section */}
      {showAudioPlayer && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
          {audioComponent || (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🎵</div>
              <p className="font-medium">Your song is being created...</p>
            </div>
          )}
        </div>
      )}

      {/* Traits & Interests badges */}
      {(card.personality_traits?.length || card.interests?.length) && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Personalized for someone who is:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {card.personality_traits?.slice(0, 3).map((trait, i) => (
              <span
                key={`trait-${i}`}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium"
              >
                {trait}
              </span>
            ))}
            {card.interests?.slice(0, 3).map((interest, i) => (
              <span
                key={`interest-${i}`}
                className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function ModernTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white',
        'border border-gray-100',
        'shadow-2xl shadow-purple-500/10',
        className
      )}
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500" />

      {/* Sparkle decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-6 right-6 w-6 h-6 text-purple-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        <svg
          className="absolute top-1/4 left-8 w-4 h-4 text-indigo-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        <svg
          className="absolute bottom-1/4 right-12 w-5 h-5 text-purple-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Emoji */}
        <div className="text-5xl md:text-6xl mb-6">{occasion.emoji}</div>

        {/* Title */}
        <p className="text-purple-500 text-sm font-semibold tracking-widest uppercase mb-2">
          {occasion.heading}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {card.recipient_name || 'Friend'}
        </h2>

        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mb-8" />

        {/* Custom message */}
        {card.custom_message && (
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            {card.custom_message}
          </p>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50">
          <span className="text-gray-500">From</span>
          <span className="font-semibold text-purple-700">
            {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>
    </div>
  );
}

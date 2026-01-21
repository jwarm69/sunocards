'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function ClassicTheme({ card, className }: ThemeProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200',
        'border-4 border-amber-300/50',
        'shadow-xl',
        className
      )}
    >
      {/* Decorative confetti */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full opacity-60" />
        <div className="absolute top-8 right-8 w-2 h-2 bg-blue-400 rounded-full opacity-60" />
        <div className="absolute top-12 left-1/4 w-2 h-3 bg-green-400 rotate-45 opacity-60" />
        <div className="absolute bottom-12 right-1/4 w-3 h-2 bg-purple-400 rotate-12 opacity-60" />
        <div className="absolute bottom-8 left-8 w-2 h-2 bg-pink-400 rounded-full opacity-60" />
        <div className="absolute top-1/3 right-6 w-2 h-2 bg-yellow-500 rotate-45 opacity-60" />
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Cake emoji */}
        <div className="text-6xl md:text-7xl mb-4 animate-bounce">🎂</div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          Happy Birthday
        </h1>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-800 mb-6">
          {card.recipient_name || 'Friend'}!
        </h2>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-2xl">✨</span>
          <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <p className="font-serif text-lg text-amber-800 italic mb-6 max-w-md mx-auto">
            &ldquo;{card.custom_message}&rdquo;
          </p>
        )}

        {/* From */}
        <p className="text-amber-700 font-medium">
          With love from{' '}
          <span className="font-bold">{card.sender_name || 'Someone special'}</span>
        </p>
      </div>

      {/* Bottom border decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 opacity-60" />
    </div>
  );
}

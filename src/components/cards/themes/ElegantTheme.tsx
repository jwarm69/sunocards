'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function ElegantTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
        'border border-amber-500/20',
        'shadow-xl',
        className
      )}
    >
      {/* Gold corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-400/40 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-amber-400/40 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-amber-400/40 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-400/40 rounded-br-2xl" />

      {/* Subtle gold sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-8 w-1 h-1 bg-amber-400 rounded-full opacity-60" />
        <div className="absolute top-1/3 right-12 w-1.5 h-1.5 bg-amber-300 rounded-full opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-amber-400 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-amber-300 rounded-full opacity-60" />
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Occasion emoji */}
        <div className="text-5xl md:text-6xl mb-6">{occasion.emoji}</div>

        {/* Title */}
        <p className="text-amber-400/80 text-sm font-light tracking-[0.3em] uppercase mb-3">
          {occasion.subheading}
        </p>
        <h1 className="font-serif text-2xl md:text-3xl text-amber-100 mb-1">
          {occasion.heading}
        </h1>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8">
          {card.recipient_name || 'Friend'}
        </h2>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
          <div className="w-2 h-2 bg-amber-400 rotate-45" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <p className="text-gray-300 font-light text-lg mb-8 max-w-md mx-auto italic leading-relaxed">
            &ldquo;{card.custom_message}&rdquo;
          </p>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-amber-500/30 bg-amber-500/5">
          <span className="text-amber-400/60 font-light">With warm wishes,</span>
          <span className="text-amber-200 font-medium">
            {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>
    </div>
  );
}

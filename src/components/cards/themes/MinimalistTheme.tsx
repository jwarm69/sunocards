'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function MinimalistTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white',
        'border border-gray-100',
        'shadow-xl',
        className
      )}
    >
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500" />

      {/* Content */}
      <div className="relative p-10 md:p-16 text-center">
        {/* Small accent dot */}
        <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mb-8" />

        {/* Occasion emoji - subtle */}
        <div className="text-4xl md:text-5xl mb-6 opacity-80">{occasion.emoji}</div>

        {/* Subheading */}
        <p className="text-gray-400 text-xs font-light tracking-[0.4em] uppercase mb-4">
          {occasion.subheading}
        </p>

        {/* Main heading */}
        <h1 className="text-xl md:text-2xl font-extralight text-gray-800 mb-2">
          {occasion.heading}
        </h1>

        {/* Recipient name - the focus */}
        <h2 className="text-4xl md:text-6xl font-thin text-gray-900 mb-8 tracking-tight">
          {card.recipient_name || 'Friend'}
        </h2>

        {/* Thin divider */}
        <div className="w-12 h-px bg-purple-300 mx-auto mb-8" />

        {/* Custom message */}
        {card.custom_message && (
          <p className="text-gray-500 font-light text-base md:text-lg mb-10 max-w-sm mx-auto leading-relaxed italic">
            {card.custom_message}
          </p>
        )}

        {/* From - minimal style */}
        <div className="text-gray-400">
          <span className="text-xs tracking-widest uppercase">From</span>
          <p className="text-gray-700 font-normal mt-1">
            {card.sender_name || 'Someone special'}
          </p>
        </div>

        {/* Bottom accent dot */}
        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mx-auto mt-8" />
      </div>
    </div>
  );
}

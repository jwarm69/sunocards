'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function RetroTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500',
        'shadow-xl',
        className
      )}
    >
      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-300 rounded-full blur-3xl opacity-30" />

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Occasion emoji */}
        <div className="text-6xl md:text-7xl mb-4">{occasion.emoji}</div>

        {/* Title with retro styling */}
        <div className="relative inline-block mb-6">
          <h1
            className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500"
            style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
          >
            {occasion.heading.toUpperCase()}
          </h1>
        </div>

        {/* Name with neon effect */}
        <h2
          className="text-4xl md:text-5xl font-black text-white mb-8"
          style={{
            textShadow: `
              0 0 10px rgba(255,255,255,0.5),
              0 0 20px rgba(236,72,153,0.5),
              0 0 30px rgba(236,72,153,0.3)
            `,
          }}
        >
          {card.recipient_name || 'Friend'}!
        </h2>

        {/* Retro decorative line */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">⚡</span>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full" />
          <span className="text-xl">🌟</span>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-yellow-300 rounded-full" />
          <span className="text-2xl">⚡</span>
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-md mx-auto border border-white/20">
            <p className="text-white font-medium">
              {card.custom_message}
            </p>
          </div>
        )}

        {/* From */}
        <div
          className="inline-block px-6 py-3 rounded-full bg-black/40 border-2 border-yellow-300"
          style={{ boxShadow: '0 0 20px rgba(253,224,71,0.3)' }}
        >
          <span className="text-yellow-300 font-bold">
            From: {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>
    </div>
  );
}

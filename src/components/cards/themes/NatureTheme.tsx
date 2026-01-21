'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function NatureTheme({ card, className }: ThemeProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
        'shadow-xl',
        className
      )}
    >
      {/* Leaf and flower decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 text-3xl opacity-80">🌸</div>
        <div className="absolute top-8 right-6 text-2xl opacity-70">🌿</div>
        <div className="absolute top-2 left-1/3 text-2xl opacity-60">🍃</div>
        <div className="absolute bottom-6 left-8 text-3xl opacity-80">🌺</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-70">🌻</div>
        <div className="absolute bottom-12 right-1/3 text-2xl opacity-60">🌿</div>
        <div className="absolute top-1/3 left-2 text-xl opacity-50">🍀</div>
        <div className="absolute top-1/2 right-2 text-xl opacity-50">🌱</div>
      </div>

      {/* Soft light overlay */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-lime-300 rounded-full blur-3xl opacity-20" />

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Sun emoji */}
        <div className="text-5xl md:text-6xl mb-6">🌞</div>

        {/* Title */}
        <p className="text-lime-100 text-sm font-medium tracking-widest uppercase mb-2">
          Wishing You
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          A Beautiful Birthday
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
          {card.recipient_name || 'Friend'}!
        </h2>

        {/* Nature divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl">🌷</span>
          <div className="h-0.5 w-16 bg-lime-200/60 rounded-full" />
          <span className="text-xl">🦋</span>
          <div className="h-0.5 w-16 bg-lime-200/60 rounded-full" />
          <span className="text-2xl">🌷</span>
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-md mx-auto">
            <p className="text-white font-medium leading-relaxed">
              {card.custom_message}
            </p>
          </div>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-sm">
          <span className="text-xl">🌼</span>
          <span className="text-white font-semibold">
            From {card.sender_name || 'Someone special'}
          </span>
          <span className="text-xl">🌼</span>
        </div>
      </div>
    </div>
  );
}

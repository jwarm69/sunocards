'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function WatercolorTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-rose-100 via-purple-50 to-sky-100',
        'shadow-xl',
        className
      )}
    >
      {/* Watercolor blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left pink blob */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-300/40 rounded-full blur-2xl" />
        {/* Top right blue blob */}
        <div className="absolute -top-5 right-0 w-32 h-32 bg-sky-300/30 rounded-full blur-2xl" />
        {/* Bottom left green blob */}
        <div className="absolute bottom-0 -left-5 w-36 h-36 bg-emerald-200/30 rounded-full blur-2xl" />
        {/* Bottom right purple blob */}
        <div className="absolute -bottom-10 right-5 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl" />
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      {/* Brush stroke accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-4 text-3xl opacity-70 brush-float">🌸</div>
        <div className="absolute top-12 right-6 text-2xl opacity-60 brush-float-delayed">🌷</div>
        <div className="absolute bottom-10 left-8 text-2xl opacity-60 brush-float">🌿</div>
        <div className="absolute bottom-8 right-8 text-3xl opacity-70 brush-float-delayed">🎨</div>
      </div>

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Occasion emoji */}
        <div className="text-5xl md:text-6xl mb-4">{occasion.emoji}</div>

        {/* Title - handwritten style */}
        <p className="text-rose-400/80 text-sm font-medium tracking-wide mb-2" style={{ fontStyle: 'italic' }}>
          {occasion.subheading}
        </p>
        <h1 className="text-2xl md:text-3xl font-medium text-gray-700 mb-1" style={{ fontStyle: 'italic' }}>
          {occasion.heading}
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500 mb-6">
          {card.recipient_name || 'Friend'}
        </h2>

        {/* Watercolor brush stroke divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-2 w-16 rounded-full bg-gradient-to-r from-rose-300/60 to-rose-200/40" style={{ transform: 'rotate(-2deg)' }} />
          <div className="h-2 w-8 rounded-full bg-gradient-to-r from-purple-300/50 to-purple-200/30" style={{ transform: 'rotate(1deg)' }} />
          <div className="h-2 w-16 rounded-full bg-gradient-to-r from-sky-200/40 to-sky-300/60" style={{ transform: 'rotate(2deg)' }} />
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 mb-6 max-w-md mx-auto border border-rose-200/30">
            <p className="text-gray-600 font-medium leading-relaxed" style={{ fontStyle: 'italic' }}>
              &ldquo;{card.custom_message}&rdquo;
            </p>
          </div>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/50">
          <span className="text-xl">💕</span>
          <span className="text-gray-700 font-medium">
            With love, {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>

      {/* Watercolor animations */}
      <style jsx>{`
        @keyframes brush-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-5px) rotate(3deg); }
          66% { transform: translateY(3px) rotate(-2deg); }
        }
        .brush-float {
          animation: brush-float 5s ease-in-out infinite;
        }
        .brush-float-delayed {
          animation: brush-float 5s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
}

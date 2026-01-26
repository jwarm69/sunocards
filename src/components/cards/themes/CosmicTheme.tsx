'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function CosmicTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950',
        'shadow-xl',
        className
      )}
    >
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static stars */}
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-[20%] left-[45%] w-0.5 h-0.5 bg-white rounded-full opacity-60" />
        <div className="absolute top-[15%] right-[20%] w-1.5 h-1.5 bg-white rounded-full opacity-70" />
        <div className="absolute top-[35%] left-[10%] w-0.5 h-0.5 bg-white rounded-full opacity-50" />
        <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-[25%] left-[70%] w-0.5 h-0.5 bg-white rounded-full opacity-70" />
        <div className="absolute bottom-[30%] left-[25%] w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute bottom-[25%] right-[30%] w-0.5 h-0.5 bg-white rounded-full opacity-80" />
        <div className="absolute bottom-[15%] left-[60%] w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute bottom-[40%] right-[10%] w-0.5 h-0.5 bg-white rounded-full opacity-70" />

        {/* Twinkling stars */}
        <div className="absolute top-[8%] right-[35%] w-1 h-1 bg-white rounded-full twinkle" />
        <div className="absolute top-[30%] left-[30%] w-1 h-1 bg-white rounded-full twinkle-delayed" />
        <div className="absolute bottom-[20%] right-[45%] w-1 h-1 bg-white rounded-full twinkle" />
      </div>

      {/* Nebula glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Cosmic decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-6 text-2xl float-cosmic">🌙</div>
        <div className="absolute top-10 right-8 text-xl float-cosmic-delayed">⭐</div>
        <div className="absolute bottom-12 left-10 text-xl float-cosmic">✨</div>
        <div className="absolute bottom-8 right-6 text-2xl float-cosmic-delayed">🪐</div>
      </div>

      {/* Shooting star */}
      <div className="absolute top-12 right-0 shooting-star">
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-white rounded-full" />
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Occasion emoji */}
        <div className="text-5xl md:text-6xl mb-4">{occasion.emoji}</div>

        {/* Title */}
        <p className="text-purple-300/80 text-sm font-light tracking-[0.3em] uppercase mb-2">
          {occasion.subheading}
        </p>
        <h1 className="text-2xl md:text-3xl font-light text-white/90 mb-1">
          {occasion.heading}
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6">
          {card.recipient_name || 'Friend'}
        </h2>

        {/* Constellation divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-1 h-1 bg-pink-300 rounded-full" />
          <div className="w-8 h-px bg-gradient-to-r from-pink-300 to-purple-300" />
          <div className="w-1.5 h-1.5 bg-purple-300 rounded-full" />
          <div className="w-8 h-px bg-gradient-to-r from-purple-300 to-indigo-300" />
          <div className="w-1 h-1 bg-indigo-300 rounded-full" />
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 max-w-md mx-auto">
            <p className="text-purple-100/90 font-light leading-relaxed">
              {card.custom_message}
            </p>
          </div>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="text-lg">🌟</span>
          <span className="text-purple-200/90 font-medium">
            Love from {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>

      {/* Cosmic animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float-cosmic {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes shooting {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(-100px) translateY(50px); opacity: 0; }
        }
        .twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .twinkle-delayed {
          animation: twinkle 2s ease-in-out infinite 0.7s;
        }
        .float-cosmic {
          animation: float-cosmic 4s ease-in-out infinite;
        }
        .float-cosmic-delayed {
          animation: float-cosmic 4s ease-in-out infinite 1s;
        }
        .shooting-star {
          animation: shooting 3s ease-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function PlayfulTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600',
        'shadow-xl',
        className
      )}
    >
      {/* Balloon decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-4 text-4xl animate-float">🎈</div>
        <div className="absolute top-6 right-8 text-3xl animate-float-delayed">🎈</div>
        <div className="absolute top-2 left-1/3 text-3xl animate-float">🎈</div>
        <div className="absolute bottom-8 right-4 text-4xl animate-float-delayed">🎉</div>
        <div className="absolute bottom-12 left-8 text-3xl animate-float">🎊</div>
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Party emoji */}
        <div className="text-6xl md:text-7xl mb-4 animate-wiggle">{occasion.emoji}</div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white/90 mb-1">
          {occasion.subheading}
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
          {occasion.heading}, {card.recipient_name || 'Friend'}!
        </h2>

        {/* Confetti line */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl">🎀</span>
          <span className="text-2xl">⭐</span>
          <span className="text-2xl">🎁</span>
          <span className="text-2xl">⭐</span>
          <span className="text-2xl">🎀</span>
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-md mx-auto">
            <p className="text-white font-medium">
              {card.custom_message}
            </p>
          </div>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm">
          <span className="text-xl">💝</span>
          <span className="text-white font-semibold">
            With love from {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 2.5s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

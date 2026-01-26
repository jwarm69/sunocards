'use client';

import { cn } from '@/lib/utils';
import { Card, OCCASIONS } from '@/types';

interface ThemeProps {
  card: Partial<Card>;
  className?: string;
}

export function NeonTheme({ card, className }: ThemeProps) {
  const occasion = OCCASIONS[card.occasion || 'birthday'];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gray-950',
        'shadow-xl shadow-cyan-500/20',
        className
      )}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        />
      </div>

      {/* Neon glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-6 text-3xl neon-flicker">⚡</div>
        <div className="absolute top-8 right-10 text-2xl neon-flicker-delayed">💜</div>
        <div className="absolute bottom-10 left-8 text-2xl neon-flicker">🔮</div>
        <div className="absolute bottom-6 right-6 text-3xl neon-flicker-delayed">⚡</div>
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-12 text-center">
        {/* Occasion emoji with glow */}
        <div className="text-6xl md:text-7xl mb-4 neon-emoji">{occasion.emoji}</div>

        {/* Title with neon glow */}
        <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-cyan-400 mb-2 neon-text-cyan">
          {occasion.subheading}
        </h1>
        <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 neon-text-magenta glitch-text">
          {occasion.heading}
        </h2>
        <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-6">
          {card.recipient_name || 'Friend'}
        </p>

        {/* Neon divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent neon-line" />
          <div className="w-3 h-3 bg-pink-500 rounded-full neon-dot" />
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent neon-line" />
        </div>

        {/* Custom message */}
        {card.custom_message && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6 max-w-md mx-auto backdrop-blur-sm">
            <p className="text-cyan-100 font-medium">
              {card.custom_message}
            </p>
          </div>
        )}

        {/* From */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pink-500/50 bg-pink-500/10">
          <span className="text-xl">💫</span>
          <span className="text-pink-300 font-semibold">
            From {card.sender_name || 'Someone special'}
          </span>
        </div>
      </div>

      {/* Neon animations */}
      <style jsx>{`
        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.6;
          }
        }
        @keyframes neon-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor);
          }
          50% {
            filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px currentColor);
          }
        }
        .neon-flicker {
          animation: neon-flicker 2s infinite;
        }
        .neon-flicker-delayed {
          animation: neon-flicker 2s infinite 0.5s;
        }
        .neon-text-cyan {
          text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff;
        }
        .neon-text-magenta {
          text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff;
        }
        .neon-emoji {
          filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.8));
        }
        .neon-line {
          box-shadow: 0 0 10px currentColor;
        }
        .neon-dot {
          box-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899;
          animation: neon-pulse 2s ease-in-out infinite;
        }
        .glitch-text {
          animation: glitch 3s infinite;
        }
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, 2px); }
          98% { transform: translate(1px, -2px); }
        }
      `}</style>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { MusicStyle } from '@/types';

interface MusicStyleOption {
  id: MusicStyle;
  name: string;
  icon: string;
  description: string;
}

const MUSIC_STYLES: MusicStyleOption[] = [
  {
    id: 'upbeat_pop',
    name: 'Upbeat Pop',
    icon: '🎉',
    description: 'Catchy, fun, and energetic',
  },
  {
    id: 'acoustic_folk',
    name: 'Acoustic Folk',
    icon: '🎸',
    description: 'Warm, heartfelt, and intimate',
  },
  {
    id: 'smooth_jazz',
    name: 'Smooth Jazz',
    icon: '🎷',
    description: 'Sophisticated and elegant',
  },
  {
    id: 'edm',
    name: 'EDM',
    icon: '🎧',
    description: 'High-energy party vibes',
  },
  {
    id: 'rnb_soul',
    name: 'R&B Soul',
    icon: '💜',
    description: 'Smooth and soulful',
  },
  {
    id: 'classic_rock',
    name: 'Classic Rock',
    icon: '🎤',
    description: 'Bold and powerful',
  },
  {
    id: 'hip_hop',
    name: 'Hip Hop',
    icon: '🎤',
    description: 'Rhythmic and uplifting',
  },
  {
    id: 'classical',
    name: 'Classical',
    icon: '🎻',
    description: 'Timeless and elegant',
  },
];

interface MusicStyleSelectorProps {
  value: MusicStyle | undefined;
  onChange: (style: MusicStyle) => void;
  error?: string;
}

export function MusicStyleSelector({
  value,
  onChange,
  error,
}: MusicStyleSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Choose a Music Style
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MUSIC_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            className={cn(
              'relative p-4 rounded-xl border-2 transition-all duration-200',
              'flex flex-col items-center text-center gap-2',
              'hover:scale-[1.02] hover:shadow-lg',
              value === style.id
                ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/20'
                : 'border-gray-200 bg-white hover:border-purple-300'
            )}
          >
            {value === style.id && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <span className="text-3xl">{style.icon}</span>
            <span
              className={cn(
                'font-semibold',
                value === style.id ? 'text-purple-700' : 'text-gray-900'
              )}
            >
              {style.name}
            </span>
            <span className="text-xs text-gray-500">{style.description}</span>
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

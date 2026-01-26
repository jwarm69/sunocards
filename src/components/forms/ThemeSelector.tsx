'use client';

import { cn } from '@/lib/utils';
import { ThemeId } from '@/types';

interface ThemeOption {
  id: ThemeId;
  name: string;
  description: string;
  preview: {
    gradient: string;
    accent: string;
    emoji: string;
  };
}

const THEMES: ThemeOption[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Warm & traditional',
    preview: {
      gradient: 'from-amber-400 to-orange-500',
      accent: 'bg-orange-100',
      emoji: '🎂',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean & minimal',
    preview: {
      gradient: 'from-slate-100 to-white',
      accent: 'bg-purple-500',
      emoji: '✨',
    },
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Fun & colorful',
    preview: {
      gradient: 'from-purple-500 to-pink-500',
      accent: 'bg-yellow-300',
      emoji: '🎈',
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Dark & sophisticated',
    preview: {
      gradient: 'from-gray-900 to-gray-800',
      accent: 'bg-amber-400',
      emoji: '🥂',
    },
  },
  {
    id: 'retro',
    name: 'Retro',
    description: '80s vibes',
    preview: {
      gradient: 'from-pink-500 via-purple-500 to-cyan-500',
      accent: 'bg-yellow-300',
      emoji: '🕺',
    },
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Fresh & organic',
    preview: {
      gradient: 'from-green-400 to-emerald-500',
      accent: 'bg-lime-200',
      emoji: '🌸',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Cyberpunk glow',
    preview: {
      gradient: 'from-cyan-500 to-pink-500',
      accent: 'bg-gray-900',
      emoji: '⚡',
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean & elegant',
    preview: {
      gradient: 'from-white to-gray-100',
      accent: 'bg-purple-500',
      emoji: '✨',
    },
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    description: 'Space dreams',
    preview: {
      gradient: 'from-purple-900 to-indigo-950',
      accent: 'bg-pink-400',
      emoji: '🌙',
    },
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Artistic & soft',
    preview: {
      gradient: 'from-pink-200 to-blue-200',
      accent: 'bg-rose-300',
      emoji: '🎨',
    },
  },
];

interface ThemeSelectorProps {
  value: ThemeId | undefined;
  onChange: (theme: ThemeId) => void;
  error?: string;
}

export function ThemeSelector({ value, onChange, error }: ThemeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Choose a Card Theme
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange(theme.id)}
            className={cn(
              'relative rounded-xl border-2 overflow-hidden transition-all duration-200',
              'hover:scale-[1.02] hover:shadow-lg',
              value === theme.id
                ? 'border-purple-500 ring-2 ring-purple-500/20'
                : 'border-gray-200 hover:border-purple-300'
            )}
          >
            {/* Theme Preview */}
            <div
              className={cn(
                'aspect-[4/3] bg-gradient-to-br flex items-center justify-center',
                theme.preview.gradient
              )}
            >
              <div className="text-center">
                <span className="text-4xl block mb-1">{theme.preview.emoji}</span>
                <div
                  className={cn(
                    'w-16 h-1 rounded-full mx-auto',
                    theme.preview.accent
                  )}
                />
              </div>
            </div>

            {/* Theme Info */}
            <div className="p-3 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={cn(
                      'font-semibold text-sm',
                      value === theme.id ? 'text-purple-700' : 'text-gray-900'
                    )}
                  >
                    {theme.name}
                  </p>
                  <p className="text-xs text-gray-500">{theme.description}</p>
                </div>
                {value === theme.id && (
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
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { OccasionType, OCCASIONS } from '@/types';

interface OccasionSelectorProps {
  value?: OccasionType;
  onChange: (occasion: OccasionType) => void;
  error?: string;
}

const occasionList = Object.values(OCCASIONS);

export function OccasionSelector({ value, onChange, error }: OccasionSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {occasionList.map((occasion) => (
          <button
            key={occasion.id}
            type="button"
            onClick={() => onChange(occasion.id)}
            className={cn(
              'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
              'hover:border-purple-300 hover:bg-purple-50/50',
              value === occasion.id
                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 bg-white'
            )}
          >
            <span className="text-3xl">{occasion.emoji}</span>
            <span className="font-medium text-gray-900">{occasion.name}</span>
            <span className="text-xs text-gray-500 text-center">{occasion.subheading}</span>

            {/* Selected checkmark */}
            {value === occasion.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}

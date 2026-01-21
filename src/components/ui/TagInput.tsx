'use client';

import { cn } from '@/lib/utils';
import { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  maxLength?: number;
  className?: string;
}

export function TagInput({
  label,
  error,
  helperText,
  value,
  onChange,
  placeholder = 'Type and press Enter...',
  maxTags = 5,
  maxLength = 30,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (
      trimmed &&
      !value.includes(trimmed) &&
      value.length < maxTags &&
      trimmed.length <= maxLength
    ) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div
        className={cn(
          'w-full px-3 py-2 rounded-xl border-2 transition-all duration-200',
          'bg-white focus-within:ring-2 focus-within:ring-purple-500/20',
          error
            ? 'border-red-300 focus-within:border-red-500'
            : 'border-gray-200 focus-within:border-purple-500',
          'flex flex-wrap gap-2 min-h-[3rem]'
        )}
      >
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
        {value.length < maxTags && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] outline-none text-gray-900 placeholder:text-gray-400 py-1"
            maxLength={maxLength}
          />
        )}
      </div>
      <div className="flex justify-between mt-1.5">
        <div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
        <p className="text-sm text-gray-400">
          {value.length}/{maxTags}
        </p>
      </div>
    </div>
  );
}

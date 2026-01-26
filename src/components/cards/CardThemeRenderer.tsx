'use client';

import { Card, ThemeId } from '@/types';
import {
  ClassicTheme,
  ModernTheme,
  PlayfulTheme,
  ElegantTheme,
  RetroTheme,
  NatureTheme,
  NeonTheme,
  MinimalistTheme,
  CosmicTheme,
  WatercolorTheme,
} from './themes';

interface CardThemeRendererProps {
  card: Partial<Card>;
  className?: string;
}

const THEME_COMPONENTS: Record<ThemeId, React.ComponentType<{ card: Partial<Card>; className?: string }>> = {
  classic: ClassicTheme,
  modern: ModernTheme,
  playful: PlayfulTheme,
  elegant: ElegantTheme,
  retro: RetroTheme,
  nature: NatureTheme,
  neon: NeonTheme,
  minimalist: MinimalistTheme,
  cosmic: CosmicTheme,
  watercolor: WatercolorTheme,
};

export function CardThemeRenderer({ card, className }: CardThemeRendererProps) {
  const themeId = card.theme_id || 'playful';
  const ThemeComponent = THEME_COMPONENTS[themeId] || PlayfulTheme;

  return <ThemeComponent card={card} className={className} />;
}

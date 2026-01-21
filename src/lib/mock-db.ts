// Simple in-memory mock database for demo purposes
// Replace with Supabase when ready for production

import { Card } from '@/types';

// In-memory storage (resets on server restart)
const cards = new Map<string, Card>();

export function createCard(card: Card): Card {
  cards.set(card.id, card);
  cards.set(card.share_id, card); // Also index by share_id
  return card;
}

export function getCardById(id: string): Card | undefined {
  return cards.get(id);
}

export function getCardByShareId(shareId: string): Card | undefined {
  return cards.get(shareId);
}

export function updateCard(id: string, updates: Partial<Card>): Card | undefined {
  const card = cards.get(id);
  if (!card) return undefined;

  const updated = { ...card, ...updates, updated_at: new Date().toISOString() };
  cards.set(id, updated);
  cards.set(card.share_id, updated);
  return updated;
}

export function getAllCards(): Card[] {
  // Filter out duplicate entries (we store by both id and share_id)
  const seen = new Set<string>();
  const result: Card[] = [];

  cards.forEach((card) => {
    if (!seen.has(card.id)) {
      seen.add(card.id);
      result.push(card);
    }
  });

  return result;
}

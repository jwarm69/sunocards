'use client';

import { useEffect, useState, useCallback, use } from 'react';
import Link from 'next/link';
import { Button, Input, LoadingOverlay } from '@/components/ui';
import { CardPreview } from '@/components/cards';
import { Card } from '@/types';

interface PageProps {
  params: Promise<{ cardId: string }>;
}

export default function PreviewPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [card, setCard] = useState<Partial<Card> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch card data
  const fetchCard = useCallback(async () => {
    try {
      const response = await fetch(`/api/cards/${resolvedParams.cardId}`);
      if (!response.ok) {
        throw new Error('Card not found');
      }
      const data = await response.json();
      setCard({
        id: data.card.id,
        share_id: data.card.shareId,
        recipient_name: data.card.recipientName,
        personality_traits: data.card.personalityTraits,
        interests: data.card.interests,
        relationship: data.card.relationship,
        music_style: data.card.musicStyle,
        theme_id: data.card.themeId,
        custom_message: data.card.customMessage,
        sender_name: data.card.senderName,
        song_status: data.card.songStatus,
        song_url: data.card.songUrl,
        lyrics: data.card.lyrics,
      });
    } catch {
      setError('Failed to load card');
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams.cardId]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  const handleCopyLink = async () => {
    if (!card?.share_id) return;

    const url = `${window.location.origin}/card/${card.share_id}`;
    await navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading your card..." />;
  }

  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Card Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn&apos;t find this card.</p>
          <Link href="/create">
            <Button>Create a New Card</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/card/${card.share_id}`;

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <Link
          href="/create"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <span>←</span>
          <span>Create another card</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Your Birthday Card is Ready!</h1>
        <p className="text-gray-600">
          For <strong>{card.recipient_name}</strong>
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div>
            <CardPreview card={card} />
          </div>

          {/* Share Options */}
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎉</span>
                <h2 className="font-bold text-green-800">Card Created Successfully!</h2>
              </div>
              <p className="text-green-700">
                Share the link below to send this birthday card to {card.recipient_name}.
              </p>
            </div>

            {/* Share Link */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span> Share Link
              </h2>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="text-sm bg-gray-50"
                />
                <Button onClick={handleCopyLink} variant="secondary">
                  {copySuccess ? '✓ Copied!' : 'Copy'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Anyone with this link can view the birthday card
              </p>
            </div>

            {/* View Card Button */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👀</span> Preview Card
              </h2>
              <Link href={`/card/${card.share_id}`} target="_blank">
                <Button className="w-full">
                  Open Card in New Tab →
                </Button>
              </Link>
            </div>

            {/* Card Details */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span> Card Details
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Recipient</span>
                  <span className="font-medium">{card.recipient_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">From</span>
                  <span className="font-medium">{card.sender_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Theme</span>
                  <span className="font-medium capitalize">{card.theme_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Music Style</span>
                  <span className="font-medium capitalize">{card.music_style?.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

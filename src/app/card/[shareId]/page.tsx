'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Button, LoadingOverlay } from '@/components/ui';
import { CardPreview } from '@/components/cards';
import { Card } from '@/types';

interface PageProps {
  params: Promise<{ shareId: string }>;
}

export default function PublicCardPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [card, setCard] = useState<Partial<Card> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`/api/cards/${resolvedParams.shareId}`);
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
        setError('Card not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [resolvedParams.shareId]);

  if (isLoading) {
    return <LoadingOverlay message="Loading your birthday card..." />;
  }

  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎂</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Card Not Found</h1>
          <p className="text-gray-600 mb-6">
            This birthday card might have expired or doesn&apos;t exist.
          </p>
          <Link href="/create">
            <Button>Create Your Own Card</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header */}
      <header className="max-w-lg mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
          <span>🎵</span>
          <span>SunoCards</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          A Special Birthday Message
        </h1>
      </header>

      {/* Card */}
      <div className="max-w-lg mx-auto">
        <CardPreview card={card} />

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Want to create your own birthday song?</p>
          <Link href="/create">
            <Button>Create Your Own Card 🎉</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          Made with ❤️ by{' '}
          <Link href="/" className="text-purple-600 hover:underline">
            SunoCards
          </Link>
        </p>
      </footer>
    </div>
  );
}

'use client';

import { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { Button, LoadingOverlay, ShareButtons } from '@/components/ui';
import { CardPreview } from '@/components/cards';
import { Card, OCCASIONS, OccasionType } from '@/types';

interface PageProps {
  params: Promise<{ shareId: string }>;
}

export default function PublicCardPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [card, setCard] = useState<Partial<Card> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current || !card) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      const occasionName = OCCASIONS[(card.occasion as OccasionType) || 'birthday'].name.toLowerCase();
      const link = document.createElement('a');
      link.download = `${card.recipient_name || 'card'}-${occasionName}-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error downloading card:', err);
    } finally {
      setIsDownloading(false);
    }
  };

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
          occasion: data.card.occasion || 'birthday',
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
    return <LoadingOverlay message="Loading your card..." />;
  }

  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎴</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Card Not Found</h1>
          <p className="text-gray-600 mb-6">
            This card might have expired or doesn&apos;t exist.
          </p>
          <Link href="/create">
            <Button>Create Your Own Card</Button>
          </Link>
        </div>
      </div>
    );
  }

  const occasionConfig = OCCASIONS[(card.occasion as OccasionType) || 'birthday'];

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header */}
      <header className="max-w-lg mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
          <span>🎵</span>
          <span>CardSong</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          A Special {occasionConfig.name} Message {occasionConfig.emoji}
        </h1>
      </header>

      {/* Card */}
      <div className="max-w-lg mx-auto">
        <CardPreview card={card} cardRef={cardRef} />

        {/* Download Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleDownload}
            variant="secondary"
            isLoading={isDownloading}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download as Image
          </Button>
        </div>

        {/* Share Section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 justify-center">
            <span>📤</span> Share This Card
          </h2>
          <div className="flex justify-center">
            <ShareButtons
              url={typeof window !== 'undefined' ? window.location.href : ''}
              recipientName={card.recipient_name || 'Friend'}
              occasion={occasionConfig.name.toLowerCase()}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Want to create your own card?</p>
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
            CardSong
          </Link>
        </p>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CardSong - AI-Powered Personalized Cards',
  description: 'Create stunning personalized digital cards with AI-generated music for any occasion.',
  keywords: ['birthday', 'anniversary', 'AI', 'song', 'music', 'card', 'personalized', 'gift', 'celebration'],
  openGraph: {
    title: 'CardSong - AI-Powered Personalized Cards',
    description: 'Create stunning personalized digital cards with AI-generated music for any occasion.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  );
}

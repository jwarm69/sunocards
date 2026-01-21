import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SunoCards - AI Birthday Songs',
  description: 'Create personalized AI-generated birthday songs and share them with beautiful digital cards.',
  keywords: ['birthday', 'AI', 'song', 'music', 'card', 'personalized', 'gift'],
  openGraph: {
    title: 'SunoCards - AI Birthday Songs',
    description: 'Create personalized AI-generated birthday songs and share them with beautiful digital cards.',
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

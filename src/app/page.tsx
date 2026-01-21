import Link from 'next/link';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <span className="font-bold text-xl text-gray-900">SunoCards</span>
          </Link>
          <Link href="/create">
            <Button size="sm">Create Card</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <span>🎤</span>
            <span>AI-Powered Birthday Songs</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Make Their Birthday{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Unforgettable
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create a personalized birthday song with AI. Choose a style, add their name and interests,
            and share a beautiful digital card with a unique song made just for them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="w-full sm:w-auto">
                Create Your Card
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              See Examples
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>No login required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Ready in minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Share instantly</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Create a personalized birthday song in just a few easy steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-purple-500/25">
                ✍️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                1. Tell Us About Them
              </h3>
              <p className="text-gray-600">
                Enter their name, personality traits, and interests. The more details, the more personal the song!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-pink-500/25">
                🎨
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                2. Pick Your Style
              </h3>
              <p className="text-gray-600">
                Choose from 8 music styles and 6 beautiful card themes to match their vibe.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-amber-500/25">
                🎁
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                3. Share the Magic
              </h3>
              <p className="text-gray-600">
                Get a unique link to share or send via email. Watch their face light up!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Styles Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            8 Music Styles to Choose From
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From upbeat pop to smooth jazz, find the perfect genre for their personality
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎉', name: 'Upbeat Pop' },
              { icon: '🎸', name: 'Acoustic Folk' },
              { icon: '🎷', name: 'Smooth Jazz' },
              { icon: '🎧', name: 'EDM' },
              { icon: '💜', name: 'R&B Soul' },
              { icon: '🎤', name: 'Classic Rock' },
              { icon: '🎤', name: 'Hip Hop' },
              { icon: '🎻', name: 'Classical' },
            ].map((style) => (
              <div
                key={style.name}
                className="p-4 rounded-xl bg-white border-2 border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all duration-200 text-center"
              >
                <span className="text-3xl block mb-2">{style.icon}</span>
                <span className="font-medium text-gray-700">{style.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl shadow-purple-500/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Something Special?
            </h2>
            <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
              Make their birthday memorable with a one-of-a-kind AI-generated song and beautiful digital card.
            </p>
            <Link href="/create">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50"
              >
                Start Creating Now
                <span className="ml-2">🎵</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>🎵</span>
            <span>SunoCards</span>
          </div>
          <p>Made with ❤️ for birthday celebrations everywhere</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-purple-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

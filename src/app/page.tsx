'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useEffect, useState } from 'react';

const FloatingCard = ({ delay, className }: { delay: number; className?: string }) => (
  <div
    className={`absolute w-48 h-64 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl ${className}`}
    style={{
      animation: `float ${6 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className="p-4 h-full flex flex-col">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mb-3" />
      <div className="space-y-2 flex-1">
        <div className="h-2 bg-white/20 rounded-full w-3/4" />
        <div className="h-2 bg-white/20 rounded-full w-1/2" />
        <div className="h-2 bg-white/20 rounded-full w-2/3" />
      </div>
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-6 h-6 rounded-full bg-white/10" />
        ))}
      </div>
    </div>
  </div>
);

const GlowOrb = ({ color, size, position, delay }: { color: string; size: string; position: string; delay: number }) => (
  <div
    className={`absolute ${size} ${position} rounded-full blur-3xl opacity-30`}
    style={{
      background: color,
      animation: `pulse-glow ${8 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const occasions = [
    { emoji: '🎂', name: 'Birthday', desc: 'Celebrate another year', gradient: 'from-pink-500 to-rose-500' },
    { emoji: '💕', name: 'Anniversary', desc: 'Honor your love', gradient: 'from-red-500 to-pink-500' },
    { emoji: '🎓', name: 'Graduation', desc: 'Celebrate achievements', gradient: 'from-blue-500 to-indigo-500' },
    { emoji: '🙏', name: 'Thank You', desc: 'Show gratitude', gradient: 'from-amber-500 to-orange-500' },
    { emoji: '🎉', name: 'Congratulations', desc: 'Cheer them on', gradient: 'from-purple-500 to-violet-500' },
    { emoji: '💐', name: 'Get Well', desc: 'Send healing wishes', gradient: 'from-green-500 to-emerald-500' },
  ];

  const musicStyles = [
    { icon: '🎉', name: 'Upbeat Pop', color: 'bg-pink-500/10 border-pink-500/30' },
    { icon: '🎸', name: 'Acoustic Folk', color: 'bg-amber-500/10 border-amber-500/30' },
    { icon: '🎷', name: 'Smooth Jazz', color: 'bg-blue-500/10 border-blue-500/30' },
    { icon: '🎧', name: 'EDM', color: 'bg-purple-500/10 border-purple-500/30' },
    { icon: '💜', name: 'R&B Soul', color: 'bg-violet-500/10 border-violet-500/30' },
    { icon: '🎤', name: 'Classic Rock', color: 'bg-red-500/10 border-red-500/30' },
    { icon: '🔥', name: 'Hip Hop', color: 'bg-orange-500/10 border-orange-500/30' },
    { icon: '🎻', name: 'Classical', color: 'bg-indigo-500/10 border-indigo-500/30' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GlowOrb color="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" size="w-[600px] h-[600px]" position="top-[-200px] left-[-200px]" delay={0} />
        <GlowOrb color="linear-gradient(135deg, #ec4899 0%, #f472b6 100%)" size="w-[500px] h-[500px]" position="top-[20%] right-[-150px]" delay={2} />
        <GlowOrb color="linear-gradient(135deg, #6366f1 0%, #818cf8 100%)" size="w-[400px] h-[400px]" position="bottom-[-100px] left-[30%]" delay={4} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-6xl mx-auto px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                  🎵
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  SunoCards
                </span>
              </Link>
              <Link href="/create">
                <Button size="sm" className="shadow-lg shadow-purple-500/25">
                  Create Card
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4">
        {/* Floating Cards Background */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingCard delay={0} className="top-[15%] left-[5%] rotate-[-15deg] opacity-40" />
            <FloatingCard delay={1.5} className="top-[25%] right-[8%] rotate-[12deg] opacity-30" />
            <FloatingCard delay={3} className="bottom-[20%] left-[12%] rotate-[8deg] opacity-25" />
            <FloatingCard delay={2} className="bottom-[30%] right-[5%] rotate-[-8deg] opacity-35" />
          </div>
        )}

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI-Powered Personalized Cards
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="block text-white">Make Every</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Celebration
            </span>
            <span className="block text-white/90">Unforgettable</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Create stunning personalized digital cards for any occasion.
            Choose your style, add their story, and share something truly special.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Link href="/create">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-5 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow">
                Start Creating
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-5 border-white/20 text-white hover:bg-white/5">
              View Examples
            </Button>
          </div>

          {/* Trust Badges */}
          <div
            className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/40 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {[
              { icon: '⚡', text: 'Ready in seconds' },
              { icon: '🔒', text: 'No login required' },
              { icon: '📥', text: 'Download as PNG' },
              { icon: '🔗', text: 'Easy sharing' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <span className="text-base">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              6 Occasions
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Cards for Every{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Moment
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From birthdays to thank you notes, create the perfect card for any celebration
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {occasions.map((occasion, index) => (
              <div
                key={occasion.name}
                className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${occasion.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <span className="text-5xl md:text-6xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                    {occasion.emoji}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{occasion.name}</h3>
                  <p className="text-white/50 text-sm">{occasion.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
              Simple Process
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Create in{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                3 Steps
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: '01',
                icon: '✍️',
                title: 'Tell Their Story',
                desc: 'Share their name, personality, and what makes them special. The more details, the more personal.',
                gradient: 'from-purple-500 to-indigo-500',
              },
              {
                step: '02',
                icon: '🎨',
                title: 'Pick Your Style',
                desc: 'Choose from 8 music genres and 6 stunning card themes to match their unique vibe.',
                gradient: 'from-pink-500 to-rose-500',
              },
              {
                step: '03',
                icon: '🚀',
                title: 'Share the Magic',
                desc: 'Download as PNG, share via link, or post directly to social media. Make them smile!',
                gradient: 'from-amber-500 to-orange-500',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative group">
                {/* Connecting Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
                )}

                <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Step Number */}
                  <span className="absolute -top-4 -right-2 text-7xl font-bold text-white/[0.03] select-none">
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Styles */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              8 Genres
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Find Their{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sound
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From upbeat pop to smooth jazz, match the music to their personality
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {musicStyles.map((style) => (
              <div
                key={style.name}
                className={`group p-6 rounded-2xl ${style.color} border backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {style.icon}
                </span>
                <span className="font-semibold text-white/90">{style.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

            {/* Content */}
            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Create<br />Something Special?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
                Join thousands who have made celebrations memorable with personalized cards
              </p>
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-white/90 shadow-2xl shadow-black/20 text-lg px-12 py-6"
                >
                  Create Your Card Now
                  <span className="ml-2">✨</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                🎵
              </div>
              <span className="font-semibold text-white/80">SunoCards</span>
            </div>

            <p className="text-white/40 text-sm">
              Made with 💜 for celebrations everywhere
            </p>

            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

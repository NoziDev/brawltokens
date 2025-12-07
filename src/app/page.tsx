'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { value: "0", label: "Players", icon: "👥" },
    { value: "0", label: "Games", icon: "🎮" },
    { value: "$0", label: "Paid Out", icon: "💰" },
    { value: "24/7", label: "Support", icon: "🛡️" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6] rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06b6d4] rounded-full filter blur-[150px]"></div>
        </div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-[#8b5cf6]/30 rounded-full px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-gray-300 text-sm">Players online</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-white">Play.</span>{' '}
            <span className="text-gradient">Win.</span>{' '}
            <span className="text-white">Cash Out.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The Brawlhalla matchmaking platform where every victory earns you tokens redeemable for real money.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/games" className="btn-primary px-8 py-4 rounded-xl text-lg inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Find a Match
            </Link>
            <Link href="/register" className="px-8 py-4 rounded-xl text-lg border border-[#2a2a3e] text-white hover:border-[#8b5cf6] transition-colors inline-flex items-center justify-center gap-2">
              Create Account
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-4">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#8b5cf6]/20 text-[#a78bfa] px-4 py-2 rounded-full text-sm font-medium mb-4">How it works</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">3 simple steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Buy Tokens", desc: "1 token = $1. Pay with crypto.", icon: "💳" },
              { step: 2, title: "Find a Match", desc: "Choose your stake and face an opponent.", icon: "⚔️" },
              { step: 3, title: "Win & Withdraw", desc: "Win double your stake and withdraw real money.", icon: "💸" }
            ].map((item) => (
              <div key={item.step} className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-8 text-center hover:border-[#8b5cf6]/50 transition-all">
                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#8b5cf6]/20 text-[#a78bfa] px-4 py-2 rounded-full text-sm font-medium mb-4">Brawlhalla</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Turn your <span className="text-gradient">skill</span> into money
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Over 50 playable legends. Find your main, perfect your combos and dominate the arena. Every win brings you closer to cashing out.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#13131a] border border-[rgba(139,92,246,0.2)]">
                  <div className="text-2xl font-bold text-gradient">1-500</div>
                  <div className="text-sm text-gray-500">Tokens per match</div>
                </div>
                <div className="p-4 rounded-xl bg-[#13131a] border border-[rgba(139,92,246,0.2)]">
                  <div className="text-2xl font-bold text-gradient">5%</div>
                  <div className="text-sm text-gray-500">Commission only</div>
                </div>
              </div>

              <Link href="/games" className="btn-primary px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2">
                Start playing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-full flex items-center justify-center border border-[#8b5cf6]/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎮</div>
                  <div className="text-2xl font-bold text-white">Brawlhalla</div>
                  <div className="text-gray-400">Competitive 1v1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0d0d12] to-[#1a1a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6] rounded-full filter blur-[200px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6a21a] to-[#ffd700] text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
            🎁 50 free tokens on signup
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to enter the <span className="text-gradient">arena</span>?
          </h2>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Join players and start turning your talent into real earnings now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary px-10 py-5 rounded-xl text-lg font-bold inline-flex items-center justify-center gap-2">
              Create my free account
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Free - No commitment - Instant withdrawal
          </p>
        </div>
      </section>
    </div>
  );
}

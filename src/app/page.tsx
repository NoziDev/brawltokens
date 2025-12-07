'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { brawlhallaLegends, LegendCarousel } from '@/components/ui/BrawlhallaCharacter';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredLegends = [
    brawlhallaLegends[0],  // Bodvar
    brawlhallaLegends[6],  // Hattori
    brawlhallaLegends[30], // Mordex
  ];

  const stats = [
    {
      value: "50K+",
      label: "Joueurs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      value: "1M+",
      label: "Parties",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: "500K€",
      label: "Distribues",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: "24/7",
      label: "Support",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const liveMatches = [
    { player1: "DragonSlayer", player2: "NightFury", stake: 50, legend1: brawlhallaLegends[30], legend2: brawlhallaLegends[6], elo1: 2150, elo2: 2089 },
    { player1: "ShadowBlade", player2: "ThunderGod", stake: 100, legend1: brawlhallaLegends[0], legend2: brawlhallaLegends[44], elo1: 1856, elo2: 1920 },
    { player1: "PhoenixKing", player2: "IronFist", stake: 25, legend1: brawlhallaLegends[2], legend2: brawlhallaLegends[13], elo1: 1650, elo2: 1702 },
  ];

  const topPlayers = [
    { rank: 1, name: "xSandstorm", elo: 2847, wins: 1250, legend: brawlhallaLegends[30] },
    { rank: 2, name: "Boomie", elo: 2789, wins: 1180, legend: brawlhallaLegends[6] },
    { rank: 3, name: "Cody_Travis", elo: 2756, wins: 1095, legend: brawlhallaLegends[0] },
    { rank: 4, name: "Phazon", elo: 2698, wins: 1020, legend: brawlhallaLegends[44] },
    { rank: 5, name: "Wrenchd", elo: 2654, wins: 985, legend: brawlhallaLegends[2] },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - Corehalla inspired */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="bg-glow-purple top-0 left-1/4 -translate-x-1/2"></div>
        <div className="bg-glow-cyan top-1/3 right-0"></div>

        {/* Floating legends background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute left-[5%] top-[20%] float">
            <Image src={brawlhallaLegends[15].image} alt="" width={200} height={260} className="object-contain" unoptimized />
          </div>
          <div className="absolute right-[5%] top-[15%] float-delay-1">
            <Image src={brawlhallaLegends[27].image} alt="" width={200} height={260} className="object-contain transform -scale-x-100" unoptimized />
          </div>
        </div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge badge-gold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>2,450 joueurs en ligne</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-white">Joue.</span>{' '}
            <span className="text-gradient">Gagne.</span>{' '}
            <span className="text-white">Encaisse.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            La plateforme de matchmaking Brawlhalla ou chaque victoire te rapporte des tokens echangeables contre de l&apos;argent reel.
          </p>

          {/* Search Bar - Corehalla style */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un joueur, un clan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-search"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/games" className="btn-primary px-8 py-4 rounded-xl text-lg inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trouver un Match
            </Link>
            <Link href="/register" className="btn-secondary px-8 py-4 rounded-xl text-lg inline-flex items-center justify-center gap-2">
              Creer un compte
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="text-[#8b5cf6] mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-subtle text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-[rgba(139,92,246,0.3)] flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#8b5cf6] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Legends Carousel */}
      <section className="py-8 bg-[#0d0d12] border-y border-[rgba(139,92,246,0.1)]">
        <LegendCarousel />
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-[#0d0d12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Live Matches - 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <h2 className="text-2xl font-bold text-white">Matchs en Direct</h2>
                </div>
                <Link href="/games" className="text-[#8b5cf6] hover:text-[#a78bfa] text-sm font-medium transition-colors">
                  Voir tout →
                </Link>
              </div>

              <div className="space-y-4">
                {liveMatches.map((match, index) => (
                  <div key={index} className="glass-card p-5">
                    <div className="flex items-center justify-between">
                      {/* Player 1 */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-16 h-20">
                          <Image
                            src={match.legend1.image}
                            alt={match.legend1.name}
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{match.player1}</div>
                          <div className="text-sm text-subtle">{match.legend1.name}</div>
                          <div className="text-xs text-[#8b5cf6]">{match.elo1} ELO</div>
                        </div>
                      </div>

                      {/* VS & Stake */}
                      <div className="flex flex-col items-center px-6">
                        <span className="text-2xl font-black text-gradient vs-text">VS</span>
                        <div className="badge badge-gold mt-2">
                          <span>{match.stake} tokens</span>
                        </div>
                      </div>

                      {/* Player 2 */}
                      <div className="flex items-center gap-4 flex-1 justify-end">
                        <div className="text-right">
                          <div className="font-semibold text-white">{match.player2}</div>
                          <div className="text-sm text-subtle">{match.legend2.name}</div>
                          <div className="text-xs text-[#06b6d4]">{match.elo2} ELO</div>
                        </div>
                        <div className="relative w-16 h-20">
                          <Image
                            src={match.legend2.image}
                            alt={match.legend2.name}
                            fill
                            className="object-contain transform -scale-x-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 btn-secondary py-2 rounded-lg text-sm">
                        Regarder
                      </button>
                      <button className="flex-1 btn-primary py-2 rounded-lg text-sm">
                        Parier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard - 1 column */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Top Joueurs</h2>
                <Link href="/leaderboard" className="text-[#8b5cf6] hover:text-[#a78bfa] text-sm font-medium transition-colors">
                  Classement →
                </Link>
              </div>

              <div className="glass-card p-5">
                <div className="space-y-4">
                  {topPlayers.map((player) => (
                    <div key={player.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(139,92,246,0.05)] transition-colors">
                      {/* Rank */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                        player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                        player.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' :
                        'bg-[#1a1a24] text-white'
                      }`}>
                        {player.rank}
                      </div>

                      {/* Legend avatar */}
                      <div className="relative w-10 h-12">
                        <Image
                          src={player.legend.image}
                          alt=""
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{player.name}</div>
                        <div className="text-xs text-subtle">{player.wins} victoires</div>
                      </div>

                      {/* ELO */}
                      <div className="text-right">
                        <div className="font-bold text-gradient text-sm">{player.elo}</div>
                        <div className="text-xs text-subtle">ELO</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="badge badge-primary mb-4">Comment ca marche</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">3 etapes simples</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Achete des Tokens",
                desc: "1 token = 1 EUR. Paye par carte, PayPal ou crypto.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                legend: brawlhallaLegends[19]
              },
              {
                step: 2,
                title: "Trouve un Match",
                desc: "Choisis ta mise et affronte un adversaire de ton niveau.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                legend: brawlhallaLegends[6]
              },
              {
                step: 3,
                title: "Gagne & Retire",
                desc: "Remporte le double de ta mise et retire en argent reel.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                legend: brawlhallaLegends[44]
              }
            ].map((item, index) => (
              <div key={index} className="legend-card p-8 text-center group">
                {/* Step number */}
                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>

                {/* Legend image */}
                <div className="h-40 flex items-center justify-center mb-6">
                  <Image
                    src={item.legend.image}
                    alt=""
                    width={140}
                    height={180}
                    className="object-contain group-hover:scale-110 transition-transform duration-300 character-glow"
                    unoptimized
                  />
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[#8b5cf6]">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Legends */}
      <section className="py-20 bg-[#0d0d12] relative overflow-hidden">
        <div className="bg-glow-purple top-1/2 left-0 -translate-y-1/2"></div>
        <div className="bg-glow-cyan top-1/2 right-0 -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="badge badge-primary mb-4">Brawlhalla</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Transforme ton <span className="text-gradient">skill</span> en argent
              </h2>
              <p className="text-lg text-muted mb-8 leading-relaxed">
                Plus de 50 legendes jouables. Trouve ton main, perfectionne tes combos et domine l&apos;arene. Chaque victoire te rapproche du cashout.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#13131a] border border-[rgba(139,92,246,0.2)]">
                  <div className="text-2xl font-bold text-gradient">1-500</div>
                  <div className="text-sm text-subtle">Tokens par match</div>
                </div>
                <div className="p-4 rounded-xl bg-[#13131a] border border-[rgba(139,92,246,0.2)]">
                  <div className="text-2xl font-bold text-gradient">5%</div>
                  <div className="text-sm text-subtle">Commission seulement</div>
                </div>
              </div>

              <Link href="/games" className="btn-gold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2">
                Commencer a jouer
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Legends showcase */}
            <div className="relative flex items-center justify-center min-h-[500px]">
              {/* Center legend */}
              <div className="relative z-20">
                <Image
                  src={featuredLegends[1].image}
                  alt={featuredLegends[1].name}
                  width={350}
                  height={450}
                  className="object-contain float character-glow-gold"
                  unoptimized
                />
              </div>

              {/* Left legend */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10 opacity-60">
                <Image
                  src={featuredLegends[0].image}
                  alt={featuredLegends[0].name}
                  width={220}
                  height={280}
                  className="object-contain float-delay-1 transform -scale-x-100"
                  unoptimized
                />
              </div>

              {/* Right legend */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 z-10 opacity-60">
                <Image
                  src={featuredLegends[2].image}
                  alt={featuredLegends[2].name}
                  width={220}
                  height={280}
                  className="object-contain float-delay-2"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="bg-glow-purple top-0 left-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="badge badge-gold mb-6 pulse-glow inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            10 tokens offerts a l&apos;inscription
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Pret a entrer dans l&apos;<span className="shimmer-text">arene</span> ?
          </h2>

          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Rejoins des milliers de joueurs et commence a transformer ton talent en gains reels des maintenant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary px-10 py-5 rounded-xl text-lg font-bold inline-flex items-center justify-center gap-2">
              Creer mon compte gratuitement
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <p className="text-subtle text-sm mt-6">
            Gratuit • Sans engagement • Retrait instantane
          </p>
        </div>
      </section>
    </div>
  );
}

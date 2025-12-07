'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Match {
  id: number;
  creator: string;
  stake: number;
  elo: number;
  status: 'waiting' | 'in_progress';
}

export default function Games() {
  const [selectedStake, setSelectedStake] = useState<number>(50);
  const [isSearching, setIsSearching] = useState(false);

  const stakes = [10, 25, 50, 100, 250, 500];

  const availableMatches: Match[] = [
    { id: 1, creator: "ShadowBlade", stake: 50, elo: 1850, status: 'waiting' },
    { id: 2, creator: "NightFury", stake: 100, elo: 2100, status: 'waiting' },
    { id: 3, creator: "StormBreaker", stake: 25, elo: 1650, status: 'waiting' },
    { id: 4, creator: "IronFist", stake: 250, elo: 2350, status: 'waiting' },
    { id: 5, creator: "PhoenixRise", stake: 50, elo: 1920, status: 'waiting' },
  ];

  const liveMatches = [
    { id: 1, player1: "DragonSlayer", player2: "ThunderBolt", stake: 100, time: "2:34" },
    { id: 2, player1: "BladeRunner", player2: "SilentStrike", stake: 50, time: "4:12" },
    { id: 3, player1: "VenomBite", player2: "GhostWalker", stake: 250, time: "1:45" },
  ];

  const handleStartSearch = () => {
    setIsSearching(true);
    // Simulate matchmaking
    setTimeout(() => {
      setIsSearching(false);
      alert('Match trouve! (Demo)');
    }, 3000);
  };

  const handleJoinMatch = (matchId: number) => {
    alert(`Rejoindre le match #${matchId} (Demo)`);
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#f6a21a] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Brawlhalla Arena</h1>
              <p className="text-gray-400">Trouvez un adversaire et gagnez des tokens</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#12121a] px-4 py-2 rounded-full border border-[#2a2a3e]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-medium">2,450 en ligne</span>
              </div>
              <Link href="/shop" className="btn-primary px-6 py-2 rounded-full text-black font-semibold">
                Acheter Tokens
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Matchmaking Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Match */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Creer un Match</h2>

              {/* Stake Selection */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-3 block">Choisir la mise (tokens)</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {stakes.map((stake) => (
                    <button
                      key={stake}
                      onClick={() => setSelectedStake(stake)}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        selectedStake === stake
                          ? 'bg-gradient-to-br from-[#f6a21a] to-[#ffd700] text-black'
                          : 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                      }`}
                    >
                      {stake}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Stake Info */}
              <div className="bg-[#0a0a0f] rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-sm">Votre mise</span>
                    <div className="text-2xl font-bold text-white">{selectedStake} <span className="text-[#f6a21a]">tokens</span></div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Gain potentiel</span>
                    <div className="text-2xl font-bold text-green-400">{selectedStake * 2 - Math.floor(selectedStake * 0.1)} tokens</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Commission</span>
                    <div className="text-lg font-semibold text-gray-400">5%</div>
                  </div>
                </div>
              </div>

              {/* Start Search Button */}
              <button
                onClick={handleStartSearch}
                disabled={isSearching}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isSearching
                    ? 'bg-[#1a1a2e] text-gray-400 cursor-not-allowed'
                    : 'btn-primary text-black'
                }`}
              >
                {isSearching ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Recherche d&apos;un adversaire...
                  </span>
                ) : (
                  'Trouver un Match'
                )}
              </button>
            </div>

            {/* Available Matches */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Matchs Disponibles</h2>

              <div className="space-y-4">
                {availableMatches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4 flex items-center justify-between hover:border-[#f6a21a]/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-full flex items-center justify-center">
                        <span className="text-[#f6a21a] font-bold">{match.creator[0]}</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{match.creator}</div>
                        <div className="text-gray-400 text-sm">ELO: {match.elo}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-[#f6a21a] font-bold text-xl">{match.stake}</div>
                        <div className="text-gray-400 text-xs">tokens</div>
                      </div>

                      <button
                        onClick={() => handleJoinMatch(match.id)}
                        className="bg-[#1a1a2e] hover:bg-[#f6a21a] hover:text-black text-white px-6 py-2 rounded-full font-semibold transition-all"
                      >
                        Rejoindre
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Live Matches */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <h2 className="text-xl font-bold text-white">Matchs en cours</h2>
              </div>

              <div className="space-y-4">
                {liveMatches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{match.player1}</span>
                      <span className="text-gray-500">vs</span>
                      <span className="text-white font-medium">{match.player2}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#f6a21a]">{match.stake} tokens</span>
                      <span className="text-gray-400">{match.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Vos Stats</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Parties jouees</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Victoires</span>
                  <span className="text-green-400 font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Defaites</span>
                  <span className="text-red-400 font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ratio</span>
                  <span className="text-white font-semibold">0%</span>
                </div>
                <div className="border-t border-[#2a2a3e] pt-4 flex justify-between">
                  <span className="text-gray-400">ELO</span>
                  <span className="text-[#f6a21a] font-bold text-xl">1500</span>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Regles</h2>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  Match en 1v1, 3 stocks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  8 minutes de temps limite
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  Maps competitives uniquement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  Resultat verifiable par replay
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

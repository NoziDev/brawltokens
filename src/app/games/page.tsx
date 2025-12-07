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

  const availableMatches: Match[] = [];

  const liveMatches: { id: number; player1: string; player2: string; stake: number; time: string }[] = [];

  const handleStartSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert('No match found. Try again later!');
    }, 3000);
  };

  const handleJoinMatch = (matchId: number) => {
    alert(`Joining match #${matchId}`);
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
              <p className="text-gray-400">Find an opponent and earn tokens</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#12121a] px-4 py-2 rounded-full border border-[#2a2a3e]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-medium">Online</span>
              </div>
              <Link href="/shop" className="btn-primary px-6 py-2 rounded-full text-black font-semibold">
                Buy Tokens
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
              <h2 className="text-xl font-bold text-white mb-6">Create a Match</h2>

              {/* Stake Selection */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-3 block">Choose stake (tokens)</label>
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
                    <span className="text-gray-400 text-sm">Your stake</span>
                    <div className="text-2xl font-bold text-white">{selectedStake} <span className="text-[#f6a21a]">tokens</span></div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Potential win</span>
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
                    Searching for opponent...
                  </span>
                ) : (
                  'Find a Match'
                )}
              </button>
            </div>

            {/* Available Matches */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Available Matches</h2>

              {availableMatches.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No matches available right now</p>
                  <p className="text-gray-500 text-sm mt-2">Create a match or check back later</p>
                </div>
              ) : (
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
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Live Matches */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <h2 className="text-xl font-bold text-white">Live Matches</h2>
              </div>

              {liveMatches.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No live matches</p>
              ) : (
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
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Your Stats</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Games played</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Wins</span>
                  <span className="text-green-400 font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Losses</span>
                  <span className="text-red-400 font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win rate</span>
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
              <h2 className="text-xl font-bold text-white mb-4">Rules</h2>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  1v1 match, 3 stocks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  8 minute time limit
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  Competitive maps only
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f6a21a]">-</span>
                  Result verifiable by replay
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

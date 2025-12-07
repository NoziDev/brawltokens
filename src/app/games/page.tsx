'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Match {
  id: string;
  player1_id: string;
  player2_id: string | null;
  stake: number;
  format: 'bo1' | 'bo3' | 'bo5';
  gadgets: boolean;
  map_type: 'ranked' | 'tournament';
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  player1?: {
    username: string;
    elo: number;
  };
  player2?: {
    username: string;
    elo: number;
  } | null;
}

export default function Games() {
  const [selectedStake, setSelectedStake] = useState<number>(50);
  const [format, setFormat] = useState<'bo1' | 'bo3' | 'bo5'>('bo3');
  const [gadgets, setGadgets] = useState(false);
  const [mapType, setMapType] = useState<'ranked' | 'tournament'>('ranked');
  const [isCreating, setIsCreating] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [myMatch, setMyMatch] = useState<Match | null>(null);
  const { showToast } = useToast();
  const { user, profile, refreshProfile } = useAuth();

  const stakes = [10, 25, 50, 100, 250, 500];

  // Fetch matches
  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        player1:player1_id(username, elo),
        player2:player2_id(username, elo)
      `)
      .eq('status', 'waiting')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMatches(data as Match[]);
      // Check if user has a waiting match
      if (user) {
        const userMatch = data.find((m: Match) => m.player1_id === user.id);
        setMyMatch(userMatch || null);
      }
    }
  };

  useEffect(() => {
    fetchMatches();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        fetchMatches();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleCreateMatch = async () => {
    if (!user) {
      showToast('Please login to create a match', 'warning');
      return;
    }

    if (!profile || profile.tokens < selectedStake) {
      showToast('Not enough tokens! Buy more in the shop.', 'error');
      return;
    }

    if (myMatch) {
      showToast('You already have an active match. Cancel it first.', 'warning');
      return;
    }

    setIsCreating(true);

    // Deduct tokens
    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: profile.tokens - selectedStake })
      .eq('id', user.id);

    if (updateError) {
      showToast('Error: ' + updateError.message, 'error');
      setIsCreating(false);
      return;
    }

    // Create match
    const { error: matchError } = await supabase.from('matches').insert({
      player1_id: user.id,
      stake: selectedStake,
      format: format,
      gadgets: gadgets,
      map_type: mapType,
      status: 'waiting'
    });

    if (matchError) {
      // Refund tokens
      await supabase
        .from('users')
        .update({ tokens: profile.tokens })
        .eq('id', user.id);
      showToast('Error creating match: ' + matchError.message, 'error');
      setIsCreating(false);
      return;
    }

    showToast('Match created! Waiting for opponent...', 'success');
    if (refreshProfile) refreshProfile();
    fetchMatches();
    setIsCreating(false);
  };

  const handleCancelMatch = async () => {
    if (!myMatch || !user || !profile) return;

    // Refund tokens
    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: profile.tokens + myMatch.stake })
      .eq('id', user.id);

    if (updateError) {
      showToast('Error refunding tokens', 'error');
      return;
    }

    // Delete match
    const { error: deleteError } = await supabase
      .from('matches')
      .delete()
      .eq('id', myMatch.id);

    if (deleteError) {
      showToast('Error cancelling match', 'error');
      return;
    }

    showToast('Match cancelled. Tokens refunded!', 'success');
    setMyMatch(null);
    if (refreshProfile) refreshProfile();
    fetchMatches();
  };

  const handleJoinMatch = async (match: Match) => {
    if (!user) {
      showToast('Please login to join a match', 'warning');
      return;
    }

    if (!profile || profile.tokens < match.stake) {
      showToast('Not enough tokens! Buy more in the shop.', 'error');
      return;
    }

    if (match.player1_id === user.id) {
      showToast('You cannot join your own match', 'warning');
      return;
    }

    // Deduct tokens
    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: profile.tokens - match.stake })
      .eq('id', user.id);

    if (updateError) {
      showToast('Error: ' + updateError.message, 'error');
      return;
    }

    // Join match
    const { error: matchError } = await supabase
      .from('matches')
      .update({ player2_id: user.id, status: 'in_progress' })
      .eq('id', match.id);

    if (matchError) {
      // Refund tokens
      await supabase
        .from('users')
        .update({ tokens: profile.tokens })
        .eq('id', user.id);
      showToast('Error joining match: ' + matchError.message, 'error');
      return;
    }

    showToast('Match joined! Good luck!', 'success');
    if (refreshProfile) refreshProfile();
    fetchMatches();
  };

  const formatLabel = (f: string) => {
    switch (f) {
      case 'bo1': return 'Best of 1';
      case 'bo3': return 'Best of 3';
      case 'bo5': return 'Best of 5';
      default: return f;
    }
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8b5cf6] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Brawlhalla Arena</h1>
              <p className="text-gray-400">Create or join a match and earn tokens</p>
            </div>
            <div className="flex items-center gap-4">
              {profile && (
                <div className="flex items-center gap-2 bg-[#12121a] px-4 py-2 rounded-full border border-[#2a2a3e]">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#f6a21a] to-[#ffd700]"></div>
                  <span className="text-[#fbbf24] font-semibold">{profile.tokens}</span>
                </div>
              )}
              <Link href="/shop" className="btn-primary px-6 py-2 rounded-full font-semibold">
                Buy Tokens
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Match Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Active Match */}
            {myMatch && (
              <div className="bg-[#f6a21a]/10 border border-[#f6a21a] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#f6a21a]">Your Active Match</h2>
                  <span className="px-3 py-1 bg-[#f6a21a]/20 text-[#f6a21a] rounded-full text-sm animate-pulse">
                    Waiting for opponent...
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <div className="text-gray-400 text-xs mb-1">Stake</div>
                    <div className="text-[#f6a21a] font-bold">{myMatch.stake} tokens</div>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <div className="text-gray-400 text-xs mb-1">Format</div>
                    <div className="text-white font-bold">{formatLabel(myMatch.format)}</div>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <div className="text-gray-400 text-xs mb-1">Gadgets</div>
                    <div className={`font-bold ${myMatch.gadgets ? 'text-green-400' : 'text-red-400'}`}>
                      {myMatch.gadgets ? 'ON' : 'OFF'}
                    </div>
                  </div>
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <div className="text-gray-400 text-xs mb-1">Maps</div>
                    <div className="text-white font-bold capitalize">{myMatch.map_type}</div>
                  </div>
                </div>
                <button
                  onClick={handleCancelMatch}
                  className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold transition-all"
                >
                  Cancel Match (Refund Tokens)
                </button>
              </div>
            )}

            {/* Create Match */}
            {!myMatch && (
              <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Create a Match</h2>

                {/* Stake Selection */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-3 block">Stake (tokens)</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {stakes.map((stake) => (
                      <button
                        key={stake}
                        onClick={() => setSelectedStake(stake)}
                        className={`py-3 rounded-xl font-semibold transition-all ${
                          selectedStake === stake
                            ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white'
                            : 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                        }`}
                      >
                        {stake}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Selection */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-3 block">Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['bo1', 'bo3', 'bo5'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`py-3 rounded-xl font-semibold transition-all ${
                          format === f
                            ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white'
                            : 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                        }`}
                      >
                        {formatLabel(f)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Gadgets */}
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Gadgets</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setGadgets(false)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                          !gadgets
                            ? 'bg-red-500 text-white'
                            : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                        }`}
                      >
                        OFF
                      </button>
                      <button
                        onClick={() => setGadgets(true)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                          gadgets
                            ? 'bg-green-500 text-white'
                            : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                        }`}
                      >
                        ON
                      </button>
                    </div>
                  </div>

                  {/* Map Type */}
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Maps</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setMapType('ranked')}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                          mapType === 'ranked'
                            ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white'
                            : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                        }`}
                      >
                        Ranked
                      </button>
                      <button
                        onClick={() => setMapType('tournament')}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                          mapType === 'tournament'
                            ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white'
                            : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                        }`}
                      >
                        Tournament
                      </button>
                    </div>
                  </div>
                </div>

                {/* Match Summary */}
                <div className="bg-[#0a0a0f] rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <span className="text-gray-400 text-sm">Your stake</span>
                      <div className="text-xl font-bold text-[#f6a21a]">{selectedStake} tokens</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Potential win</span>
                      <div className="text-xl font-bold text-green-400">{selectedStake * 2 - Math.floor(selectedStake * 0.05)} tokens</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Commission</span>
                      <div className="text-lg font-semibold text-gray-400">5%</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Your balance</span>
                      <div className={`text-xl font-bold ${profile && profile.tokens >= selectedStake ? 'text-white' : 'text-red-400'}`}>
                        {profile?.tokens || 0} tokens
                      </div>
                    </div>
                  </div>
                </div>

                {/* Create Button */}
                <button
                  onClick={handleCreateMatch}
                  disabled={isCreating || !user || !profile || profile.tokens < selectedStake}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    user && profile && profile.tokens >= selectedStake && !isCreating
                      ? 'btn-primary'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isCreating ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating match...
                    </span>
                  ) : !user ? (
                    'Login to Create Match'
                  ) : !profile || profile.tokens < selectedStake ? (
                    'Not Enough Tokens'
                  ) : (
                    'Create Match'
                  )}
                </button>
              </div>
            )}

            {/* Available Matches */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Available Matches</h2>
                <span className="text-gray-400 text-sm">{matches.filter(m => m.player1_id !== user?.id).length} matches</span>
              </div>

              {matches.filter(m => m.player1_id !== user?.id).length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#1a1a2e] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-400">No matches available</p>
                  <p className="text-gray-500 text-sm mt-2">Create one or wait for other players</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.filter(m => m.player1_id !== user?.id).map((match) => (
                    <div
                      key={match.id}
                      className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4 hover:border-[#8b5cf6]/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{match.player1?.username?.[0] || '?'}</span>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{match.player1?.username || 'Unknown'}</div>
                            <div className="text-gray-400 text-sm">ELO: {match.player1?.elo || 1500}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#f6a21a] font-bold text-xl">{match.stake}</div>
                          <div className="text-gray-400 text-xs">tokens</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-3 flex-wrap">
                        <span className="px-2 py-1 bg-[#8b5cf6]/20 text-[#a78bfa] rounded text-xs font-medium">
                          {formatLabel(match.format)}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          match.gadgets ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          Gadgets {match.gadgets ? 'ON' : 'OFF'}
                        </span>
                        <span className="px-2 py-1 bg-[#06b6d4]/20 text-[#22d3ee] rounded text-xs font-medium capitalize">
                          {match.map_type} maps
                        </span>
                      </div>

                      <button
                        onClick={() => handleJoinMatch(match)}
                        disabled={!user || !profile || profile.tokens < match.stake}
                        className={`w-full py-2 rounded-lg font-semibold transition-all ${
                          user && profile && profile.tokens >= match.stake
                            ? 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {!user ? 'Login to Join' : !profile || profile.tokens < match.stake ? 'Not Enough Tokens' : 'Join Match'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Your Stats */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Your Stats</h2>

              {profile ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Games played</span>
                    <span className="text-white font-semibold">{profile.wins + profile.losses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wins</span>
                    <span className="text-green-400 font-semibold">{profile.wins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Losses</span>
                    <span className="text-red-400 font-semibold">{profile.losses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win rate</span>
                    <span className="text-white font-semibold">
                      {profile.wins + profile.losses > 0
                        ? Math.round((profile.wins / (profile.wins + profile.losses)) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="border-t border-[#2a2a3e] pt-4 flex justify-between">
                    <span className="text-gray-400">ELO</span>
                    <span className="text-[#8b5cf6] font-bold text-xl">{profile.elo}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">Login to see your stats</p>
              )}
            </div>

            {/* Rules */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Rules</h2>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  1v1 match, 3 stocks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  8 minute time limit per game
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  Winner takes 95% of total pot
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  Report results with screenshots
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8b5cf6]">•</span>
                  Disputes resolved by admin
                </li>
              </ul>
            </div>

            {/* Map Pools */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Map Pools</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#8b5cf6] font-semibold mb-2">Ranked Maps</h3>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Small Brawlhaven</li>
                    <li>• Twilight Grove</li>
                    <li>• Thunder Guard Stadium</li>
                    <li>• Enigma</li>
                    <li>• Miami Dome</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#06b6d4] font-semibold mb-2">Tournament Maps</h3>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Small Brawlhaven</li>
                    <li>• Twilight Grove</li>
                    <li>• Kings Pass</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

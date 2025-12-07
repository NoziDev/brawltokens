'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { brawlhallaLegends } from '@/components/ui/BrawlhallaCharacter';

interface Match {
  id: string;
  player1_id: string;
  player2_id: string | null;
  stake: number;
  format: 'bo1' | 'bo3' | 'bo5';
  gadgets: boolean;
  map_type: 'ranked' | 'tournament';
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  player1_legend: string | null;
  player2_legend: string | null;
  created_at: string;
  player1?: { username: string; elo: number };
  player2?: { username: string; elo: number } | null;
}

interface ChatMessage {
  id: string;
  match_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
}

export default function Games() {
  const [customStake, setCustomStake] = useState<string>('50');
  const [format, setFormat] = useState<'bo1' | 'bo3' | 'bo5'>('bo3');
  const [gadgets, setGadgets] = useState(false);
  const [mapType, setMapType] = useState<'ranked' | 'tournament'>('ranked');
  const [selectedLegend, setSelectedLegend] = useState<string>('');
  const [showLegendPicker, setShowLegendPicker] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [myMatch, setMyMatch] = useState<Match | null>(null);
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const { user, profile, refreshProfile } = useAuth();

  const quickStakes = [10, 25, 50, 100, 250, 500];

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Fetch matches
  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        player1:player1_id(username, elo),
        player2:player2_id(username, elo)
      `)
      .in('status', ['waiting', 'in_progress'])
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMatches(data as Match[]);
      if (user) {
        const userWaitingMatch = data.find((m: Match) => m.player1_id === user.id && m.status === 'waiting');
        setMyMatch(userWaitingMatch || null);

        const userActiveMatch = data.find((m: Match) =>
          (m.player1_id === user.id || m.player2_id === user.id) && m.status === 'in_progress'
        );
        setActiveMatch(userActiveMatch || null);
      }
    }
  };

  // Fetch chat messages for active match
  const fetchMessages = async (matchId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setChatMessages(data);
    }
  };

  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel('matches-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        fetchMatches();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Subscribe to chat messages
  useEffect(() => {
    if (activeMatch) {
      fetchMessages(activeMatch.id);

      const channel = supabase
        .channel(`chat-${activeMatch.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${activeMatch.id}`
        }, (payload) => {
          setChatMessages(prev => [...prev, payload.new as ChatMessage]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [activeMatch]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeMatch || !user || !profile) return;

    const { error } = await supabase.from('messages').insert({
      match_id: activeMatch.id,
      user_id: user.id,
      username: profile.username,
      content: newMessage.trim()
    });

    if (!error) {
      setNewMessage('');
    }
  };

  const handleCreateMatch = async () => {
    if (!user) {
      showToast('Please login to create a match', 'warning');
      return;
    }

    const stake = parseInt(customStake);
    if (isNaN(stake) || stake < 1) {
      showToast('Please enter a valid stake amount', 'error');
      return;
    }

    if (!profile || profile.tokens < stake) {
      showToast('Not enough tokens! Buy more in the shop.', 'error');
      return;
    }

    if (!selectedLegend) {
      showToast('Please select your legend', 'warning');
      return;
    }

    if (myMatch) {
      showToast('You already have an active match. Cancel it first.', 'warning');
      return;
    }

    setIsCreating(true);

    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: profile.tokens - stake })
      .eq('id', user.id);

    if (updateError) {
      showToast('Error: ' + updateError.message, 'error');
      setIsCreating(false);
      return;
    }

    const { error: matchError } = await supabase.from('matches').insert({
      player1_id: user.id,
      stake: stake,
      format: format,
      gadgets: gadgets,
      map_type: mapType,
      player1_legend: selectedLegend,
      status: 'waiting'
    });

    if (matchError) {
      await supabase.from('users').update({ tokens: profile.tokens }).eq('id', user.id);
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

    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: profile.tokens + myMatch.stake })
      .eq('id', user.id);

    if (updateError) {
      showToast('Error refunding tokens', 'error');
      return;
    }

    await supabase.from('matches').delete().eq('id', myMatch.id);

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
      showToast('Not enough tokens!', 'error');
      return;
    }

    if (!selectedLegend) {
      showToast('Please select your legend first', 'warning');
      return;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: profile.tokens - match.stake })
      .eq('id', user.id);

    if (updateError) {
      showToast('Error: ' + updateError.message, 'error');
      return;
    }

    const { error: matchError } = await supabase
      .from('matches')
      .update({
        player2_id: user.id,
        player2_legend: selectedLegend,
        status: 'in_progress'
      })
      .eq('id', match.id);

    if (matchError) {
      await supabase.from('users').update({ tokens: profile.tokens }).eq('id', user.id);
      showToast('Error joining match', 'error');
      return;
    }

    showToast('Match joined! Good luck!', 'success');
    if (refreshProfile) refreshProfile();
    fetchMatches();
  };

  const formatLabel = (f: string) => {
    switch (f) {
      case 'bo1': return 'BO1';
      case 'bo3': return 'BO3';
      case 'bo5': return 'BO5';
      default: return f;
    }
  };

  // Active Match View with Chat
  if (activeMatch) {
    const isPlayer1 = activeMatch.player1_id === user?.id;
    const opponent = isPlayer1 ? activeMatch.player2 : activeMatch.player1;
    const myLegend = isPlayer1 ? activeMatch.player1_legend : activeMatch.player2_legend;
    const opponentLegend = isPlayer1 ? activeMatch.player2_legend : activeMatch.player1_legend;

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Match Header */}
          <div className="bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 border border-[#8b5cf6]/50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-8">
              {/* Player 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl font-bold text-white">{myLegend?.charAt(0) || '?'}</span>
                </div>
                <div className="text-white font-bold">{profile?.username}</div>
                <div className="text-[#8b5cf6] text-sm">{myLegend}</div>
              </div>

              {/* VS */}
              <div className="text-center">
                <div className="text-3xl font-black text-gradient">VS</div>
                <div className="text-[#f6a21a] font-bold mt-2">{activeMatch.stake * 2} tokens</div>
                <div className="text-gray-400 text-sm">{formatLabel(activeMatch.format)}</div>
              </div>

              {/* Player 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl font-bold text-white">{opponentLegend?.charAt(0) || '?'}</span>
                </div>
                <div className="text-white font-bold">{opponent?.username}</div>
                <div className="text-[#06b6d4] text-sm">{opponentLegend}</div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${activeMatch.gadgets ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                Gadgets {activeMatch.gadgets ? 'ON' : 'OFF'}
              </span>
              <span className="px-3 py-1 bg-[#8b5cf6]/20 text-[#a78bfa] rounded-full text-xs font-medium capitalize">
                {activeMatch.map_type} maps
              </span>
            </div>
          </div>

          {/* Chat */}
          <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#2a2a3e] flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <h2 className="text-white font-bold">Match Chat</h2>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages yet. Say hi!</p>
              ) : (
                chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.user_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      msg.user_id === user?.id
                        ? 'bg-[#8b5cf6] text-white rounded-br-sm'
                        : 'bg-[#1a1a2e] text-white rounded-bl-sm'
                    }`}>
                      <div className="text-xs opacity-70 mb-1">{msg.username}</div>
                      <div className="text-sm">{msg.content}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#2a2a3e] flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8b5cf6]"
              />
              <button
                onClick={handleSendMessage}
                className="btn-primary px-6 py-3 rounded-xl font-semibold"
              >
                Send
              </button>
            </div>
          </div>

          {/* Match Rules Reminder */}
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400 text-sm text-center">
              Play your match in Brawlhalla! When finished, contact admin with screenshot of results.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      {/* Legend Picker Modal */}
      {showLegendPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLegendPicker(false)}></div>
          <div className="relative bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Select Your Legend</h3>
              <button onClick={() => setShowLegendPicker(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {brawlhallaLegends.map((legend) => (
                <button
                  key={legend.name}
                  onClick={() => {
                    setSelectedLegend(legend.name);
                    setShowLegendPicker(false);
                  }}
                  className={`p-2 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedLegend === legend.name
                      ? 'border-[#8b5cf6] bg-[#8b5cf6]/20'
                      : 'border-[#2a2a3e] hover:border-[#8b5cf6]/50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2a2a3e] to-[#1a1a2e] rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-white/80">{legend.name.charAt(0)}</span>
                  </div>
                  <div className="text-white text-xs text-center mt-1 truncate">{legend.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <div className="text-gray-400 text-xs mb-1">Stake</div>
                    <div className="text-[#f6a21a] font-bold">{myMatch.stake}</div>
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
                  <div className="bg-[#0a0a0f] rounded-xl p-3 text-center">
                    <div className="text-gray-400 text-xs mb-1">Legend</div>
                    <div className="text-[#8b5cf6] font-bold">{myMatch.player1_legend}</div>
                  </div>
                </div>
                <button onClick={handleCancelMatch} className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-semibold transition-all">
                  Cancel Match (Refund Tokens)
                </button>
              </div>
            )}

            {/* Create Match */}
            {!myMatch && (
              <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Create a Match</h2>

                {/* Legend Selection */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-3 block">Your Legend</label>
                  <button
                    onClick={() => setShowLegendPicker(true)}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4 flex items-center gap-4 hover:border-[#8b5cf6] transition-all"
                  >
                    {selectedLegend ? (
                      <>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{selectedLegend.charAt(0)}</span>
                        </div>
                        <span className="text-white font-semibold">{selectedLegend}</span>
                        <span className="text-gray-400 text-sm ml-auto">Click to change</span>
                      </>
                    ) : (
                      <span className="text-gray-400">Click to select your legend...</span>
                    )}
                  </button>
                </div>

                {/* Stake Input */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-3 block">Stake (tokens)</label>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="number"
                      value={customStake}
                      onChange={(e) => setCustomStake(e.target.value)}
                      min="1"
                      className="flex-1 bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#8b5cf6]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickStakes.map((stake) => (
                      <button
                        key={stake}
                        onClick={() => setCustomStake(stake.toString())}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          customStake === stake.toString()
                            ? 'bg-[#8b5cf6] text-white'
                            : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a3e]'
                        }`}
                      >
                        {stake}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format */}
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
                        Best of {f.slice(2)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Gadgets</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setGadgets(false)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${!gadgets ? 'bg-red-500 text-white' : 'bg-[#1a1a2e] text-gray-400 border border-[#2a2a3e]'}`}
                      >
                        OFF
                      </button>
                      <button
                        onClick={() => setGadgets(true)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${gadgets ? 'bg-green-500 text-white' : 'bg-[#1a1a2e] text-gray-400 border border-[#2a2a3e]'}`}
                      >
                        ON
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Maps</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setMapType('ranked')}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mapType === 'ranked' ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white' : 'bg-[#1a1a2e] text-gray-400 border border-[#2a2a3e]'}`}
                      >
                        Ranked
                      </button>
                      <button
                        onClick={() => setMapType('tournament')}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mapType === 'tournament' ? 'bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] text-white' : 'bg-[#1a1a2e] text-gray-400 border border-[#2a2a3e]'}`}
                      >
                        Tournament
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#0a0a0f] rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-gray-400 text-sm">Your stake</span>
                      <div className="text-xl font-bold text-[#f6a21a]">{customStake || 0}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Win amount</span>
                      <div className="text-xl font-bold text-green-400">{Math.floor((parseInt(customStake) || 0) * 1.9)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Your balance</span>
                      <div className={`text-xl font-bold ${profile && profile.tokens >= (parseInt(customStake) || 0) ? 'text-white' : 'text-red-400'}`}>
                        {profile?.tokens || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreateMatch}
                  disabled={isCreating || !user || !profile || !selectedLegend || profile.tokens < (parseInt(customStake) || 0)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    user && profile && selectedLegend && profile.tokens >= (parseInt(customStake) || 0) && !isCreating
                      ? 'btn-primary'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isCreating ? 'Creating...' : !user ? 'Login First' : !selectedLegend ? 'Select Legend' : 'Create Match'}
                </button>
              </div>
            )}

            {/* Available Matches */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Available Matches</h2>
              {matches.filter(m => m.player1_id !== user?.id && m.status === 'waiting').length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No matches available</p>
                  <p className="text-gray-500 text-sm mt-2">Create one or wait for other players</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.filter(m => m.player1_id !== user?.id && m.status === 'waiting').map((match) => (
                    <div key={match.id} className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4 hover:border-[#8b5cf6]/50 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{match.player1_legend?.charAt(0) || '?'}</span>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{match.player1?.username}</div>
                            <div className="text-gray-400 text-sm">ELO: {match.player1?.elo} • {match.player1_legend}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#f6a21a] font-bold text-xl">{match.stake}</div>
                          <div className="text-gray-400 text-xs">tokens</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <span className="px-2 py-1 bg-[#8b5cf6]/20 text-[#a78bfa] rounded text-xs">{formatLabel(match.format)}</span>
                        <span className={`px-2 py-1 rounded text-xs ${match.gadgets ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          Gadgets {match.gadgets ? 'ON' : 'OFF'}
                        </span>
                        <span className="px-2 py-1 bg-[#06b6d4]/20 text-[#22d3ee] rounded text-xs capitalize">{match.map_type}</span>
                      </div>
                      <button
                        onClick={() => handleJoinMatch(match)}
                        disabled={!user || !profile || !selectedLegend || profile.tokens < match.stake}
                        className={`w-full py-2 rounded-lg font-semibold transition-all ${
                          user && profile && selectedLegend && profile.tokens >= match.stake
                            ? 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {!selectedLegend ? 'Select Legend First' : 'Join Match'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Your Stats</h2>
              {profile ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wins</span>
                    <span className="text-green-400 font-semibold">{profile.wins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Losses</span>
                    <span className="text-red-400 font-semibold">{profile.losses}</span>
                  </div>
                  <div className="border-t border-[#2a2a3e] pt-4 flex justify-between">
                    <span className="text-gray-400">ELO</span>
                    <span className="text-[#8b5cf6] font-bold text-xl">{profile.elo}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">Login to see stats</p>
              )}
            </div>

            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Rules</h2>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• 1v1 match, 3 stocks, 8 min</li>
                <li>• Winner takes 95% of pot</li>
                <li>• Report with screenshots</li>
                <li>• Disputes resolved by admin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

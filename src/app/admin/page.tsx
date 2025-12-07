'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  username: string;
  tokens: number;
  elo: number;
  wins: number;
  losses: number;
  is_admin: boolean;
}

export default function AdminPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && (!profile || !profile.is_admin)) {
      router.push('/');
    }
  }, [profile, loading, router]);

  useEffect(() => {
    if (profile?.is_admin) {
      fetchUsers();
    }
  }, [profile]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('tokens', { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
  };

  const addTokens = async () => {
    if (!selectedUser || !tokenAmount) {
      setMessage('Please select a user and enter an amount');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    const amount = parseInt(tokenAmount);
    const user = users.find(u => u.id === selectedUser);

    if (!user) {
      setMessage('User not found');
      setIsProcessing(false);
      return;
    }

    // Update user tokens
    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: user.tokens + amount })
      .eq('id', selectedUser);

    if (updateError) {
      setMessage('Error: ' + updateError.message);
      setIsProcessing(false);
      return;
    }

    // Create transaction record
    await supabase.from('transactions').insert({
      user_id: selectedUser,
      type: 'admin_credit',
      amount: amount,
      status: 'completed'
    });

    setMessage(`Successfully added ${amount} tokens to ${user.username}`);
    setTokenAmount('');
    setSelectedUser('');
    fetchUsers();
    setIsProcessing(false);
  };

  const removeTokens = async () => {
    if (!selectedUser || !tokenAmount) {
      setMessage('Please select a user and enter an amount');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    const amount = parseInt(tokenAmount);
    const user = users.find(u => u.id === selectedUser);

    if (!user) {
      setMessage('User not found');
      setIsProcessing(false);
      return;
    }

    const newBalance = Math.max(0, user.tokens - amount);

    const { error: updateError } = await supabase
      .from('users')
      .update({ tokens: newBalance })
      .eq('id', selectedUser);

    if (updateError) {
      setMessage('Error: ' + updateError.message);
      setIsProcessing(false);
      return;
    }

    setMessage(`Removed ${amount} tokens from ${user.username}. New balance: ${newBalance}`);
    setTokenAmount('');
    setSelectedUser('');
    fetchUsers();
    setIsProcessing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#f6a21a] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!profile?.is_admin) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#f6a21a] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-xl text-gray-400">Manage users and tokens</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Token Management */}
          <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Add/Remove Tokens</h2>

            {message && (
              <div className={`px-4 py-3 rounded-xl mb-6 text-sm ${
                message.includes('Error')
                  ? 'bg-red-500/10 border border-red-500/50 text-red-400'
                  : 'bg-green-500/10 border border-green-500/50 text-green-400'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Select User</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f6a21a]"
                >
                  <option value="">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.tokens} tokens)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Amount</label>
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="100"
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f6a21a]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addTokens}
                  disabled={isProcessing}
                  className="flex-1 btn-primary py-3 rounded-xl text-black font-semibold disabled:opacity-50"
                >
                  Add Tokens
                </button>
                <button
                  onClick={removeTokens}
                  disabled={isProcessing}
                  className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="lg:col-span-2 bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">All Users ({users.length})</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-[#2a2a3e]">
                    <th className="text-left py-3">Username</th>
                    <th className="text-left py-3">Email</th>
                    <th className="text-right py-3">Tokens</th>
                    <th className="text-right py-3">ELO</th>
                    <th className="text-right py-3">W/L</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-[#2a2a3e]/50 hover:bg-[#1a1a2e]/50">
                      <td className="py-3">
                        <span className="text-white font-medium">{user.username}</span>
                        {user.is_admin && (
                          <span className="ml-2 text-xs bg-[#f6a21a]/20 text-[#f6a21a] px-2 py-0.5 rounded">ADMIN</span>
                        )}
                      </td>
                      <td className="py-3 text-gray-400">{user.email}</td>
                      <td className="py-3 text-right text-[#f6a21a] font-semibold">{user.tokens}</td>
                      <td className="py-3 text-right text-white">{user.elo}</td>
                      <td className="py-3 text-right">
                        <span className="text-green-400">{user.wins}</span>
                        <span className="text-gray-500">/</span>
                        <span className="text-red-400">{user.losses}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

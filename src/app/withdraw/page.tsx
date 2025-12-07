'use client';

import { useState } from 'react';

export default function Withdraw() {
  const [amount, setAmount] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const userBalance = 0;
  const minWithdraw = 500;
  const conversionRate = 1; // 1 token = 1 USD

  const handleWithdraw = () => {
    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < minWithdraw) {
      alert(`Minimum withdrawal: ${minWithdraw} tokens`);
      return;
    }
    if (numAmount > userBalance) {
      alert('Insufficient balance');
      return;
    }
    if (!address) {
      alert('Please enter your wallet address');
      return;
    }
    alert('Withdrawal request sent!');
  };

  const calculateUsd = (tokens: number) => {
    const fee = 0.01; // 1% fee
    return ((tokens * conversionRate) * (1 - fee)).toFixed(2);
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-green-500 rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Withdraw your earnings</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Convert your tokens to real money
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdraw Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-[#f6a21a] to-[#ffd700] rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black/70 font-medium">Available balance</p>
                  <p className="text-4xl font-bold text-black">{userBalance.toLocaleString()} <span className="text-2xl">tokens</span></p>
                  <p className="text-black/70 mt-1">= ${(userBalance * conversionRate).toFixed(2)} USD</p>
                </div>
                <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Withdraw Method - Crypto Only */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Withdrawal Method</h2>

              <div className="mb-8">
                <div className="p-4 rounded-xl border-2 border-[#f6a21a] bg-[#f6a21a]/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f7931a] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">ETH</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Ethereum (ETH)</div>
                      <div className="text-gray-400 text-sm">Fee: 1% | Min: 500 tokens</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">Amount to withdraw (tokens)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="500"
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-4 text-white text-xl focus:outline-none focus:border-[#f6a21a]"
                  />
                  <button
                    onClick={() => setAmount(userBalance.toString())}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f6a21a] text-sm font-semibold hover:underline"
                  >
                    MAX
                  </button>
                </div>
                {amount && (
                  <div className="mt-2 text-gray-400">
                    = <span className="text-green-400 font-semibold">${calculateUsd(parseInt(amount) || 0)} USD</span> after fees
                  </div>
                )}
              </div>

              {/* Address Input */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">
                  Ethereum wallet address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#f6a21a]"
                />
              </div>

              {/* Withdraw Button */}
              <button
                onClick={handleWithdraw}
                disabled={userBalance < minWithdraw}
                className={`w-full py-4 rounded-xl font-bold text-lg ${
                  userBalance >= minWithdraw
                    ? 'btn-primary text-black'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {userBalance >= minWithdraw ? 'Request Withdrawal' : 'Insufficient Balance'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Info Card */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Information</h2>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Minimum withdrawal: 500 tokens
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Rate: 1 token = $1 USD
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Processing time: 1-24h
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ETH withdrawal only
                </li>
              </ul>
            </div>

            {/* Transaction History */}
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">History</h2>
              <p className="text-gray-400 text-center py-8">No withdrawals yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

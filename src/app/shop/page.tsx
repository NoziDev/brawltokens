'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_WALLET } from '@/lib/supabase';

export default function Shop() {
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPack, setCurrentPack] = useState<typeof tokenPacks[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();

  const tokenPacks = [
    { id: 1, tokens: 10, price: 10, priceETH: 0.003, bonus: 0, popular: false },
    { id: 2, tokens: 25, price: 25, priceETH: 0.007, bonus: 2, popular: false },
    { id: 3, tokens: 50, price: 50, priceETH: 0.014, bonus: 5, popular: true },
    { id: 4, tokens: 100, price: 100, priceETH: 0.028, bonus: 15, popular: false },
    { id: 5, tokens: 250, price: 250, priceETH: 0.07, bonus: 50, popular: false },
    { id: 6, tokens: 500, price: 500, priceETH: 0.14, bonus: 125, popular: false }
  ];

  const handlePurchase = (pack: typeof tokenPacks[0]) => {
    if (!user) {
      showToast('Please login to buy tokens', 'warning');
      return;
    }
    setCurrentPack(pack);
    setShowPaymentModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Wallet address copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setCurrentPack(null);
  };

  return (
    <div className="min-h-screen py-12">
      {/* Payment Modal */}
      {showPaymentModal && currentPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="relative bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-8 max-w-md w-full animate-slide-in">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#627eea] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">ETH</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Pay with Ethereum</h3>
              <p className="text-gray-400 mt-2">Send exactly the amount below</p>
            </div>

            {/* Amount */}
            <div className="bg-[#0a0a0f] rounded-xl p-4 mb-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Amount to send</div>
                <div className="text-3xl font-bold text-[#627eea]">{currentPack.priceETH} ETH</div>
                <div className="text-gray-400 text-sm mt-1">≈ ${currentPack.price} USD</div>
              </div>
            </div>

            {/* Tokens you'll receive */}
            <div className="bg-[#0a0a0f] rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">You'll receive</span>
                <span className="text-[#f6a21a] font-bold text-xl">
                  {currentPack.tokens + currentPack.bonus} tokens
                </span>
              </div>
              {currentPack.bonus > 0 && (
                <div className="text-green-400 text-sm text-right">
                  (includes +{currentPack.bonus} bonus)
                </div>
              )}
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Send to this wallet:</div>
              <div
                className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4 cursor-pointer hover:border-[#627eea] transition-colors group"
                onClick={() => copyToClipboard(ADMIN_WALLET)}
              >
                <div className="flex items-center justify-between">
                  <code className="text-white text-xs break-all">{ADMIN_WALLET}</code>
                  <button className="ml-3 text-gray-400 group-hover:text-[#627eea] transition-colors flex-shrink-0">
                    {copied ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-yellow-400">
                  <p className="font-semibold mb-1">Important:</p>
                  <ul className="space-y-1 text-yellow-400/80">
                    <li>• Send exactly <span className="font-bold">{currentPack.priceETH} ETH</span></li>
                    <li>• On Ethereum Mainnet only</li>
                    <li>• Tokens credited within 10 mins</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center text-sm text-gray-400">
              <p>After payment, contact admin with your transaction hash</p>
              <p className="text-[#8b5cf6] mt-1">Tokens will be credited manually</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#f6a21a] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f6a21a] to-[#ffd700] rounded-full pulse-gold"></div>
            <span className="text-2xl font-bold gradient-text">Token Shop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Buy Tokens
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your token pack and start playing. The more you buy, the more bonus you get!
          </p>
        </div>
      </section>

      {/* Token Packs */}
      <section className="py-16 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tokenPacks.map((pack) => (
              <div
                key={pack.id}
                className={`relative bg-[#12121a] border rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                  pack.popular ? 'border-[#f6a21a] shadow-[0_0_30px_rgba(246,162,26,0.3)]' : 'border-[#2a2a3e]'
                }`}
              >
                {pack.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#f6a21a] to-[#ffd700] text-black text-center py-2 font-semibold text-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className={`p-8 ${pack.popular ? 'pt-14' : ''}`}>
                  {/* Token Amount */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f6a21a] to-[#ffd700] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{pack.tokens.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">tokens</div>
                    </div>
                  </div>

                  {/* Bonus */}
                  {pack.bonus > 0 && (
                    <div className="text-center mb-6">
                      <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                        +{pack.bonus} bonus tokens
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-center mb-2">
                    <span className="text-4xl font-bold text-gradient">${pack.price}</span>
                  </div>
                  <div className="text-center text-[#627eea] text-sm mb-6">
                    ≈ {pack.priceETH} ETH
                  </div>

                  {/* Value indicator */}
                  <div className="text-center text-gray-400 text-sm mb-6">
                    {((pack.tokens + pack.bonus) / pack.price).toFixed(1)} tokens/$
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={() => handlePurchase(pack)}
                    className={`w-full py-4 rounded-full font-bold transition-all ${
                      pack.popular
                        ? 'btn-primary text-black'
                        : 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                    }`}
                  >
                    Buy now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods - Crypto Only */}
      <section className="py-16 bg-[#12121a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Accepted payment method</h2>
            <p className="text-gray-400">Secure and instant payment</p>
          </div>

          <div className="flex justify-center">
            {/* Crypto */}
            <div className="bg-[#0a0a0f] border border-[#627eea] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#627eea] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ETH</span>
              </div>
              <div>
                <span className="text-white font-medium block">Ethereum (ETH)</span>
                <span className="text-gray-400 text-sm">Mainnet only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">How much are tokens worth?</h3>
              <p className="text-gray-400">1 token = $1 USD. The rate is fixed.</p>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">How do I receive my tokens?</h3>
              <p className="text-gray-400">After sending ETH, contact admin with your transaction hash. Tokens are credited manually within 10 minutes.</p>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-gray-400">Purchased tokens are non-refundable but can be withdrawn as real money.</p>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Which network should I use?</h3>
              <p className="text-gray-400">Only send ETH on Ethereum Mainnet. Do not use other networks.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

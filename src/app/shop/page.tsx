'use client';

import { useState } from 'react';

export default function Shop() {
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  const tokenPacks = [
    {
      id: 1,
      tokens: 10,
      price: 10,
      bonus: 0,
      popular: false
    },
    {
      id: 2,
      tokens: 25,
      price: 25,
      bonus: 2,
      popular: false
    },
    {
      id: 3,
      tokens: 50,
      price: 50,
      bonus: 5,
      popular: true
    },
    {
      id: 4,
      tokens: 100,
      price: 100,
      bonus: 15,
      popular: false
    },
    {
      id: 5,
      tokens: 250,
      price: 250,
      bonus: 50,
      popular: false
    },
    {
      id: 6,
      tokens: 500,
      price: 500,
      bonus: 125,
      popular: false
    }
  ];

  const handlePurchase = (packId: number) => {
    setSelectedPack(packId);
    // TODO: Integrate payment gateway
    alert('Integration paiement a venir!');
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#f6a21a] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f6a21a] to-[#ffd700] rounded-full pulse-gold"></div>
            <span className="text-2xl font-bold gradient-text">Boutique de Tokens</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achetez des Tokens
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choisissez votre pack de tokens et commencez a jouer. Plus vous achetez, plus vous recevez de bonus!
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
                className={`relative bg-[#12121a] border rounded-2xl overflow-hidden card-hover ${
                  pack.popular ? 'border-[#f6a21a] glow' : 'border-[#2a2a3e]'
                }`}
              >
                {pack.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#f6a21a] to-[#ffd700] text-black text-center py-2 font-semibold text-sm">
                    PLUS POPULAIRE
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
                        +{pack.bonus} tokens bonus
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold gradient-text">{pack.price}EUR</span>
                  </div>

                  {/* Value indicator */}
                  <div className="text-center text-gray-400 text-sm mb-6">
                    {((pack.tokens + pack.bonus) / pack.price).toFixed(1)} tokens/EUR
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={() => handlePurchase(pack.id)}
                    className={`w-full py-4 rounded-full font-bold transition-all ${
                      pack.popular
                        ? 'btn-primary text-black'
                        : 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] border border-[#2a2a3e]'
                    }`}
                  >
                    Acheter maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-[#12121a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Moyens de paiement acceptes</h2>
            <p className="text-gray-400">Paiement securise et instantane</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* PayPal */}
            <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="text-white font-medium">PayPal</span>
            </div>

            {/* Credit Card */}
            <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1a1f71] to-[#f79e1b] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <span className="text-white font-medium">Carte bancaire</span>
            </div>

            {/* Crypto */}
            <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f7931a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BTC</span>
              </div>
              <span className="text-white font-medium">Crypto</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Questions frequentes</h2>

          <div className="space-y-4">
            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Combien valent les tokens ?</h3>
              <p className="text-gray-400">1 token = 1 EUR. Le taux est fixe.</p>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Comment recevoir mes tokens ?</h3>
              <p className="text-gray-400">Les tokens sont credites instantanement sur votre compte apres validation du paiement.</p>
            </div>

            <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Puis-je obtenir un remboursement ?</h3>
              <p className="text-gray-400">Les tokens achetes ne sont pas remboursables mais peuvent etre retires en argent reel.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

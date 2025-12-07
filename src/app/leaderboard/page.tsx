import Link from 'next/link';

export default function Leaderboard() {
  const topPlayers = [
    { rank: 1, name: "DragonMaster", elo: 2850, wins: 450, losses: 52, tokens: 125000, avatar: "D" },
    { rank: 2, name: "ShadowLegend", elo: 2780, wins: 420, losses: 65, tokens: 98000, avatar: "S" },
    { rank: 3, name: "ThunderGod", elo: 2720, wins: 395, losses: 70, tokens: 87500, avatar: "T" },
    { rank: 4, name: "PhoenixKing", elo: 2680, wins: 380, losses: 78, tokens: 76000, avatar: "P" },
    { rank: 5, name: "NightStalker", elo: 2650, wins: 365, losses: 82, tokens: 69500, avatar: "N" },
    { rank: 6, name: "StormBreaker", elo: 2620, wins: 350, losses: 88, tokens: 62000, avatar: "S" },
    { rank: 7, name: "IronFist", elo: 2590, wins: 340, losses: 92, tokens: 55500, avatar: "I" },
    { rank: 8, name: "BladeRunner", elo: 2560, wins: 328, losses: 98, tokens: 49000, avatar: "B" },
    { rank: 9, name: "VenomBite", elo: 2530, wins: 315, losses: 102, tokens: 43500, avatar: "V" },
    { rank: 10, name: "GhostWalker", elo: 2500, wins: 300, losses: 108, tokens: 38000, avatar: "G" },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-[#ffd700] to-[#ffaa00]';
    if (rank === 2) return 'from-[#c0c0c0] to-[#a0a0a0]';
    if (rank === 3) return 'from-[#cd7f32] to-[#b8650a]';
    return 'from-[#1a1a2e] to-[#2a2a3e]';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-[#f6a21a] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Classement</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Les meilleurs joueurs de BrawlTokens
          </p>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-12 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-end gap-4 md:gap-8 mb-16">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#c0c0c0] to-[#808080] rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-white mb-4 border-4 border-[#c0c0c0]">
                {topPlayers[1].avatar}
              </div>
              <div className="text-2xl md:text-3xl mb-2">🥈</div>
              <div className="text-white font-bold text-lg">{topPlayers[1].name}</div>
              <div className="text-gray-400 text-sm">{topPlayers[1].elo} ELO</div>
              <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl px-6 py-3 mt-4 h-24 flex items-end justify-center">
                <span className="text-[#f6a21a] font-bold text-xl">{topPlayers[1].tokens.toLocaleString()}</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-8">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#ffd700] to-[#ffaa00] rounded-full flex items-center justify-center text-4xl md:text-5xl font-bold text-black mb-4 border-4 border-[#ffd700] glow">
                {topPlayers[0].avatar}
              </div>
              <div className="text-3xl md:text-4xl mb-2">👑</div>
              <div className="text-white font-bold text-xl">{topPlayers[0].name}</div>
              <div className="text-gray-400">{topPlayers[0].elo} ELO</div>
              <div className="bg-gradient-to-br from-[#f6a21a]/20 to-[#ffd700]/20 border border-[#f6a21a] rounded-xl px-8 py-4 mt-4 h-32 flex items-end justify-center">
                <span className="text-[#f6a21a] font-bold text-2xl">{topPlayers[0].tokens.toLocaleString()}</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#cd7f32] to-[#8b4513] rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-white mb-4 border-4 border-[#cd7f32]">
                {topPlayers[2].avatar}
              </div>
              <div className="text-2xl md:text-3xl mb-2">🥉</div>
              <div className="text-white font-bold text-lg">{topPlayers[2].name}</div>
              <div className="text-gray-400 text-sm">{topPlayers[2].elo} ELO</div>
              <div className="bg-[#12121a] border border-[#2a2a3e] rounded-xl px-6 py-3 mt-4 h-20 flex items-end justify-center">
                <span className="text-[#f6a21a] font-bold text-xl">{topPlayers[2].tokens.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Leaderboard */}
      <section className="py-12 bg-[#12121a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#1a1a2e] text-gray-400 text-sm font-semibold">
              <div className="col-span-1">Rang</div>
              <div className="col-span-4">Joueur</div>
              <div className="col-span-2 text-center">ELO</div>
              <div className="col-span-2 text-center">V/D</div>
              <div className="col-span-3 text-right">Tokens gagnes</div>
            </div>

            {/* Rows */}
            {topPlayers.map((player) => (
              <div
                key={player.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-t border-[#2a2a3e] items-center hover:bg-[#1a1a2e]/50 transition-colors ${
                  player.rank <= 3 ? 'bg-[#1a1a2e]/30' : ''
                }`}
              >
                <div className="col-span-1">
                  <span className={`text-lg ${player.rank <= 3 ? '' : 'text-gray-400'}`}>
                    {getRankBadge(player.rank)}
                  </span>
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getRankColor(player.rank)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {player.avatar}
                  </div>
                  <span className="text-white font-medium">{player.name}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-[#f6a21a] font-bold">{player.elo}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-green-400">{player.wins}</span>
                  <span className="text-gray-500 mx-1">/</span>
                  <span className="text-red-400">{player.losses}</span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-white font-semibold">{player.tokens.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm ml-1">tokens</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white px-8 py-3 rounded-full font-semibold border border-[#2a2a3e] transition-colors">
              Voir plus de joueurs
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pret a rejoindre le classement ?
          </h2>
          <p className="text-gray-400 mb-8">
            Inscrivez-vous et commencez a jouer pour apparaitre dans le classement
          </p>
          <Link href="/register" className="btn-primary px-8 py-4 rounded-full text-black font-bold inline-block">
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}

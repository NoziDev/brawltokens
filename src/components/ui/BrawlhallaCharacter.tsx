'use client';

import Image from 'next/image';

// Base URL for Brawlhalla legend images from official CDN
const CDN = 'https://cms.brawlhalla.com/c/uploads';

// Liste complète des légendes Brawlhalla avec images officielles
export const brawlhallaLegends = [
  { name: 'Bodvar', image: `${CDN}/2021/07/bodvar.png` },
  { name: 'Cassidy', image: `${CDN}/2021/07/cassidy.png` },
  { name: 'Orion', image: `${CDN}/2021/07/orion.png` },
  { name: 'Lord Vraxx', image: `${CDN}/2021/07/vraxx.png` },
  { name: 'Gnash', image: `${CDN}/2021/07/gnash.png` },
  { name: 'Queen Nai', image: `${CDN}/2021/07/nai.png` },
  { name: 'Hattori', image: `${CDN}/2021/07/hattori.png` },
  { name: 'Sir Roland', image: `${CDN}/2021/07/roland.png` },
  { name: 'Scarlet', image: `${CDN}/2021/07/scarlet.png` },
  { name: 'Thatch', image: `${CDN}/2021/07/thatch.png` },
  { name: 'Ada', image: `${CDN}/2021/07/ada.png` },
  { name: 'Sentinel', image: `${CDN}/2021/07/sentinel.png` },
  { name: 'Lucien', image: `${CDN}/2021/07/lucien.png` },
  { name: 'Teros', image: `${CDN}/2021/07/teros.png` },
  { name: 'Brynn', image: `${CDN}/2021/07/brynn.png` },
  { name: 'Asuri', image: `${CDN}/2021/07/asuri.png` },
  { name: 'Barraza', image: `${CDN}/2021/07/barraza.png` },
  { name: 'Ember', image: `${CDN}/2021/07/ember.png` },
  { name: 'Azoth', image: `${CDN}/2021/07/azoth.png` },
  { name: 'Koji', image: `${CDN}/2021/07/koji.png` },
  { name: 'Ulgrim', image: `${CDN}/2021/07/ulgrim.png` },
  { name: 'Diana', image: `${CDN}/2021/07/diana.png` },
  { name: 'Jhala', image: `${CDN}/2021/07/jhala.png` },
  { name: 'Kor', image: `${CDN}/2021/07/kor.png` },
  { name: 'Wu Shang', image: `${CDN}/2021/07/wushang.png` },
  { name: 'Val', image: `${CDN}/2021/07/val.png` },
  { name: 'Ragnir', image: `${CDN}/2021/07/ragnir.png` },
  { name: 'Cross', image: `${CDN}/2021/07/cross.png` },
  { name: 'Mirage', image: `${CDN}/2021/07/mirage.png` },
  { name: 'Nix', image: `${CDN}/2021/07/nix.png` },
  { name: 'Mordex', image: `${CDN}/2021/07/mordex.png` },
  { name: 'Yumiko', image: `${CDN}/2021/07/yumiko.png` },
  { name: 'Artemis', image: `${CDN}/2021/07/artemis.png` },
  { name: 'Caspian', image: `${CDN}/2021/07/caspian.png` },
  { name: 'Sidra', image: `${CDN}/2021/07/sidra.png` },
  { name: 'Xull', image: `${CDN}/2021/07/xull.png` },
  { name: 'Kaya', image: `${CDN}/2021/07/kaya.png` },
  { name: 'Isaiah', image: `${CDN}/2021/07/isaiah.png` },
  { name: 'Jiro', image: `${CDN}/2021/07/jiro.png` },
  { name: 'Lin Fei', image: `${CDN}/2021/07/linfei.png` },
  { name: 'Zariel', image: `${CDN}/2021/07/zariel.png` },
  { name: 'Rayman', image: `${CDN}/2021/07/rayman.png` },
  { name: 'Dusk', image: `${CDN}/2021/07/dusk.png` },
  { name: 'Fait', image: `${CDN}/2021/07/fait.png` },
  { name: 'Thor', image: `${CDN}/2021/07/thor.png` },
  { name: 'Petra', image: `${CDN}/2021/07/petra.png` },
  { name: 'Vector', image: `${CDN}/2021/07/vector.png` },
  { name: 'Volkov', image: `${CDN}/2021/07/volkov.png` },
  { name: 'Onyx', image: `${CDN}/2021/07/onyx.png` },
  { name: 'Jaeyun', image: `${CDN}/2021/07/jaeyun.png` },
  { name: 'Mako', image: `${CDN}/2021/07/mako.png` },
  { name: 'Magyar', image: `${CDN}/2021/07/magyar.png` },
  { name: 'Reno', image: `${CDN}/2021/10/a_Roster_Pose_BountyHunterM.png` },
  { name: 'Munin', image: `${CDN}/2021/12/a_Roster_Pose_BirdBardM.png` },
  { name: 'Arcadia', image: `${CDN}/2022/03/a_Roster_Pose_FairyQueenM.png` },
  { name: 'Ezio', image: `${CDN}/2022/06/a_Roster_Pose_EzioM.png` },
  { name: 'Tezca', image: `${CDN}/2022/12/a_Roster_Pose_LuchadorM.png` },
  { name: 'Thea', image: `${CDN}/2022/09/a_Roster_Pose_SpeedsterM.png` },
  { name: 'Red Raptor', image: `${CDN}/2023/03/a_Roster_Pose_RedRaptorM.png` },
  { name: 'Loki', image: `${CDN}/2023/06/a_Roster_Pose_LokiM.png` },
  { name: 'Seven', image: `${CDN}/2023/09/a_Roster_Pose_SevenM.png` },
  { name: 'Vivi', image: `${CDN}/2023/12/a_Roster_Pose_ViviM.png` },
  { name: 'Nimue', image: `${CDN}/2024/03/a_Roster_Pose_NimueM.png` },
];

interface LegendPickerProps {
  selectedLegend: string;
  onSelect: (legend: string) => void;
  onClose: () => void;
}

export function LegendPicker({ selectedLegend, onSelect, onClose }: LegendPickerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden animate-slide-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white">Choose your Legend</h3>
          <p className="text-gray-400 mt-2">Select the character you will play</p>
        </div>

        {/* Legends Grid */}
        <div className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {brawlhallaLegends.map((legend) => (
              <button
                key={legend.name}
                onClick={() => {
                  onSelect(legend.name);
                  onClose();
                }}
                className={`relative p-2 rounded-xl transition-all hover:scale-105 ${
                  selectedLegend === legend.name
                    ? 'bg-[#8b5cf6] ring-2 ring-[#8b5cf6] ring-offset-2 ring-offset-[#12121a]'
                    : 'bg-[#1a1a2e] hover:bg-[#2a2a3e]'
                }`}
              >
                {/* Legend icon placeholder - will use first letter if no image */}
                <div className="w-full aspect-square bg-gradient-to-br from-[#2a2a3e] to-[#1a1a2e] rounded-lg flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-white/80">
                    {legend.name.charAt(0)}
                  </span>
                </div>
                <div className="text-xs text-center text-white truncate">
                  {legend.name}
                </div>
                {selectedLegend === legend.name && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to display a legend badge
interface LegendBadgeProps {
  legend: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function LegendBadge({ legend, size = 'md', onClick }: LegendBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-xl flex items-center justify-center ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      }`}
    >
      <span className="font-bold text-white">{legend.charAt(0)}</span>
    </div>
  );
}

// Carousel component for legends
export function LegendCarousel() {
  // Double the legends for seamless infinite scroll
  const doubledLegends = [...brawlhallaLegends, ...brawlhallaLegends];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex animate-scroll gap-8">
        {doubledLegends.map((legend, index) => (
          <div
            key={`${legend.name}-${index}`}
            className="flex-shrink-0 group cursor-pointer"
          >
            <div className="relative w-20 h-24 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={legend.image}
                alt={legend.name}
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                unoptimized
              />
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {legend.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

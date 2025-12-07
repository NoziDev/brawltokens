'use client';

import Image from 'next/image';

// Base URL for Brawlhalla legend images from official CDN
const LEGEND_CDN = 'https://cms.brawlhalla.com/c/uploads';

// Liste complète des légendes Brawlhalla avec images officielles
export const brawlhallaLegends = [
  { name: 'Bodvar', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_BodvarM.png` },
  { name: 'Cassidy', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_CassidyM.png` },
  { name: 'Orion', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_OrionM.png` },
  { name: 'Lord Vraxx', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_VraxxM.png` },
  { name: 'Gnash', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_GnashM.png` },
  { name: 'Queen Nai', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_NaiM.png` },
  { name: 'Hattori', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_HattoriM.png` },
  { name: 'Sir Roland', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_RolandM.png` },
  { name: 'Scarlet', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ScarletM.png` },
  { name: 'Thatch', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ThatchM.png` },
  { name: 'Ada', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_AdaM.png` },
  { name: 'Sentinel', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_SentinelM.png` },
  { name: 'Lucien', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_LucienM.png` },
  { name: 'Teros', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_TerosM.png` },
  { name: 'Brynn', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_BrynnM.png` },
  { name: 'Asuri', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_AsuriM.png` },
  { name: 'Barraza', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_BarrazaM.png` },
  { name: 'Ember', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_EmberM.png` },
  { name: 'Azoth', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_AzothM.png` },
  { name: 'Koji', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_KojiM.png` },
  { name: 'Ulgrim', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_UlgrimM.png` },
  { name: 'Diana', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_DianaM.png` },
  { name: 'Jhala', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_JhalaM.png` },
  { name: 'Kor', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_KorM.png` },
  { name: 'Wu Shang', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_WuShangM.png` },
  { name: 'Val', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ValM.png` },
  { name: 'Ragnir', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_RagnirM.png` },
  { name: 'Cross', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_CrossM.png` },
  { name: 'Mirage', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_MirageM.png` },
  { name: 'Nix', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_NixM.png` },
  { name: 'Mordex', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_MordexM.png` },
  { name: 'Yumiko', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_YumikoM.png` },
  { name: 'Artemis', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ArtemisM.png` },
  { name: 'Caspian', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_CaspianM.png` },
  { name: 'Sidra', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_SidraM.png` },
  { name: 'Xull', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_XullM.png` },
  { name: 'Kaya', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_KayaM.png` },
  { name: 'Isaiah', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_IsaiahM.png` },
  { name: 'Jiro', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_JiroM.png` },
  { name: 'Lin Fei', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_LinFeiM.png` },
  { name: 'Zariel', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ZarielM.png` },
  { name: 'Rayman', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_RaymanM.png` },
  { name: 'Dusk', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_DuskM.png` },
  { name: 'Fait', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_FaitM.png` },
  { name: 'Thor', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ThorM.png` },
  { name: 'Petra', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_PetraM.png` },
  { name: 'Vector', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_VectorM.png` },
  { name: 'Volkov', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_VolkovM.png` },
  { name: 'Onyx', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_OnyxM.png` },
  { name: 'Jaeyun', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_JaeyunM.png` },
  { name: 'Mako', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_MakoM.png` },
  { name: 'Magyar', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_MagyarM.png` },
  { name: 'Reno', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_RenoM.png` },
  { name: 'Munin', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_MuninM.png` },
  { name: 'Arcadia', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_ArcadiaM.png` },
  { name: 'Ezio', image: `${LEGEND_CDN}/2022/02/a_Roster_Pose_EzioM.png` },
  { name: 'Tezca', image: `${LEGEND_CDN}/2022/08/a_Roster_Pose_TezcaM.png` },
  { name: 'Thea', image: `${LEGEND_CDN}/2022/11/a_Roster_Pose_TheaM.png` },
  { name: 'Red Raptor', image: `${LEGEND_CDN}/2023/02/a_Roster_Pose_RedRaptorM.png` },
  { name: 'Loki', image: `${LEGEND_CDN}/2023/05/a_Roster_Pose_LokiM.png` },
  { name: 'Seven', image: `${LEGEND_CDN}/2023/11/a_Roster_Pose_SevenM.png` },
  { name: 'Vivi', image: `${LEGEND_CDN}/2024/02/a_Roster_Pose_ViviM.png` },
  { name: 'Nimue', image: `${LEGEND_CDN}/2024/05/a_Roster_Pose_NimueM.png` },
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

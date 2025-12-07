'use client';

import Image from 'next/image';

// Base URL for Brawlhalla legend images from official CDN
const LEGEND_CDN = 'https://cms.brawlhalla.com/c/uploads/2021/07';

// Liste complète des légendes Brawlhalla avec images officielles
export const brawlhallaLegends = [
  { name: 'Bodvar', image: `${LEGEND_CDN}/bodvar.png` },
  { name: 'Cassidy', image: `${LEGEND_CDN}/cassidy.png` },
  { name: 'Orion', image: `${LEGEND_CDN}/orion.png` },
  { name: 'Lord Vraxx', image: `${LEGEND_CDN}/vraxx.png` },
  { name: 'Gnash', image: `${LEGEND_CDN}/gnash.png` },
  { name: 'Queen Nai', image: `${LEGEND_CDN}/nai.png` },
  { name: 'Hattori', image: `${LEGEND_CDN}/hattori.png` },
  { name: 'Sir Roland', image: `${LEGEND_CDN}/roland.png` },
  { name: 'Scarlet', image: `${LEGEND_CDN}/scarlet.png` },
  { name: 'Thatch', image: `${LEGEND_CDN}/thatch.png` },
  { name: 'Ada', image: `${LEGEND_CDN}/ada.png` },
  { name: 'Sentinel', image: `${LEGEND_CDN}/sentinel.png` },
  { name: 'Lucien', image: `${LEGEND_CDN}/lucien.png` },
  { name: 'Teros', image: `${LEGEND_CDN}/teros.png` },
  { name: 'Brynn', image: `${LEGEND_CDN}/brynn.png` },
  { name: 'Asuri', image: `${LEGEND_CDN}/asuri.png` },
  { name: 'Barraza', image: `${LEGEND_CDN}/barraza.png` },
  { name: 'Ember', image: `${LEGEND_CDN}/ember.png` },
  { name: 'Azoth', image: `${LEGEND_CDN}/azoth.png` },
  { name: 'Koji', image: `${LEGEND_CDN}/koji.png` },
  { name: 'Ulgrim', image: `${LEGEND_CDN}/ulgrim.png` },
  { name: 'Diana', image: `${LEGEND_CDN}/diana.png` },
  { name: 'Jhala', image: `${LEGEND_CDN}/jhala.png` },
  { name: 'Kor', image: `${LEGEND_CDN}/kor.png` },
  { name: 'Wu Shang', image: `${LEGEND_CDN}/wushang.png` },
  { name: 'Val', image: `${LEGEND_CDN}/val.png` },
  { name: 'Ragnir', image: `${LEGEND_CDN}/ragnir.png` },
  { name: 'Cross', image: `${LEGEND_CDN}/cross.png` },
  { name: 'Mirage', image: `${LEGEND_CDN}/mirage.png` },
  { name: 'Nix', image: `${LEGEND_CDN}/nix.png` },
  { name: 'Mordex', image: `${LEGEND_CDN}/mordex.png` },
  { name: 'Yumiko', image: `${LEGEND_CDN}/yumiko.png` },
  { name: 'Artemis', image: `${LEGEND_CDN}/artemis.png` },
  { name: 'Caspian', image: `${LEGEND_CDN}/caspian.png` },
  { name: 'Sidra', image: `${LEGEND_CDN}/sidra.png` },
  { name: 'Xull', image: `${LEGEND_CDN}/xull.png` },
  { name: 'Kaya', image: `${LEGEND_CDN}/kaya.png` },
  { name: 'Isaiah', image: `${LEGEND_CDN}/isaiah.png` },
  { name: 'Jiro', image: `${LEGEND_CDN}/jiro.png` },
  { name: 'Lin Fei', image: `${LEGEND_CDN}/linfei.png` },
  { name: 'Zariel', image: `${LEGEND_CDN}/zariel.png` },
  { name: 'Rayman', image: `${LEGEND_CDN}/rayman.png` },
  { name: 'Dusk', image: `${LEGEND_CDN}/dusk.png` },
  { name: 'Fait', image: `${LEGEND_CDN}/fait.png` },
  { name: 'Thor', image: `${LEGEND_CDN}/thor.png` },
  { name: 'Petra', image: `${LEGEND_CDN}/petra.png` },
  { name: 'Vector', image: `${LEGEND_CDN}/vector.png` },
  { name: 'Volkov', image: `${LEGEND_CDN}/volkov.png` },
  { name: 'Onyx', image: `${LEGEND_CDN}/onyx.png` },
  { name: 'Jaeyun', image: `${LEGEND_CDN}/jaeyun.png` },
  { name: 'Mako', image: `${LEGEND_CDN}/mako.png` },
  { name: 'Magyar', image: `${LEGEND_CDN}/magyar.png` },
  { name: 'Reno', image: `${LEGEND_CDN}/reno.png` },
  { name: 'Munin', image: `${LEGEND_CDN}/munin.png` },
  { name: 'Arcadia', image: `${LEGEND_CDN}/arcadia.png` },
  { name: 'Ezio', image: `${LEGEND_CDN}/ezio.png` },
  { name: 'Tezca', image: `${LEGEND_CDN}/tezca.png` },
  { name: 'Thea', image: `${LEGEND_CDN}/thea.png` },
  { name: 'Red Raptor', image: `${LEGEND_CDN}/redraptor.png` },
  { name: 'Loki', image: `${LEGEND_CDN}/loki.png` },
  { name: 'Seven', image: `${LEGEND_CDN}/seven.png` },
  { name: 'Vivi', image: `${LEGEND_CDN}/vivi.png` },
  { name: 'Nimue', image: `${LEGEND_CDN}/nimue.png` },
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

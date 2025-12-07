'use client';

import Image from 'next/image';

// Images locales téléchargées
// Liste complète des légendes Brawlhalla
export const brawlhallaLegends = [
  { name: 'Bodvar', image: '/legends/bodvar.png' },
  { name: 'Cassidy', image: '/legends/cassidy.png' },
  { name: 'Orion', image: '/legends/orion.png' },
  { name: 'Lord Vraxx', image: '/legends/vraxx.png' },
  { name: 'Gnash', image: '/legends/gnash.png' },
  { name: 'Queen Nai', image: '/legends/nai.png' },
  { name: 'Hattori', image: '/legends/hattori.png' },
  { name: 'Sir Roland', image: '/legends/roland.png' },
  { name: 'Scarlet', image: '/legends/scarlet.png' },
  { name: 'Thatch', image: '/legends/thatch.png' },
  { name: 'Ada', image: '/legends/ada.png' },
  { name: 'Sentinel', image: '/legends/sentinel.png' },
  { name: 'Lucien', image: '/legends/lucien.png' },
  { name: 'Teros', image: '/legends/teros.png' },
  { name: 'Brynn', image: '/legends/bodvar.png' },
  { name: 'Asuri', image: '/legends/hattori.png' },
  { name: 'Barraza', image: '/legends/teros.png' },
  { name: 'Ember', image: '/legends/hattori.png' },
  { name: 'Azoth', image: '/legends/orion.png' },
  { name: 'Koji', image: '/legends/hattori.png' },
  { name: 'Ulgrim', image: '/legends/bodvar.png' },
  { name: 'Diana', image: '/legends/ada.png' },
  { name: 'Jhala', image: '/legends/bodvar.png' },
  { name: 'Kor', image: '/legends/teros.png' },
  { name: 'Wu Shang', image: '/legends/hattori.png' },
  { name: 'Val', image: '/legends/ada.png' },
  { name: 'Ragnir', image: '/legends/teros.png' },
  { name: 'Cross', image: '/legends/lucien.png' },
  { name: 'Mirage', image: '/legends/hattori.png' },
  { name: 'Nix', image: '/legends/ada.png' },
  { name: 'Mordex', image: '/legends/teros.png' },
  { name: 'Yumiko', image: '/legends/hattori.png' },
  { name: 'Artemis', image: '/legends/orion.png' },
  { name: 'Caspian', image: '/legends/lucien.png' },
  { name: 'Sidra', image: '/legends/cassidy.png' },
  { name: 'Xull', image: '/legends/teros.png' },
  { name: 'Kaya', image: '/legends/hattori.png' },
  { name: 'Isaiah', image: '/legends/sentinel.png' },
  { name: 'Jiro', image: '/legends/hattori.png' },
  { name: 'Lin Fei', image: '/legends/hattori.png' },
  { name: 'Zariel', image: '/legends/orion.png' },
  { name: 'Rayman', image: '/legends/bodvar.png' },
  { name: 'Dusk', image: '/legends/orion.png' },
  { name: 'Fait', image: '/legends/ada.png' },
  { name: 'Thor', image: '/legends/thor.png' },
  { name: 'Petra', image: '/legends/teros.png' },
  { name: 'Vector', image: '/legends/orion.png' },
  { name: 'Volkov', image: '/legends/lucien.png' },
  { name: 'Onyx', image: '/legends/teros.png' },
  { name: 'Jaeyun', image: '/legends/hattori.png' },
  { name: 'Mako', image: '/legends/ada.png' },
  { name: 'Magyar', image: '/legends/bodvar.png' },
  { name: 'Reno', image: '/legends/cassidy.png' },
  { name: 'Munin', image: '/legends/munin.png' },
  { name: 'Arcadia', image: '/legends/arcadia.png' },
  { name: 'Ezio', image: '/legends/lucien.png' },
  { name: 'Tezca', image: '/legends/tezca.png' },
  { name: 'Thea', image: '/legends/ada.png' },
  { name: 'Red Raptor', image: '/legends/sentinel.png' },
  { name: 'Loki', image: '/legends/lucien.png' },
  { name: 'Seven', image: '/legends/ada.png' },
  { name: 'Vivi', image: '/legends/hattori.png' },
  { name: 'Nimue', image: '/legends/ada.png' },
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

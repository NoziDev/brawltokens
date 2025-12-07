'use client';

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
  { name: 'Brynn', image: '/legends/brynn.png' },
  { name: 'Asuri', image: '/legends/asuri.png' },
  { name: 'Barraza', image: '/legends/barraza.png' },
  { name: 'Ember', image: '/legends/ember.png' },
  { name: 'Azoth', image: '/legends/azoth.png' },
  { name: 'Koji', image: '/legends/koji.png' },
  { name: 'Ulgrim', image: '/legends/ulgrim.png' },
  { name: 'Diana', image: '/legends/diana.png' },
  { name: 'Jhala', image: '/legends/jhala.png' },
  { name: 'Kor', image: '/legends/kor.png' },
  { name: 'Wu Shang', image: '/legends/wushang.png' },
  { name: 'Val', image: '/legends/val.png' },
  { name: 'Ragnir', image: '/legends/ragnir.png' },
  { name: 'Cross', image: '/legends/cross.png' },
  { name: 'Mirage', image: '/legends/mirage.png' },
  { name: 'Nix', image: '/legends/nix.png' },
  { name: 'Mordex', image: '/legends/mordex.png' },
  { name: 'Yumiko', image: '/legends/yumiko.png' },
  { name: 'Artemis', image: '/legends/artemis.png' },
  { name: 'Caspian', image: '/legends/caspian.png' },
  { name: 'Sidra', image: '/legends/sidra.png' },
  { name: 'Xull', image: '/legends/xull.png' },
  { name: 'Kaya', image: '/legends/kaya.png' },
  { name: 'Isaiah', image: '/legends/isaiah.png' },
  { name: 'Jiro', image: '/legends/jiro.png' },
  { name: 'Lin Fei', image: '/legends/linfei.png' },
  { name: 'Zariel', image: '/legends/zariel.png' },
  { name: 'Rayman', image: '/legends/rayman.png' },
  { name: 'Dusk', image: '/legends/dusk.png' },
  { name: 'Fait', image: '/legends/fait.png' },
  { name: 'Thor', image: '/legends/thor.png' },
  { name: 'Petra', image: '/legends/petra.png' },
  { name: 'Vector', image: '/legends/vector.png' },
  { name: 'Volkov', image: '/legends/volkov.png' },
  { name: 'Onyx', image: '/legends/onyx.png' },
  { name: 'Jaeyun', image: '/legends/jaeyun.png' },
  { name: 'Mako', image: '/legends/mako.png' },
  { name: 'Magyar', image: '/legends/magyar.png' },
  { name: 'Reno', image: '/legends/reno.png' },
  { name: 'Munin', image: '/legends/munin.png' },
  { name: 'Arcadia', image: '/legends/arcadia.png' },
  { name: 'Ezio', image: '/legends/ezio.png' },
  { name: 'Tezca', image: '/legends/tezca.png' },
  { name: 'Thea', image: '/legends/thea.png' },
  { name: 'Red Raptor', image: '/legends/redraptor.png' },
  { name: 'Loki', image: '/legends/loki.png' },
  { name: 'Seven', image: '/legends/seven.png' },
  { name: 'Vivi', image: '/legends/vivi.png' },
  { name: 'Nimue', image: '/legends/nimue.png' },
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

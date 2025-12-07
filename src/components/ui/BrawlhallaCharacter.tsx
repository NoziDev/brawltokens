'use client';

import Image from 'next/image';

// Liste des personnages Brawlhalla avec leurs SPLASH ARTS (corps entier)
export const brawlhallaLegends = [
  { name: "Bodvar", image: "https://cms.brawlhalla.com/c/uploads/2022/02/BodvarSplash-1.png" },
  { name: "Cassidy", image: "https://cms.brawlhalla.com/c/uploads/2022/02/CassidySplash-1.png" },
  { name: "Orion", image: "https://cms.brawlhalla.com/c/uploads/2022/02/OrionSplash-1.png" },
  { name: "Lord Vraxx", image: "https://cms.brawlhalla.com/c/uploads/2022/02/VraxxSplash.png" },
  { name: "Gnash", image: "https://cms.brawlhalla.com/c/uploads/2022/02/GnashSplash.png" },
  { name: "Queen Nai", image: "https://cms.brawlhalla.com/c/uploads/2022/02/NaiSplash.png" },
  { name: "Hattori", image: "https://cms.brawlhalla.com/c/uploads/2022/02/HattoriSplash.png" },
  { name: "Sir Roland", image: "https://cms.brawlhalla.com/c/uploads/2022/02/RolandSplash.png" },
  { name: "Scarlet", image: "https://cms.brawlhalla.com/c/uploads/2022/02/ScarletSplash.png" },
  { name: "Thatch", image: "https://cms.brawlhalla.com/c/uploads/2022/02/UpdatedThatch.png" },
  { name: "Ada", image: "https://cms.brawlhalla.com/c/uploads/2022/02/AdaSplash.png" },
  { name: "Sentinel", image: "https://cms.brawlhalla.com/c/uploads/2022/05/UpdatedSentinel.png" },
  { name: "Lucien", image: "https://cms.brawlhalla.com/c/uploads/2022/02/LucienSplash.png" },
  { name: "Teros", image: "https://cms.brawlhalla.com/c/uploads/2022/02/TerosSplash.png" },
  { name: "Brynn", image: "https://cms.brawlhalla.com/c/uploads/2022/02/BrynnSplash.png" },
  { name: "Asuri", image: "https://cms.brawlhalla.com/c/uploads/2022/02/AsuriSplash.png" },
  { name: "Barraza", image: "https://cms.brawlhalla.com/c/uploads/2022/02/BarrazaSplash.png" },
  { name: "Ember", image: "https://cms.brawlhalla.com/c/uploads/2022/02/EmberSplash.png" },
  { name: "Azoth", image: "https://cms.brawlhalla.com/c/uploads/2022/03/AzothSplash.png" },
  { name: "Koji", image: "https://cms.brawlhalla.com/c/uploads/2022/03/KojiSplash.png" },
  { name: "Ulgrim", image: "https://cms.brawlhalla.com/c/uploads/2022/03/UlgrimSplash.png" },
  { name: "Diana", image: "https://cms.brawlhalla.com/c/uploads/2022/03/DianaSplash.png" },
  { name: "Jhala", image: "https://cms.brawlhalla.com/c/uploads/2022/03/JhalaSplash.png" },
  { name: "Kor", image: "https://cms.brawlhalla.com/c/uploads/2022/03/KorSplash.png" },
  { name: "Wu Shang", image: "https://cms.brawlhalla.com/c/uploads/2022/03/WuShangSplash.png" },
  { name: "Val", image: "https://cms.brawlhalla.com/c/uploads/2022/05/ValSplash.png" },
  { name: "Ragnir", image: "https://cms.brawlhalla.com/c/uploads/2022/05/RagnirSplash.png" },
  { name: "Cross", image: "https://cms.brawlhalla.com/c/uploads/2022/05/CrossSplashNoShadow.png" },
  { name: "Mirage", image: "https://cms.brawlhalla.com/c/uploads/2022/05/MirageSplash.png" },
  { name: "Nix", image: "https://cms.brawlhalla.com/c/uploads/2022/05/ReaperPromoChar.png" },
  { name: "Mordex", image: "https://cms.brawlhalla.com/c/uploads/2022/05/MordexSplash.png" },
  { name: "Yumiko", image: "https://cms.brawlhalla.com/c/uploads/2022/05/Yumiko1.png" },
  { name: "Artemis", image: "https://cms.brawlhalla.com/c/uploads/2022/05/ArtemisSplash.png" },
  { name: "Caspian", image: "https://cms.brawlhalla.com/c/uploads/2022/05/CaspianSplash.png" },
  { name: "Sidra", image: "https://cms.brawlhalla.com/c/uploads/2022/05/SidraSplash.png" },
  { name: "Xull", image: "https://cms.brawlhalla.com/c/uploads/2022/05/UpdatedXull.png" },
  { name: "Kaya", image: "https://cms.brawlhalla.com/c/uploads/2022/05/KayaSplash.png" },
  { name: "Isaiah", image: "https://cms.brawlhalla.com/c/uploads/2022/05/IsaiahSplash.png" },
  { name: "Jiro", image: "https://cms.brawlhalla.com/c/uploads/2022/05/JiroSplash.png" },
  { name: "Lin Fei", image: "https://cms.brawlhalla.com/c/uploads/2022/05/LinFeiSplash.png" },
  { name: "Zariel", image: "https://cms.brawlhalla.com/c/uploads/2022/05/ZarielSplash.png" },
  { name: "Rayman", image: "https://cms.brawlhalla.com/c/uploads/2022/05/RaymanSplash_Single.png" },
  { name: "Dusk", image: "https://cms.brawlhalla.com/c/uploads/2022/05/DuskSplash.png" },
  { name: "Fait", image: "https://cms.brawlhalla.com/c/uploads/2022/05/FaitSplash.png" },
  { name: "Thor", image: "https://cms.brawlhalla.com/c/uploads/2022/05/ThorSplash_Isolated.png" },
  { name: "Petra", image: "https://cms.brawlhalla.com/c/uploads/2022/06/PetraSplash.png" },
  { name: "Vector", image: "https://cms.brawlhalla.com/c/uploads/2022/05/VectorSplash.png" },
  { name: "Volkov", image: "https://cms.brawlhalla.com/c/uploads/2022/05/VolkovSplash.png" },
  { name: "Onyx", image: "https://cms.brawlhalla.com/c/uploads/2022/05/GargoyleSplash_Edit.png" },
  { name: "Jaeyun", image: "https://cms.brawlhalla.com/c/uploads/2022/05/Jaeyun_New.png" },
  { name: "Mako", image: "https://cms.brawlhalla.com/c/uploads/2022/05/MakoSplash-1.png" },
  { name: "Magyar", image: "https://cms.brawlhalla.com/c/uploads/2022/05/Magyar-Splash0001.png" },
  { name: "Reno", image: "https://cms.brawlhalla.com/c/uploads/2022/05/Reno-Splash0001.png" },
];

interface LegendCardProps {
  legend: typeof brawlhallaLegends[0];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showName?: boolean;
  animated?: boolean;
}

export function LegendCard({
  legend,
  size = 'md',
  className = '',
  showName = true,
  animated = true
}: LegendCardProps) {
  const sizeClasses = {
    sm: 'w-24 h-32',
    md: 'w-40 h-52',
    lg: 'w-56 h-72',
    xl: 'w-72 h-96'
  };

  const imageSizes = {
    sm: 96,
    md: 160,
    lg: 224,
    xl: 288
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className} ${animated ? 'float' : ''}`}>
      <div className="relative w-full h-full">
        <Image
          src={legend.image}
          alt={legend.name}
          width={imageSizes[size]}
          height={imageSizes[size] * 1.3}
          className={`object-contain w-full h-full drop-shadow-[0_0_15px_rgba(246,162,26,0.5)] ${animated ? 'hover:scale-110 transition-transform duration-300' : ''}`}
          unoptimized
        />
      </div>
      {showName && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-bold text-white bg-black/70 px-2 py-1 rounded-full border border-[#f6a21a]/50">
            {legend.name}
          </span>
        </div>
      )}
    </div>
  );
}

interface FloatingLegendsProps {
  count?: number;
  className?: string;
}

export function FloatingLegends({ count = 6, className = '' }: FloatingLegendsProps) {
  // Selectionner des personnages aleatoires
  const selectedLegends = brawlhallaLegends.slice(0, count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {selectedLegends.map((legend, index) => {
        const positions = [
          { left: '5%', top: '20%' },
          { right: '5%', top: '15%' },
          { left: '10%', bottom: '20%' },
          { right: '10%', bottom: '25%' },
          { left: '15%', top: '50%' },
          { right: '15%', top: '45%' },
        ];
        const pos = positions[index % positions.length];
        const delay = index * 0.5;

        return (
          <div
            key={legend.name}
            className="absolute w-40 h-52 opacity-30 hover:opacity-60 transition-opacity"
            style={{
              ...pos,
              animationDelay: `${delay}s`
            }}
          >
            <div className={`float-delay-${index % 4}`}>
              <Image
                src={legend.image}
                alt={legend.name}
                width={160}
                height={208}
                className="object-contain w-full h-full drop-shadow-[0_0_20px_rgba(246,162,26,0.3)]"
                unoptimized
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface LegendShowcaseProps {
  className?: string;
}

export function LegendShowcase({ className = '' }: LegendShowcaseProps) {
  const featuredLegends = [
    brawlhallaLegends[0],  // Bodvar
    brawlhallaLegends[6],  // Hattori
    brawlhallaLegends[30], // Mordex
  ];

  return (
    <div className={`flex items-center justify-center gap-8 ${className}`}>
      {/* Left character */}
      <div className="relative float-delay-1 hidden md:block">
        <Image
          src={featuredLegends[0].image}
          alt={featuredLegends[0].name}
          width={250}
          height={325}
          className="object-contain drop-shadow-[0_0_30px_rgba(246,162,26,0.5)] transform -scale-x-100"
          unoptimized
        />
      </div>

      {/* Center character (larger) */}
      <div className="relative float z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6a21a]/30 to-transparent rounded-full blur-3xl"></div>
        <Image
          src={featuredLegends[1].image}
          alt={featuredLegends[1].name}
          width={350}
          height={455}
          className="object-contain relative z-10 drop-shadow-[0_0_40px_rgba(246,162,26,0.6)]"
          unoptimized
        />
      </div>

      {/* Right character */}
      <div className="relative float-delay-2 hidden md:block">
        <Image
          src={featuredLegends[2].image}
          alt={featuredLegends[2].name}
          width={250}
          height={325}
          className="object-contain drop-shadow-[0_0_30px_rgba(246,162,26,0.5)]"
          unoptimized
        />
      </div>
    </div>
  );
}

interface LegendCarouselProps {
  className?: string;
}

export function LegendCarousel({ className = '' }: LegendCarouselProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex animate-scroll-left">
        {[...brawlhallaLegends, ...brawlhallaLegends].map((legend, index) => (
          <div
            key={`${legend.name}-${index}`}
            className="flex-shrink-0 mx-4 group"
          >
            <div className="relative w-28 h-36 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-2">
              <Image
                src={legend.image}
                alt={legend.name}
                width={112}
                height={144}
                className="object-contain w-full h-full drop-shadow-[0_0_10px_rgba(246,162,26,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(246,162,26,0.6)]"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface VSDisplayProps {
  legend1: typeof brawlhallaLegends[0];
  legend2: typeof brawlhallaLegends[0];
  className?: string;
}

export function VSDisplay({ legend1, legend2, className = '' }: VSDisplayProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {/* Player 1 */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"></div>
        <Image
          src={legend1.image}
          alt={legend1.name}
          width={180}
          height={234}
          className="object-contain relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transform -scale-x-100 float-delay-1"
          unoptimized
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 px-3 py-1 rounded-full">
          <span className="text-white text-sm font-bold">{legend1.name}</span>
        </div>
      </div>

      {/* VS */}
      <div className="relative z-20">
        <span className="text-5xl font-black text-[#f6a21a] vs-text drop-shadow-[0_0_20px_rgba(246,162,26,0.8)]">
          VS
        </span>
      </div>

      {/* Player 2 */}
      <div className="relative">
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"></div>
        <Image
          src={legend2.image}
          alt={legend2.name}
          width={180}
          height={234}
          className="object-contain relative z-10 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] float-delay-2"
          unoptimized
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-red-500 px-3 py-1 rounded-full">
          <span className="text-white text-sm font-bold">{legend2.name}</span>
        </div>
      </div>
    </div>
  );
}

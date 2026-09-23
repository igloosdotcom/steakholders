import { useState } from 'react';
import { ArrowUpRight, Check, Flame, Info } from 'lucide-react';
import { MenuItem } from '../types/steakholders';
import { MENU_ITEMS } from '../data/content';

interface SteakDonenessSimulatorProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenReserve: () => void;
}

type DonenessKey = 'rare' | 'medium-rare' | 'medium' | 'well-done';

interface DonenessData {
  title: string;
  tempC: number;
  tempF: number;
  chefChoice?: boolean;
  colorGrad: string;
  interiorColor: string;
  tenderness: number;
  juiciness: number;
  crustLevel: number;
  headline: string;
  notes: string;
  pairingAdvice: string;
}

const DONENESS_LEVELS: Record<DonenessKey, DonenessData> = {
  'rare': {
    title: 'Rare',
    tempC: 50,
    tempF: 122,
    colorGrad: 'from-red-950 via-rose-700 to-red-600',
    interiorColor: '#bd1f36',
    tenderness: 96,
    juiciness: 94,
    crustLevel: 82,
    headline: 'Delicate, cool-to-warm ruby core',
    notes: 'Maximizes pure unadorned beef silkiness. Searing creates contrast against the tender, velvety muscle interior.',
    pairingAdvice: 'Pair with our acidic fresh chimichurri to balance the rich primal mouthfeel.'
  },
  'medium-rare': {
    title: 'Medium Rare',
    tempC: 54,
    tempF: 130,
    chefChoice: true,
    colorGrad: 'from-red-950 via-red-600 to-rose-500',
    interiorColor: '#d63046',
    tenderness: 98,
    juiciness: 99,
    crustLevel: 94,
    headline: 'The Steakholders Standard · Optimum tenderness & juice retention',
    notes: 'The sweet spot where intramuscular fat renders into liquid gold while internal fibers remain supple, succulent, and bursting with beef essence.',
    pairingAdvice: 'Pairs immaculately with both the signature chimichurri and cold ceremonial Mis-Matcha.'
  },
  'medium': {
    title: 'Medium',
    tempC: 60,
    tempF: 140,
    colorGrad: 'from-amber-950 via-rose-900 to-rose-400',
    interiorColor: '#e06d7d',
    tenderness: 84,
    juiciness: 82,
    crustLevel: 96,
    headline: 'Warm pink center with firm, satisfying bite',
    notes: 'A firmer chew with balanced moisture. Fats are completely liquefied, yielding a deeply savory roasted crust.',
    pairingAdvice: 'Extra chimichurri recommended to re-introduce punchy brightness and acidity.'
  },
  'well-done': {
    title: 'Well Done',
    tempC: 71,
    tempF: 160,
    colorGrad: 'from-stone-900 via-stone-800 to-amber-900',
    interiorColor: '#785b46',
    tenderness: 70,
    juiciness: 68,
    crustLevel: 100,
    headline: 'Complete through-and-through Maillard caramelized crust',
    notes: 'For those who prefer no pink coloration. We carve thinner 5mm medallions to preserve chewability over crunchy chips.',
    pairingAdvice: 'Generous garlic butter glaze and house chimichurri are essential companions.'
  }
};

export default function SteakDonenessSimulator({
  onSelectItem,
  onOpenReserve
}: SteakDonenessSimulatorProps) {
  const [selectedCut, setSelectedCut] = useState<'sirloin' | 'ribeye'>('sirloin');
  const [activeDoneness, setActiveDoneness] = useState<DonenessKey>('medium-rare');
  const [justAdded, setJustAdded] = useState(false);

  const doneness = DONENESS_LEVELS[activeDoneness];

  const handleAddSelection = () => {
    const targetItem = MENU_ITEMS.find(item => item.cutType === selectedCut) || MENU_ITEMS[0];
    onSelectItem(targetItem);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onOpenReserve();
    }, 600);
  };

  return (
    <section id="doneness" className="py-24 bg-[#0a0a0c] border-t border-stone-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
              <span>Interactive Studio</span>
              <span className="w-6 h-[1px] bg-[#c5a880]/60" />
              <span>The Doneness Dial</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
              Precision Cast-Iron Craft
            </h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Explore the thermal physics, tenderness metrics, and cross-section anatomy of each sear level before booking your weekend cut.
            </p>
          </div>

          {/* Cut Selector Switcher */}
          <div className="flex items-center p-1 bg-stone-950 border border-stone-800 self-start md:self-auto">
            <button
              onClick={() => setSelectedCut('sirloin')}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                selectedCut === 'sirloin'
                  ? 'bg-stone-800 text-[#f5f2eb] border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Angus Sirloin · £15.00
            </button>
            <button
              onClick={() => setSelectedCut('ribeye')}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                selectedCut === 'ribeye'
                  ? 'bg-stone-800 text-[#c5a880] border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Prime Ribeye · £19.00
            </button>
          </div>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Doneness Controls & Visual Cross-Section */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-800 p-8 sm:p-10 space-y-8 flex flex-col justify-between">
            {/* Doneness Selector Tabs */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-mono block">
                Choose Temperature &amp; Sear Level
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(DONENESS_LEVELS) as DonenessKey[]).map(key => {
                  const item = DONENESS_LEVELS[key];
                  const isActive = activeDoneness === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveDoneness(key)}
                      className={`p-3.5 text-left border transition-all relative ${
                        isActive
                          ? 'bg-stone-900 border-[#c5a880] text-stone-100 shadow-md'
                          : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 text-stone-400'
                      }`}
                    >
                      {item.chefChoice && (
                        <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 bg-[#c5a880] text-[#09090a] text-[8px] uppercase tracking-wider font-bold">
                          Chef Standard
                        </span>
                      )}
                      <div className="font-serif text-sm text-stone-200">{item.title}</div>
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                        {item.tempC}°C / {item.tempF}°F
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Cross-Section View */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-light">Simulated Core Anatomy</span>
                <span className="font-mono text-[#c5a880] text-[11px]">
                  Internal Target: {doneness.tempC}°C ({doneness.tempF}°F)
                </span>
              </div>

              {/* Graphic Steak Cross Section */}
              <div className="relative h-28 bg-stone-900/90 border border-stone-800 overflow-hidden flex flex-col justify-between p-3 group">
                {/* Charred outer crust top */}
                <div className="h-3 w-full bg-gradient-to-r from-stone-950 via-[#2a1d17] to-stone-950 border-b border-amber-900/40 flex items-center justify-between px-2 text-[9px] text-stone-500 uppercase font-mono">
                  <span>Maillard Cast Iron Crust</span>
                  <span>Smoking Tallow</span>
                </div>

                {/* Core Meat Temperature Render */}
                <div
                  className="my-auto h-12 w-full transition-all duration-500 flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: doneness.interiorColor,
                    boxShadow: `inset 0 0 20px rgba(0,0,0,0.6)`
                  }}
                >
                  {/* Subtle grain lines to represent beef muscle fibers */}
                  <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_8px)]" />
                  <span className="relative z-10 font-serif text-xs tracking-widest uppercase text-stone-100 drop-shadow-md">
                    {doneness.title} · {selectedCut === 'sirloin' ? 'Angus Sirloin' : 'Prime Ribeye'}
                  </span>
                </div>

                {/* Charred outer crust bottom */}
                <div className="h-3 w-full bg-gradient-to-r from-stone-950 via-[#2a1d17] to-stone-950 border-t border-amber-900/40 flex items-center justify-between px-2 text-[9px] text-stone-500 uppercase font-mono">
                  <span>Cast Iron Base Sear</span>
                  <span>Rested 6 Mins</span>
                </div>
              </div>
            </div>

            {/* Dynamic Culinary Headline */}
            <div className="space-y-2 pt-2 border-t border-stone-800/80">
              <h4 className="text-base font-serif text-[#f5f2eb]">
                {doneness.headline}
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                {doneness.notes}
              </p>
            </div>
          </div>

          {/* Right Column: Culinary Radar & Custom Order Trigger */}
          <div className="lg:col-span-5 bg-stone-950 border border-stone-800 p-8 sm:p-10 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono block">
                Thermal &amp; Sensory Metrics
              </span>

              {/* Progress Gauges */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300 font-light">Melt &amp; Tenderness Factor</span>
                    <span className="font-mono text-stone-400">{doneness.tenderness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-900 overflow-hidden">
                    <div
                      className="h-full bg-[#c5a880] transition-all duration-500"
                      style={{ width: `${doneness.tenderness}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300 font-light">Natural Juiciness Retention</span>
                    <span className="font-mono text-stone-400">{doneness.juiciness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-900 overflow-hidden">
                    <div
                      className="h-full bg-rose-600 transition-all duration-500"
                      style={{ width: `${doneness.juiciness}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300 font-light">Exterior Crust Caramelization</span>
                    <span className="font-mono text-stone-400">{doneness.crustLevel}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-900 overflow-hidden">
                    <div
                      className="h-full bg-amber-600 transition-all duration-500"
                      style={{ width: `${doneness.crustLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Pairing Note */}
              <div className="p-4 bg-stone-900/60 border border-stone-800 space-y-1.5">
                <div className="text-[10px] uppercase tracking-widest text-[#c5a880] font-mono flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  <span>Chef's Service Suggestion</span>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  {doneness.pairingAdvice}
                </p>
              </div>
            </div>

            {/* Direct Order Trigger */}
            <div className="space-y-3 pt-6 border-t border-stone-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Selected Configuration:</span>
                <span className="text-stone-200 font-medium font-serif">
                  {selectedCut === 'sirloin' ? 'Angus Sirloin Box' : 'Prime Ribeye Box'} ({doneness.title})
                </span>
              </div>

              <button
                onClick={handleAddSelection}
                className="w-full py-4 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Configured &amp; Added</span>
                  </>
                ) : (
                  <>
                    <span>Add {doneness.title} {selectedCut === 'sirloin' ? 'Sirloin (£15)' : 'Ribeye (£19)'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

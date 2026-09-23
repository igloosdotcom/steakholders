import { ArrowUpRight } from 'lucide-react';
import { BUTCHER_CUTS, BRAND_INFO } from '../data/content';
import { ButcherCut } from '../types/steakholders';

interface ButcherShopProps {
  onOpenOrder: (cut: ButcherCut) => void;
}

export default function ButcherShop({ onOpenOrder }: ButcherShopProps) {
  return (
    <section id="butcher" className="py-16 sm:py-24 bg-[#09090a] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
            <span>04</span>
            <span className="w-6 h-[1px] bg-[#c5a880]/60" />
            <span>The Butcher's Reserve</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
            Raw &amp; Pre-Seasoned Steak Cuts
          </h2>

          <p className="text-stone-400 text-xs sm:text-base font-light leading-relaxed">
            Ready for your cast iron. 100% Halal Monitoring Committee (HMC) certified, aged for deep flavor and tenderness, hand-trimmed or chef-marinated for home skillet searing.
          </p>

          {/* Butcher Quality Guarantee Notice */}
          <div className="p-3.5 sm:p-5 bg-stone-950 border border-[#c5a880]/40 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5 shadow-xl">
            <span className="text-[#09090a] bg-[#c5a880] text-[10px] font-mono uppercase tracking-[0.2em] font-semibold px-2.5 py-1 shrink-0">
              Butcher's Guarantee
            </span>
            <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
              Premium Angus Sirloin &amp; Prime Ribeye. A gem for Halal Steak Cuts in Birmingham.
            </p>
          </div>
        </div>

        {/* Cuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUTCHER_CUTS.map(cut => (
            <div
              key={cut.id}
              className="bg-stone-950 border border-stone-800/80 hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={cut.image}
                    alt={cut.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-stone-950/90 border border-stone-800 text-[10px] uppercase tracking-wider text-[#c5a880]">
                    {cut.weight}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 text-stone-200 font-mono text-xs tabular-nums px-2.5 py-1 bg-stone-950/90 border border-stone-800 flex items-center gap-1">
                    <span className="text-[#c5a880] font-semibold">£{cut.price.toFixed(2)}</span>
                    <span className="text-[10px] text-stone-400">/ kg</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-sm font-serif font-medium text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors leading-snug">
                      {cut.title}
                    </h3>
                    <div className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">
                      {cut.cert}
                    </div>
                  </div>

                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    {cut.description}
                  </p>

                  <div className="p-3 bg-stone-900/60 border border-stone-800/80 space-y-1 text-xs">
                    <div className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                      Chef Method
                    </div>
                    <div className="text-stone-300 font-light italic text-[11px] leading-tight">
                      "{cut.recommendedCooking}"
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => onOpenOrder(cut)}
                  className="w-full min-h-[44px] py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#09090a] bg-[#c5a880] hover:bg-[#d6bc96] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Add To Order</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={BRAND_INFO.jotformShop}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full min-h-[40px] py-2 text-[10px] uppercase tracking-wider text-stone-400 hover:text-stone-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Order Directly via JotForm</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Home Cooking Masterclass */}
        <div className="mt-12 sm:mt-16 bg-stone-950 border border-stone-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono block">
                Culinary Guide
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f5f2eb] font-light">
                The Steakholders Home Crust Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs text-stone-300 font-light leading-relaxed">
                <div className="space-y-1 border-l border-stone-800 pl-4">
                  <div className="font-medium text-stone-200 uppercase tracking-wider text-[11px]">
                    I. Salt &amp; Temper
                  </div>
                  <p className="text-stone-400">
                    Temper at room temperature for 30 minutes. Generous flaky salt pulls surface moisture to guarantee deep Maillard browning.
                  </p>
                </div>
                <div className="space-y-1 border-l border-stone-800 pl-4">
                  <div className="font-medium text-stone-200 uppercase tracking-wider text-[11px]">
                    II. Screaming Iron
                  </div>
                  <p className="text-stone-400">
                    High smoke-point tallow or oil. Sear 2 minutes untouched. Baste continuously with crushed garlic, thyme, and foaming butter.
                  </p>
                </div>
                <div className="space-y-1 border-l border-stone-800 pl-4">
                  <div className="font-medium text-stone-200 uppercase tracking-wider text-[11px]">
                    III. Carve &amp; Dress
                  </div>
                  <p className="text-stone-400">
                    Rest 6 minutes on a warm board. Slice across grain into 8mm medallions, spoon fresh chimichurri and savory crunch garnish.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center gap-4 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-stone-800 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-xs text-stone-300 font-light leading-relaxed">
                Collection boxes vacuum-packed fresh every weekend. Reserve your weekly raw or pre-seasoned cuts for pickup in Leicester or Birmingham.
              </div>
              <a
                href={BRAND_INFO.jotformShop}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#c5a880] hover:text-[#09090a] border border-stone-800 hover:border-[#c5a880] text-stone-200 text-xs uppercase tracking-widest font-medium transition-all duration-300"
              >
                <span>Shop Raw Cuts JotForm</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

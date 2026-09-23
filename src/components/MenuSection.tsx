import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/content';
import { MenuItem } from '../types/steakholders';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenReserve: () => void;
}

export default function MenuSection({ onSelectItem, onOpenReserve }: MenuSectionProps) {
  const [filter, setFilter] = useState<'all' | 'boxes' | 'drinks' | 'addon'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'boxes') return item.cutType === 'sirloin' || item.cutType === 'ribeye';
    if (filter === 'drinks') return item.cutType === 'beverage';
    if (filter === 'addon') return item.cutType === 'addon';
    return true;
  });

  const handleAdd = (item: MenuItem) => {
    onSelectItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0c0c0e] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-stone-800">
          <div className="space-y-3 sm:space-y-4 max-w-xl">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
              <span>03</span>
              <span className="w-6 h-[1px] bg-[#c5a880]/60" />
              <span>Weekend Carte</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
              The Steak &amp; Chips Selection
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Cooked to your chosen doneness, carved over hand-cut golden chips, and dressed with freshly chopped herb chimichurri and savory crunch garnish.
            </p>
          </div>

          {/* Minimalist Editorial Filter Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar text-xs uppercase tracking-[0.18em] font-medium text-stone-400 py-1">
            <button
              onClick={() => setFilter('all')}
              className={`pb-1 transition-colors ${
                filter === 'all'
                  ? 'text-[#c5a880] border-b border-[#c5a880]'
                  : 'hover:text-stone-200'
              }`}
            >
              All Offerings
            </button>
            <button
              onClick={() => setFilter('boxes')}
              className={`pb-1 transition-colors ${
                filter === 'boxes'
                  ? 'text-[#c5a880] border-b border-[#c5a880]'
                  : 'hover:text-stone-200'
              }`}
            >
              Steak Boxes
            </button>
            <button
              onClick={() => setFilter('drinks')}
              className={`pb-1 transition-colors ${
                filter === 'drinks'
                  ? 'text-[#c5a880] border-b border-[#c5a880]'
                  : 'hover:text-stone-200'
              }`}
            >
              Collab Drinks
            </button>
            <button
              onClick={() => setFilter('addon')}
              className={`pb-1 transition-colors ${
                filter === 'addon'
                  ? 'text-[#c5a880] border-b border-[#c5a880]'
                  : 'hover:text-stone-200'
              }`}
            >
              Additions
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-stone-950 border border-stone-800/80 hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Media Image container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent pointer-events-none" />

                  {item.badge && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-stone-950/90 border border-stone-800 text-[10px] uppercase tracking-widest text-[#c5a880]">
                      {item.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 text-stone-200 font-mono text-sm tabular-nums px-2 py-0.5 bg-stone-950/90 border border-stone-800">
                    £{item.price.toFixed(2)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-normal text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-xs font-light mt-1.5 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Item details list */}
                  <ul className="space-y-1.5 pt-3 border-t border-stone-900 text-[11px] text-stone-400 font-light">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#c5a880]/60 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => handleAdd(item)}
                  className={`w-full min-h-[44px] py-2.5 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                    addedId === item.id
                      ? 'bg-stone-800 border-stone-700 text-[#c5a880]'
                      : 'bg-transparent hover:bg-[#c5a880] hover:text-[#09090a] border-stone-800 hover:border-[#c5a880] text-stone-300'
                  }`}
                >
                  {addedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added To Selection</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add To Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Upgrade Callout Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-10 bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono block">
              Butcher's Choice
            </span>
            <h4 className="text-xl sm:text-2xl font-serif text-[#f5f2eb]">
              Upgrade any meal to Prime Ribeye (+£4.00)
            </h4>
            <p className="text-xs text-stone-400 font-light max-w-xl leading-relaxed">
              Intense intramuscular marbling that renders into pure culinary gold on our screaming hot cast iron. Simply select Ribeye Box when booking.
            </p>
          </div>

          <button
            onClick={onOpenReserve}
            className="w-full md:w-auto min-h-[44px] px-8 py-3.5 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shrink-0 text-center"
          >
            Configure Weekend Box
          </button>
        </div>
      </div>
    </section>
  );
}

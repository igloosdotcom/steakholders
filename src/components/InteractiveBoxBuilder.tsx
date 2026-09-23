import { useState } from 'react';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { MenuItem } from '../types/steakholders';
import { MENU_ITEMS } from '../data/content';

interface InteractiveBoxBuilderProps {
  onSelectItem: (
    item: MenuItem,
    preferences?: {
      doneness?: 'Rare' | 'Medium Rare' | 'Medium' | 'Well Done';
      sauce?: string;
      replaceDefault?: boolean;
    }
  ) => void;
  onOpenReserve: () => void;
}

export default function InteractiveBoxBuilder({
  onSelectItem,
  onOpenReserve
}: InteractiveBoxBuilderProps) {
  const [steakCut, setSteakCut] = useState<'sirloin' | 'ribeye'>('sirloin');
  const [portionSize, setPortionSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [doneness, setDoneness] = useState<'Rare' | 'Medium Rare' | 'Medium' | 'Well Done'>('Medium Rare');
  const [chipsStyle, setChipsStyle] = useState<'classic' | 'no-salt'>('classic');
  const [sauceChoice, setSauceChoice] = useState<'peppercorn' | 'mushroom' | 'none'>('peppercorn');
  const [beverage, setBeverage] = useState<'none' | 'matcha' | 'mojito'>('matcha');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Compute live price
  const basePrice = steakCut === 'sirloin' ? 15.0 : 19.0;
  const sizeModifier = portionSize === 'small' ? -2.0 : portionSize === 'large' ? 3.5 : 0.0;
  const sauceExtra = sauceChoice === 'peppercorn' || sauceChoice === 'mushroom' ? 1.0 : 0.0;
  const drinkPrice = beverage === 'matcha' ? 5.0 : beverage === 'mojito' ? 4.5 : 0.0;
  const totalPrice = basePrice + sizeModifier + sauceExtra + drinkPrice;

  const handleBuildBox = () => {
    // Find matching base steak item
    const baseItem = MENU_ITEMS.find(m => m.cutType === steakCut) || MENU_ITEMS[0];
    const sauceName =
      sauceChoice === 'peppercorn'
        ? 'Peppercorn Sauce (+£1.00)'
        : sauceChoice === 'mushroom'
        ? 'Mushroom Sauce (+£1.00)'
        : 'No Sauce';
    const chipsName = chipsStyle === 'classic' ? 'Maldon Sea Salt Chips' : 'No Salt Chips';
    const sizeName =
      portionSize === 'small'
        ? 'Small Box (150g)'
        : portionSize === 'large'
        ? 'Large Box (280g)'
        : 'Medium Box (200g)';
    const donenessLabel = doneness === 'Medium Rare' ? 'Medium Rare (Chef Standard)' : doneness;

    const customBoxItem: MenuItem = {
      ...baseItem,
      id: `${baseItem.id}-${portionSize}-${doneness.toLowerCase().replace(/\s+/g, '-')}-${sauceChoice}-${chipsStyle}`,
      name: `${baseItem.name} (${portionSize.toUpperCase()} · ${doneness})`,
      price: basePrice + sizeModifier + sauceExtra,
      details: [
        `${sizeName} · Cooked ${donenessLabel}`,
        chipsName,
        sauceName,
        'Signature Secret Steakholders Garnish'
      ]
    };

    const targetSauce =
      sauceChoice === 'peppercorn'
        ? 'Peppercorn Sauce (+£1.00)'
        : sauceChoice === 'mushroom'
        ? 'Mushroom Sauce (+£1.00)'
        : 'Signature Chimichurri';

    // Capture all data, synchronize with modal, and replace initial template box
    onSelectItem(customBoxItem, {
      doneness,
      sauce: targetSauce,
      replaceDefault: true
    });

    // If beverage selected, add that as well
    if (beverage === 'matcha') {
      const matchaItem = MENU_ITEMS.find(m => m.id === 'collab-matcha' || m.id === 'mismatcha-latte');
      if (matchaItem) onSelectItem(matchaItem);
    } else if (beverage === 'mojito') {
      const mojitoItem = MENU_ITEMS.find(m => m.id === 'iced-mojito' || m.id === 'fresh-mojito');
      if (mojitoItem) onSelectItem(mojitoItem);
    }

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onOpenReserve();
    }, 400);
  };

  return (
    <section id="builder" className="py-24 bg-[#09090a] border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
              <span>Bespoke Assembly</span>
              <span className="w-6 h-[1px] bg-[#c5a880]/60" />
              <span>Plating Station</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
              Build Your Weekend Box
            </h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Tailor every layer from cut selection to chip seasoning and collaborative drink pairing.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono block">
              Configured Box Total
            </span>
            <span className="text-2xl sm:text-3xl font-mono text-[#c5a880] font-medium tabular-nums">
              £{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Layer Configuration Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Steak Base, Size & Doneness */}
            <div className="p-6 bg-stone-950 border border-stone-800 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  1. The Prime Steak Base
                </span>
                <span className="text-[10px] font-mono text-[#c5a880]">Step 01 / 04</span>
              </div>

              {/* Cut Selection */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-stone-400 font-mono flex items-center justify-between">
                  <span>A. Select Cut</span>
                  <span className="text-stone-500 text-[10px] font-mono lowercase">100% HMC certified</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSteakCut('sirloin')}
                    className={`p-3.5 text-left border transition-all ${
                      steakCut === 'sirloin'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex justify-between font-serif text-sm">
                      <span>Angus Sirloin</span>
                      <span className="font-mono text-xs text-[#c5a880]">Base £15.00</span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-light mt-1">
                      28-day aged, distinct beef depth with succulent tenderness.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSteakCut('ribeye')}
                    className={`p-3.5 text-left border transition-all ${
                      steakCut === 'ribeye'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex justify-between font-serif text-sm">
                      <span>Prime Angus Ribeye</span>
                      <span className="font-mono text-xs text-[#c5a880]">Base £19.00</span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-light mt-1">
                      Dense marbling that liquefies on high sear into pure luxury.
                    </p>
                  </button>
                </div>
              </div>

              {/* Box Size: Small - Medium - Large */}
              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <label className="text-[11px] uppercase tracking-wider text-stone-400 font-mono flex items-center justify-between">
                  <span>B. Box Size</span>
                  <span className="text-[#c5a880] text-[10px] font-mono">Small · Medium · Large</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPortionSize('small')}
                    className={`p-3 text-left border transition-all ${
                      portionSize === 'small'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100 shadow-sm'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-center font-serif text-xs">
                      <span>Small</span>
                      <span className="text-[#c5a880] font-mono text-[10px]">-£2.00</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light mt-1">
                      ~150g portion
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortionSize('medium')}
                    className={`p-3 text-left border transition-all ${
                      portionSize === 'medium'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100 shadow-sm'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-center font-serif text-xs">
                      <span>Medium</span>
                      <span className="text-stone-400 font-mono text-[10px]">Standard</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light mt-1">
                      ~200g standard
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortionSize('large')}
                    className={`p-3 text-left border transition-all ${
                      portionSize === 'large'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100 shadow-sm'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-center font-serif text-xs">
                      <span>Large</span>
                      <span className="text-[#c5a880] font-mono text-[10px]">+£3.50</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light mt-1">
                      ~280g king cut
                    </p>
                  </button>
                </div>
              </div>

              {/* Doneness: Rare - Medium Rare (Chef Standard) - Medium - Well Done */}
              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <label className="text-[11px] uppercase tracking-wider text-stone-400 font-mono flex items-center justify-between">
                  <span>C. Doneness</span>
                  <span className="text-stone-400 text-[10px] font-mono">Skillet Sear</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setDoneness('Rare')}
                    className={`p-2.5 text-left border transition-all ${
                      doneness === 'Rare'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-serif text-xs text-stone-200">Rare</div>
                    <p className="text-[10px] text-stone-500 font-light mt-0.5">
                      Warm red center
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDoneness('Medium Rare')}
                    className={`p-2.5 text-left border transition-all ${
                      doneness === 'Medium Rare'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-serif text-xs text-[#c5a880] font-medium leading-tight">
                      Medium Rare
                    </div>
                    <div className="text-[9px] text-[#c5a880]/90 font-mono uppercase mt-0.5">Chef Standard</div>
                    <p className="text-[10px] text-stone-500 font-light mt-0.5">
                      Warm red center, tender
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDoneness('Medium')}
                    className={`p-2.5 text-left border transition-all ${
                      doneness === 'Medium'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-serif text-xs text-stone-200">Medium</div>
                    <p className="text-[10px] text-stone-500 font-light mt-0.5">
                      Warm pink center
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDoneness('Well Done')}
                    className={`p-2.5 text-left border transition-all ${
                      doneness === 'Well Done'
                        ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-serif text-xs text-stone-200">Well Done</div>
                    <p className="text-[10px] text-stone-500 font-light mt-0.5">
                      Cooked through
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Potato Chips Style */}
            <div className="p-6 bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  2. Double-Fried Hand Cut Chips
                </span>
                <span className="text-[10px] font-mono text-[#c5a880]">Step 02 / 04</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setChipsStyle('classic')}
                  className={`p-3.5 text-left border transition-all ${
                    chipsStyle === 'classic'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="font-serif text-sm text-stone-200">Classic Flaky Sea Salt</div>
                  <p className="text-[11px] text-stone-500 font-light mt-1">
                    Double-fried golden potato with pure Maldon sea salt crystals.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setChipsStyle('no-salt')}
                  className={`p-3.5 text-left border transition-all ${
                    chipsStyle === 'no-salt'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="font-serif text-sm text-stone-200">No Salt</div>
                  <p className="text-[11px] text-stone-500 font-light mt-1">
                    Double-fried golden potato with zero added salt or seasoning.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 3: Sauce Selection */}
            <div className="p-6 bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  3. House Sauce Selection
                </span>
                <span className="text-[10px] font-mono text-[#c5a880]">Step 03 / 04</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSauceChoice('peppercorn')}
                  className={`p-3 text-left border transition-all ${
                    sauceChoice === 'peppercorn'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex justify-between items-center font-serif text-xs text-stone-200">
                    <span>Peppercorn Sauce</span>
                    <span className="text-[#c5a880] font-mono text-[11px]">+£1.00</span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">Cracked peppercorns, cream reductions smooth steak sauce.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSauceChoice('mushroom')}
                  className={`p-3 text-left border transition-all ${
                    sauceChoice === 'mushroom'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex justify-between items-center font-serif text-xs text-stone-200">
                    <span>Mushroom Sauce</span>
                    <span className="text-[#c5a880] font-mono text-[11px]">+£1.00</span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">Sautéed wild mushrooms, rich velvety steak sauce.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSauceChoice('none')}
                  className={`p-3 text-left border transition-all ${
                    sauceChoice === 'none'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex justify-between items-center font-serif text-xs text-stone-200">
                    <span>No Sauce</span>
                    <span className="text-stone-400 font-mono text-[11px]">£0.00</span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">Pure skillet steak flavor with golden crisp chips.</div>
                </button>
              </div>
            </div>

            {/* Step 4: Collab Beverage Pairing */}
            <div className="p-6 bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  4. Collab Beverage Pairing
                </span>
                <span className="text-[10px] font-mono text-[#c5a880]">Step 04 / 04</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setBeverage('matcha')}
                  className={`p-3 text-left border transition-all ${
                    beverage === 'matcha'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://i.ibb.co/DDc47n4C/matcha.jpg"
                      alt="Mis-Matcha Collab Latte"
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-sm object-cover border border-stone-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between font-serif text-xs text-stone-200">
                        <span className="truncate">Mis-Matcha</span>
                        <span className="text-[#c5a880] font-mono shrink-0">+£5.00</span>
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">Kyoto stone-ground matcha.</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBeverage('mojito')}
                  className={`p-3 text-left border transition-all ${
                    beverage === 'mojito'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://i.ibb.co/fdbdrctc/mojitohome.jpg"
                      alt="Steakholders Iced Mint Mojito"
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-sm object-cover border border-stone-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between font-serif text-xs text-stone-200">
                        <span className="truncate">Mint Mojito</span>
                        <span className="text-[#c5a880] font-mono shrink-0">+£4.50</span>
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">Crushed mint &amp; lime fizz.</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBeverage('none')}
                  className={`p-3 text-left border transition-all ${
                    beverage === 'none'
                      ? 'bg-stone-900 border-[#c5a880] text-stone-100'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="font-serif text-xs text-stone-200">No Beverage</div>
                  <div className="text-[10px] text-stone-500 mt-1">Steak and chips box exclusively.</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Box Manifest & Order CTA */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-stone-950 border border-stone-800 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono block">
                  Weekend Plating Manifest
                </span>
                <span className="text-[10px] font-mono text-stone-500">Live Plating Preview</span>
              </div>

              {/* Freshly Plated Box Preview Image */}
              <div className="relative aspect-[16/10] overflow-hidden border border-stone-800 bg-stone-900 group">
                <img
                  src="https://i.ibb.co/VY6XcMtn/steakmain.jpg"
                  alt="Freshly plated Steakholders Angus steak & chips box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/85 backdrop-blur-sm border border-stone-800 text-[10px] font-mono text-stone-200">
                  {steakCut === 'sirloin' ? 'Angus Sirloin' : 'Prime Ribeye'} Plating
                </div>
              </div>

              {beverage === 'matcha' && (
                <div className="flex items-center gap-3 p-3 bg-stone-900/80 border border-stone-800">
                  <img
                    src="https://i.ibb.co/DDc47n4C/matcha.jpg"
                    alt="Mis-Matcha Collab Latte"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover border border-stone-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-serif text-stone-200">Mis-Matcha x Steakholders Collab</div>
                    <div className="text-[10px] text-[#c5a880] font-mono">Paired Chilled Beverage (+£5.00)</div>
                  </div>
                </div>
              )}

              {beverage === 'mojito' && (
                <div className="flex items-center gap-3 p-3 bg-stone-900/80 border border-stone-800">
                  <img
                    src="https://i.ibb.co/fdbdrctc/mojitohome.jpg"
                    alt="Steakholders Iced Mint Mojito"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover border border-stone-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-serif text-stone-200">Steakholders Iced Mint Mojito</div>
                    <div className="text-[10px] text-[#c5a880] font-mono">Paired Chilled Beverage (+£4.50)</div>
                  </div>
                </div>
              )}

              {/* Box Preview Visualization */}
              <div className="space-y-3 font-mono text-xs border border-stone-800 p-4 bg-stone-900/50">
                <div className="flex items-center justify-between text-stone-400">
                  <span>Steak Foundation:</span>
                  <span className="text-stone-100 font-medium font-serif">
                    {steakCut === 'sirloin' ? 'Angus Sirloin Box' : 'Prime Ribeye Box'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Box Size:</span>
                  <span className="text-stone-200 uppercase">
                    {portionSize === 'small' ? 'Small (-£2.00)' : portionSize === 'large' ? 'Large (+£3.50)' : 'Medium (Standard)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Doneness:</span>
                  <span className="text-[#c5a880]">
                    {doneness === 'Medium Rare' ? 'Medium Rare (Chef Standard)' : doneness}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Chips Base:</span>
                  <span className="text-stone-200">
                    {chipsStyle === 'classic' ? 'Maldon Sea Salt' : 'No Salt'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Sauce:</span>
                  <span className="text-stone-200">
                    {sauceChoice === 'peppercorn'
                      ? 'Peppercorn Sauce (+£1.00)'
                      : sauceChoice === 'mushroom'
                      ? 'Mushroom Sauce (+£1.00)'
                      : 'No Sauce (£0.00)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Secret Garnish:</span>
                  <span className="text-stone-200">Crispy Savory Crunch (Included)</span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Beverage:</span>
                  <span className="text-[#c5a880]">
                    {beverage === 'matcha' ? 'Mis-Matcha Iced Latte' : beverage === 'mojito' ? 'Fresh Mint Mojito' : 'None'}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-sm">
                  <span className="text-stone-300 font-serif font-light">Subtotal:</span>
                  <span className="text-lg font-mono text-[#c5a880] font-bold tabular-nums">
                    £{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBuildBox}
                  className="w-full py-4 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/10"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Order Captured · Opening Reserve Box</span>
                    </>
                  ) : (
                    <>
                      <span>Lock In &amp; Finalise in Reserve Box (£{totalPrice.toFixed(2)})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 font-light text-center leading-relaxed">
                  Captures all custom specifications (size, doneness, cut, chips &amp; sauce) and prepares your Reserve Box ready to finalise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

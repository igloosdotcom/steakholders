import { useState } from 'react';
import { Sparkles, Flame, Lock, Unlock, ArrowUpRight, Check, Plus, Eye } from 'lucide-react';
import { MenuItem } from '../types/steakholders';
import secretCutImg from '../assets/images/chefs_secret_cut_1790668214014.jpg';

interface MysteryMenuCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
}

export default function MysteryMenuCard({ item, onSelectItem }: MysteryMenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Active revealed state on hover or mobile tap
  const isRevealed = isHovered || isTouchActive;

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prepare item with revealed details for reservation modal & cart
    const orderableItem: MenuItem = {
      ...item,
      name: item.secretName || item.name,
      description: item.secretDescription || item.description,
      details: item.secretDetails || item.details,
      badge: item.secretBadge || item.badge
    };
    onSelectItem(orderableItem);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const toggleTouchReveal = () => {
    setIsTouchActive(prev => !prev);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleTouchReveal}
      className={`relative bg-stone-950 border transition-all duration-700 ease-out flex flex-col justify-between group h-full cursor-pointer overflow-hidden ${
        isRevealed
          ? 'border-[#c5a880] secret-card-revealed -translate-y-1'
          : 'border-amber-900/40 hover:border-[#c5a880]/60'
      }`}
      role="region"
      aria-label="Chef's Secret Mystery Box"
    >
      {/* Ambient Molten Corner Glow */}
      <div
        className={`absolute -top-16 -right-16 w-36 h-36 rounded-full pointer-events-none transition-all duration-700 blur-[50px] ${
          isRevealed ? 'bg-[#c5a880]/25 scale-125' : 'bg-amber-800/10'
        }`}
      />

      <div>
        {/* Media Frame with Dual Layers: Mystery Shroud & Revealed Cut */}
        <div className="relative aspect-[4/3] overflow-hidden bg-black select-none">
          {/* Layer 1: Revealed High-Resolution Sizzling Cut */}
          <img
            src={secretCutImg}
            alt="Chef's Secret: 35-Day Salt-Aged British Angus Picanha with Bone Marrow Butter"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isRevealed ? 'scale-105 filter-none brightness-100' : 'scale-100 filter brightness-[0.35] blur-[1px]'
            }`}
          />

          {/* Golden Shimmer Wave on Hover Trigger */}
          <div
            className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#c5a880]/25 to-transparent transition-transform duration-1000 ease-in-out ${
              isRevealed ? 'translate-x-full' : '-translate-x-full'
            }`}
          />

          {/* Layer 2: Mysterious Wax Seal & Culinary Smoke Shroud (Dissolves on Hover) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${
              isRevealed
                ? 'opacity-0 scale-110 pointer-events-none'
                : 'opacity-100 scale-100 bg-stone-950/75 backdrop-blur-[2px]'
            }`}
          >
            {/* Wax Seal Crest */}
            <div className="relative mb-3 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[#c5a880]/60 bg-stone-900/90 flex flex-col items-center justify-center shadow-lg shadow-black/80 group-hover:border-[#c5a880] transition-colors">
                <Flame className="w-6 h-6 text-[#c5a880] animate-pulse" />
                <span className="text-[8px] uppercase tracking-widest font-mono text-[#c5a880] mt-0.5">
                  Private
                </span>
              </div>
              <span className="absolute -bottom-1 px-2 py-0.5 bg-[#c5a880] text-[#09090a] text-[8px] font-mono font-bold tracking-widest uppercase rounded-none">
                Seal
              </span>
            </div>

            <div className="text-stone-300 font-serif text-sm tracking-wide">
              Kitchen Dry-Age Archive
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#c5a880] font-mono tracking-widest uppercase mt-1">
              <Lock className="w-3 h-3 text-[#c5a880]" />
              <span>Hover To Unveil Secret</span>
            </div>
          </div>

          {/* Top Left Badge */}
          <div className="absolute top-3 left-3 z-10">
            {isRevealed ? (
              <div className="px-2.5 py-1 bg-black/90 border border-[#c5a880] text-[10px] uppercase tracking-widest text-[#c5a880] flex items-center gap-1.5 animate-fadeIn">
                <Sparkles className="w-3 h-3 text-[#c5a880]" />
                <span className="font-mono font-medium">Secret Cut Unlocked</span>
              </div>
            ) : (
              <div className="px-2.5 py-1 bg-stone-950/90 border border-amber-900/60 text-[10px] uppercase tracking-widest text-[#c5a880] flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-stone-400" />
                <span>Chef's Secret</span>
              </div>
            )}
          </div>

          {/* Top Right Limited Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-stone-950/90 border border-stone-800 text-stone-400">
              Weekend Exclusive
            </span>
          </div>

          {/* Bottom Right Price Tag */}
          <div className="absolute bottom-3 right-3 z-10 text-stone-200 font-mono text-sm tabular-nums px-2.5 py-0.5 bg-stone-950/95 border border-stone-800 flex items-center gap-1">
            <span className="text-[#c5a880] font-semibold">£{item.price.toFixed(2)}</span>
            <span className="text-[10px] text-stone-400">Box</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono">
                {isRevealed ? 'Curated Master Cut' : 'Off-Menu Discovery'}
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                {isRevealed ? 'Rare · Med Rare' : '20 Portions Only'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-serif font-normal text-[#f5f2eb] transition-colors leading-snug">
              {isRevealed ? (
                <span className="text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors">
                  {item.secretName}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>The Mystery Box · Chef's Secret</span>
                  <Eye className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                </span>
              )}
            </h3>

            <p className="text-stone-400 text-xs font-light mt-1.5 leading-relaxed min-h-[3.8rem]">
              {isRevealed ? item.secretDescription : item.description}
            </p>
          </div>

          {/* Details List */}
          <div className="pt-3 border-t border-stone-900/90">
            <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono mb-2 flex items-center justify-between">
              <span>{isRevealed ? "Chef's Tasting Manifest" : "Locked Specifications"}</span>
              <span className="text-[#c5a880] text-[9px] lowercase font-mono">
                {isRevealed ? 'unveiled' : 'hover / tap card'}
              </span>
            </div>

            <ul className="space-y-1.5 text-[11px] font-light">
              {(isRevealed ? (item.secretDetails || item.details) : item.details).map((detail, dIdx) => (
                <li
                  key={dIdx}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    isRevealed ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  {isRevealed ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0 animate-pulse" />
                  ) : (
                    <Lock className="w-2.5 h-2.5 text-stone-600 shrink-0" />
                  )}
                  <span className={!isRevealed && dIdx < 3 ? 'tracking-wider' : ''}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Card Action */}
      <div className="p-5 sm:p-6 pt-0">
        <button
          onClick={handleOrder}
          className={`w-full min-h-[44px] py-2.5 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
            justAdded
              ? 'bg-stone-800 border-stone-700 text-[#c5a880]'
              : isRevealed
              ? 'bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] border-[#c5a880] shadow-md shadow-[#c5a880]/10 font-semibold'
              : 'bg-stone-900/80 hover:bg-[#c5a880] hover:text-[#09090a] border-stone-800 hover:border-[#c5a880] text-stone-300'
          }`}
          aria-label={isRevealed ? "Order Chef's Secret Picanha Box" : "Claim Mystery Box"}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Chef's Secret Added</span>
            </>
          ) : isRevealed ? (
            <>
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Claim Chef's Secret (£22.00)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <Unlock className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Unveil &amp; Claim Box</span>
            </>
          )}
        </button>

        {/* Small Touch Prompt for Mobile Viewers */}
        <p className="text-[10px] text-stone-500 font-mono text-center mt-2 sm:hidden">
          Tap card to reveal or hide secret cut
        </p>
      </div>
    </div>
  );
}

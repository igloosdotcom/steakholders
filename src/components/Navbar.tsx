import { useState, useEffect } from 'react';
import { Beef, Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface NavbarProps {
  onOpenReserve: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenReserve, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090a]/95 backdrop-blur-md border-b border-stone-800 py-3.5 shadow-2xl'
          : 'bg-transparent border-b border-stone-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-serif font-normal tracking-[0.25em] uppercase text-[#f5f2eb] hover:text-[#c5a880] transition-colors whitespace-nowrap"
        >
          {BRAND_INFO.name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-medium text-stone-400">
          <a
            href="#story"
            className="hover:text-[#c5a880] transition-colors"
          >
            Origin
          </a>
          <a
            href="#doneness"
            className="hover:text-[#c5a880] transition-colors"
          >
            Doneness Dial
          </a>
          <a
            href="#builder"
            className="hover:text-[#c5a880] transition-colors"
          >
            Box Builder
          </a>
          <a
            href="#menu"
            className="hover:text-[#c5a880] transition-colors"
          >
            Carte
          </a>
          <a
            href="#butcher"
            className="hover:text-[#c5a880] transition-colors"
          >
            Raw Cuts
          </a>
          <a
            href="#visit"
            className="hover:text-[#c5a880] transition-colors"
          >
            Kitchen Hub
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onOpenReserve}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
            title="View Order Selection"
            aria-label="View Order Selection"
          >
            <Beef className="w-5 h-5 text-[#c5a880]" />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-[#c5a880] text-[#09090a] text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums shadow">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenReserve}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-[11px] font-medium tracking-[0.2em] uppercase text-[#09090a] bg-[#c5a880] hover:bg-[#d6bc96] transition-all duration-300 whitespace-nowrap shadow-sm"
          >
            <span>Reserve Box</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile hamburger button with 44x44 minimum touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#c5a880]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer with backdrop overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[65px] bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 md:hidden bg-stone-950/98 backdrop-blur-xl border-b border-stone-800 px-6 py-6 space-y-5 max-h-[calc(100dvh-70px)] overflow-y-auto shadow-2xl">
            <nav className="flex flex-col gap-3.5 text-xs font-medium tracking-[0.2em] uppercase text-stone-300">
              <a
                href="#builder"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 bg-stone-900/60 border border-[#c5a880]/30 text-[#c5a880] flex items-center justify-between transition-colors"
              >
                <span>Bespoke Box Builder</span>
                <span className="text-[10px] font-mono">Customise</span>
              </a>
              <a
                href="#doneness"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                Doneness Dial
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                Weekend Carte
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                Origin &amp; Family
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                The Sizzle Studio
              </a>
              <a
                href="#butcher"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                Raw &amp; Pre-Seasoned Cuts
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                Google Reviews (4.9★)
              </a>
              <a
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-1 hover:text-[#c5a880] transition-colors"
              >
                Birmingham Hub (B11 3RR)
              </a>
            </nav>
            <div className="pt-3 border-t border-stone-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReserve();
                }}
                className="w-full min-h-[46px] text-center text-xs font-medium tracking-[0.2em] uppercase text-[#09090a] bg-[#c5a880] hover:bg-[#d6bc96] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Reserve Steak &amp; Chips Box</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

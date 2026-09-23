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
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenReserve}
            className="relative p-2 text-stone-300 hover:text-white transition-colors"
            title="View Order Selection"
            aria-label="View Order Selection"
          >
            <Beef className="w-5 h-5 text-[#c5a880]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#c5a880] text-[#09090a] text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenReserve}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[#09090a] bg-[#c5a880] hover:bg-[#d6bc96] transition-all duration-300 whitespace-nowrap"
          >
            <span>Reserve Box</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-xs font-medium tracking-[0.2em] uppercase text-stone-300">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Origin &amp; Family
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c89116] transition-colors py-1"
            >
              The Sizzle
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Weekend Carte
            </a>
            <a
              href="#butcher"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Butcher Cuts (Angus HMC)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Google Reviews
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a880] transition-colors py-1"
            >
              Birmingham Hub (Est. London)
            </a>
          </nav>
          <div className="pt-4 border-t border-stone-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-3 text-center text-xs font-medium tracking-[0.2em] uppercase text-[#09090a] bg-[#c5a880] hover:bg-[#d6bc96] transition-colors flex items-center justify-center gap-2"
            >
              <span>Reserve Steak &amp; Chips Box</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

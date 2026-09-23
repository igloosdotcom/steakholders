import { BRAND_INFO } from '../data/content';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070708] border-t border-stone-900 py-16 text-stone-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <a
              href="#"
              className="text-xl font-serif font-normal tracking-[0.25em] uppercase text-[#f5f2eb] hover:text-[#c5a880] transition-colors"
            >
              {BRAND_INFO.name}
            </a>
            <p className="text-stone-400 text-xs font-light max-w-sm leading-relaxed">
              {BRAND_INFO.tagline}. Specialist Angus steak &amp; chips, 100% Halal HMC certified, cooked and served with passion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-medium text-stone-400">
            <a
              href={BRAND_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={BRAND_INFO.whatsappCommunity}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1"
            >
              <span>WhatsApp Channel</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={BRAND_INFO.jotformReserve}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1"
            >
              <span>Reservation Form</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={BRAND_INFO.jotformShop}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1"
            >
              <span>Shop Raw Cuts</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Steakholders. A family-run enterprise. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-stone-500">
            <span>Established in London</span>
            <span>·</span>
            <span>Now in Birmingham ({BRAND_INFO.birminghamPostcode})</span>
            <span>·</span>
            <span className="text-stone-400">HMC Certified Halal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

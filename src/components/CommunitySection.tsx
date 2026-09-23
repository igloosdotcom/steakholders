import { MessageSquare, Instagram, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

export default function CommunitySection() {
  return (
    <section className="py-16 sm:py-24 bg-[#09090a] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: WhatsApp Members Concierge */}
          <div className="p-5 sm:p-8 md:p-12 bg-stone-950 border border-stone-800 hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
                  06 · Private Circle
                </span>
                <span className="text-[10px] uppercase font-mono text-stone-500 border border-stone-800 px-2 py-0.5">
                  Direct Line
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-2xl sm:text-4xl font-serif font-light text-[#f5f2eb] tracking-tight">
                  The Members Channel
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                  Be first in line when weekend collection slots drop every Thursday. Receive private notifications for limited Prime Ribeye releases and special pop-up dates.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-stone-300 font-light pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c5a880] shrink-0" />
                  <span>Early access to weekend pre-order slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c5a880] shrink-0" />
                  <span>Direct communication with the Steakholders kitchen team</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c5a880] shrink-0" />
                  <span>Member-only secret sauce and collab beverage previews</span>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8">
              <a
                href={BRAND_INFO.whatsappCommunity}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] py-3.5 px-6 bg-stone-900 hover:bg-[#c5a880] text-stone-200 hover:text-[#09090a] border border-stone-700 hover:border-[#c5a880] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Official WhatsApp Channel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Instagram Visual Archive */}
          <div className="p-5 sm:p-8 md:p-12 bg-stone-950 border border-stone-800 hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
                  07 · Visual Archive
                </span>
                <span className="text-[10px] uppercase font-mono text-stone-500 border border-stone-800 px-2 py-0.5">
                  {BRAND_INFO.instagramHandle}
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-2xl sm:text-4xl font-serif font-light text-[#f5f2eb] tracking-tight">
                  Kitchen Dispatch
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                  Catch the weekly sizzling reels, behind-the-scenes butchery, customer unboxings, and real-time weekend sold-out countdowns.
                </p>
              </div>

              {/* Instagram mini gallery */}
              <div className="grid grid-cols-3 gap-3 py-2">
                <div className="aspect-square bg-black border border-stone-800 overflow-hidden">
                  <img
                    src="https://i.ibb.co/VY6XcMtn/steakmain.jpg"
                    alt="Steakholders Box on Instagram"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square bg-black border border-stone-800 overflow-hidden">
                  <img
                    src="/assets/steakholders/steak_chips_box.jpg"
                    alt="Steakholders takeout box on Instagram"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square bg-black border border-stone-800 overflow-hidden">
                  <img
                    src="/assets/steakholders/steak_close_up.jpg"
                    alt="Steak close-up on Instagram"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 bg-transparent hover:bg-stone-200 text-stone-200 hover:text-black border border-stone-700 hover:border-stone-200 font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @steakholders_ on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

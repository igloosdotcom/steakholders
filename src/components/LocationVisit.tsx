import { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface LocationVisitProps {
  onOpenReserve: () => void;
}

export default function LocationVisit({ onOpenReserve }: LocationVisitProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BRAND_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="visit" className="py-16 sm:py-24 bg-[#0c0c0e] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
            <span>08</span>
            <span className="w-6 h-[1px] bg-[#c5a880]/60" />
            <span>Locations &amp; Contact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
            Weekend Collection &amp; Inquiries
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
            Established in London, now serving every weekend at our Birmingham Hub. Freshly prepared for collection.
          </p>
        </div>

        {/* Merged Single Box: Active Kitchen Hub & Brand Heritage */}
        <div className="max-w-4xl mx-auto bg-stone-950 border border-stone-800 p-5 sm:p-8 md:p-12 shadow-2xl space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-stone-800/80 gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono">
                  Active Kitchen Hub
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-mono">
                  Brand Heritage
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif text-[#f5f2eb]">
                Birmingham Hub &amp; London Roots
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300 self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Weekend Service Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column: Active Kitchen Collection Details */}
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#c5a880]">
                  Weekend Collection (Birmingham)
                </h4>
                <p className="text-xs text-stone-400 font-light">
                  Cooked to order upon collection. Pre-orders are packed fresh in thermal containers.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs text-stone-300 font-light bg-stone-900/50 p-3.5 sm:p-4 border border-stone-850">
                <div>
                  <div className="text-stone-500 uppercase tracking-widest text-[10px]">Collection Address</div>
                  <div className="text-stone-200 mt-0.5 font-medium leading-relaxed">
                    {BRAND_INFO.fullAddress}
                  </div>
                  <div className="text-[11px] text-[#c5a880] font-mono mt-1">
                    Short Address: {BRAND_INFO.shortAddress}
                  </div>
                </div>
                <div className="pt-2 border-t border-stone-800/80">
                  <div className="text-stone-500 uppercase tracking-widest text-[10px]">Hours of Service</div>
                  <div className="text-stone-200 mt-0.5 font-medium">{BRAND_INFO.openingHours}</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={onOpenReserve}
                  className="w-full min-h-[44px] py-3.5 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Reserve Birmingham Weekend Box</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={BRAND_INFO.jotformBirmingham}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full min-h-[40px] py-2 text-[11px] uppercase tracking-wider text-stone-400 hover:text-stone-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Birmingham JotForm Directly</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Column: Brand Heritage & Business Enquiries */}
            <div className="space-y-5 sm:space-y-6 border-t md:border-t-0 md:border-l md:pl-8 lg:pl-12 border-stone-800/80 pt-6 md:pt-0">
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-stone-300">
                  Brand Heritage &amp; Catering
                </h4>
                <p className="text-xs text-stone-400 font-light">
                  Where the family craft started: established in London, now serving the Midlands.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs text-stone-300 font-light bg-stone-900/50 p-3.5 sm:p-4 border border-stone-850">
                <div>
                  <div className="text-stone-500 uppercase tracking-widest text-[10px]">The Journey</div>
                  <div className="text-stone-200 mt-0.5">Established in London · Now in Birmingham</div>
                </div>
                <div className="pt-2 border-t border-stone-800/80">
                  <div className="text-stone-500 uppercase tracking-widest text-[10px]">Business &amp; Events</div>
                  <div className="text-stone-200 mt-0.5 break-all">{BRAND_INFO.email}</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 bg-stone-900/60 border border-stone-800 flex items-center justify-between text-xs gap-2">
                  <span className="font-mono text-stone-300 truncate">{BRAND_INFO.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="min-h-[32px] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#c5a880] hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <a
                  href={`mailto:${BRAND_INFO.email}?subject=Steakholders%20Business%20Enquiry`}
                  className="w-full min-h-[44px] py-3.5 bg-transparent hover:bg-stone-200 text-stone-200 hover:text-[#09090a] border border-stone-700 hover:border-stone-200 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Business Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

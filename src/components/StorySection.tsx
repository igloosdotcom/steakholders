import { BRAND_INFO } from '../data/content';

export default function StorySection() {
  return (
    <section id="story" className="py-28 bg-[#0c0c0e] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Framing Photography */}
          <div className="lg:col-span-5">
            <div className="relative border border-stone-800 bg-stone-950 p-2 shadow-2xl">
              <div className="overflow-hidden aspect-[3/4]">
                <img
                  src="/assets/steakholders/steak_platter_prep.jpg"
                  alt="Steakholders chef preparing artisanal steak and chimichurri"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="pt-3 pb-1 px-1 flex items-center justify-between text-[11px] text-stone-500 uppercase tracking-widest font-mono">
                <span>Figure 02. The Prep Station</span>
                <span>Est. London · Now Birmingham</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
              <span>01</span>
              <span className="w-6 h-[1px] bg-[#c5a880]/60" />
              <span>Heritage &amp; Family</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight leading-[1.15]">
                Specialist Steak &amp; Chips. <br />
                <span className="italic font-normal text-[#c5a880]">Assembled with love.</span>
              </h2>

              <p className="text-stone-300 font-light text-base leading-relaxed">
                {BRAND_INFO.story}
              </p>
            </div>

            <div className="space-y-4 text-stone-400 font-light text-sm leading-relaxed border-t border-stone-800/80 pt-6">
              <p>
                What began as a passionate London venture obsessed with high-grade Angus beef and hand-cut crunch chips has evolved into a weekend ritual for food lovers across Birmingham.
              </p>
              <p>
                We believe exceptional luxury steak shouldn’t be locked away behind stiff white tablecloths. We bring genuine steakhouse mastery directly into the hands of the people.
              </p>
            </div>

            {/* Three Refined Editorial Pillars (No pill icons or badges) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-800/80">
              <div className="space-y-1">
                <div className="font-serif text-sm text-stone-200">
                  I. High Sear
                </div>
                <p className="text-xs text-stone-500 font-light leading-snug">
                  Smoking hot iron, deep caramelized crust, tender pink center.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-sm text-stone-200">
                  II. The Garnish
                </div>
                <p className="text-xs text-stone-500 font-light leading-snug">
                  Signature crunchy savory topping &amp; freshly whipped chimichurri.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-sm text-stone-200">
                  III. Angus HMC
                </div>
                <p className="text-xs text-stone-500 font-light leading-snug">
                  100% Halal certified, humanely raised, 28-day aged British beef.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

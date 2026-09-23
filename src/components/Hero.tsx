import { useState, useRef } from 'react';
import { ArrowUpRight, Play, Volume2, VolumeX, Eye, Flame } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface HeroProps {
  onOpenReserve: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenReserve, onOpenVideo }: HeroProps) {
  const [viewMode, setViewMode] = useState<'video' | 'photo'>('video');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 bg-[#09090a]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c5a880]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Statement & Interactive Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Editorial Kicker */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
              <span>{BRAND_INFO.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/80" />
              <span>Established in London · Now in Birmingham</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-[#f5f2eb] leading-[1.08]">
                The people’s <br />
                <span className="italic font-light text-[#c5a880]">Steak-away</span>.
              </h1>
              <p className="text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Established in London and now in Birmingham, serving the UK's most celebrated gourmet steak &amp; chips. High-grade Angus beef seared on screaming cast iron, double-fried chips, zesty chimichurri, and house crunch garnish.
              </p>
            </div>

            {/* Provenance & Schedule Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs text-stone-400 border-y border-stone-800/80 py-4 max-w-xl">
              <div>
                <span className="text-stone-500 uppercase tracking-widest text-[9px] block font-mono">Kitchen Hub</span>
                <span className="text-stone-200">{BRAND_INFO.shortAddress}</span>
              </div>
              <div className="hidden sm:block w-[1px] h-7 bg-stone-800" />
              <div>
                <span className="text-stone-500 uppercase tracking-widest text-[9px] block font-mono">Service Windows</span>
                <span className="text-stone-200">Every Weekend 17:00 – 22:30</span>
              </div>
              <div className="hidden sm:block w-[1px] h-7 bg-stone-800" />
              <div>
                <span className="text-stone-500 uppercase tracking-widest text-[9px] block font-mono">Quality Standard</span>
                <span className="text-[#c5a880]">100% Angus HMC Certified</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenReserve}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#c5a880]/10 hover:shadow-[#c5a880]/20"
              >
                <span>Reserve Weekend Box</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto px-7 py-3.5 bg-stone-900/60 border border-stone-800 hover:border-[#c5a880] text-stone-300 hover:text-white font-medium text-xs tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play className="w-3 h-3 fill-current text-[#c5a880]" />
                <span>The Sizzle Studio</span>
              </button>
            </div>

            {/* Taste Profile Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-[11px] text-stone-400 font-mono">
              <span className="px-2.5 py-1 bg-stone-950 border border-stone-800">
                28-Day Dry Aged
              </span>
              <span className="px-2.5 py-1 bg-stone-950 border border-stone-800">
                Cast Iron Caramelized Crust
              </span>
              <span className="px-2.5 py-1 bg-stone-950 border border-stone-800">
                Fresh Chimichurri
              </span>
              <span className="px-2.5 py-1 bg-stone-950 border border-stone-800 text-[#c5a880]">
                Mis-Matcha Collab
              </span>
            </div>
          </div>

          {/* Right Column: Live Interactive Media Center */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative border border-stone-800 bg-stone-950 p-2 shadow-2xl">
                {/* Media Switcher Controls */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-stone-950/90 backdrop-blur-md p-1 border border-stone-800">
                  <button
                    onClick={() => setViewMode('video')}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono transition-all flex items-center gap-1 ${
                      viewMode === 'video'
                        ? 'bg-[#c5a880] text-[#09090a] font-semibold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>Live Reel</span>
                  </button>
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono transition-all flex items-center gap-1 ${
                      viewMode === 'photo'
                        ? 'bg-[#c5a880] text-[#09090a] font-semibold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Plating</span>
                  </button>
                </div>

                {/* Media Frame */}
                <div className="relative overflow-hidden aspect-[4/5] bg-black">
                  {viewMode === 'video' ? (
                    <>
                      <video
                        ref={videoRef}
                        src="/assets/steakholders/steak_reel_1.mp4"
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        autoPlay
                        muted={isMuted}
                      />
                      {/* Audio Mute/Unmute Float Toggle */}
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-4 left-4 z-20 px-3 py-1.5 bg-stone-950/85 backdrop-blur-md border border-stone-700 hover:border-[#c5a880] text-stone-200 text-[10px] uppercase tracking-wider font-mono flex items-center gap-2 transition-colors"
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                            <span>Unmute Kitchen Sizzle</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#c5a880]" />
                            <span className="text-[#c5a880]">Kitchen Sound On</span>
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <img
                      src="https://i.ibb.co/VY6XcMtn/steakmain.jpg"
                      alt="Steakholders signature carved Angus steak with chimichurri over chips in takeaway box"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent pointer-events-none" />

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 text-xs z-10">
                    <div className="font-mono text-stone-200 tabular-nums px-2.5 py-1 bg-stone-950/90 border border-stone-800">
                      £15.00 Box
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption & Status underneath */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 uppercase tracking-widest px-1 font-mono">
                <span className="flex items-center gap-1.5 text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Weekend Service Active</span>
                </span>
                <span>Assembled Fresh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

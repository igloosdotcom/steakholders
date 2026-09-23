import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Instagram, ExternalLink } from 'lucide-react';
import { VIDEOS, BRAND_INFO } from '../data/content';

interface VideoExperienceProps {
  onOpenReserve: () => void;
}

export default function VideoExperience({ onOpenReserve }: VideoExperienceProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = VIDEOS[activeVideoIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeVideoIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="experience" className="py-16 sm:py-24 bg-[#09090a] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
            <span>02</span>
            <span className="w-6 h-[1px] bg-[#c5a880]/60" />
            <span>Sensory Craft</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
            The Sizzle &amp; The Pour
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
            High heat sear, aromatic butter baste, and a shower of house chimichurri. Watch our weekend craft straight from the iron.
          </p>
        </div>

        {/* Video Player & Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Main Video Frame */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] bg-black border border-stone-800 overflow-hidden shadow-2xl">
              {activeVideo.isInstagram ? (
                <div className="relative w-full h-full bg-black flex flex-col">
                  <iframe
                    src={activeVideo.src}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    scrolling="no"
                  />

                  {/* Header Tag */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-stone-200 pointer-events-none z-10">
                    <span className="font-serif tracking-widest uppercase text-[#c5a880] text-[11px] bg-stone-950/90 px-2 py-0.5 border border-stone-800">
                      Live Reel
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono bg-stone-950/90 px-2 py-0.5 border border-stone-800">
                      0{activeVideoIndex + 1} / 0{VIDEOS.length}
                    </span>
                  </div>

                  {/* Open in Instagram action */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20">
                    <a
                      href={activeVideo.instagramUrl || BRAND_INFO.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-stone-950/90 hover:bg-[#c5a880] text-stone-200 hover:text-black border border-stone-700 hover:border-[#c5a880] text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors shadow-lg"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
                      <span>Open on Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={activeVideo.src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    autoPlay
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Title Bar */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-stone-200">
                    <span className="font-serif tracking-widest uppercase text-[#c5a880] text-[11px]">
                      {activeVideo.title}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      0{activeVideoIndex + 1} / 0{VIDEOS.length}
                    </span>
                  </div>

                  {/* Controls at bottom */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-2.5 bg-stone-900/80 hover:bg-[#c5a880] text-stone-200 hover:text-black border border-stone-700 transition-colors"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-2.5 bg-stone-900/80 hover:bg-[#c5a880] text-stone-200 hover:text-black border border-stone-700 transition-colors"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="p-2.5 bg-stone-900/80 hover:bg-[#c5a880] text-stone-200 hover:text-black border border-stone-700 transition-colors"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Video Selector & Culinary Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-mono block">
                Select Viewpoint
              </span>

              <div className="space-y-3">
                {VIDEOS.map((vid, idx) => (
                  <button
                    key={vid.id}
                    onClick={() => setActiveVideoIndex(idx)}
                    className={`w-full text-left p-5 border transition-all duration-300 block ${
                      activeVideoIndex === idx
                        ? 'bg-stone-900/70 border-[#c5a880]'
                        : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs uppercase tracking-wider font-medium ${
                        activeVideoIndex === idx ? 'text-[#c5a880]' : 'text-stone-300'
                      }`}>
                        {vid.title}
                      </span>
                      {activeVideoIndex === idx && (
                        <span className="text-[10px] text-[#c5a880] uppercase tracking-widest font-mono">
                          Viewing
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      {vid.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Culinary Standard Card */}
            <div className="p-6 bg-stone-950 border border-stone-800 space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                The Steakholders Standard
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Every order is cooked on screaming iron to your desired doneness, rested to lock in all beef juices, and carved across the grain on crunchy hand-cut chips.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenReserve}
                  className="text-xs tracking-wider uppercase text-[#c5a880] hover:text-[#e2d2bc] font-medium border-b border-[#c5a880]/50 pb-0.5"
                >
                  Reserve Your Weekend Meal Box &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

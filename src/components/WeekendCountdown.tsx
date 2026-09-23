import { useState, useEffect } from 'react';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface WeekendCountdownProps {
  onOpenReserve: () => void;
}

export default function WeekendCountdown({ onOpenReserve }: WeekendCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTargetTime = () => {
      const now = new Date();
      // Next Friday at 17:00 (5:00 PM) UK time
      const target = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 5 is Friday
      let daysUntilFriday = (5 - currentDay + 7) % 7;
      if (daysUntilFriday === 0 && now.getHours() >= 22) {
        daysUntilFriday = 7;
      }
      target.setDate(now.getDate() + daysUntilFriday);
      target.setHours(17, 0, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTargetTime();
    const interval = setInterval(calculateTargetTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111113] border-y border-stone-800/80 py-4 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Status & Location */}
        <div className="flex items-center gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]"></span>
            </span>
            <span className="font-mono uppercase tracking-[0.2em] text-[#c5a880] text-[10px]">
              Next Weekend Drop
            </span>
          </div>
          <span className="text-stone-600">·</span>
          <div className="flex items-center gap-1.5 text-stone-400">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{BRAND_INFO.shortAddress} · Every Weekend 17:00 – 22:30</span>
          </div>
        </div>

        {/* Center: Live Countdown Clock */}
        <div className="flex items-center gap-4 text-center font-mono">
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-stone-900 border border-stone-800 px-2.5 py-1 min-w-[48px]">
              <span className="text-base text-stone-100 font-semibold tabular-nums block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Days</span>
            </div>
            <span className="text-stone-600 text-sm">:</span>
            <div className="bg-stone-900 border border-stone-800 px-2.5 py-1 min-w-[48px]">
              <span className="text-base text-stone-100 font-semibold tabular-nums block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Hrs</span>
            </div>
            <span className="text-stone-600 text-sm">:</span>
            <div className="bg-stone-900 border border-stone-800 px-2.5 py-1 min-w-[48px]">
              <span className="text-base text-stone-100 font-semibold tabular-nums block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Mins</span>
            </div>
            <span className="text-stone-600 text-sm">:</span>
            <div className="bg-stone-900 border border-stone-800 px-2.5 py-1 min-w-[48px]">
              <span className="text-base text-[#c5a880] font-semibold tabular-nums block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Secs</span>
            </div>
          </div>
        </div>

        {/* Right: Reserve CTA */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-stone-400 font-light hidden lg:inline">
            Limited batch allocation
          </span>
          <button
            onClick={onOpenReserve}
            className="px-4 py-2 bg-stone-900 hover:bg-[#c5a880] text-[#c5a880] hover:text-[#09090a] border border-[#c5a880]/50 hover:border-[#c5a880] text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1.5"
          >
            <span>Pre-Book Slot</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

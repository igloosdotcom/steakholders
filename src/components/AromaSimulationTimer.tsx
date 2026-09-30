import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flame, Wind, Check, ArrowUpRight } from 'lucide-react';

interface AromaSimulationTimerProps {
  onPulseChange?: (isPulsing: boolean) => void;
  onOpenReserve?: () => void;
}

interface SizzlePreset {
  id: string;
  label: string;
  seconds: number;
  phaseTitle: string;
  notes: string;
  keyAroma: string;
}

const SIZZLE_PRESETS: SizzlePreset[] = [
  {
    id: 'maillard',
    label: '30s · Maillard Sear',
    seconds: 30,
    phaseTitle: 'Cast-Iron Crust & Tallow',
    notes: 'Intense caramelization of 28-day dry-aged Angus fat over screaming cast iron.',
    keyAroma: 'Roasted beef marrow, seared crust & caramelized tallow'
  },
  {
    id: 'baste',
    label: '15s · Butter Baste',
    seconds: 15,
    phaseTitle: 'Browned Butter & Thyme',
    notes: 'Foaming French butter spooned with bruised rosemary and smashed garlic cloves.',
    keyAroma: 'Hazelnut-brown butter, toasted garlic & aromatic wood herbs'
  },
  {
    id: 'flash',
    label: '10s · Chimichurri Flash',
    seconds: 10,
    phaseTitle: 'Zesty Herb Vapor Bloom',
    notes: 'Acidic flash as freshly whipped chimichurri hits the smoking hot steak surface.',
    keyAroma: 'Red wine vinegar steam, crushed wild oregano & cold-pressed oil'
  },
  {
    id: 'full-cycle',
    label: '45s · Prime Ribeye Cycle',
    seconds: 45,
    phaseTitle: 'Full Kitchen Sizzle Mastery',
    notes: 'Complete thermal progression from high-sear crust to butter glaze and skillet rest.',
    keyAroma: 'Prime marbling melt, charred pepper crust & chimichurri crackle'
  }
];

export default function AromaSimulationTimer({
  onPulseChange,
  onOpenReserve
}: AromaSimulationTimerProps) {
  const [selectedPreset, setSelectedPreset] = useState<SizzlePreset>(SIZZLE_PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState<number>(SIZZLE_PRESETS[0].seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  // Web Audio Synthesized Chime & Pan Sizzle
  const playAromaSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Harmonic Tone (Warm C5 to E5 chord)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.3); // E5
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.9);

      // Pan Sizzle Burst (Highpass filtered white noise)
      const bufferSize = Math.floor(ctx.sampleRate * 0.45);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.25;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3200, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch {
      // Audio playback fails silently if restricted
    }
  };

  // Trigger Haptic Vibration & Interface Pulse
  const triggerHapticAndPulse = () => {
    // 1. Device Vibration (Haptic feedback)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100, 50, 220]);
      } catch {
        // Ignore restriction
      }
    }

    // 2. Synthesized acoustic cue
    playAromaSound();

    // 3. Visual pulse on interface & notify parent
    setIsPulsing(true);
    if (onPulseChange) {
      onPulseChange(true);
    }

    setTimeout(() => {
      setIsPulsing(false);
      if (onPulseChange) {
        onPulseChange(false);
      }
    }, 2800);
  };

  // Timer Tick Mechanism (High precision using timestamp diff)
  useEffect(() => {
    if (isRunning) {
      lastTickRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTickRef.current) / 1000;
        lastTickRef.current = now;

        setTimeLeft(prev => {
          const next = prev - delta;
          if (next <= 0) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsCompleted(true);
            triggerHapticAndPulse();
            return 0;
          }
          return next;
        });
      }, 50);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleSelectPreset = (preset: SizzlePreset) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedPreset(preset);
    setTimeLeft(preset.seconds);
    setIsRunning(false);
    setIsCompleted(false);
    setIsPulsing(false);
    if (onPulseChange) onPulseChange(false);
  };

  const handleTogglePlay = () => {
    if (isCompleted || timeLeft <= 0) {
      setTimeLeft(selectedPreset.seconds);
      setIsCompleted(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setIsCompleted(false);
    setIsPulsing(false);
    setTimeLeft(selectedPreset.seconds);
    if (onPulseChange) onPulseChange(false);
  };

  // Progress percentage (0 to 100)
  const totalSeconds = selectedPreset.seconds;
  const progressRatio = Math.max(0, Math.min(1, 1 - timeLeft / totalSeconds));
  const progressPercent = Math.round(progressRatio * 100);

  // Dynamic sensory stage
  const getSensoryStage = () => {
    if (isCompleted || timeLeft <= 0) {
      return {
        stageNum: 'Peak',
        title: 'Aroma Peak Reached',
        desc: 'Crust caramelized, butter basted, chimichurri steam released.',
        color: 'text-[#c5a880]'
      };
    }
    if (progressRatio < 0.4) {
      return {
        stageNum: 'Stage I',
        title: 'Maillard Searing & Tallow Melt',
        desc: 'Deep beef crust developing on smoking cast iron.',
        color: 'text-amber-400'
      };
    }
    if (progressRatio < 0.75) {
      return {
        stageNum: 'Stage II',
        title: 'Butter Emulsion & Wood Herb Baste',
        desc: 'Hazelnut-brown butter foaming with rosemary & smashed garlic.',
        color: 'text-[#c5a880]'
      };
    }
    return {
      stageNum: 'Stage III',
      title: 'Chimichurri Flash & Aromatics Bloom',
      desc: 'Acidic vinegar vapor and herb oils bursting into the air.',
      color: 'text-rose-400'
    };
  };

  const currentStage = getSensoryStage();

  return (
    <div
      className={`bg-stone-950 border transition-all duration-500 p-5 sm:p-7 relative overflow-hidden ${
        isPulsing
          ? 'aroma-haptic-active border-[#c5a880] shadow-[0_0_35px_rgba(197,168,128,0.35)]'
          : isCompleted
          ? 'border-[#c5a880]/70'
          : 'border-stone-800'
      }`}
    >
      {/* Background ambient sizzle glow when running or completed */}
      {isRunning && (
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-500/10 blur-3xl pointer-events-none rounded-full animate-pulse" />
      )}
      {isPulsing && (
        <div className="absolute inset-0 bg-[#c5a880]/5 pointer-events-none transition-opacity duration-300" />
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#c5a880]">
            <Flame className={`w-4 h-4 ${isRunning ? 'animate-bounce text-amber-400' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#c5a880] font-medium">
                Aroma Simulation
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-600 hidden sm:inline-block" />
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono hidden sm:inline-block">
                Sizzle Timer
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-light mt-0.5">
              Live cast-iron thermal &amp; sensory scent countdown
            </p>
          </div>
        </div>

        {/* Audio Cue Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 border transition-colors ${
            soundEnabled
              ? 'bg-stone-900 border-stone-700 text-[#c5a880] hover:border-[#c5a880]'
              : 'bg-stone-950 border-stone-800 text-stone-600 hover:text-stone-400'
          }`}
          title={soundEnabled ? 'Aroma chime audio enabled' : 'Aroma audio muted'}
          aria-label={soundEnabled ? 'Mute aroma audio' : 'Enable aroma audio'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Preset Selector */}
      <div className="py-4 space-y-2">
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-500">
          <span>Choose Sizzle Stage</span>
          <span className="text-[#c5a880]">{selectedPreset.seconds}s Duration</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SIZZLE_PRESETS.map(preset => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-2.5 text-left border transition-all text-xs ${
                  isSelected
                    ? 'bg-stone-900 border-[#c5a880] text-stone-100 shadow-sm'
                    : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 text-stone-400'
                }`}
              >
                <div className="font-mono font-medium text-[11px] truncate">{preset.label}</div>
                <div className="text-[9px] text-stone-500 font-light mt-0.5 truncate">{preset.phaseTitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Countdown Centerpiece */}
      <div className="p-4 sm:p-5 bg-stone-900/40 border border-stone-800/80 space-y-4 my-2 relative">
        {/* Steam Wisps Visual Effect when running */}
        {isRunning && (
          <div className="absolute top-2 right-4 flex items-center gap-1.5 pointer-events-none opacity-80">
            <span
              className="text-[#c5a880] text-xs font-mono"
              style={{ animation: 'aroma-steam 1.4s ease-out infinite' }}
            >
              <Wind className="w-3.5 h-3.5" />
            </span>
            <span
              className="text-amber-400 text-xs font-mono"
              style={{ animation: 'aroma-steam 1.8s ease-out infinite 0.4s' }}
            >
              <Wind className="w-3 h-3" />
            </span>
          </div>
        )}

        {/* Big Digital Clock & Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-stone-500 font-mono block">
              Remaining Sizzle
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-4xl sm:text-5xl font-mono font-medium text-[#f5f2eb] tabular-nums tracking-tight">
                {timeLeft.toFixed(1)}
              </span>
              <span className="text-xs uppercase font-mono text-[#c5a880]">sec</span>
            </div>
          </div>

          {/* Current Stage Indicator */}
          <div className="sm:text-right">
            <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500 block">
              Sensory Profile
            </span>
            <span className={`text-xs font-medium font-serif ${currentStage.color} block`}>
              {currentStage.stageNum} · {currentStage.title}
            </span>
          </div>
        </div>

        {/* Sizzle Progress Track */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-stone-950 border border-stone-800 overflow-hidden relative">
            <div
              className={`h-full transition-all duration-75 ${
                isCompleted
                  ? 'bg-[#c5a880]'
                  : 'bg-gradient-to-r from-stone-700 via-amber-600 to-[#c5a880]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
            <span>0s Initial Iron Contact</span>
            <span>{progressPercent}% Vaporized</span>
            <span>{totalSeconds}s Finished Sear</span>
          </div>
        </div>

        {/* Live Aromatic Notes Box */}
        <div className="pt-1 text-xs text-stone-300 font-light flex items-start gap-2">
          <Wind className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            <strong className="text-stone-200 font-normal">Active Aromatics: </strong>
            <span className="text-stone-400">{selectedPreset.keyAroma}</span>
          </p>
        </div>
      </div>

      {/* Aroma Peak Reached Notification Banner */}
      {isCompleted && (
        <div
          className={`p-3.5 sm:p-4 my-3 bg-stone-900 border border-[#c5a880]/60 space-y-2.5 transition-all duration-300 ${
            isPulsing ? 'shadow-[0_0_20px_rgba(197,168,128,0.4)]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c5a880] font-medium">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Aroma Peak Reached · Haptic Sizzle Complete</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#c5a880] text-[#09090a] font-bold">
              Peak Flavor
            </span>
          </div>
          <p className="text-xs text-stone-300 font-light leading-relaxed">
            All 3 aromatic layers released: Dry-aged Angus tallow, browned herb butter, and chimichurri vapor. Ready for immediate carving over golden hand-cut chips.
          </p>
          {onOpenReserve && (
            <button
              onClick={onOpenReserve}
              className="w-full min-h-[40px] py-2 px-3 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] text-xs font-medium uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 mt-1"
            >
              <span>Reserve Fresh Weekend Box</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Control Actions */}
      <div className="pt-2 flex items-center gap-3">
        <button
          onClick={handleTogglePlay}
          className={`flex-1 min-h-[44px] py-2.5 px-4 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold'
              : isCompleted
              ? 'bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a]'
              : 'bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a]'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Sizzle</span>
            </>
          ) : isCompleted ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Aroma Sizzle ({selectedPreset.seconds}s)</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Aroma Sizzle ({timeLeft.toFixed(0)}s)</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="min-h-[44px] px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700 transition-colors flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider"
          title="Reset timer to preset duration"
          aria-label="Reset sizzle timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}

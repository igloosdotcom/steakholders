import { useEffect, useRef } from 'react';

export type CookingPhase = 'sear' | 'baste' | 'rest';
export type SteamIntensity = 'low' | 'normal' | 'high';

interface SteamParticleCanvasProps {
  isPlaying: boolean;
  phase: CookingPhase;
  intensity: SteamIntensity;
  enabled: boolean;
  burstCount?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  growth: number;
  maxSize: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  swaySpeed: number;
  swayOffset: number;
  swayAmp: number;
  r: number;
  g: number;
  b: number;
  isSpark?: boolean;
}

export default function SteamParticleCanvas({
  isPlaying,
  phase,
  intensity,
  enabled,
  burstCount = 0,
  className = ''
}: SteamParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastBurstRef = useRef<number>(burstCount);

  // Particle emission configuration based on cooking phase & intensity
  const getPhaseConfig = () => {
    switch (phase) {
      case 'sear':
        // High heat cast iron: energetic, fast-rising, dense puffs with occasional hot micro-embers
        return {
          rate: intensity === 'low' ? 0.35 : intensity === 'normal' ? 0.75 : 1.3,
          speedY: -2.2,
          speedVar: 1.0,
          baseSize: 18,
          maxSize: 65,
          color: { r: 245, g: 238, b: 230 },
          colorVar: { r: 200, g: 175, b: 140 },
          maxAlpha: 0.38,
          sparks: true
        };
      case 'baste':
        // Foaming butter & garlic baste: rich, wide billowing golden vapor clouds
        return {
          rate: intensity === 'low' ? 0.45 : intensity === 'normal' ? 0.9 : 1.5,
          speedY: -1.7,
          speedVar: 0.7,
          baseSize: 26,
          maxSize: 85,
          color: { r: 248, g: 220, b: 165 },
          colorVar: { r: 255, g: 238, b: 195 },
          maxAlpha: 0.46,
          sparks: false
        };
      case 'rest':
        // Chimichurri pour & rest: slow, ethereal fragrant herb-tinted wisps
        return {
          rate: intensity === 'low' ? 0.25 : intensity === 'normal' ? 0.5 : 0.9,
          speedY: -1.2,
          speedVar: 0.5,
          baseSize: 20,
          maxSize: 55,
          color: { r: 225, g: 242, b: 225 },
          colorVar: { r: 240, g: 235, b: 220 },
          maxAlpha: 0.28,
          sparks: false
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 640);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const spawnParticle = (forceBurst = false) => {
      const cfg = getPhaseConfig();
      // Spawn around the skillet/meat zone (middle-to-bottom third of frame)
      const spawnX = width * (0.32 + Math.random() * 0.38);
      const spawnY = height * (0.62 + Math.random() * 0.2);

      const isAltColor = Math.random() > 0.5;
      const chosenColor = isAltColor ? cfg.colorVar : cfg.color;

      const isSpark = cfg.sparks && Math.random() < 0.12 && !forceBurst;

      particlesRef.current.push({
        x: spawnX + (Math.random() - 0.5) * (forceBurst ? 80 : 40),
        y: spawnY + (Math.random() - 0.5) * (forceBurst ? 40 : 20),
        vx: (Math.random() - 0.5) * (forceBurst ? 1.8 : 0.8),
        vy: isSpark
          ? -2.8 - Math.random() * 2.5
          : (cfg.speedY - Math.random() * cfg.speedVar) * (forceBurst ? 1.4 : 1),
        size: isSpark ? 2 + Math.random() * 2 : cfg.baseSize + Math.random() * 12,
        growth: isSpark ? 0 : 0.45 + Math.random() * 0.4,
        maxSize: isSpark ? 4 : cfg.maxSize + Math.random() * 20,
        alpha: 0,
        maxAlpha: isSpark ? 0.9 : cfg.maxAlpha * (forceBurst ? 1.25 : 1),
        life: 0,
        maxLife: isSpark ? 35 + Math.random() * 30 : 90 + Math.random() * 60,
        swaySpeed: 0.02 + Math.random() * 0.025,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmp: isSpark ? 0.4 : 1.2 + Math.random() * 1.5,
        r: isSpark ? 251 : chosenColor.r,
        g: isSpark ? 191 : chosenColor.g,
        b: isSpark ? 36 : chosenColor.b,
        isSpark
      });
    };

    // Check for burst trigger
    if (burstCount > lastBurstRef.current) {
      lastBurstRef.current = burstCount;
      for (let i = 0; i < 22; i++) {
        spawnParticle(true);
      }
    }

    let emitAccumulator = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (enabled) {
        // Handle particle emission
        if (isPlaying) {
          const cfg = getPhaseConfig();
          emitAccumulator += cfg.rate;
          while (emitAccumulator >= 1) {
            spawnParticle(false);
            emitAccumulator -= 1;
          }
        }

        // Limit maximum particles for smooth 60fps performance
        if (particlesRef.current.length > 70) {
          particlesRef.current = particlesRef.current.slice(-70);
        }

        // Update and render particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.life++;

          // Life progress ratio
          const progress = p.life / p.maxLife;

          if (progress >= 1) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          // Gentle sinusoidal horizontal sway as steam rises
          const sway = Math.sin(p.life * p.swaySpeed + p.swayOffset) * p.swayAmp;
          p.x += p.vx + sway;
          p.y += p.vy;

          // Expand particle size as it billows upward
          if (p.size < p.maxSize) {
            p.size += p.growth;
          }

          // Fade in then soft fade out curve
          if (progress < 0.2) {
            p.alpha = (progress / 0.2) * p.maxAlpha;
          } else {
            p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
          }

          if (p.alpha <= 0) continue;

          ctx.save();
          if (p.isSpark) {
            // Embers / sizzle sparks
            ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
            ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Atmospheric culinary steam cloud wisp
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            grad.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`);
            grad.addColorStop(0.4, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.55})`);
            grad.addColorStop(0.75, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.2})`);
            grad.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, phase, intensity, enabled, burstCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}

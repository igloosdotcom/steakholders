// Synthesizes a realistic, hot cast-iron sear sizzle using Web Audio API
// No external MP3 files or network requests required.

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playSizzleSound(durationSec: number = 1.4, volume: number = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * durationSec);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate sizzling white-pink noise with natural sputtering crackles
    for (let i = 0; i < bufferSize; i++) {
      const isCrackle = Math.random() < 0.04;
      const noise = (Math.random() * 2 - 1) * (isCrackle ? 1.4 : 0.7);
      data[i] = noise;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Bandpass filter to simulate hot butter & tallow searing on 250°C cast iron
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(2200, ctx.currentTime);
    bandpass.Q.setValueAtTime(1.1, ctx.currentTime);

    // Highpass to eliminate dull low rumbles and enhance crisp sizzle
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(800, ctx.currentTime);

    // Gain envelope with quick attack and natural sizzle decay
    const gainNode = ctx.createGain();
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.06);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, now + durationSec * 0.6);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    source.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(now);
    source.stop(now + durationSec);
  } catch {
    // Graceful fallback if audio cannot play or is restricted by browser policy
  }
}

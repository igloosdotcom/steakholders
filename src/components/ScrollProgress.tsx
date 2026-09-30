import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-stone-900/40"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#c5a880] via-[#dfcaaa] to-[#c5a880] transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(197,168,128,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

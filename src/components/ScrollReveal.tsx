import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // px
  scale?: number; // subtle scale up, e.g. 0.96 -> 1
  blur?: boolean; // soft blur dissolve
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  interactiveGlow?: boolean; // cursor-following ambient glow
  shineOnEntrance?: boolean; // golden sheen sweep on entrance
}

// Editorial bespoke cubic-bezier for smooth deceleration
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 750,
  direction = 'up',
  distance = 28,
  scale = 1,
  blur = false,
  threshold = 0.15,
  once = true,
  interactiveGlow = false,
  shineOnEntrance = false
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Compute translation based on direction
  const getInitialPosition = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  // Mouse move handler for spotlight glow
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactiveGlow) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    },
    [interactiveGlow]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const delaySec = Math.max(0, delay / 1000);
  const durationSec = Math.max(0.2, duration / 1000);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: shouldReduceMotion ? 1 : scale,
        filter: blur && !shouldReduceMotion ? 'blur(6px)' : 'blur(0px)'
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      viewport={{
        once,
        amount: threshold
      }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : durationSec,
        delay: shouldReduceMotion ? 0 : delaySec,
        ease: LUXURY_EASE
      }}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Cursor Spotlight Glow */}
      {interactiveGlow && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-10 overflow-hidden"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 168, 128, 0.12), transparent 70%)`
          }}
        />
      )}

      {/* Luxury Golden Entrance Sheen Sweep */}
      {shineOnEntrance && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once }}
          transition={{
            duration: 1.2,
            delay: delaySec + 0.15,
            times: [0, 0.2, 0.7, 1]
          }}
        >
          <motion.div
            className="w-[60%] h-full bg-gradient-to-r from-transparent via-[#c5a880]/15 to-transparent -skew-x-25"
            initial={{ x: '-150%' }}
            whileInView={{ x: '250%' }}
            viewport={{ once }}
            transition={{
              duration: 1.0,
              delay: delaySec + 0.15,
              ease: [0.16, 1, 0.3, 1]
            }}
          />
        </motion.div>
      )}

      {children}
    </motion.div>
  );
}

// Staggered Container for Grid / List items
export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // seconds between elements
  initialDelay?: number; // seconds before start
  threshold?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  initialDelay = 0.05,
  threshold = 0.1,
  once = true
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : initialDelay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: number;
  duration?: number;
}

export function StaggerItem({
  children,
  className = '',
  distance = 24,
  direction = 'up',
  scale = 1,
  duration = 0.65
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPos = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const pos = getInitialPos();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: pos.x,
      y: pos.y,
      scale: shouldReduceMotion ? 1 : scale
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        ease: LUXURY_EASE
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

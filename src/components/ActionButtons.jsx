import { useState } from 'react';
import {
  ArrowUpRight,
  Coffee,
  MapPinLine,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { cn } from '../utils/cn';

/**
 * Primary CTA — Button-in-Button architecture (@high-end-visual-design)
 * High contrast: #0F0F10 text over #D4A373 background (8.1:1 WCAG AAA)
 */
export function PrimaryWhatsappButton({
  href,
  label = 'Pedir pelo WhatsApp (62) 98288-6635',
  className,
  compact = false,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center justify-between gap-3 rounded-full bg-[#D4A373] text-[#0F0F10] font-medium whitespace-nowrap',
        'transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'hover:bg-[#E3BA91] active:scale-[0.97]',
        'shadow-[0_12px_32px_-8px_rgba(212,163,115,0.38)]',
        compact ? 'min-h-11 pl-4 pr-1.5 py-1.5 text-sm' : 'min-h-13 pl-6 pr-2 py-2 text-sm sm:text-base',
        className
      )}
    >
      <span className="inline-flex items-center gap-2.5">
        <WhatsappLogo weight="fill" className={compact ? 'size-4 shrink-0' : 'size-5 shrink-0'} aria-hidden="true" />
        <span className="tabular-nums">{label}</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-[#0F0F10]/12 text-[#0F0F10]',
          'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105',
          compact ? 'size-8' : 'size-9'
        )}
      >
        <ArrowUpRight weight="bold" className="size-4" />
      </span>
    </a>
  );
}

/**
 * Secondary CTA — Google Maps route action with Button-in-Button trailing wrapper
 */
export function SecondaryMapsButton({
  href,
  label = 'Como Chegar no Maps',
  className,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex min-h-13 items-center justify-between gap-3 rounded-full whitespace-nowrap',
        'bg-[#161514] border border-[#E8E6DF]/14 text-[#E8E6DF] pl-5 pr-2 py-2 text-sm sm:text-base font-normal',
        'transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'hover:border-[#D4A373]/55 hover:bg-[#1D1B19] active:scale-[0.97]',
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <MapPinLine weight="light" className="size-5 text-[#D4A373] shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex size-9 items-center justify-center rounded-full bg-[#E8E6DF]/[0.06] text-[#D4A373] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <ArrowUpRight weight="regular" className="size-4" />
      </span>
    </a>
  );
}

/**
 * Double-Bezel Card with GPU-safe MotionValue spotlight (@design-spells + @high-end-visual-design)
 * Zero React re-renders on pointer move.
 */
export function SpotlightBezelCard({ children, className, innerClassName }) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handlePointerLeave() {
    mouseX.set(-300);
    mouseY.set(-300);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(212, 163, 115, 0.11), transparent 75%)`;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn('bezel-shell relative group/bezel', className)}
    >
      <div className="bezel-core relative h-full overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/bezel:opacity-100"
          style={{ background: spotlightBg }}
        />
        <div className={cn('relative z-10 h-full', innerClassName)}>{children}</div>
      </div>
    </div>
  );
}

/**
 * Resilient Google Maps Photo component with skeletal loading state and atmospheric fallback
 */
export function SmartPhoto({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-[#181614] text-center p-6',
          className
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 30% 25%, rgba(212,163,115,0.28), transparent 65%)',
          }}
        />
        <Coffee weight="thin" className="size-10 text-[#D4A373]/80 relative z-10" aria-hidden="true" />
        <p className="relative z-10 font-serif text-sm text-[#E8E6DF]/85 max-w-[26ch] text-balance">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-[#181614]', className)}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-[#211E1B]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          'h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
      />
    </div>
  );
}

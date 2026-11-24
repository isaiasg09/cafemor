import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpenText,
  Coffee,
  MapPinLine,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { cn } from '../utils/cn';

/**
 * Primary CTA - Button-in-Button architecture
 * High contrast: #15110E text over #DBA368 warm honey-wood background
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
        'group inline-flex items-center justify-between gap-3 rounded-full bg-[#DBA368] text-[#15110E] font-medium whitespace-nowrap',
        'transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'hover:bg-[#E8B986] active:scale-[0.97]',
        'shadow-[0_12px_32px_-8px_rgba(219,163,104,0.38)]',
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
          'inline-flex items-center justify-center rounded-full bg-[#15110E]/12 text-[#15110E]',
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
 * Secondary CTA - Google Maps route action
 */
export function SecondaryMapsButton({
  href,
  label = 'Ver no Google Maps',
  className,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex min-h-13 items-center justify-between gap-3 rounded-full whitespace-nowrap',
        'bg-[#1E1814] border border-[#F4EEE5]/14 text-[#F4EEE5] pl-5 pr-2 py-2 text-sm sm:text-base font-normal',
        'transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'hover:border-[#DBA368]/55 hover:bg-[#271F19] active:scale-[0.97]',
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <MapPinLine weight="light" className="size-5 text-[#DBA368] shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex size-9 items-center justify-center rounded-full bg-[#F4EEE5]/[0.06] text-[#DBA368] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <ArrowUpRight weight="regular" className="size-4" />
      </span>
    </a>
  );
}

/**
 * Secondary Anchor / External CTA - Menu navigation
 */
export function SecondaryMenuButton({
  href = '#cardapio',
  label = 'Ver Cardápio Digital',
  external = false,
  className,
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group inline-flex min-h-13 items-center justify-between gap-3 rounded-full whitespace-nowrap',
        'bg-[#1E1814] border border-[#F4EEE5]/14 text-[#F4EEE5] pl-5 pr-2 py-2 text-sm sm:text-base font-normal',
        'transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'hover:border-[#DBA368]/55 hover:bg-[#271F19] active:scale-[0.97]',
        className
      )}
    >
      <span className="inline-flex items-center gap-2">
        <BookOpenText weight="light" className="size-5 text-[#DBA368] shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex size-9 items-center justify-center rounded-full bg-[#F4EEE5]/[0.06] text-[#DBA368] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <ArrowUpRight weight="regular" className="size-4" />
      </span>
    </a>
  );
}

/**
 * Double-Bezel Card with GPU-safe MotionValue spotlight
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

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(219, 163, 104, 0.12), transparent 75%)`;

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
 * Resilient Google Maps Photo component with warm skeletal loading state
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
          'relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-[#221B16] text-center p-6',
          className
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-35"
          style={{
            background:
              'radial-gradient(circle at 30% 25%, rgba(219,163,104,0.28), transparent 65%)',
          }}
        />
        <Coffee weight="thin" className="size-10 text-[#DBA368]/85 relative z-10" aria-hidden="true" />
        <p className="relative z-10 font-serif text-sm text-[#F4EEE5]/85 max-w-[26ch] text-balance">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-[#221B16]', className)}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-[#2B221C]"
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

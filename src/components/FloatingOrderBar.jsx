import { useEffect, useState } from 'react';
import { MapPinLine, WhatsappLogo } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { siteData } from '../data/siteData';

export default function FloatingOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('inicio');
    if (!heroEl || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-label="Atalho rápido de pedido e rota"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-40 pb-[env(safe-area-inset-bottom)]"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-2 rounded-full border border-[#DBA368]/35 bg-[#1E1814]/88 p-1.5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(244,238,229,0.16)]">
            <a
              href={siteData.linkGoogleMaps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir localização do Café Mor no Google Maps"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm text-[#F4EEE5] hover:bg-[#F4EEE5]/[0.07] transition-colors active:scale-[0.97] whitespace-nowrap"
            >
              <MapPinLine weight="light" className="size-4 text-[#DBA368]" aria-hidden="true" />
              <span>Ver no Google Maps</span>
            </a>

            <a
              href={siteData.linkWhatsappPedido}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-full bg-[#DBA368] px-5 py-2 text-xs sm:text-sm font-medium text-[#15110E] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-[#E8B986] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] whitespace-nowrap"
            >
              <WhatsappLogo weight="fill" className="size-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">Pedir pelo WhatsApp</span>
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

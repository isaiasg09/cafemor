import { useEffect, useState } from 'react';
import { Coffee, MapPin, WhatsappLogo } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { siteData } from '../data/siteData';
import { cn } from '../utils/cn';

const NAV_LINKS = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#essencia', label: 'A Casa' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#visitar', label: 'Horários & Mapa' },
];

export default function Navbar({ liveStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border border-[#F4EEE5]/12 bg-[#15110E]/86 px-4 sm:px-6 backdrop-blur-xl shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <a
            href="#inicio"
            className="inline-flex items-center gap-2.5 text-[#F4EEE5] transition-opacity duration-150 hover:opacity-90"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-9 items-center justify-center rounded-full border border-[#DBA368]/35 bg-[#1E1814] text-[#DBA368]"
            >
              <Coffee weight="light" className="size-5" />
            </span>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight whitespace-nowrap">
              {siteData.nome}
            </span>
          </a>

          <div
            className="hidden xl:inline-flex items-center gap-2 rounded-full border border-[#F4EEE5]/10 bg-[#1E1814]/90 px-3 py-1 text-xs text-[#B9AEA0]"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className={cn(
                'size-2 rounded-full',
                liveStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-[#DBA368]'
              )}
            />
            <span className="font-medium text-[#F4EEE5]">{liveStatus.badge}</span>
            <span aria-hidden="true" className="text-[#8B7F71]">·</span>
            <span className="tabular-nums">{liveStatus.detail}</span>
          </div>
        </div>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-[#E2D9CC]">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="py-2 transition-colors duration-150 hover:text-[#DBA368] whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={siteData.linkWhatsappPedido}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex min-h-10 items-center gap-2 rounded-full bg-[#DBA368] px-4 py-2 text-xs sm:text-sm font-medium text-[#15110E] whitespace-nowrap transition-[transform,background-color] duration-150 ease-out hover:bg-[#E8B986] active:scale-[0.97]"
          >
            <WhatsappLogo weight="fill" className="size-4 shrink-0" aria-hidden="true" />
            <span>Pedir pelo WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-fluid-menu"
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="relative inline-flex size-11 items-center justify-center rounded-full border border-[#F4EEE5]/12 bg-[#1E1814] text-[#F4EEE5] lg:hidden transition-transform duration-150 active:scale-[0.96]"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden="true"
              className={cn(
                'absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5 rotate-0'
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                'absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5 rotate-0'
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-fluid-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação móvel"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-[2rem] border border-[#F4EEE5]/12 bg-[#15110E]/96 p-6 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between border-b border-[#F4EEE5]/10 pb-4 text-xs text-[#B9AEA0]">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-2 rounded-full',
                    liveStatus.isOpen ? 'bg-emerald-400' : 'bg-[#DBA368]'
                  )}
                />
                <strong className="font-medium text-[#F4EEE5]">{liveStatus.badge}</strong>
                <span className="tabular-nums">· {liveStatus.detail}</span>
              </span>
              <span>Setor Oeste · GO</span>
            </div>

            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item, idx) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 * idx,
                    duration: 0.28,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between rounded-2xl px-3 font-serif text-xl text-[#F4EEE5] transition-colors hover:bg-[#F4EEE5]/[0.05] hover:text-[#DBA368]"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-xs font-sans text-[#DBA368]">
                      0{idx + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-1 gap-3 pt-4 border-t border-[#F4EEE5]/10">
              <a
                href={siteData.linkWhatsappPedido}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#DBA368] px-5 py-3 text-sm font-medium text-[#15110E] active:scale-[0.98]"
              >
                <WhatsappLogo weight="fill" className="size-5" aria-hidden="true" />
                <span className="tabular-nums">Pedir pelo WhatsApp {siteData.telefone}</span>
              </a>
              <a
                href={siteData.linkGoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#F4EEE5]/15 bg-[#1E1814] px-5 py-3 text-sm text-[#F4EEE5] active:scale-[0.98]"
              >
                <MapPin weight="light" className="size-5 text-[#DBA368]" aria-hidden="true" />
                <span>Ver no Google Maps</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { ArrowsOutSimple, CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteData } from '../data/siteData';
import { cn } from '../utils/cn';
import { SmartPhoto } from './ActionButtons';

const CATEGORIES = ['Todos', 'A Casa', 'Cafés & Doces', 'Gastronomia', 'Identidade'];

function getBentoSpan(index, total) {
  if (total !== 10) {
    return 'md:col-span-6 lg:col-span-4';
  }
  const pattern = [
    'md:col-span-6 lg:col-span-6',
    'md:col-span-6 lg:col-span-6',
    'md:col-span-6 lg:col-span-4',
    'md:col-span-6 lg:col-span-4',
    'md:col-span-12 lg:col-span-4',
    'md:col-span-6 lg:col-span-7',
    'md:col-span-6 lg:col-span-5',
    'md:col-span-4 lg:col-span-4',
    'md:col-span-4 lg:col-span-4',
    'md:col-span-4 lg:col-span-4',
  ];
  return pattern[index] || 'md:col-span-6 lg:col-span-4';
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const filteredPhotos =
    activeCategory === 'Todos'
      ? siteData.fotos
      : siteData.fotos.filter((foto) => foto.categoria === activeCategory);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredPhotos.length]);

  const activePhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="relative py-24 sm:py-32 border-t border-[#F4EEE5]/[0.07] bg-[#191410]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 mb-12">
          <div className="max-w-[58ch]">
            <h2
              id="galeria-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4EEE5] leading-[1.14] pb-1 text-balance"
            >
              A luz, a madeira e os sabores{' '}
              <em className="italic text-[#DBA368] font-normal">como eles são.</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#B9AEA0] text-pretty">
              Fotografias reais da casa, dos pratos e da confeitaria compartilhadas no Google Maps.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar fotografias por ambiente ou especialidade"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedIndex(null);
                    setActiveCategory(category);
                  }}
                  className={cn(
                    'relative min-h-10 rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer active:scale-[0.97]',
                    isSelected ? 'text-[#15110E]' : 'text-[#B9AEA0] hover:text-[#F4EEE5]'
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="active-gallery-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#DBA368]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 items-stretch">
          {filteredPhotos.map((foto, index) => (
            <motion.article
              key={foto.id}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={getBentoSpan(index, filteredPhotos.length)}
            >
              <div className="bezel-shell h-full">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Ampliar fotografia: ${foto.titulo}`}
                  className="bezel-core group flex h-full w-full flex-col overflow-hidden text-left cursor-pointer"
                >
                  <div className="relative w-full overflow-hidden">
                    <SmartPhoto
                      src={foto.url}
                      alt={`${foto.titulo}: ${foto.legenda}`}
                      className={cn(
                        'w-full',
                        index < 2 && filteredPhotos.length === 10
                          ? 'aspect-[16/10.5]'
                          : 'aspect-[4/3.1]'
                      )}
                      imgClassName="group-hover:scale-[1.04]"
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3.5 top-3.5 inline-flex size-9 items-center justify-center rounded-full border border-[#F4EEE5]/20 bg-[#15110E]/75 text-[#F4EEE5] opacity-0 backdrop-blur-md transition-[opacity,transform] duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:scale-105 group-hover:text-[#DBA368]"
                    >
                      <ArrowsOutSimple weight="light" className="size-4" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-2 border-t border-[#F4EEE5]/[0.06] p-5">
                    <div>
                      <p className="text-xs font-medium text-[#DBA368]">{foto.categoria}</p>
                      <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#F4EEE5] leading-snug">
                        {foto.titulo}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#B9AEA0] leading-relaxed line-clamp-2">
                      {foto.legenda}
                    </p>
                  </div>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.titulo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#15110E]/92 p-4 sm:p-8 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bezel-shell relative w-full max-w-4xl"
            >
              <div className="bezel-core overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#F4EEE5]/10 px-5 py-3.5">
                  <div>
                    <p className="font-serif text-lg text-[#F4EEE5]">{activePhoto.titulo}</p>
                    <p className="text-xs text-[#B9AEA0] tabular-nums">
                      Foto {selectedIndex + 1} de {filteredPhotos.length} · Acervo Google Maps
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    aria-label="Fechar visualização ampliada"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-[#F4EEE5]/15 bg-[#15110E] text-[#F4EEE5] hover:text-[#DBA368] cursor-pointer active:scale-[0.96]"
                  >
                    <X weight="regular" className="size-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="relative bg-[#15110E]">
                  <SmartPhoto
                    src={activePhoto.url}
                    alt={activePhoto.legenda}
                    priority
                    className="max-h-[68dvh] aspect-[16/11] w-full"
                    imgClassName="object-contain bg-[#15110E]"
                  />

                  {filteredPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIndex(
                            (prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                          )
                        }
                        aria-label="Fotografia anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-full border border-[#F4EEE5]/15 bg-[#15110E]/85 text-[#F4EEE5] hover:border-[#DBA368] cursor-pointer active:scale-[0.96]"
                      >
                        <CaretLeft weight="regular" className="size-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length)
                        }
                        aria-label="Próxima fotografia"
                        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-full border border-[#F4EEE5]/15 bg-[#15110E]/85 text-[#F4EEE5] hover:border-[#DBA368] cursor-pointer active:scale-[0.96]"
                      >
                        <CaretRight weight="regular" className="size-5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>

                <div className="px-6 py-4 text-sm text-[#E2D9CC]">
                  {activePhoto.legenda}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

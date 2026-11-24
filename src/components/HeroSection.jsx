import { useState } from 'react';
import { Clock, MapPinLine, SealCheck, Star } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteData } from '../data/siteData';
import { cn } from '../utils/cn';
import {
  PrimaryWhatsappButton,
  SecondaryMenuButton,
  SmartPhoto,
} from './ActionButtons';

const HERO_SHOWCASE_SCENES = [
  {
    fotoIndex: 0,
    shortLabel: 'Salão & Madeira',
    caption: 'Estante iluminada em madeira mel e cadeiras de veludo',
  },
  {
    fotoIndex: 2,
    shortLabel: 'Café & Bolinho',
    caption: 'Xícara Café Mor com bolinhos de chuva quentinhos',
  },
  {
    fotoIndex: 9,
    shortLabel: 'Pátio Botânico',
    caption: 'Jardim ensolarado com mesas brancas e mural floral',
  },
];

export default function HeroSection({ liveStatus }) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const currentScene = HERO_SHOWCASE_SCENES[activeSceneIndex];
  const currentPhoto = siteData.fotos[currentScene.fotoIndex];

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay,
      ease: [0.23, 1, 0.32, 1],
    },
  });

  return (
    <>
      <section
        id="inicio"
        aria-labelledby="hero-heading"
        className="relative flex min-h-[min(100dvh,860px)] items-center pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden"
      >
        {/* Brilho quente ambiente evocando a estante iluminada da casa */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-[36rem] w-[36rem] rounded-full opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(219,163,104,0.32) 0%, rgba(21,17,14,0) 70%)',
          }}
        />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Coluna Esquerda: Disciplina de 4 elementos (@design-taste-frontend) */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* 1. Eyebrow */}
              <motion.div {...fadeUp(0.02)} className="mb-5">
                <span className="inline-flex items-center rounded-full border border-[#DBA368]/35 bg-[#1E1814]/90 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-[#DBA368]">
                  Setor Oeste, Goiânia · Alameda das Rosas, 1.397
                </span>
              </motion.div>

              {/* 2. Headline (Playfair Display, max 2 linhas no desktop) */}
              <motion.h1
                id="hero-heading"
                {...fadeUp(0.1)}
                className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-normal text-[#F4EEE5] leading-[1.12] pb-1 text-balance max-w-[14ch]"
              >
                Café especial com{' '}
                <em className="italic text-[#DBA368] font-normal">alma goiana.</em>
              </motion.h1>

              {/* 3. Subtexto conciso (<= 20 palavras) */}
              <motion.p
                {...fadeUp(0.18)}
                className="mt-5 text-base sm:text-lg text-[#B9AEA0] leading-relaxed max-w-[46ch] text-pretty"
              >
                Cafés especiais SCAA, bolinho de chuva quentinho, almoço executivo e confeitaria artesanal em uma casa cheia de luz e história.
              </motion.p>

              {/* 4. Par de CTAs (WhatsApp primário + Cardápio Digital secundário) */}
              <motion.div
                {...fadeUp(0.26)}
                className="mt-8 flex w-full flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5"
              >
                <PrimaryWhatsappButton
                  href={siteData.linkWhatsappPedido}
                  label={`Pedir pelo WhatsApp ${siteData.telefone}`}
                />
                <SecondaryMenuButton
                  href="#cardapio"
                  label="Explorar Cardápio Digital"
                />
              </motion.div>
            </div>

            {/* Coluna Direita: Vitrine Fotográfica Real e Chamativa da Casa (Zero pills sobre a foto) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="bezel-shell">
                <div className="bezel-core overflow-hidden">
                  {/* Fotografia principal limpa e desobstruída */}
                  <div className="relative aspect-[4/3.1] sm:aspect-[16/11.5] w-full overflow-hidden bg-[#1E1814]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPhoto.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full w-full"
                      >
                        <SmartPhoto
                          src={currentPhoto.url}
                          alt={`${currentPhoto.titulo}: ${currentPhoto.legenda}`}
                          priority
                          className="h-full w-full"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Faixa editorial abaixo da foto com seletores de cena + nota real */}
                  <div className="border-t border-[#F4EEE5]/[0.08] bg-[#1A1410] p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-base text-[#F4EEE5] truncate">
                          {currentPhoto.titulo}
                        </p>
                        <p className="mt-0.5 text-xs text-[#B9AEA0] truncate">
                          {currentScene.caption}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-xs tabular-nums">
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#DBA368]/30 bg-[#271F19] px-2.5 py-1 text-[#F4EEE5]">
                          <Star weight="fill" className="size-3.5 text-[#DBA368]" aria-hidden="true" />
                          <strong>{siteData.nota}</strong>
                          <span className="text-[#B9AEA0]">(600+)</span>
                        </span>
                      </div>
                    </div>

                    {/* Seletor visual de 3 ambientes reais do Café Mor */}
                    <div
                      role="tablist"
                      aria-label="Alternar cena real do Café Mor"
                      className="mt-4 grid grid-cols-3 gap-2.5"
                    >
                      {HERO_SHOWCASE_SCENES.map((scene, idx) => {
                        const thumb = siteData.fotos[scene.fotoIndex];
                        const isSelected = idx === activeSceneIndex;
                        return (
                          <button
                            key={thumb.id}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setActiveSceneIndex(idx)}
                            className={cn(
                              'group flex items-center gap-2.5 rounded-2xl border p-1.5 text-left transition-colors duration-150 cursor-pointer active:scale-[0.98]',
                              isSelected
                                ? 'border-[#DBA368] bg-[#271F19] text-[#F4EEE5]'
                                : 'border-[#F4EEE5]/10 bg-[#15110E]/70 text-[#B9AEA0] hover:border-[#DBA368]/45 hover:text-[#F4EEE5]'
                            )}
                          >
                            <div className="size-9 shrink-0 overflow-hidden rounded-xl">
                              <SmartPhoto
                                src={thumb.url}
                                alt={scene.shortLabel}
                                priority
                                className="h-full w-full"
                              />
                            </div>
                            <span className="text-[11px] sm:text-xs font-medium leading-tight line-clamp-2">
                              {scene.shortLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faixa de prova social e localização logo abaixo da primeira dobra */}
      <section
        aria-label="Indicadores de confiança e localização"
        className="border-y border-[#F4EEE5]/[0.08] bg-[#1A1410]"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#241C16] text-[#DBA368]">
                <Star weight="fill" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#F4EEE5] tabular-nums">
                  Nota {siteData.nota} / 5.0 no Google
                </p>
                <p className="text-xs text-[#B9AEA0] tabular-nums">
                  600+ avaliações ({siteData.totalAvaliacoes} relatos)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#241C16] text-[#DBA368]">
                <MapPinLine weight="light" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#F4EEE5]">
                  Setor Oeste, Goiânia
                </p>
                <p className="text-xs text-[#B9AEA0]">
                  Alameda das Rosas, 1.397 (Lago das Rosas)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#241C16] text-[#DBA368]">
                <Clock weight="light" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#F4EEE5]">
                  {liveStatus.badge} · {liveStatus.detail}
                </p>
                <p className="text-xs text-[#B9AEA0] tabular-nums">
                  Terça a Domingo até 18:00
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#241C16] text-[#DBA368]">
                <SealCheck weight="light" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#F4EEE5]">
                  Cardápio Digital & WhatsApp
                </p>
                <p className="text-xs text-[#B9AEA0] tabular-nums">
                  Presencial ou direto pelo {siteData.telefone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

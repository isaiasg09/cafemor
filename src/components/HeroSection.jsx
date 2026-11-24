import { Suspense, lazy } from 'react';
import { Clock, MapPinLine, SealCheck, Star } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { siteData } from '../data/siteData';
import {
  PrimaryWhatsappButton,
  SecondaryMapsButton,
  SmartPhoto,
} from './ActionButtons';

const CoffeeSteamCanvas = lazy(() => import('./CoffeeSteamCanvas'));

export default function HeroSection({ liveStatus }) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const heroPhotoThumb = siteData.fotos[0];

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
        className="relative flex min-h-[min(100dvh,860px)] items-center pt-24 pb-14 lg:pt-28 lg:pb-16 overflow-hidden"
      >
        {/* Luz ambiente sutil de madeira velada */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-[34rem] w-[34rem] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(212,163,115,0.28) 0%, rgba(15,15,16,0) 70%)',
          }}
        />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Coluna Esquerda: Máximo de 4 elementos textuais (@design-taste-frontend) */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
              {/* 1. Eyebrow (máximo 1 middle-dot) */}
              <motion.div {...fadeUp(0.02)} className="mb-5">
                <span className="inline-flex items-center rounded-full border border-[#D4A373]/30 bg-[#161514]/90 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-[#D4A373]">
                  Setor Oeste, Goiânia · Próximo ao Lago das Rosas
                </span>
              </motion.div>

              {/* 2. Headline (máximo 2 linhas no desktop) */}
              <motion.h1
                id="hero-heading"
                {...fadeUp(0.1)}
                className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-normal text-[#E8E6DF] leading-[1.12] pb-1 text-balance max-w-[14ch]"
              >
                Café especial com{' '}
                <em className="italic text-[#D4A373] font-normal">alma goiana.</em>
              </motion.h1>

              {/* 3. Subtexto conciso (<= 20 palavras) */}
              <motion.p
                {...fadeUp(0.18)}
                className="mt-5 text-base sm:text-lg text-[#A8A298] leading-relaxed max-w-[46ch] text-pretty"
              >
                Almoço fresco, bolos caseiros, chás e cafés especiais entre madeira maciça, jardim iluminado e a poesia de Cora Coralina.
              </motion.p>

              {/* 4. Par de CTAs (WhatsApp primário + Google Maps secundário) */}
              <motion.div
                {...fadeUp(0.26)}
                className="mt-8 flex w-full flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5"
              >
                <PrimaryWhatsappButton
                  href={siteData.linkWhatsappPedido}
                  label={`Pedir pelo WhatsApp ${siteData.telefone}`}
                />
                <SecondaryMapsButton
                  href={siteData.linkGoogleMaps}
                  label="Ver no Google Maps"
                />
              </motion.div>
            </div>

            {/* Coluna Direita: Palco de Estúdio Escuro para a Xícara 3D + Vapor FBM */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-6 xl:col-span-5 relative"
            >
              <div className="bezel-shell relative mx-auto max-w-lg lg:max-w-none">
                <div
                  className="bezel-core relative aspect-[4/4.2] sm:aspect-[4/3.8] lg:aspect-[4/4.25] w-full overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 42%, rgba(212,163,115,0.16), rgba(15,15,16,0.98) 72%)',
                  }}
                >
                  {/* Cena WebGL Floating Coffee & Steam */}
                  <div className="relative z-10 h-full w-full pb-14">
                    <Suspense
                      fallback={
                        <div className="flex h-full w-full items-center justify-center text-xs tracking-widest uppercase text-[#A8A298]">
                          Preparando atmosfera...
                        </div>
                      }
                    >
                      <CoffeeSteamCanvas reducedMotion={shouldReduceMotion} />
                    </Suspense>
                  </div>

                  {/* Cartão editorial inferior com foto real da casa */}
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-3 rounded-[1.35rem] border border-[#E8E6DF]/10 bg-[#0F0F10]/86 p-2.5 backdrop-blur-md">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-12 shrink-0 overflow-hidden rounded-xl border border-[#D4A373]/30">
                        <SmartPhoto
                          src={heroPhotoThumb.url}
                          alt={heroPhotoThumb.titulo}
                          priority
                          className="h-full w-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-serif text-sm text-[#E8E6DF]">
                          Alameda das Rosas, N° 1.397
                        </p>
                        <p className="truncate text-xs text-[#A8A298] tabular-nums">
                          {liveStatus.badge} · {liveStatus.detail}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end pr-2 shrink-0">
                      <div className="inline-flex items-center gap-1 text-[#D4A373]">
                        <Star weight="fill" className="size-3.5" aria-hidden="true" />
                        <span className="text-xs font-semibold tabular-nums text-[#E8E6DF]">
                          {siteData.nota}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#A8A298] tabular-nums">
                        600+ avaliações
                      </span>
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
        className="border-y border-[#E8E6DF]/[0.08] bg-[#131211]"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1A1816] text-[#D4A373]">
                <Star weight="fill" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#E8E6DF] tabular-nums">
                  Nota {siteData.nota} / 5.0 no Google
                </p>
                <p className="text-xs text-[#A8A298] tabular-nums">
                  600+ avaliações ({siteData.totalAvaliacoes} relatos)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1A1816] text-[#D4A373]">
                <MapPinLine weight="light" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#E8E6DF]">
                  Setor Oeste, Goiânia
                </p>
                <p className="text-xs text-[#A8A298]">
                  Alameda das Rosas, 1.397 (Lago das Rosas)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1A1816] text-[#D4A373]">
                <Clock weight="light" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#E8E6DF]">
                  Terça a Domingo até 18:00
                </p>
                <p className="text-xs text-[#A8A298] tabular-nums">
                  Almoço fresco, café da tarde e reuniões
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1A1816] text-[#D4A373]">
                <SealCheck weight="light" className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#E8E6DF]">
                  Atendimento Direto sem Taxas
                </p>
                <p className="text-xs text-[#A8A298] tabular-nums">
                  Presencial ou WhatsApp {siteData.telefone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

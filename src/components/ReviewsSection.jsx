import { ArrowUpRight, Quotes, Star } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { siteData } from '../data/siteData';
import { SmartPhoto, SpotlightBezelCard } from './ActionButtons';

function StarRow({ count = 5 }) {
  return (
    <div
      className="inline-flex items-center gap-1 text-[#DBA368]"
      aria-label={`Avaliação ${count} de 5 estrelas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          weight={i < count ? 'fill' : 'regular'}
          className="size-4"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

const FEATURED_TAGS = [
  'Madeira maciça',
  'Cora Coralina',
  'Janela azul',
  'Almoço e confeitaria',
];

const SECONDARY_SPANS = [
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-3',
];

export default function ReviewsSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [featuredReview, ...otherReviews] = siteData.avaliacoesDestaque;
  const ambientPhoto = siteData.fotos[5];

  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-heading"
      className="relative py-24 sm:py-32 border-t border-[#F4EEE5]/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-[62ch]">
          <h2
            id="avaliacoes-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4EEE5] leading-[1.14] pb-1 text-balance"
          >
            Por que o Café Mor conquista{' '}
            <em className="italic text-[#DBA368] font-normal">quem passa por aqui.</em>
          </h2>
          <p className="mt-4 text-base text-[#B9AEA0] leading-relaxed text-pretty">
            Relatos reais de clientes que transformaram nossa casa na Alameda das Rosas em refúgio para o almoço, o trabalho e o café da tarde.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7"
          >
            <SpotlightBezelCard
              className="h-full"
              innerClassName="p-7 sm:p-9 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-[#DBA368]/30 bg-[#DBA368]/10 px-3 py-1 text-xs font-medium text-[#DBA368]">
                    {featuredReview.selo}
                  </span>
                  <StarRow count={featuredReview.nota} />
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <Quotes
                    weight="fill"
                    className="size-7 shrink-0 text-[#DBA368]/65 mt-1"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EEE5] leading-[1.22] text-balance">
                    “{featuredReview.destaqueCurto}”
                  </h3>
                </div>

                <blockquote className="mt-4 text-base text-[#E2D9CC] leading-relaxed text-pretty">
                  <p>“{featuredReview.citacao}”</p>
                </blockquote>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {FEATURED_TAGS.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[#F4EEE5]/10 bg-[#15110E]/65 px-3 py-1 text-xs text-[#E2D9CC]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-[#F4EEE5]/[0.08] pt-5">
                <div>
                  <p className="font-medium text-[#F4EEE5]">{featuredReview.autor}</p>
                  <p className="text-xs text-[#B9AEA0]">Avaliação verificada no Google Maps</p>
                </div>
                <span className="rounded-full bg-[#15110E] border border-[#F4EEE5]/10 px-3 py-1 text-xs text-[#DBA368] tabular-nums">
                  Nota {featuredReview.nota}/5
                </span>
              </div>
            </SpotlightBezelCard>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5"
          >
            <div className="bezel-shell h-full">
              <div className="bezel-core relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden p-7 sm:p-8">
                <div className="absolute inset-0">
                  <SmartPhoto
                    src={ambientPhoto.url}
                    alt={ambientPhoto.legenda}
                    className="h-full w-full"
                    imgClassName="scale-105 object-cover opacity-40"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#15110E] via-[#15110E]/78 to-[#15110E]/55"
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#DBA368]/30 bg-[#15110E]/80 px-3 py-1 text-xs font-medium text-[#DBA368]">
                    Avaliação Geral no Google
                  </span>
                  <StarRow count={5} />
                </div>

                <div className="relative z-10 my-auto py-6">
                  <p className="font-serif text-5xl sm:text-6xl text-[#F4EEE5] tabular-nums leading-none">
                    {siteData.nota}
                    <span className="text-2xl text-[#B9AEA0]">/5</span>
                  </p>
                  <p className="mt-3 text-lg font-medium text-[#F4EEE5] tabular-nums">
                    600+ avaliações verificadas
                  </p>
                  <p className="mt-1 text-sm text-[#B9AEA0] tabular-nums">
                    {siteData.totalAvaliacoes} relatos públicos celebrando casa, atendimento e confeitaria.
                  </p>
                </div>

                <div className="relative z-10 border-t border-[#F4EEE5]/12 pt-5">
                  <a
                    href={siteData.linkGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[#DBA368] hover:text-[#E8B986] transition-colors"
                  >
                    <span>Ver no Google Maps</span>
                    <ArrowUpRight
                      weight="bold"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 items-stretch">
          {otherReviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.06 * (index + 1),
                ease: [0.23, 1, 0.32, 1],
              }}
              className={SECONDARY_SPANS[index] || 'md:col-span-4'}
            >
              <SpotlightBezelCard
                className="h-full"
                innerClassName="p-6 sm:p-7 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#DBA368]">
                      {rev.selo}
                    </span>
                    <StarRow count={rev.nota} />
                  </div>

                  <h3 className="mt-3 font-serif text-xl text-[#F4EEE5] leading-snug">
                    “{rev.destaqueCurto}”
                  </h3>

                  <blockquote className="mt-2.5 text-sm text-[#B9AEA0] leading-relaxed text-pretty">
                    “{rev.citacao}”
                  </blockquote>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F4EEE5]/[0.06] text-xs">
                  <span className="font-medium text-[#F4EEE5]">{rev.autor}</span>
                  <span className="text-[#8B7F71]">Google Maps</span>
                </div>
              </SpotlightBezelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

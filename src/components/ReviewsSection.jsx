import { ArrowUpRight, Quotes, Star } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { siteData } from '../data/siteData';
import { SmartPhoto, SpotlightBezelCard } from './ActionButtons';

function StarRow({ count = 5 }) {
  return (
    <div
      className="inline-flex items-center gap-1 text-[#D4A373]"
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
  'md:col-span-5', // Élida Evanikel (maior texto)
  'md:col-span-4', // Filipe Siqueira (médio)
  'md:col-span-3', // M. H. (mais conciso)
];

export default function ReviewsSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [featuredReview, ...otherReviews] = siteData.avaliacoesDestaque;
  const ambientPhoto = siteData.fotos[6];

  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-heading"
      className="relative py-24 sm:py-32 border-t border-[#E8E6DF]/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho em pilha vertical limpa (sem eyebrow extra e sem caixa flutuante solta) */}
        <div className="mb-12 max-w-[62ch]">
          <h2
            id="avaliacoes-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#E8E6DF] leading-[1.14] pb-1 text-balance"
          >
            Por que o Café Mor conquista{' '}
            <em className="italic text-[#D4A373] font-normal">quem passa por aqui.</em>
          </h2>
          <p className="mt-4 text-base text-[#A8A298] leading-relaxed text-pretty">
            Relatos reais de clientes que transformaram nossa casa na Alameda das Rosas em refúgio para o almoço, o trabalho e o café da tarde.
          </p>
        </div>

        {/* Linha 1: Crônica Roberto Cardoso (7 cols) + Card Visual Prova Social (5 cols) */}
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
                  <span className="rounded-full border border-[#D4A373]/30 bg-[#D4A373]/10 px-3 py-1 text-xs font-medium text-[#D4A373]">
                    {featuredReview.selo}
                  </span>
                  <StarRow count={featuredReview.nota} />
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <Quotes
                    weight="fill"
                    className="size-7 shrink-0 text-[#D4A373]/65 mt-1"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#E8E6DF] leading-[1.22] text-balance">
                    “{featuredReview.destaqueCurto}”
                  </h3>
                </div>

                <blockquote className="mt-4 text-base text-[#D5D1C7] leading-relaxed text-pretty">
                  <p>“{featuredReview.citacao}”</p>
                </blockquote>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {FEATURED_TAGS.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[#E8E6DF]/10 bg-[#0F0F10]/65 px-3 py-1 text-xs text-[#D5D1C7]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-[#E8E6DF]/[0.08] pt-5">
                <div>
                  <p className="font-medium text-[#E8E6DF]">{featuredReview.autor}</p>
                  <p className="text-xs text-[#A8A298]">Avaliação verificada no Google Maps</p>
                </div>
                <span className="rounded-full bg-[#0F0F10] border border-[#E8E6DF]/10 px-3 py-1 text-xs text-[#D4A373] tabular-nums">
                  Nota {featuredReview.nota}/5
                </span>
              </div>
            </SpotlightBezelCard>
          </motion.div>

          {/* Bento Diversity: Card Visual com Foto Real + Nota 4.5/5 e 600+ Avaliações */}
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
                    imgClassName="scale-105 object-cover opacity-35"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/78 to-[#0F0F10]/55"
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#D4A373]/30 bg-[#0F0F10]/75 px-3 py-1 text-xs font-medium text-[#D4A373]">
                    Avaliação Geral no Google
                  </span>
                  <StarRow count={5} />
                </div>

                <div className="relative z-10 my-auto py-6">
                  <p className="font-serif text-5xl sm:text-6xl text-[#E8E6DF] tabular-nums leading-none">
                    {siteData.nota}
                    <span className="text-2xl text-[#A8A298]">/5</span>
                  </p>
                  <p className="mt-3 text-lg font-medium text-[#E8E6DF] tabular-nums">
                    600+ avaliações verificadas
                  </p>
                  <p className="mt-1 text-sm text-[#A8A298] tabular-nums">
                    {siteData.totalAvaliacoes} relatos públicos celebrando casa, atendimento e confeitaria.
                  </p>
                </div>

                <div className="relative z-10 border-t border-[#E8E6DF]/12 pt-5">
                  <a
                    href={siteData.linkGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[#D4A373] hover:text-[#E3BA91] transition-colors"
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

        {/* Linha 2: 3 cards com larguras proporcionais ao volume de texto (zero espaço vazio) */}
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
                    <span className="text-xs font-medium text-[#D4A373]">
                      {rev.selo}
                    </span>
                    <StarRow count={rev.nota} />
                  </div>

                  <h3 className="mt-3 font-serif text-xl text-[#E8E6DF] leading-snug">
                    “{rev.destaqueCurto}”
                  </h3>

                  <blockquote className="mt-2.5 text-sm text-[#A8A298] leading-relaxed text-pretty">
                    “{rev.citacao}”
                  </blockquote>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8E6DF]/[0.06] text-xs">
                  <span className="font-medium text-[#E8E6DF]">{rev.autor}</span>
                  <span className="text-[#7E786F]">Google Maps</span>
                </div>
              </SpotlightBezelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

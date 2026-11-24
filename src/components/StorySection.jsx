import { useRef } from 'react';
import {
  Armchair,
  BowlFood,
  Coffee,
  FlowerTulip,
  Sparkle,
} from '@phosphor-icons/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { siteData } from '../data/siteData';
import { SmartPhoto, SpotlightBezelCard } from './ActionButtons';

const MOMENT_ICONS = [BowlFood, Coffee, Armchair];

export default function StorySection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax 2.5D exclusivamente em transform translateY (GPU Compositor)
  const primaryPhotoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [26, -26]
  );
  const secondaryPhotoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-18, 28]
  );

  const photoCora = siteData.fotos[2];
  const photoJanela = siteData.fotos[4];

  return (
    <section
      id="essencia"
      ref={sectionRef}
      aria-labelledby="essencia-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Split Assimétrico: História da Casa + Fotografia Parallax 2.5D */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2
              id="essencia-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#E8E6DF] leading-[1.14] pb-1 text-balance"
            >
              Ar de casa de vó, desenhado com{' '}
              <em className="italic text-[#D4A373] font-normal">elegância goiana.</em>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#A8A298] leading-relaxed text-pretty max-w-[58ch]">
              A poucos passos do Lago das Rosas, cada canto do Café Mor foi pensado com personalidade: mesas de madeira maciça bem espaçadas, cristaleira com louças antigas, pequenos vasos de flor fresca em cada mesa e o cantinho com poltronas junto à janela azul voltada para o jardim.
            </p>

            {/* Destaque Cora Coralina */}
            <div className="mt-8 bezel-shell">
              <div className="bezel-core p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4A373]/12 text-[#D4A373]">
                    <FlowerTulip weight="light" className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[#D4A373]">
                      Tributo à Alma de Goiás
                    </p>
                    <p className="mt-1.5 font-serif text-xl text-[#E8E6DF] leading-[1.3]">
                      “História, Talento, Sabedoria”
                    </p>
                    <p className="mt-2 text-sm text-[#A8A298] leading-relaxed text-pretty">
                      Nossa parede dedicada à poetisa Cora Coralina conecta cada xícara servida às raízes culturais de Goiás, em um salão limpo, claro, climatizado e silencioso na medida certa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Composição Parallax 2.5D (colapsa em pilha única abaixo de md:) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              <motion.div style={{ y: primaryPhotoY }} className="md:col-span-7">
                <div className="bezel-shell">
                  <div className="bezel-core overflow-hidden">
                    <SmartPhoto
                      src={photoCora.url}
                      alt={photoCora.legenda}
                      className="aspect-[4/5] w-full"
                    />
                    <div className="p-4 border-t border-[#E8E6DF]/[0.06]">
                      <p className="font-serif text-sm text-[#E8E6DF]">{photoCora.titulo}</p>
                      <p className="mt-0.5 text-xs text-[#A8A298]">{photoCora.categoria}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div style={{ y: secondaryPhotoY }} className="md:col-span-5 flex flex-col gap-6">
                <div className="bezel-shell">
                  <div className="bezel-core overflow-hidden">
                    <SmartPhoto
                      src={photoJanela.url}
                      alt={photoJanela.legenda}
                      className="aspect-square w-full"
                    />
                    <div className="p-4 border-t border-[#E8E6DF]/[0.06]">
                      <p className="font-serif text-sm text-[#E8E6DF]">{photoJanela.titulo}</p>
                      <p className="mt-0.5 text-xs text-[#A8A298]">Vista para o jardim</p>
                    </div>
                  </div>
                </div>

                <div className="bezel-shell">
                  <div className="bezel-core p-5">
                    <div className="flex items-center gap-2 text-[#D4A373] text-xs font-medium">
                      <Sparkle weight="fill" className="size-3.5" aria-hidden="true" />
                      <span>Dica de quem frequenta</span>
                    </div>
                    <p className="mt-2 text-sm text-[#D5D1C7] leading-relaxed text-pretty">
                      Peça uma mesa próxima à janela ou acomode-se no salão interno climatizado e não saia sem provar os bolos caseiros ou brownies com um café especial.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3 Momentos da Casa (id="momentos") - Cabeçalho empilhado verticalmente */}
        <div id="momentos" className="mt-24 sm:mt-32 scroll-mt-28">
          <div className="mb-12 max-w-[58ch]">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#E8E6DF] leading-[1.15] pb-1 text-balance">
              Versatilidade do almoço ao café da tarde.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#A8A298] leading-relaxed text-pretty">
              Funciona para um almoço tranquilo em família, uma reunião de trabalho produtiva ou uma pausa demorada com confeitaria autoral.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
            {siteData.momentosDaCasa.map((momento, idx) => {
              const IconComponent = MOMENT_ICONS[idx % MOMENT_ICONS.length];
              const colSpan =
                idx === 0 ? 'lg:col-span-5' : idx === 1 ? 'lg:col-span-4' : 'lg:col-span-3';

              return (
                <motion.div
                  key={momento.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className={colSpan}
                >
                  <SpotlightBezelCard
                    className="h-full"
                    innerClassName="p-6 sm:p-8 flex flex-col justify-between gap-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1D1B19] text-[#D4A373]">
                          <IconComponent weight="light" className="size-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-medium text-[#D4A373]">
                          {momento.horarioSugerido}
                        </span>
                      </div>

                      <h4 className="mt-6 font-serif text-2xl text-[#E8E6DF] leading-[1.2] text-balance">
                        {momento.titulo}
                      </h4>
                      <p className="mt-3 text-sm sm:text-base text-[#A8A298] leading-relaxed text-pretty">
                        {momento.descricao}
                      </p>
                    </div>

                    <ul className="flex flex-wrap gap-2 pt-5 border-t border-[#E8E6DF]/[0.07]">
                      {momento.itensCitados.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-[#E8E6DF]/10 bg-[#0F0F10]/65 px-3 py-1 text-xs text-[#D5D1C7]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </SpotlightBezelCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

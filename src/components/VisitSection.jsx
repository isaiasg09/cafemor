import { useState } from 'react';
import {
  CaretDown,
  Clock,
  MapPinLine,
  PhoneCall,
  Storefront,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { siteData } from '../data/siteData';
import { cn } from '../utils/cn';
import {
  PrimaryWhatsappButton,
  SecondaryMapsButton,
  SecondaryMenuButton,
} from './ActionButtons';

export default function VisitSection({ liveStatus }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <section
      id="visitar"
      aria-labelledby="visitar-heading"
      className="relative py-24 sm:py-32 border-t border-[#F4EEE5]/[0.07] bg-[#191410]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex rounded-full border border-[#DBA368]/25 bg-[#1E1814] px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] font-medium text-[#DBA368]">
                Visite Presencialmente ou Peça Direto
              </span>
              <h2
                id="visitar-heading"
                className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4EEE5] leading-[1.14] pb-1 text-balance"
              >
                Sua mesa na Alameda das Rosas{' '}
                <em className="italic text-[#DBA368] font-normal">espera por você.</em>
              </h2>
              <p className="mt-4 text-base text-[#B9AEA0] leading-relaxed max-w-[56ch] text-pretty">
                Atendemos presencialmente no Setor Oeste, com cardápio digital completo no VucaFood e pedidos diretos pelo nosso WhatsApp oficial sem taxas de intermediários.
              </p>
            </div>

            <div className="bezel-shell">
              <div className="bezel-core p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#271F19] text-[#DBA368]">
                      <MapPinLine weight="light" className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#DBA368] font-medium">
                        Endereço Oficial
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-medium text-[#F4EEE5]">
                        {siteData.logradouro}
                      </p>
                      <p className="text-sm text-[#B9AEA0]">
                        {siteData.bairro}, {siteData.cidadeEstado} · CEP {siteData.cep}
                      </p>
                      <p className="mt-1 text-xs text-[#DBA368]/90">
                        {siteData.referenciaLocal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#271F19] text-[#DBA368]">
                      <PhoneCall weight="light" className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#DBA368] font-medium">
                        WhatsApp & Telefone
                      </p>
                      <a
                        href={`tel:${siteData.telefoneInternacional.replace(/\s+/g, '')}`}
                        className="mt-1 block text-base sm:text-lg font-medium text-[#F4EEE5] tabular-nums hover:text-[#DBA368] transition-colors"
                      >
                        {siteData.telefone}
                      </a>
                      <p className="text-xs text-[#B9AEA0] mt-1">
                        Pedidos diretos, reservas e dúvidas sobre o almoço.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-5 border-t border-[#F4EEE5]/[0.08]">
                  <PrimaryWhatsappButton
                    href={siteData.linkWhatsappPedido}
                    label={`Pedir pelo WhatsApp ${siteData.telefone}`}
                  />
                  <SecondaryMapsButton
                    href={siteData.linkGoogleMaps}
                    label="Ver no Google Maps"
                  />
                  <SecondaryMenuButton
                    href={siteData.linkCardapioVuca}
                    label="Cardápio VucaFood"
                    external
                  />
                </div>
              </div>
            </div>

            <div className="bezel-shell">
              <div className="bezel-core divide-y divide-[#F4EEE5]/[0.08] px-6 py-2">
                {siteData.perguntasFrequentes.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const panelId = `faq-panel-${idx}`;
                  const buttonId = `faq-btn-${idx}`;

                  return (
                    <div key={item.pergunta} className="py-4">
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="flex w-full min-h-11 items-center justify-between gap-4 text-left font-serif text-lg text-[#F4EEE5] hover:text-[#DBA368] transition-colors cursor-pointer"
                        >
                          <span>{item.pergunta}</span>
                          <CaretDown
                            weight="regular"
                            aria-hidden="true"
                            className={cn(
                              'size-5 shrink-0 text-[#DBA368] transition-transform duration-200 ease-out',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                            className="pt-2.5 text-sm text-[#B9AEA0] leading-relaxed text-pretty"
                          >
                            {item.resposta}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bezel-shell">
              <div className="bezel-core p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#F4EEE5]/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-[#DBA368]/25 bg-[#271F19] text-[#DBA368]">
                      <Clock weight="light" className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-[#F4EEE5]">
                        Horário de Funcionamento
                      </h3>
                      <p className="text-xs text-[#B9AEA0]">Fuso horário de Goiânia (BRT)</p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border whitespace-nowrap',
                      liveStatus.isOpen
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                        : 'border-[#DBA368]/30 bg-[#DBA368]/10 text-[#DBA368]'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'size-1.5 rounded-full',
                        liveStatus.isOpen ? 'bg-emerald-400' : 'bg-[#DBA368]'
                      )}
                    />
                    {liveStatus.badge}
                  </span>
                </div>

                <dl className="mt-5 divide-y divide-[#F4EEE5]/[0.06]">
                  {siteData.horarios.map((item) => {
                    const isToday = item.diaSemanaIndex === liveStatus.dayIndex;
                    return (
                      <div
                        key={item.dia}
                        className={cn(
                          'flex items-center justify-between py-3.5 text-sm rounded-xl px-2.5 -mx-2.5 transition-colors',
                          isToday
                            ? 'bg-[#DBA368]/14 text-[#F4EEE5] font-medium'
                            : 'text-[#B9AEA0]'
                        )}
                      >
                        <dt className="flex items-center gap-2">
                          <span>{item.dia}</span>
                          {isToday && (
                            <span className="rounded-full bg-[#DBA368] px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-[#15110E]">
                              Hoje
                            </span>
                          )}
                        </dt>
                        <dd
                          className={cn(
                            'tabular-nums',
                            item.fechado
                              ? 'text-[#8B7F71]'
                              : isToday
                                ? 'text-[#DBA368]'
                                : 'text-[#E2D9CC]'
                          )}
                        >
                          {item.horario}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-6 rounded-2xl border border-[#F4EEE5]/[0.08] bg-[#15110E]/65 p-4 flex items-start gap-3">
                  <Storefront
                    weight="light"
                    className="size-5 shrink-0 text-[#DBA368] mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-[#B9AEA0] leading-relaxed">
                    Deseja confirmar mesas para grupo ou encomendar cestas e bolos antes de passar aqui? Fale conosco pelo{' '}
                    <a
                      href={siteData.linkWhatsappMesa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#DBA368] underline underline-offset-4 hover:text-[#E8B986]"
                    >
                      WhatsApp da casa
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

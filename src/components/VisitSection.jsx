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
import { PrimaryWhatsappButton, SecondaryMapsButton } from './ActionButtons';

export default function VisitSection({ liveStatus }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <section
      id="visitar"
      aria-labelledby="visitar-heading"
      className="relative py-24 sm:py-32 border-t border-[#E8E6DF]/[0.07] bg-[#121110]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Address, Hours Table & Direct Conversion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex rounded-full border border-[#D4A373]/25 bg-[#161514] px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] font-medium text-[#D4A373]">
                Visite Presencialmente ou Peça Direto
              </span>
              <h2
                id="visitar-heading"
                className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#E8E6DF] leading-[1.14] pb-1 text-balance"
              >
                Sua mesa na Alameda das Rosas{' '}
                <em className="italic text-[#D4A373] font-normal">espera por você.</em>
              </h2>
              <p className="mt-4 text-base text-[#A8A298] leading-relaxed max-w-[56ch] text-pretty">
                Não utilizamos aplicativos terceirizados de entrega: toda encomenda, pedido para retirada ou consulta sobre o cardápio do dia é atendida diretamente pela nossa equipe no WhatsApp.
              </p>
            </div>

            {/* Address + Direct Contact Bezel Card */}
            <div className="bezel-shell">
              <div className="bezel-core p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1D1B19] text-[#D4A373]">
                      <MapPinLine weight="light" className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#D4A373] font-medium">
                        Endereço Oficial
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-medium text-[#E8E6DF]">
                        {siteData.logradouro}
                      </p>
                      <p className="text-sm text-[#A8A298]">
                        {siteData.bairro}, {siteData.cidadeEstado} · CEP {siteData.cep}
                      </p>
                      <p className="mt-1 text-xs text-[#D4A373]/90">
                        {siteData.referenciaLocal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1D1B19] text-[#D4A373]">
                      <PhoneCall weight="light" className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#D4A373] font-medium">
                        WhatsApp & Telefone
                      </p>
                      <a
                        href={`tel:${siteData.telefoneInternacional.replace(/\s+/g, '')}`}
                        className="mt-1 block text-base sm:text-lg font-medium text-[#E8E6DF] tabular-nums hover:text-[#D4A373] transition-colors"
                      >
                        {siteData.telefone}
                      </a>
                      <p className="text-xs text-[#A8A298] mt-1">
                        Pedidos diretos, dúvidas sobre o almoço e bolos da vitrine.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-5 border-t border-[#E8E6DF]/[0.08]">
                  <PrimaryWhatsappButton
                    href={siteData.linkWhatsappPedido}
                    label={`Pedir pelo WhatsApp ${siteData.telefone}`}
                  />
                  <SecondaryMapsButton
                    href={siteData.linkGoogleMaps}
                    label="Ver no Google Maps"
                  />
                </div>
              </div>
            </div>

            {/* FAQ / Objection Handling Accordion (@page-cro) */}
            <div className="bezel-shell">
              <div className="bezel-core divide-y divide-[#E8E6DF]/[0.08] px-6 py-2">
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
                          className="flex w-full min-h-11 items-center justify-between gap-4 text-left font-serif text-lg text-[#E8E6DF] hover:text-[#D4A373] transition-colors cursor-pointer"
                        >
                          <span>{item.pergunta}</span>
                          <CaretDown
                            weight="regular"
                            aria-hidden="true"
                            className={cn(
                              'size-5 shrink-0 text-[#D4A373] transition-transform duration-200 ease-out',
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
                            className="pt-2.5 text-sm text-[#A8A298] leading-relaxed text-pretty"
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

          {/* Right Column: Live Schedule Card */}
          <div className="lg:col-span-5">
            <div className="bezel-shell">
              <div className="bezel-core p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E8E6DF]/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-[#D4A373]/25 bg-[#1D1B19] text-[#D4A373]">
                      <Clock weight="light" className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-[#E8E6DF]">
                        Horário de Funcionamento
                      </h3>
                      <p className="text-xs text-[#A8A298]">Fuso horário de Goiânia (BRT)</p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border',
                      liveStatus.isOpen
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                        : 'border-[#D4A373]/30 bg-[#D4A373]/10 text-[#D4A373]'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'size-1.5 rounded-full',
                        liveStatus.isOpen ? 'bg-emerald-400' : 'bg-[#D4A373]'
                      )}
                    />
                    {liveStatus.badge}
                  </span>
                </div>

                <dl className="mt-5 divide-y divide-[#E8E6DF]/[0.06]">
                  {siteData.horarios.map((item) => {
                    const isToday = item.diaSemanaIndex === liveStatus.dayIndex;
                    return (
                      <div
                        key={item.dia}
                        className={cn(
                          'flex items-center justify-between py-3.5 text-sm rounded-xl px-2.5 -mx-2.5 transition-colors',
                          isToday
                            ? 'bg-[#D4A373]/12 text-[#E8E6DF] font-medium'
                            : 'text-[#A8A298]'
                        )}
                      >
                        <dt className="flex items-center gap-2">
                          <span>{item.dia}</span>
                          {isToday && (
                            <span className="rounded-full bg-[#D4A373] px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-[#0F0F10]">
                              Hoje
                            </span>
                          )}
                        </dt>
                        <dd
                          className={cn(
                            'tabular-nums',
                            item.fechado
                              ? 'text-[#7E786F]'
                              : isToday
                                ? 'text-[#D4A373]'
                                : 'text-[#D5D1C7]'
                          )}
                        >
                          {item.horario}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-6 rounded-2xl border border-[#E8E6DF]/[0.08] bg-[#0F0F10]/65 p-4 flex items-start gap-3">
                  <Storefront
                    weight="light"
                    className="size-5 shrink-0 text-[#D4A373] mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-[#A8A298] leading-relaxed">
                    Deseja confirmar mesas para grupo ou encomendar bolos e brownies antes de passar aqui? Fale conosco pelo{' '}
                    <a
                      href={siteData.linkWhatsappMesa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4A373] underline underline-offset-4 hover:text-[#E3BA91]"
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

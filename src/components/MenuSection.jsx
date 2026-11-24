import { Suspense, lazy, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Coffee,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { MENU_FAVORITES, MENU_SECTIONS, VUCAFOOD_MENU_URL } from '../data/menuData';
import { siteData } from '../data/siteData';
import { cn } from '../utils/cn';
import { SmartPhoto, SpotlightBezelCard } from './ActionButtons';

const CoffeeSteamCanvas = lazy(() => import('./CoffeeSteamCanvas'));

function countTabItems(section) {
  return section.groups.reduce((acc, g) => acc + g.items.length, 0);
}

export default function MenuSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeTabId, setActiveTabId] = useState(MENU_SECTIONS[0].tabId);
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Quando há busca ativa, filtra em todas as categorias; caso contrário exibe a aba selecionada
  const visibleGroups = useMemo(() => {
    if (!normalizedQuery) {
      const activeSection =
        MENU_SECTIONS.find((sec) => sec.tabId === activeTabId) || MENU_SECTIONS[0];
      return activeSection.groups.map((group) => ({
        ...group,
        sectionLabel: activeSection.tabLabel,
      }));
    }

    const matchedGroups = [];
    MENU_SECTIONS.forEach((section) => {
      section.groups.forEach((group) => {
        const filteredItems = group.items.filter((item) => {
          const haystack = `${item.nome} ${item.descricao} ${group.title}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        });
        if (filteredItems.length > 0) {
          matchedGroups.push({
            ...group,
            sectionLabel: section.tabLabel,
            items: filteredItems,
          });
        }
      });
    });

    return matchedGroups;
  }, [activeTabId, normalizedQuery]);

  const totalMatches = useMemo(
    () => visibleGroups.reduce((acc, g) => acc + g.items.length, 0),
    [visibleGroups]
  );

  return (
    <section
      id="cardapio"
      aria-labelledby="cardapio-heading"
      className="relative py-24 sm:py-32 border-b border-[#F4EEE5]/[0.08]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho em pilha vertical limpa + botão oficial VucaFood */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[60ch]">
            <h2
              id="cardapio-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4EEE5] leading-[1.14] pb-1 text-balance"
            >
              Do espresso SCAA ao{' '}
              <em className="italic text-[#DBA368] font-normal">bolinho de chuva quentinho.</em>
            </h2>
            <p className="mt-4 text-base text-[#B9AEA0] leading-relaxed text-pretty">
              Explore o cardápio completo da casa com preços atualizados. Clique em qualquer item para ver detalhes no cardápio digital oficial no VucaFood.
            </p>
          </div>

          <a
            href={VUCAFOOD_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 shrink-0 items-center justify-between gap-3 rounded-full border border-[#DBA368]/45 bg-[#1E1814] pl-5 pr-2 py-2 text-sm font-medium text-[#F4EEE5] hover:border-[#DBA368] hover:bg-[#271F19] transition-colors active:scale-[0.97] whitespace-nowrap self-start md:self-auto"
          >
            <span>Abrir Cardápio no VucaFood</span>
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-full bg-[#DBA368] text-[#15110E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <ArrowUpRight weight="bold" className="size-4" />
            </span>
          </a>
        </div>

        {/* Destaque Superior: Palco 3D Iluminado em Porcelana (Esquerda) + 3 Favoritos com Fotos Reais (Direita) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch mb-14">
          {/* Xícara 3D em Porcelana Clara com RoomEnvironment */}
          <div className="lg:col-span-5">
            <div className="bezel-shell h-full">
              <div
                className="bezel-core relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden"
                style={{
                  background:
                    'radial-gradient(circle at 50% 42%, #3D2B1F 0%, #1B1410 75%)',
                }}
              >
                <div className="relative z-10 h-[300px] sm:h-[330px] w-full">
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-[#B9AEA0]">
                        Preparando extração...
                      </div>
                    }
                  >
                    <CoffeeSteamCanvas reducedMotion={shouldReduceMotion} />
                  </Suspense>
                </div>

                <div className="relative z-10 border-t border-[#F4EEE5]/10 bg-[#18130F]/90 px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-lg text-[#F4EEE5]">
                      Ritual de Extração SCAA
                    </p>
                    <p className="text-xs text-[#B9AEA0]">
                      Espresso Mor, V60, Chemex, Prensa Francesa e Cappuccino 1397
                    </p>
                  </div>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#DBA368]/30 bg-[#271F19] text-[#DBA368]">
                    <Coffee weight="light" className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Favoritos da Casa com Fotos Reais */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {MENU_FAVORITES.map((fav) => {
              const photo = siteData.fotos[fav.fotoIndex];
              return (
                <a
                  key={fav.id}
                  href={fav.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bezel-shell group block transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <div className="bezel-core flex flex-col sm:flex-row items-stretch overflow-hidden">
                    <div className="sm:w-44 shrink-0 overflow-hidden">
                      <SmartPhoto
                        src={photo.url}
                        alt={fav.nome}
                        className="aspect-[16/10] sm:aspect-auto sm:h-full w-full"
                        imgClassName="group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-2 p-5">
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium text-[#DBA368]">
                            {fav.badge}
                          </span>
                          <span className="text-sm font-semibold text-[#DBA368] tabular-nums">
                            {fav.preco}
                          </span>
                        </div>
                        <h3 className="mt-1 font-serif text-xl text-[#F4EEE5] group-hover:text-[#E8B986] transition-colors">
                          {fav.nome}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#B9AEA0] leading-relaxed line-clamp-2">
                          {fav.descricao}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-2 text-xs text-[#E2D9CC] group-hover:text-[#DBA368] transition-colors">
                        <span>Ver item no VucaFood</span>
                        <ArrowUpRight weight="bold" className="size-3.5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Barra de Busca + Abas de Categorias */}
        <div className="bezel-shell mb-8">
          <div className="bezel-core p-5 sm:p-6 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="w-full lg:max-w-md">
                <label
                  htmlFor="menu-search"
                  className="block text-xs font-medium text-[#E2D9CC] mb-2"
                >
                  Buscar no cardápio (cafés, almoço, bolinho de chuva, chás...)
                </label>
                <div className="relative flex items-center">
                  <MagnifyingGlass
                    weight="light"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 size-4 text-[#DBA368]"
                  />
                  <input
                    id="menu-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ex: Bolinho de Chuva, V60, Filé, Banoffee..."
                    className="min-h-11 w-full rounded-full border border-[#F4EEE5]/15 bg-[#15110E] pl-11 pr-10 py-2 text-sm text-[#F4EEE5] placeholder:text-[#8B7F71] focus:border-[#DBA368] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar busca do cardápio"
                      className="absolute right-2.5 inline-flex size-8 items-center justify-center rounded-full text-[#B9AEA0] hover:bg-[#271F19] hover:text-[#F4EEE5] cursor-pointer"
                    >
                      <X weight="bold" className="size-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#B9AEA0] tabular-nums">
                {normalizedQuery
                  ? `${totalMatches} ${totalMatches === 1 ? 'item encontrado' : 'itens encontrados'} para "${searchQuery.trim()}"`
                  : 'Toque em qualquer categoria abaixo para navegar pelos 111 itens da casa'}
              </p>
            </div>

            {/* Abas horizontais com layoutId (@motion-dev) */}
            {!normalizedQuery && (
              <div
                role="tablist"
                aria-label="Categorias do cardápio do Café Mor"
                className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F4EEE5]/[0.08]"
              >
                {MENU_SECTIONS.map((section) => {
                  const isSelected = section.tabId === activeTabId;
                  const count = countTabItems(section);
                  return (
                    <button
                      key={section.tabId}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTabId(section.tabId)}
                      className={cn(
                        'relative min-h-10 rounded-full px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer active:scale-[0.97]',
                        isSelected ? 'text-[#15110E]' : 'text-[#B9AEA0] hover:text-[#F4EEE5]'
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="menu-tab-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#DBA368]"
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-1.5">
                        <span>{section.tabLabel}</span>
                        <span
                          className={cn(
                            'text-[11px] tabular-nums',
                            isSelected ? 'text-[#15110E]/75' : 'text-[#8B7F71]'
                          )}
                        >
                          ({count})
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Lista de Itens do Cardápio */}
        {visibleGroups.length === 0 ? (
          <div className="bezel-shell">
            <div className="bezel-core flex flex-col items-center justify-center p-10 text-center">
              <Coffee weight="thin" className="size-10 text-[#DBA368]" aria-hidden="true" />
              <p className="mt-3 font-serif text-xl text-[#F4EEE5]">
                Nenhum item encontrado para “{searchQuery}”
              </p>
              <p className="mt-1 text-sm text-[#B9AEA0]">
                Tente buscar por espresso, V60, croissant, quiche, bolinho ou chá.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#DBA368] px-5 py-2 text-sm font-medium text-[#15110E] hover:bg-[#E8B986] cursor-pointer active:scale-[0.97]"
              >
                Limpar busca
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {visibleGroups.map((group) => (
              <div key={`${group.sectionLabel}-${group.title}`}>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#F4EEE5]/10 pb-3 mb-5">
                  <h3 className="font-serif text-2xl text-[#F4EEE5]">
                    {group.title}
                  </h3>
                  <span className="text-xs text-[#B9AEA0] tabular-nums">
                    {group.items.length} {group.items.length === 1 ? 'opção' : 'opções'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {group.items.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      <SpotlightBezelCard
                        className="h-full transition-transform duration-150 group-hover:-translate-y-0.5"
                        innerClassName="p-5 flex flex-col justify-between gap-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-serif text-lg text-[#F4EEE5] leading-snug group-hover:text-[#DBA368] transition-colors">
                            {item.nome}
                          </h4>
                          <span className="shrink-0 rounded-full border border-[#DBA368]/30 bg-[#15110E] px-3 py-1 text-xs sm:text-sm font-semibold text-[#DBA368] tabular-nums">
                            {item.preco}
                          </span>
                        </div>

                        {item.descricao && (
                          <p className="text-xs sm:text-sm text-[#B9AEA0] leading-relaxed text-pretty">
                            {item.descricao}
                          </p>
                        )}

                        <div className="flex items-center justify-end pt-2 border-t border-[#F4EEE5]/[0.06] text-xs text-[#B9AEA0] group-hover:text-[#DBA368] transition-colors">
                          <span className="inline-flex items-center gap-1">
                            <span>Ver no VucaFood</span>
                            <ArrowUpRight weight="regular" className="size-3.5" aria-hidden="true" />
                          </span>
                        </div>
                      </SpotlightBezelCard>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

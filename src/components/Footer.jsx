import {
  ArrowUp,
  BookOpenText,
  Coffee,
  MapPinLine,
  Star,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { siteData } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#F4EEE5]/[0.08] bg-[#110D0B] pt-16 pb-28 sm:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-[#F4EEE5]/[0.07]">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#DBA368]/35 bg-[#1E1814] text-[#DBA368]">
                <Coffee weight="light" className="size-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-2xl text-[#F4EEE5]">{siteData.nome}</span>
            </div>

            <p className="mt-4 text-sm text-[#B9AEA0] leading-relaxed max-w-[42ch] text-pretty">
              Cafés especiais, almoço executivo, bolinho de chuva, chás e confeitaria artesanal servidos com hospitalidade goiana na Alameda das Rosas, próximo ao Lago das Rosas.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#F4EEE5]/10 bg-[#1A1410] px-3.5 py-1.5 text-xs text-[#E2D9CC] tabular-nums">
              <Star weight="fill" className="size-3.5 text-[#DBA368]" aria-hidden="true" />
              <span>Nota {siteData.nota}/5 · 600+ avaliações no Google</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#DBA368] font-medium">
              Endereço & Funcionamento
            </p>
            <p className="text-[#F4EEE5]">{siteData.logradouro}</p>
            <p className="text-[#B9AEA0]">
              {siteData.bairro}, {siteData.cidadeEstado} · {siteData.cep}
            </p>
            <p className="pt-2 text-xs text-[#B9AEA0] tabular-nums">
              Ter a Sex: 09:30 - 18:00 · Sáb: 09:00 - 18:00 · Dom: 10:00 - 18:00
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex flex-col items-start md:items-end gap-2.5">
              <a
                href={siteData.linkWhatsappPedido}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#DBA368] hover:text-[#E8B986] transition-colors tabular-nums"
              >
                <WhatsappLogo weight="fill" className="size-4" aria-hidden="true" />
                <span>Pedir pelo WhatsApp {siteData.telefone}</span>
              </a>
              <a
                href={siteData.linkCardapioVuca}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#E2D9CC] hover:text-[#DBA368] transition-colors"
              >
                <BookOpenText weight="light" className="size-4 text-[#DBA368]" aria-hidden="true" />
                <span>Cardápio Digital (VucaFood)</span>
              </a>
              <a
                href={siteData.linkGoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#E2D9CC] hover:text-[#DBA368] transition-colors"
              >
                <MapPinLine weight="light" className="size-4 text-[#DBA368]" aria-hidden="true" />
                <span>Ver no Google Maps</span>
              </a>
            </div>

            <a
              href="#inicio"
              aria-label="Voltar ao topo da página"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#F4EEE5]/12 bg-[#1E1814] px-4 py-2 text-xs text-[#B9AEA0] hover:border-[#DBA368]/40 hover:text-[#F4EEE5] transition-colors active:scale-[0.97]"
            >
              <span>Voltar ao topo</span>
              <ArrowUp weight="regular" className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8B7F71]">
          <p className="tabular-nums">
            © {new Date().getFullYear()} {siteData.nome} · Goiânia, Goiás, Brasil.
          </p>
          <p className="font-serif italic text-[#B9AEA0]">
            “História, Talento, Sabedoria” - Setor Oeste
          </p>
        </div>
      </div>
    </footer>
  );
}

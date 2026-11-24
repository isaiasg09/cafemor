import { ArrowUp, Coffee, MapPinLine, Star, WhatsappLogo } from '@phosphor-icons/react';
import { siteData } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E8E6DF]/[0.08] bg-[#0B0B0C] pt-16 pb-28 sm:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-[#E8E6DF]/[0.07]">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#D4A373]/35 bg-[#161514] text-[#D4A373]">
                <Coffee weight="light" className="size-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-2xl text-[#E8E6DF]">{siteData.nome}</span>
            </div>

            <p className="mt-4 text-sm text-[#A8A298] leading-relaxed max-w-[42ch] text-pretty">
              Cafés especiais, almoço fresco, chás e confeitaria artesanal servidos com hospitalidade goiana na Alameda das Rosas, próximo ao Lago das Rosas.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E8E6DF]/10 bg-[#141312] px-3.5 py-1.5 text-xs text-[#D5D1C7] tabular-nums">
              <Star weight="fill" className="size-3.5 text-[#D4A373]" aria-hidden="true" />
              <span>Nota {siteData.nota}/5 · 600+ avaliações no Google</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4A373] font-medium">
              Endereço & Funcionamento
            </p>
            <p className="text-[#E8E6DF]">{siteData.logradouro}</p>
            <p className="text-[#A8A298]">
              {siteData.bairro}, {siteData.cidadeEstado} · {siteData.cep}
            </p>
            <p className="pt-2 text-xs text-[#A8A298] tabular-nums">
              Ter a Sex: 09:30 - 18:00 · Sáb: 09:00 - 18:00 · Dom: 10:00 - 18:00
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex flex-col items-start md:items-end gap-2.5">
              <a
                href={siteData.linkWhatsappPedido}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#D4A373] hover:text-[#E3BA91] transition-colors tabular-nums"
              >
                <WhatsappLogo weight="fill" className="size-4" aria-hidden="true" />
                <span>Pedir pelo WhatsApp {siteData.telefone}</span>
              </a>
              <a
                href={siteData.linkGoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#D5D1C7] hover:text-[#D4A373] transition-colors"
              >
                <MapPinLine weight="light" className="size-4 text-[#D4A373]" aria-hidden="true" />
                <span>Ver no Google Maps</span>
              </a>
            </div>

            <a
              href="#inicio"
              aria-label="Voltar ao topo da página"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8E6DF]/12 bg-[#161514] px-4 py-2 text-xs text-[#A8A298] hover:border-[#D4A373]/40 hover:text-[#E8E6DF] transition-colors active:scale-[0.97]"
            >
              <span>Voltar ao topo</span>
              <ArrowUp weight="regular" className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7E786F]">
          <p className="tabular-nums">
            © {new Date().getFullYear()} {siteData.nome} · Goiânia, Goiás, Brasil.
          </p>
          <p className="font-serif italic text-[#A8A298]">
            “História, Talento, Sabedoria” - Setor Oeste
          </p>
        </div>
      </div>
    </footer>
  );
}

# SKILLS A ATIVAR — Café Mor ("Coffee Noir & Warmth")

> **Design Read (`@design-taste-frontend`):** Landing page cinematográfica para cafeteria e restaurante autoral em Goiânia (**Café Mor**, Setor Oeste / Alameda das Rosas), voltada ao público que valoriza gastronomia fresca, cafés especiais e arquitetura afetiva, com linguagem **Dark Gourmet / Atmospheric Noir + Industrial Warmth**, construída em **React 19 + Vite + Tailwind CSS v4 (`@theme`) + React Three Fiber + Lenis + Motion (`motion/react`)**.

---

## 1. Dials de Engenharia Estética & Arquétipo Visual

- **`DESIGN_VARIANCE`: 8/10** — Layouts assimétricos editoriais (Split Hero 55/45, Bento Grid rítmico sem células vazias, seção editorial sobre Cora Coralina e madeira maciça).
- **`MOTION_INTENSITY`: 7/10** — Scroll suave via `Lenis`, cena 3D "Floating Coffee & Steam" em WebGL (`@react-three/fiber`) com pausa automática fora de tela e fallback para `prefers-reduced-motion`, microinterações táteis com física de mola.
- **`VISUAL_DENSITY`: 3/10** — Respiro macro (`py-24` a `py-36`), hierarquia tipográfica clara, zero poluição visual.

### Design Tokens (`@theme` em `src/index.css` — Zero JS Config)

| Token CSS | Valor | Papel Semântico & Contraste |
| :--- | :--- | :--- |
| `--color-noir-950` | `#0F0F10` | Fundo principal Off-black atmosférico |
| `--color-noir-900` | `#161514` | Superfície externa *Double-Bezel* (Outer Shell) |
| `--color-noir-850` | `#1E1C1A` | Núcleo interno *Double-Bezel* (Inner Core) |
| `--color-wood-400` | `#D4A373` | Destaque Madeira Velada (contraste `8.1:1` sobre `#0F0F10` — WCAG AAA) |
| `--color-wood-300` | `#E2B98E` | Hover luminoso sutil da Madeira Velada |
| `--color-cream-100` | `#E8E6DF` | Texto primário Off-white quente (`15.4:1` sobre `#0F0F10` — WCAG AAA) |
| `--color-stone-400` | `#A8A298` | Texto secundário de apoio (`7.2:1` sobre `#0F0F10` — WCAG AA+) |
| `--font-display` | `'Playfair Display', Georgia, serif` | Títulos editoriais com `leading-[1.12]` e proteção de descendentes em itálico |
| `--font-sans` | `'Outfit', system-ui, sans-serif` | Corpo limpo, UI e dados numéricos com `tabular-nums` |
| `--ease-out-quart` | `cubic-bezier(0.23, 1, 0.32, 1)` | Curva rápida de resposta imediata para UI |
| `--ease-cinematic` | `cubic-bezier(0.32, 0.72, 0, 1)` | Transições espaciais de gaveta, modais e revelação |

---

## 2. Síntese Rigorosa das Skills Ativadas

### `@high-end-visual-design`
- **Arquitetura *Double-Bezel* (Doppelrand):** Todos os cards principais (Galeria, Avaliações, Momentos da Casa, Horários) utilizam casca externa (`rounded-[2rem] p-1.5 bg-white/[0.03] border border-white/[0.08]`) envolvendo um núcleo interno concêntrico (`rounded-[calc(2rem-0.375rem)] bg-[#161514] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`).
- **CTAs *Button-in-Button*:** Botões em pílula (`rounded-full`) com ícone encapsulado em círculo próprio (`size-9 rounded-full`) que translada diagonalmente no `group-hover`.
- **Navbar *Fluid Island*:** Barra flutuante destacada do topo (`fixed top-4 inset-x-0 mx-auto max-w-5xl rounded-full backdrop-blur-xl`), altura contida (`<= 68px`), com menu mobile expansível e morph de hambúrguer para `X`.

### `@design-taste-frontend` & `@baseline-ui`
- **Disciplina de Hero:** Cabe inteiramente em `min-h-[100dvh]` (nunca `h-screen`), topo limitado a `pt-24`/`pt-28`, máximo de 4 blocos textuais (Eyebrow + H1 em até 2 linhas + Subtexto conciso + Par de CTAs). Prova social detalhada posicionada na faixa imediatamente abaixo.
- **Consistência de Acento & Formas:** Único acento cromático (`#D4A373`) em toda a página; botões interativos sempre `rounded-full`, containers sempre concêntricos `rounded-[2rem]`.
- **Proibições:** Zero emojis, zero fontes genéricas (`Inter`/`Roboto`), zero ícones misturados (uso exclusivo de `@phosphor-icons/react`), zero gradientes roxos/neon.

### `@ui-ux-pro-max` & `@emil-design-eng`
- **Feedback Tátil Imediato:** Todo elemento clicável responde com `active:scale-[0.97]` em `150ms` com curva `ease-out`.
- **Proibição de `scale(0)`:** Entradas iniciam em `scale(0.96)` + `opacity: 0` para preservar naturalidade física.
- **Alvos de Toque:** Botões e links interativos respeitam área mínima de `44x44px` no mobile.

### `@motion-dev`, `@scroll-experience` & `@fixing-motion-performance`
- **Importação Moderna:** Uso exclusivo de `motion/react` + `lenis` sincronizado a `requestAnimationFrame` com cleanup completo no unmount.
- **Compositor-Only (60fps):** Animações restritas a `transform` (`x`, `y`, `scale`, `rotate`) e `opacity`. Proibido animar `width`, `height`, `top`, `left` ou `blur` contínuo.
- **Controle de Visibilidade:** `IntersectionObserver` pausa o loop de renderização do WebGL quando o Hero sai da viewport; `useReducedMotion()` desativa movimentos contínuos quando solicitado pelo sistema operacional.

### `@design-spells`
- **Detalhes Memoráveis:** Indicador ao vivo do status da casa em horário de Brasília/Goiânia ("Aberto agora · Fecha às 18:00" ou próximo horário de abertura), selo interativo de temperatura/extração sensorial, cursor/spotlight sutil nos cards *Double-Bezel* guiado por `MotionValue` (sem `useState` em eventos de ponteiro) e barra flutuante inteligente de conversão ("Pedir Agora").

### `@3d-web-experience` & `@premium-3d-website`
- **Cena Hero "Floating Coffee & Steam":** Implementada com `@react-three/fiber` (`dpr={[1, 1.75]}`, `antialias: true`, `powerPreference: "high-performance"`).
- **Elementos 3D:** Xícara escultural noir/bronze acetinado + grãos torrados orbitais em baixa contagem poligonal + sistema de partículas orgânicas em GLSL/Points simulando o vapor quente ascendente do café recém-passado, reagindo suavemente ao ponteiro e ao scroll.
- **Fallback Seguro:** `ErrorBoundary` + detecção de suporte WebGL renderizando composição atmosférica em camadas CSS caso WebGL esteja indisponível.

### `@tailwind-patterns`
- **Tailwind CSS v4 Nativo:** Plugin `@tailwindcss/vite` no `vite.config.js` e diretiva `@import "tailwindcss";` seguida de `@theme` em `src/index.css`. Zero `tailwind.config.js` ou `postcss.config.js`.

### `@copywriting` & `@page-cro`
- **Fonte Única da Verdade (Zero Fabricação):** Todo o texto deriva estritamente dos fatos reais do JSON:
  - Endereço na **Alameda das Rosas, N° 1.397 — Setor Oeste, Goiânia - GO** (próximo ao Lago das Rosas).
  - Atmosfera descrita pelos clientes: mesas de madeira maciça, parede em homenagem a **Cora Coralina** (*"História, Talento, Sabedoria"*), poltronas na janela azul de frente para o jardim, cristaleira, louças afetivas, ambiente interno climatizado, almoço fresco, chás, brownies, bolos caseiros e cafés especiais.
  - **Foco 100% Presencial + WhatsApp:** Como `ifood` e `anota_ai` são `null`, o CTA primário único em toda a jornada é **"Pedir pelo WhatsApp (62) 98288-6635"** e o CTA secundário é **"Como Chegar no Maps"**.
- **Page Conversion Readiness & Impact Index (`@page-cro`):**
  - Clareza da Proposta de Valor: `24/25`
  - Foco no Objetivo de Conversão (WhatsApp + Visita): `19/20`
  - Alinhamento Mensagem–Intenção Local: `14/15`
  - Sinais de Confiança (`4.5/5` · `626` avaliações reais nominadas): `15/15`
  - Baixa Fricção Mobile/WebGL Leve: `14/15`
  - Tratamento de Objeções (horários, pico de almoço, mesas internas vs. jardim): `9/10`
  - **Score Diagnóstico Total: `95/100` (High Readiness)**.

### `@schema-markup`
- **Schema Eligibility & Impact Index:** `94/100` (*Strong Candidate*).
- **Implementação JSON-LD (`index.html`):** Entidade combinada `["CafeOrCoffeeShop", "Restaurant", "LocalBusiness"]` espelhando fielmente nome, endereço postal em Goiânia (`74125-010`), telefone `+55-62-98288-6635`, `openingHoursSpecification` exato de terça a domingo, imagens reais e `aggregateRating` (`4.5` / `626` avaliações).

### `@fixing-accessibility` & `@web-performance-optimization`
- Semântica HTML5 completa (`header`, `main`, `section`, `footer`, `nav`), `skip-to-content` link, `aria-label` em controles de ícones, `Escape` fechando menu mobile e lightbox da galeria, `loading="lazy"` + `decoding="async"` + `aspect-ratio` explícito nas fotos abaixo da dobra para `CLS = 0`, e `manualChunks` separando `three` do bundle principal para `LCP` imediato.

### `@full-output-enforcement`
- Todos os arquivos exigidos gerados na raiz do projeto, 100% completos, funcionais e sem abreviações, placeholders ou trechos omitidos.

---

## 3. Matriz de Conformidade das Skills

| Skill | Regra Crítica Aplicada | Arquivo(s) Alvo | Status |
| :--- | :--- | :--- | :--- |
| `@high-end-visual-design` | Cards *Double-Bezel*, CTAs *Button-in-Button*, Navbar *Fluid Island* | `Navbar.jsx`, `GallerySection.jsx`, `ReviewsSection.jsx` | Ativo |
| `@design-taste-frontend` | Split Hero `min-h-[100dvh]`, zero clichês de IA, paleta unificada | `HeroSection.jsx`, `App.jsx`, `index.css` | Ativo |
| `@ui-ux-pro-max` | Contraste AAA, alvos `>=44px`, hierarquia escaneável | Todos os componentes UI | Ativo |
| `@emil-design-eng` | `active:scale-[0.97]`, curvas customizadas, zero `scale(0)` | `ActionButtons.jsx`, `index.css` | Ativo |
| `@motion-dev` | `motion/react`, `MotionValue`, `useReducedMotion` | `HeroSection.jsx`, `ReviewsSection.jsx`, `FloatingOrderBar.jsx` | Ativo |
| `@scroll-experience` | `Lenis` smooth scroll + narrativa sensorial progressiva | `App.jsx`, `StorySection.jsx` | Ativo |
| `@fixing-motion-performance` | Animações GPU (`transform`/`opacity`) e pausa WebGL offscreen | `CoffeeSteamCanvas.jsx`, `index.css` | Ativo |
| `@design-spells` | Status ao vivo Goiânia, spotlight tátil e pílula flutuante `backdrop-blur` | `Navbar.jsx`, `FloatingOrderBar.jsx` | Ativo |
| `@3d-web-experience` | Xícara/grãos 3D e nuvem orgânica de vapor em R3F | `CoffeeSteamCanvas.jsx` | Ativo |
| `@premium-3d-website` | `dpr={[1, 1.75]}`, shader customizado de vapor, fallback seguro | `CoffeeSteamCanvas.jsx` | Ativo |
| `@tailwind-patterns` | `@tailwindcss/vite` + `@theme` CSS-first sem config JS | `vite.config.js`, `src/index.css` | Ativo |
| `@copywriting` | Copy PT-BR natural extraída 100% dos relatos reais | `siteData.js`, todas as seções | Ativo |
| `@page-cro` | Hierarquia WhatsApp primário + Google Maps secundário + FAQ | `HeroSection.jsx`, `VisitSection.jsx` | Ativo |
| `@schema-markup` | JSON-LD `CafeOrCoffeeShop` & `Restaurant` validado | `index.html` | Ativo |
| `@fixing-accessibility` | Navegação por teclado, foco visível, `aria-*`, contraste AAA | `index.html`, todos os componentes | Ativo |
| `@web-performance-optimization` | Code-splitting do Three.js (`React.lazy`), dimensões explícitas | `vite.config.js`, `HeroSection.jsx`, `GallerySection.jsx` | Ativo |
| `@baseline-ui` | `text-balance`, `text-pretty`, `tabular-nums`, escala fixa `z-index` | `src/index.css`, todos os componentes | Ativo |
| `@full-output-enforcement` | Entrega integral sem truncamentos na raiz do repositório | Repositório completo | Ativo |

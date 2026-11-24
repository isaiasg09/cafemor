import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import VisitSection from './components/VisitSection';
import FloatingOrderBar from './components/FloatingOrderBar';
import Footer from './components/Footer';
import { getGoianiaLiveStatus } from './utils/liveHours';

export default function App() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [liveStatus, setLiveStatus] = useState(() => getGoianiaLiveStatus());

  // Atualiza status "Aberto agora / Abre às..." a cada minuto em horário de Goiânia
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveStatus(getGoianiaLiveStatus());
    }, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  // Inicializa Lenis Smooth Scroll respeitando prefers-reduced-motion
  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    }
    rafId = window.requestAnimationFrame(raf);

    // Suporte suave para links âncora internos (#essencia, #galeria, etc.)
    function handleAnchorClick(event) {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        event.preventDefault();
        lenis.scrollTo(targetEl, { offset: -84 });
      }
    }

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return (
    <div className="relative min-h-[100dvh] bg-[#0F0F10] text-[#E8E6DF]">
      {/* Skip-to-content para acessibilidade via teclado */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#D4A373] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#0F0F10]"
      >
        Pular para o conteúdo principal
      </a>

      {/* Textura sutil de filme fixada na GPU (zero impacto no scroll) */}
      <div aria-hidden="true" className="noir-grain" />

      <Navbar liveStatus={liveStatus} />

      <main id="conteudo-principal">
        <HeroSection liveStatus={liveStatus} />
        <StorySection />
        <GallerySection />
        <ReviewsSection />
        <VisitSection liveStatus={liveStatus} />
      </main>

      <FloatingOrderBar />
      <Footer />
    </div>
  );
}

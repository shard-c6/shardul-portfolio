import { useEffect, useRef } from 'react';

/**
 * Lenis smooth scroll hook.
 * Syncs Lenis with GSAP ScrollTrigger ticker.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    let raf;

    const init = async () => {
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default || LenisModule.Lenis;

      lenis = new Lenis({
        lerp: 0.075,
        duration: 1.6,
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Sync with GSAP ScrollTrigger
      try {
        const gsapModule = await import('gsap');
        const stModule = await import('gsap/ScrollTrigger');
        const gsap = gsapModule.default || gsapModule.gsap;
        const ScrollTrigger = stModule.default || stModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (e) {
        // Fallback if GSAP not loaded — use native rAF
        function animate(time) {
          lenis.raf(time);
          raf = requestAnimationFrame(animate);
        }
        raf = requestAnimationFrame(animate);
      }
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return lenisRef;
}

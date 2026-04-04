import { useEffect, useRef } from 'react';

/**
 * Custom hook for GSAP ScrollTrigger animations.
 * Dynamically imports GSAP + ScrollTrigger for code-splitting.
 * Returns a ref to the container and a function to create animations.
 */
export function useGsap() {
  const gsapRef = useRef(null);
  const stRef = useRef(null);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger = stModule.default || stModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;
      stRef.current = ScrollTrigger;
    };
    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return { gsapRef, stRef };
}

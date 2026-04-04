import { useRef, useCallback } from 'react';

/**
 * Magnetic hover effect hook.
 * Cards attract cursor within a radius, applying transform.
 */
export function useMagneticHover(strength = 10, radius = 80) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const factor = (1 - dist / radius) * strength;
      const tx = (dx / dist) * factor;
      const ty = (dy / dist) * factor;
      ref.current.style.transform = `translate(${tx}px, ${ty}px)`;
    } else {
      ref.current.style.transform = 'translate(0, 0)';
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
      ref.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        if (ref.current) ref.current.style.transition = '';
      }, 400);
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

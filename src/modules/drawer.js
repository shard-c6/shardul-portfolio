import { gsap } from 'gsap';

export function initDrawer(lenis) {
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  let open = false;

  const show = () => {
    open = true;
    lenis?.stop();
    drawer.setAttribute('aria-hidden', 'false');
    gsap.to(drawer, { x: 0, duration: 0.7, ease: 'power4.out' });
    gsap.to(scrim, { opacity: 1, pointerEvents: 'auto', duration: 0.4 });
    gsap.from('#drawer > *', { y: 20, opacity: 0, stagger: 0.05, delay: 0.15 });
  };
  const hide = () => {
    if (!open) return;
    open = false;
    lenis?.start();
    drawer.setAttribute('aria-hidden', 'true');
    gsap.to(drawer, { x: '100%', duration: 0.5, ease: 'power3.in' });
    gsap.to(scrim, { opacity: 0, pointerEvents: 'none' });
  };

  document.getElementById('openDrawer').onclick = show;
  document.getElementById('closeDrawer').onclick = hide;
  scrim.onclick = hide;
  drawer.querySelectorAll('[data-close]').forEach((a) => a.addEventListener('click', hide));
  addEventListener('keydown', (e) => e.key === 'Escape' && hide());
}

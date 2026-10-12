import { gsap } from 'gsap';

const SEEN_KEY = 'sc-gate-seen';

// Lanyard entry: drag the badge down past a threshold (or press Enter / "skip") to enter.
// Shown once per browser session; reduced-motion visitors go straight in.
export function initGate({ reduced, lenis, onEnter }) {
  const gate = document.getElementById('gate');
  let seen = false;
  try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage blocked */ }

  if (reduced || seen) {
    gate.remove();
    onEnter();
    return;
  }

  document.body.classList.add('gated');
  lenis?.stop();
  const badge = document.getElementById('badge');
  const strap = gate.querySelector('.strap');
  let dragging = false, startY = 0, dy = 0, done = false;

  gsap.from(badge, { y: -400, rotation: 8, duration: 1.4, ease: 'elastic.out(1,.45)' });
  gsap.from(strap, { scaleY: 0, duration: 0.8, ease: 'power3.out' });
  badge.focus({ preventScroll: true });

  badge.addEventListener('pointerdown', (e) => {
    dragging = true;
    startY = e.clientY;
    badge.setPointerCapture(e.pointerId);
    badge.style.cursor = 'grabbing';
  });
  badge.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dy = Math.max(0, e.clientY - startY);
    gsap.set(badge, { y: dy, rotation: (e.clientX - innerWidth / 2) / 60 });
    gsap.set(strap, { scaleY: 1 + dy / (innerHeight * 0.34) });
  });
  badge.addEventListener('pointerup', () => {
    dragging = false;
    badge.style.cursor = 'grab';
    if (dy > 140) enter();
    else {
      gsap.to(badge, { y: 0, rotation: 0, duration: 1, ease: 'elastic.out(1,.4)' });
      gsap.to(strap, { scaleY: 1, duration: 1, ease: 'elastic.out(1,.4)' });
    }
    dy = 0;
  });
  badge.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), enter()));
  document.getElementById('skip').onclick = enter;

  function enter() {
    if (done) return;
    done = true;
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
    gsap.timeline({
      onComplete: () => {
        gate.remove();
        document.body.classList.remove('gated');
        lenis?.start();
        onEnter();
      },
    })
      .to(badge, { y: innerHeight, rotation: 14, duration: 0.6, ease: 'power2.in' })
      .to(strap, { scaleY: 0, duration: 0.4 }, 0)
      .to(gate, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=.1');
  }
}

import { gsap } from 'gsap';

const LINE = '// I make hard to fool.';
const WALK_SPEED = 260; // px per second

// The little database buddy walks in, "writes" the code line alongside the caret, then walks off.
export function playHero(reduced) {
  const hero = document.querySelector('.hero');
  const walker = document.getElementById('walker');
  const caret = document.getElementById('hcaret');
  const typed = document.getElementById('typed');
  const sub = hero.querySelector('.sub');

  if (reduced) {
    typed.textContent = LINE;
    return;
  }

  // Where the buddy should stand: just right of the caret, feet on the code line.
  const spot = () => {
    const h = hero.getBoundingClientRect();
    const c = caret.getBoundingClientRect();
    return { x: c.right - h.left + 4, y: c.bottom - h.top - 50 };
  };

  gsap.from('.hero h1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
  gsap.set(caret, { opacity: 0 });
  gsap.set(sub, { opacity: 0, y: 12 });

  const start = spot();
  gsap.set(walker, { x: -80, y: start.y, opacity: 1 });
  walker.classList.add('walking');

  gsap.timeline({ delay: 0.5 })
    .to(walker, { x: start.x - 8, duration: Math.max(1.2, start.x / WALK_SPEED), ease: 'none' })
    .call(() => {
      walker.classList.remove('walking');
      gsap.set(caret, { opacity: 1 });
    })
    .to('#eyes', { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.08, yoyo: true, repeat: 1 })
    .to({}, { duration: 0.25 })
    .call(typeLine);

  function typeLine() {
    walker.classList.add('walking');
    let i = 0;
    const t = setInterval(() => {
      typed.textContent = LINE.slice(0, ++i);
      gsap.to(walker, { x: spot().x - 8, duration: 0.07, ease: 'none' });
      if (i >= LINE.length) {
        clearInterval(t);
        exit();
      }
    }, 75);
  }

  function exit() {
    gsap.timeline()
      .to({}, { duration: 0.35 })
      .to(walker, { x: hero.offsetWidth + 80, duration: (hero.offsetWidth - spot().x) / WALK_SPEED, ease: 'power1.in' })
      .to(sub, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=1')
      .call(() => {
        walker.classList.remove('walking');
        gsap.set(walker, { opacity: 0 });
      });
  }
}

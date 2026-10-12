import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmooth } from './modules/smooth.js';
import { initGate } from './modules/gate.js';
import { initDrawer } from './modules/drawer.js';
import { playHero } from './modules/hero.js';
import { initScenes } from './modules/scenes.js';
import { initPong } from './modules/pong.js';
import { renderSections } from './modules/sections.js';

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) document.documentElement.classList.add('rm');

renderSections();
const lenis = initSmooth(reduced);
initDrawer(lenis);
initScenes(reduced);
initPong();

initGate({
  reduced,
  lenis,
  onEnter: () => playHero(reduced),
});

// Web fonts change text metrics; re-measure pins once they have loaded.
document.fonts?.ready.then(() => ScrollTrigger.refresh());

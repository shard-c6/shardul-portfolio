import { gsap } from 'gsap';

const TOKENS = [['Is', 3923], ['this', 649], ['charg', 15837], ['ing', 466], ['ses', 26722], ['sion', 1108], ['an', 281], ['attack', 4012], ['?', 30]];

const CODE = `<span class="c"># request · today, 09:41</span>
<span class="k">pipeline</span> = apix.build(
  sources=[<span class="s">"airlines"</span>, <span class="s">"OTAs"</span>],
  validate=<span class="s">"contract.yaml"</span>,
  tax=<span class="s">"separate"</span>,   <span class="c"># fares ≠ fees</span>
)
pipeline.<span class="f">schedule</span>(<span class="s">"*/15 * * * *"</span>)
pipeline.<span class="f">index</span>(base=<span class="s">"2024-Q1"</span>)  <span class="c"># ✶ index is live</span>`;

const plain = (h) => h.replace(/<[^>]+>/g, '');
const PLAIN_LEN = plain(CODE).length;

// Type out HTML without breaking tags: count only visible characters.
function sliceHTML(h, n) {
  let out = '', count = 0, i = 0;
  while (i < h.length && count < n) {
    if (h[i] === '<') {
      const j = h.indexOf('>', i);
      out += h.slice(i, j + 1);
      i = j + 1;
    } else {
      out += h[i++];
      count++;
    }
  }
  return out + (n < PLAIN_LEN ? '<span class="caret"></span>' : '');
}

function setCounters(progress) {
  document.querySelectorAll('#stats b').forEach((b) => {
    const n = +b.dataset.n;
    const v = n * progress;
    b.textContent = (n % 1 ? v.toFixed(1) : Math.round(v)) + (progress >= 1 ? b.dataset.suffix : '');
  });
}

export function initScenes(reduced) {
  document.querySelector('#s-learn .tokens').innerHTML = TOKENS.map(([t, id]) => `<span class="tok">${t}<i>${id}</i></span>`).join('');

  if (reduced) {
    // Static end state of every scene.
    document.getElementById('code').innerHTML = CODE;
    document.getElementById('edstat').textContent = '● live';
    document.querySelectorAll('#s-learn .meter i').forEach((m) => m.style.setProperty('--w', m.dataset.w + '%'));
    document.getElementById('pghost').style.color = 'inherit';
    setCounters(1);
    return;
  }

  // Shorter pins on phones so the page doesn't feel endless.
  const mobile = matchMedia('(max-width: 760px)').matches;
  const len = (px) => (mobile ? px * 0.65 : px);
  const pin = (id, px) =>
    gsap.timeline({ scrollTrigger: { trigger: id, start: 'top top', end: '+=' + len(px), pin: true, scrub: 1 } });
  const titleIn = (tl, id) => tl.fromTo(id + ' .title', { color: '#c8c5bf' }, { color: '#141414', duration: 1 });

  /* pipelines */
  gsap.set('#s-pipe .chips, #s-pipe .layers, #s-pipe .craft', { opacity: 0 });
  {
    const tl = pin('#s-pipe', 2600);
    titleIn(tl, '#s-pipe');
    tl.from('#s-pipe .rule', { y: 60, opacity: 0, stagger: 0.3, duration: 0.8 }, '<.3')
      .to('#s-pipe .rule', { x: (i) => [-40, 40, -20][i], opacity: 0, stagger: 0.1, duration: 0.6 }, '+=.6')
      .to('#s-pipe .chips', { opacity: 1, duration: 0.3 })
      .from('#s-pipe .chip', { scale: 0.4, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, '<')
      .to('#s-pipe .layers', { opacity: 1, duration: 0.2 })
      .from('#s-pipe .layer', { y: -120, opacity: 0, rotationX: 50, stagger: 0.18, duration: 0.7 }, '<')
      .to('#s-pipe .layer', { marginTop: 4, duration: 0.8 })
      .to('#s-pipe .craft', { opacity: 1, y: -10, duration: 0.6 });
  }

  /* learning */
  gsap.set('#s-learn .tokens, #s-learn .net', { opacity: 0 });
  {
    const tl = pin('#s-learn', 2600);
    titleIn(tl, '#s-learn');
    tl.from('#s-learn .prompt', { y: 40, opacity: 0, duration: 0.6 }, '<.3')
      .to('#pghost', { color: '#141414', duration: 0.4 })
      .to('#s-learn .tokens', { opacity: 1, duration: 0.1 })
      .from('#s-learn .tok', { y: -30, opacity: 0, stagger: 0.06, duration: 0.4 })
      .to('#s-learn .net', { opacity: 1, duration: 0.3 })
      .from('#s-learn .net span', { scale: 0.6, opacity: 0, stagger: 0.12, duration: 0.4 }, '<')
      .to('#s-learn .net span', { borderColor: '#e8531f', color: '#e8531f', stagger: 0.12, duration: 0.2 })
      .from('#s-learn .pred', { y: 80, opacity: 0, stagger: 0.15, duration: 0.7 })
      .to('#s-learn .meter i', { width: (i, el) => el.dataset.w + '%', duration: 0.8 }, '<.3');
  }

  /* work: request → code → gallery */
  gsap.set('#work .editor, #work .gallery', { opacity: 0 });
  {
    const pre = document.getElementById('code');
    const status = document.getElementById('edstat');
    const row = document.getElementById('grow');
    const stage = document.querySelector('#work .stage');
    const counter = { p: 0 };
    const typing = { p: 0 };
    const tl = pin('#work', 3400);
    titleIn(tl, '#work');
    tl.from('#work .chat', { y: 40, opacity: 0, duration: 0.6 }, '<.3')
      .to('#bubble', { scale: 0.94, duration: 0.3 }, '+=.4')
      .to('#work .chat', { y: -80, opacity: 0, duration: 0.6 })
      .to('#work .editor', { opacity: 1, duration: 0.4 }, '<.2')
      .to(typing, {
        p: 1,
        duration: 2,
        ease: 'none',
        onUpdate: () => {
          pre.innerHTML = sliceHTML(CODE, Math.floor(typing.p * PLAIN_LEN));
          status.textContent = typing.p > 0.98 ? '● live' : '✶ writing …';
        },
      })
      .to('#work .editor', { scale: 0.9, opacity: 0, duration: 0.6 }, '+=.3')
      .to('#work .gallery', { opacity: 1, duration: 0.3 })
      .from('#work .proj', { y: 100, opacity: 0, rotation: 3, stagger: 0.12, duration: 0.7 }, '<')
      .to(row, { x: () => -Math.max(0, row.scrollWidth - stage.offsetWidth), duration: 1.4 })
      .from('#work .stat', { y: 30, opacity: 0, stagger: 0.1, duration: 0.4 }, '<')
      .to(counter, { p: 1, duration: 1, onUpdate: () => setCounters(counter.p) }, '<');
  }

  /* dehelpers terminal */
  gsap.set('#s-pkg .anno', { opacity: 0 });
  {
    const tl = pin('#s-pkg', 1800);
    titleIn(tl, '#s-pkg');
    tl.from('#s-pkg .term', { y: 120, rotationX: 30, opacity: 0, duration: 1 }, '<.3')
      .from('#s-pkg .term div', { opacity: 0, x: -10, stagger: 0.12, duration: 0.3 })
      .to('#s-pkg .anno', { opacity: 1, stagger: 0.2, duration: 0.4 });
  }

  /* philosophy: each card scales back as the next one slides over it */
  gsap.utils.toArray('.step').forEach((s, i, all) => {
    if (i < all.length - 1)
      gsap.to(s, { scale: 0.92, opacity: 0.5, scrollTrigger: { trigger: all[i + 1], start: 'top bottom', end: 'top top', scrub: true } });
    gsap.from(s.querySelectorAll('h2, p, .n'), { y: 50, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: s, start: 'top 60%' } });
  });

  /* generic reveals */
  gsap.utils.toArray('.sec h2, .posts a, .letter, .pongwrap h2, .pong').forEach((el) =>
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }),
  );
}

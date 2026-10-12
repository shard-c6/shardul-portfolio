import { gsap } from 'gsap';
import { links, projects, stats, stack, posts, reviews } from '../content.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function renderSections() {
  // data-link="github" etc. → real hrefs
  document.querySelectorAll('[data-link]').forEach((a) => (a.href = links[a.dataset.link]));
  document.querySelector('#badge .photo').style.backgroundImage = 'url(./assets/shardul.png)';

  document.getElementById('grow').innerHTML = projects
    .map(
      (p, i) => `<a class="proj card" href="${p.href}" target="_blank" rel="noopener">
        <div class="meta"><span>${esc(p.tag)}</span><span>0${i + 1}</span></div>
        <div><div class="role">${esc(p.role)}</div><h4>${esc(p.name)}</h4><p>${esc(p.blurb)}</p></div>
      </a>`,
    )
    .join('');

  document.getElementById('stats').innerHTML = stats
    .map((s) => `<div class="stat"><b data-n="${s.n}" data-suffix="${s.suffix || ''}">0</b><span>${esc(s.label)}</span></div>`)
    .join('');

  document.getElementById('posts').innerHTML = posts
    .map(
      (p) => `<a href="${p.href}" target="_blank" rel="noopener"><span class="eyebrow">${esc(p.kicker)}</span>
        <div><div class="t">${esc(p.title)}</div><div class="d">${esc(p.desc)}</div></div><span class="arr">→</span></a>`,
    )
    .join('');

  const card = (r) => `<div class="rev card"><q>${esc(r.quote)}</q><b>${esc(r.name)}</b><span>${esc(r.role)}</span></div>`;
  // Rendered twice so the marquee can loop seamlessly at -50%.
  document.getElementById('mtrack').innerHTML = [...reviews, ...reviews].map(card).join('');

  initStackTabs();
  initLetter();
}

function initStackTabs() {
  const tabs = document.getElementById('tabs');
  const pills = document.getElementById('pills');
  const show = (key, btn) => {
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    tabs.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
    pills.innerHTML = stack[key].map((s) => `<span>${esc(s)}</span>`).join('');
    gsap.from('#pills span', { y: 24, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out' });
  };
  Object.keys(stack).forEach((key, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.textContent = `${key} · ${stack[key].length}`;
    b.onclick = () => show(key, b);
    tabs.appendChild(b);
    if (i === 0) show(key, b);
  });
}

// No backend: the letter opens the visitor's mail app with the message prefilled.
function initLetter() {
  document.getElementById('letter').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.msg.value.trim();
    if (!msg) return;
    location.href = `mailto:${links.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent('Hey Shardul,\n\n' + msg)}`;
  });
}

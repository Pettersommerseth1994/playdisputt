// The headline letters that blur in, and the blocks that fade up when they come into view.
document.querySelectorAll('.ta').forEach((h) => {
  let k = 0;
  const walk = (node, out) => node.childNodes.forEach((n) => {
    if (n.nodeType === 3) {
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { out.append(' '); return; }
        const w = document.createElement('span'); w.className = 'w';
        [...part].forEach((ch) => { const c = document.createElement('span'); c.className = 'c'; c.style.setProperty('--k', k++); c.textContent = ch; w.append(c); });
        out.append(w);
      });
    } else if (n.nodeType === 1) { const el = n.cloneNode(false); walk(n, el); out.append(el); }
  });
  const frag = document.createElement('div'); walk(h, frag); h.replaceChildren(...frag.childNodes);
  h.style.setProperty('--step', Math.min(0.035, 1.4 / Math.max(k, 1)) + 's'); // long headings must not take forever
});
const heroH1 = document.querySelector('.hero h1.ta');
if (heroH1) requestAnimationFrame(() => heroH1.classList.add('go'));
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(e.target.classList.contains('ta') ? 'go' : 'in'); io.unobserve(e.target); } }), { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.rv, .ta:not(.go)').forEach((el) => io.observe(el));

// The «Spill nå» that sticks to the top of the screen: shown when the one in the hero has scrolled out of view above.
const heroBtn = document.querySelector('.hero .cta .btn'), stickyBtn = document.querySelector('.sticky-cta');
if (heroBtn && stickyBtn) new IntersectionObserver(([e]) => stickyBtn.classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroBtn);

// The language: the flags at the top are links to /, /da/ and /sv/ and the click is remembered. A visitor whose browser is Danish or Swedish, and
// who has not chosen, is asked once on the Norwegian page whether the page should be in that language (a little card after three seconds). The
// head of the Norwegian page also sends someone who chose Danish or Swedish earlier straight to that page (publish-landing.py).
const SAVE = 'playdisputt:sprak';
const kept = { get() { try { return localStorage.getItem(SAVE); } catch { return null; } }, set(v) { try { localStorage.setItem(SAVE, v); } catch { /* private window */ } } };
document.querySelectorAll('a.lchip').forEach((a) => a.addEventListener('click', () => kept.set(a.dataset.sprak)));
if ((document.documentElement.dataset.sprak || 'no') === 'no' && !kept.get()) {
  const ASK = {
    da: { q: 'Vil du have siden på dansk?', yes: 'Ja, dansk', no: 'Nej, behold norsk', href: '/da/' },
    sv: { q: 'Vill du ha sidan på svenska?', yes: 'Ja, svenska', no: 'Nej, behåll norska', href: '/sv/' },
  };
  const first = (navigator.languages?.length ? navigator.languages : [navigator.language || '']).map((l) => String(l).slice(0, 2).toLowerCase()).find((l) => ['nb', 'nn', 'no', 'da', 'sv'].includes(l));
  const ask = ASK[first];
  if (ask) setTimeout(() => {
    const card = document.createElement('div');
    card.className = 'langcard card card--paper'; card.lang = first; card.setAttribute('role', 'dialog'); card.setAttribute('aria-label', ask.q); card.translate = false;
    card.innerHTML = '<p></p><div class="row"><a class="btn btn--slim"></a><button type="button" class="no"></button></div>';
    card.querySelector('p').textContent = ask.q;
    const yes = card.querySelector('a'), no = card.querySelector('button');
    yes.textContent = ask.yes; yes.href = ask.href; yes.addEventListener('click', () => kept.set(first));
    no.textContent = ask.no;
    const close = () => { card.classList.remove('show'); setTimeout(() => card.remove(), 700); kept.set('no'); };
    no.addEventListener('click', close);
    card.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    document.body.append(card);
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('show')));
  }, 3000);
}

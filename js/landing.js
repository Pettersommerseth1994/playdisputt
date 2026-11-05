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

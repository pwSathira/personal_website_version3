// Page motion, built on Motion (motion.dev).
//
// The inline script in Base.astro adds `motion` to <html> only when the
// visitor has not asked for reduced motion; the CSS in global.css hides the
// targets below under that class so nothing flashes before it animates. If
// this module never runs, that script removes the class after a timeout and
// the page shows as static.
import { animate, inView, scroll, stagger } from 'motion';

type El = HTMLElement | SVGElement;
const root = document.documentElement;
const EASE = [0.16, 1, 0.3, 1] as const; // long, soft settle
const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

function run() {
  progress();
  hero();
  sectionHeads();
  missions();
  passLog();
  spec();
  contact();
  missionPage();
  figures();
}

/* ---------- helpers ---------- */

const fadeUp = (els: El[] | El, delay = 0, y = 14, each = 0.06) =>
  animate(
    els as any,
    { opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] },
    { duration: 0.7, ease: EASE, delay: Array.isArray(els) ? stagger(each, { startDelay: delay }) : delay },
  );

const once = (el: Element | null, fn: () => void, amount = 0.25) => {
  if (el) inView(el, () => void fn(), { amount });
};

// Mono text "decodes" from noise, left to right, like telemetry locking on.
// Width is stable because the data face is monospaced.
const NOISE = '0123456789ABCDEFX#/<>+-';
function decode(el: HTMLElement, duration = 0.7, delay = 0) {
  const text = el.dataset.text ?? el.textContent ?? '';
  el.dataset.text = text;
  el.setAttribute('aria-label', text);
  return animate(0, 1, {
    duration,
    delay,
    ease: 'linear',
    onUpdate: (p) => {
      const locked = Math.floor(p * text.length);
      let out = text.slice(0, locked);
      for (let i = locked; i < text.length; i++) {
        const c = text[i];
        out += c === ' ' || c === '·' ? c : NOISE[(Math.random() * NOISE.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = text;
      el.removeAttribute('aria-label');
    },
  });
}

// Counts every number inside an element up from zero, keeping the rest of
// the text ("16% → 100%", "8 months", "1,204") as written.
function countUp(el: HTMLElement, duration = 1.4, delay = 0) {
  const text = el.textContent ?? '';
  const re = /\d[\d,]*(?:\.\d+)?/g;
  const nums = [...text.matchAll(re)].map((m) => ({
    value: Number(m[0].replace(/,/g, '')),
    dp: m[0].split('.')[1]?.length ?? 0,
    comma: m[0].includes(','),
  }));
  if (!nums.length) return;
  const fmt = (n: number, d: (typeof nums)[0]) =>
    d.comma ? n.toLocaleString('en-CA', { maximumFractionDigits: d.dp, minimumFractionDigits: d.dp }) : n.toFixed(d.dp);
  el.style.fontVariantNumeric = 'tabular-nums';
  animate(0, 1, {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (p) => {
      let i = 0;
      el.textContent = text.replace(re, () => {
        const d = nums[i++];
        return fmt(d.value * p, d);
      });
    },
    onComplete: () => (el.textContent = text),
  });
}

const draw = (els: El[] | El, opts: { axis?: 'X' | 'Y'; delay?: number; each?: number; duration?: number } = {}) => {
  const { axis = 'X', delay = 0, each = 0.08, duration = 0.9 } = opts;
  return animate(
    els as any,
    { transform: [`scale${axis}(0)`, `scale${axis}(1)`] },
    { duration, ease: EASE, delay: Array.isArray(els) ? stagger(each, { startDelay: delay }) : delay },
  );
};

/* ---------- header scroll progress ---------- */

function progress() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;
  scroll(animate(bar, { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' }));
}

/* ---------- hero: acquisition sequence ---------- */

function hero() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;


  animate(
    $('h1 .line > span', hero),
    { transform: ['translateY(105%)', 'translateY(0%)'] },
    { duration: 1.1, ease: EASE, delay: stagger(0.12, { startDelay: 0.15 }) },
  );
  fadeUp($('.side > *', hero), 0.45, 16, 0.08);

  // The SS mark: dots switch on in a diagonal sweep while the name rises,
  // then a faint glint crosses the mark every few seconds. Opacity tops out
  // at 1 and rests at 0.82, so the shimmer stays a highlight, not a blink.
  const dots = $<SVGCircleElement>('.hero-mark circle', hero);
  if (dots.length) {
    const key = (c: SVGCircleElement) => Number(c.getAttribute('cx')) + (100 - Number(c.getAttribute('cy')));
    const max = Math.max(...dots.map(key));
    const at = (i: number) => key(dots[i]) / max; // 0 bottom-left … 1 top-right
    const REST = 0.82;
    animate(
      dots,
      { opacity: [0, REST], transform: ['scale(0)', 'scale(1)'] },
      { duration: 0.5, ease: EASE, delay: (i) => 0.2 + at(i) * 0.8 },
    ).then(() => {
      // One cycle = a 0.7s glint, then a rest. The rest is part of the
      // keyframes (not repeatDelay) so the whole thing runs on the compositor.
      const GLINT = 0.7, CYCLE = 6.7, g = GLINT / CYCLE;
      animate(
        dots,
        { opacity: [REST, 1, REST, REST], transform: ['scale(1)', 'scale(1.18)', 'scale(1)', 'scale(1)'] },
        { duration: CYCLE, times: [0, g / 2, g, 1], ease: 'easeInOut', delay: (i) => 0.6 + at(i) * 0.9, repeat: Infinity },
      );
    });
  }

  const dot = hero.querySelector<HTMLElement>('.status .dot');
  if (dot) {
    const ring = 'color-mix(in srgb, var(--ok) 22%, transparent)';
    animate(
      dot,
      { boxShadow: [`0 0 0 0px ${ring}`, `0 0 0 7px transparent`] },
      { duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 1.4 },
    );
  }

  // The ground-track panel unrolls top to bottom, then its readouts settle in.
  const gt = hero.querySelector<HTMLElement>('.gt');
  if (gt) {
    animate(
      gt,
      { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] },
      { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.7 },
    );
    fadeUp($('.gt-head > span', gt), 1.3, 8, 0.05);
    fadeUp($('.gt-readouts > div', gt), 1.4, 8, 0.05);
    animate($('.gt-passes, figcaption', gt), { opacity: [0, 1] }, { duration: 0.6, delay: 1.6 });
  }
}


/* ---------- section heads: rule draws, label decodes, title rises ---------- */

function sectionHeads() {
  for (const head of $('.section-head')) {
    once(head, () => {
      animate(0, 1, {
        duration: 1.1,
        ease: EASE,
        onUpdate: (v) => head.style.setProperty('--rule-x', String(v)),
      });
      const label = head.querySelector<HTMLElement>('.label');
      if (label) {
        animate(label, { opacity: [0, 1] }, { duration: 0.2 });
        decode(label, 0.6, 0.1);
      }
      fadeUp($('h2, p', head), 0.15, 20, 0.1);
    });
  }
}

/* ---------- missions ---------- */

function missions() {
  const list = document.querySelector<HTMLElement>('#missions .list');
  if (!list) return;
  for (const row of $('.row', list)) {
    once(row, () => {
      fadeUp(row, 0, 24);
      animate($('.code', row), { opacity: [0, 1] }, { duration: 0.4, delay: 0.2 });

    });
  }
}

/* ---------- pass log: the schedule plots itself ---------- */

function passLog() {
  const tl = document.querySelector<HTMLElement>('#pass-log .timeline');
  if (tl) {
    once(tl, () => {
      // Bars draw in chronological order, as if the schedule were being booked.
      const bars = $('.bar', tl).sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left));
      draw(bars, { delay: 0.2, each: 0.07, duration: 0.8 });
      fadeUp($('.bar-label', tl), 0.5, 4, 0.07);
      animate($('.axis span', tl), { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.05) });
      animate($('.lane-name', tl), { opacity: [0, 1] }, { duration: 0.5, delay: 0.1 });
      const now = tl.querySelector<HTMLElement>('.now');
      if (now) {
        const t = 0.2 + bars.length * 0.07 + 0.3;
        draw(now, { axis: 'Y', delay: t, duration: 0.7 });
        animate(now.querySelector('span')!, { opacity: [0, 1] }, { delay: t + 0.4, duration: 0.4 });
      }
    }, 0.4);
  }
  for (const li of $('#pass-log .jobs > li')) once(li, () => fadeUp(li, 0, 20));
  const aside = document.querySelector<HTMLElement>('#pass-log .aside');
  once(aside, () => fadeUp($(':scope > *', aside!), 0, 12, 0.05), 0.1);
}

/* ---------- spec sheet ---------- */

function spec() {
  const sheet = document.querySelector<HTMLElement>('#spec .spec');
  once(sheet, () => {
    const rows = $(':scope > div', sheet!);
    fadeUp(rows, 0, 12, 0.08);
    rows.forEach((r, i) => fadeUp($('li', r), 0.15 + i * 0.08, 6, 0.035));
  }, 0.15);
}

/* ---------- contact ---------- */

function contact() {
  const c = document.querySelector<HTMLElement>('#contact');
  if (!c) return;
  const panel = c.querySelector<HTMLElement>('.channel');
  once(panel, () => {
    fadeUp(panel!, 0, 20);
    fadeUp($('.links li', c), 0.25, 10, 0.07);
  }, 0.2);
}

/* ---------- case-study page ---------- */

function missionPage() {
  const page = document.querySelector<HTMLElement>('.mission');
  if (!page) return;
  fadeUp($('.m-head > *', page), 0, 18, 0.07);
  const facts = page.querySelector<HTMLElement>('.facts');
  if (facts) {
    fadeUp($(':scope > div', facts), 0.35, 10, 0.07);

  }
}

/* ---------- figures inside case studies ---------- */

function figures() {
  // Stats: numbers count up, meters fill.
  for (const fig of $('figure.stats')) {
    once(fig, () => {
      $('.v', fig).forEach((v, i) => countUp(v, 1.3, i * 0.1));
      draw($('.meter span', fig), { delay: 0.2, each: 0.1, duration: 1.1 });
    }, 0.4);
  }

  // Slot timeline: rows plot one after another, top to bottom.
  for (const fig of $('figure.tl')) {
    once(fig, () => {
      $('.row:not(.axis) .track', fig).forEach((track, i) =>
        draw($(':scope > span', track), { delay: i * 0.25, each: 0.05, duration: 0.6 }),
      );
    }, 0.4);
  }

  // Waffle: cells fill in reading order.
  for (const fig of $('figure.waffle')) {
    once(fig, () => {
      const cells = $<SVGRectElement>('rect', fig);
      animate(cells, { opacity: [0, 1] }, { duration: 0.25, delay: stagger(Math.min(0.006, 0.9 / cells.length)) });
    }, 0.4);
  }

  // Everything else in the prose column eases in as it arrives.
  for (const fig of $('.prose > figure:not(.stats):not(.tl):not(.waffle), .prose > .wide')) {
    once(fig, () => fadeUp(fig, 0, 20), 0.2);
  }
}

// Last, so every helper above is initialised before it runs.
if (root.classList.contains('motion')) {
  (window as any).__motion = true;
  run();
}

// Light/dark toggle. The inline script in Base.astro applies a saved choice
// before first paint; this wires the header button. With no saved choice the
// page follows the system setting, and the first click picks the opposite of
// whatever is showing.
const root = document.documentElement;
const media = matchMedia('(prefers-color-scheme: dark)');
const current = () => (root.dataset.theme as 'light' | 'dark' | undefined) ?? (media.matches ? 'dark' : 'light');

function label(btn: HTMLButtonElement, showing = current()) {
  const next = showing === 'dark' ? 'light' : 'dark';
  btn.setAttribute('aria-label', `Switch to ${next} theme`);
  btn.title = `Switch to ${next} theme`;
}

function syncMeta() {
  // Keep the browser chrome colour in step with an explicit choice.
  const bg = getComputedStyle(document.body).getPropertyValue('--bg').trim();
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => (m.content = bg));
}

function set(theme: 'light' | 'dark') {
  const apply = () => {
    root.dataset.theme = theme;
    syncMeta();
    document.dispatchEvent(new CustomEvent('themechange'));
  };
  const vt = (document as any).startViewTransition;
  if (vt && root.classList.contains('motion')) vt.call(document, apply);
  else apply();
  try {
    localStorage.setItem('theme', theme);
  } catch {}
}

for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
  label(btn);
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    set(next);
    label(btn, next);
  });
  media.addEventListener('change', () => label(btn));
}
if (root.dataset.theme) syncMeta();

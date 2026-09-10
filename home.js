(() => {
  const scroller = document.querySelector('.home-scroll');
  const sections = [...document.querySelectorAll('.home-panel')];
  const dots = [...document.querySelectorAll('.section-pagination a')];
  const pagination = document.querySelector('.section-pagination');
  if (!scroller || !sections.length) return;

  const setActive = (index) => {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    const dark = sections[index]?.dataset.theme === 'dark-dots';
    pagination?.classList.toggle('dark-dots', dark);
    document.body.classList.toggle('on-light-section', dark);
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = sections.indexOf(visible.target);
    if (index >= 0) setActive(index);
  }, { root: scroller, threshold: [0.45, 0.6, 0.75] });

  sections.forEach(section => observer.observe(section));
  setActive(0);

  // Desktop mouse-wheel behavior: one deliberate wheel gesture advances one panel.
  const desktopSnap = window.matchMedia('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let locked = false;
  scroller.addEventListener('wheel', (event) => {
    if (!desktopSnap.matches || Math.abs(event.deltaY) < 12 || locked) return;
    const current = sections.reduce((best, section, index) => {
      const distance = Math.abs(section.offsetTop - scroller.scrollTop);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity }).index;
    const next = Math.max(0, Math.min(sections.length - 1, current + (event.deltaY > 0 ? 1 : -1)));
    if (next === current) return;
    event.preventDefault();
    locked = true;
    sections[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => { locked = false; }, 650);
  }, { passive: false });
})();

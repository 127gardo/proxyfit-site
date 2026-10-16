(() => {
  const scroller = document.querySelector(".home-scroll");
  const sections = [...document.querySelectorAll(".home-panel")];
  const dots = [...document.querySelectorAll(".section-pagination a")];
  const pagination = document.querySelector(".section-pagination");
  if (!scroller || !sections.length) return;

  const setActive = (index) => {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    const dark = sections[index]?.dataset.theme === "dark-dots";
    pagination?.classList.toggle("dark-dots", dark);
    document.body.classList.toggle("on-light-section", dark);
  };

  const currentSection = () => {
    const marker =
      scroller.scrollTop + Math.min(scroller.clientHeight * 0.35, 240);
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      if (sections[i].offsetTop <= marker) return i;
    }
    return 0;
  };

  let scrollFrame = 0;
  scroller.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        setActive(currentSection());
        scrollFrame = 0;
      });
    },
    { passive: true },
  );
  setActive(0);
  window.requestAnimationFrame(() => setActive(currentSection()));

  // Preserve panel navigation while allowing taller sections to be read fully.
  const desktopSnap = window.matchMedia(
    "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  let locked = false;
  scroller.addEventListener(
    "wheel",
    (event) => {
      if (
        !desktopSnap.matches ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaY) < 12 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      if (locked) {
        event.preventDefault();
        return;
      }
      const current = currentSection();
      const section = sections[current];
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight - scroller.clientHeight;
      if (event.deltaY > 0 && scroller.scrollTop < bottom - 2) return;
      if (event.deltaY < 0 && scroller.scrollTop > top + 2) return;
      const next = Math.max(
        0,
        Math.min(sections.length - 1, current + (event.deltaY > 0 ? 1 : -1)),
      );
      if (next === current) return;
      event.preventDefault();
      locked = true;
      sections[next].scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        locked = false;
      }, 650);
    },
    { passive: false },
  );
})();

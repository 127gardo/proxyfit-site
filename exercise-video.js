(() => {
  const link = document.querySelector(".exercise-watch");
  const player = document.querySelector(".exercise-player");
  if (!link || !player || typeof player.showModal !== "function") return;

  const video = player.querySelector("video");
  link.setAttribute("aria-haspopup", "dialog");
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    player.showModal();
    document.body.classList.add("media-open");
    video.play().catch(() => {});
  });
  player.addEventListener("close", () => {
    video.pause();
    document.body.classList.remove("media-open");
    link.focus({ preventScroll: true });
  });
})();

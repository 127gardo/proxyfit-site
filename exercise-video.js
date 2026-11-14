(() => {
  document.querySelectorAll(".exercise-watch").forEach((link, index) => {
    const playerId = link.dataset.exercisePlayer;
    const player = playerId
      ? document.getElementById(playerId)
      : document.querySelector(".exercise-player");
    if (!player || typeof player.showModal !== "function") return;
    const video = player.querySelector("video");
    if (!video) return;

    if (!player.id) player.id = `exercise-player-${index + 1}`;
    link.setAttribute("aria-haspopup", "dialog");
    link.setAttribute("aria-controls", player.id);
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (!player.open) player.showModal();
      document.body.classList.add("media-open");
      video.play().catch(() => {});
    });
    player.addEventListener("close", () => {
      video.pause();
      if (!document.querySelector(".media-dialog[open]")) document.body.classList.remove("media-open");
      link.focus({ preventScroll: true });
    });
  });
})();

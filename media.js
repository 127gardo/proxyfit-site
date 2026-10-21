(() => {
  const japanese = document.documentElement.lang.startsWith("ja");
  const screens = [...document.querySelectorAll("[data-screen]")];
  if (!screens.length) return;
  const dialog = document.createElement("dialog");
  dialog.className = "media-dialog";
  dialog.setAttribute("aria-labelledby", "media-dialog-caption");
  const heading = document.createElement("div");
  heading.className = "media-dialog-heading";
  const caption = document.createElement("p");
  caption.id = "media-dialog-caption";
  const close = document.createElement("button");
  close.type = "button";
  close.className = "media-dialog-close";
  close.setAttribute("aria-label", japanese ? "画像を閉じる" : "Close screenshot");
  close.textContent = "×";
  heading.append(caption, close);
  const viewport = document.createElement("div");
  viewport.className = "media-dialog-scroll";
  viewport.tabIndex = 0;
  const fullImage = document.createElement("img");
  fullImage.className = "media-dialog-image";
  const imageCrop = document.createElement("div");
  imageCrop.className = "screen-trim media-dialog-crop";
  imageCrop.append(fullImage);
  viewport.append(imageCrop);
  dialog.append(heading, viewport);
  document.body.append(dialog);
  let previousFocus;

  const dismiss = () => dialog.close();
  close.addEventListener("click", dismiss);
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dismiss();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("media-open");
    previousFocus?.focus({ preventScroll: true });
  });
  screens.forEach((button) => {
    button.addEventListener("click", () => {
      if (typeof dialog.showModal !== "function") {
        window.open(button.dataset.screen, "_blank", "noopener");
        return;
      }
      previousFocus = button;
      fullImage.src = button.dataset.screen;
      fullImage.alt = button.dataset.caption;
      imageCrop.style.setProperty("--screen-trim-top", button.dataset.screenTrim || "0");
      caption.textContent = button.dataset.caption;
      viewport.setAttribute("aria-label", button.dataset.caption);
      document.body.classList.add("media-open");
      dialog.showModal();
      viewport.scrollTop = 0;
      close.focus({ preventScroll: true });
    });
  });
})();

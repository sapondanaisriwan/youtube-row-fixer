const THUMBNAIL_WIDTH = "168px";

const CLASSES_TO_REMOVE = [
  "ytLockupMetadataViewModelMoveLockupOverflowMenuToBottomRight",
  "ytLockupMetadataViewModelBottomRight",
];

let observer = null;

function fixCard(card) {
  const thumbnail = card.querySelector(".ytLockupViewModelContentImage");
  if (thumbnail && thumbnail.style.width !== THUMBNAIL_WIDTH) {
    thumbnail.style.width = THUMBNAIL_WIDTH;
  }
  CLASSES_TO_REMOVE.forEach((cls) => {
    const el = card.querySelector(`.${cls}`);
    if (el) el.classList.remove(cls);
  });
}

function fixSuggestedVideos() {
  const secondary = document.querySelector(
    "ytd-watch-next-secondary-results-renderer"
  );
  if (!secondary) return;
  secondary.querySelectorAll(".ytLockupViewModelHost").forEach(fixCard);
}

export const optionFixSuggestedVideos = (enabled) => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (!enabled) return;

  fixSuggestedVideos();

  observer = new MutationObserver((mutations) => {
    if (mutations.some((m) => m.addedNodes.length > 0)) {
      fixSuggestedVideos();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

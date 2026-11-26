// Adds a hover tooltip (title attribute) to each text span in a video's
// metadata row (channel name, views, "Scheduled for ...", etc.) so truncated
// text can still be read.
//
// The title is set when the pointer reaches a span. The browser reads it after
// its hover delay, so the tooltip still shows, and nothing runs until the user
// hovers. Reading the text on every hover also keeps reused lockups current.

// YouTube ships several class-name generations side by side; keep them all.
const SELECTOR = [
  ".ytContentMetadataViewModelMetadataText",
  ".yt-content-metadata-view-model__metadata-text",
  ".yt-content-metadata-view-model-wiz__metadata-text",
].join(",");

// Marks spans whose title we set, so we only clean up our own titles.
const MARKER = "data-rfyt-title";

let enabledState = false;

const onMouseOver = (e) => {
  const span = e.target.closest?.(SELECTOR);
  if (!span) return;
  // Leave any tooltip YouTube set itself.
  if (span.title && !span.hasAttribute(MARKER)) return;
  const text = span.textContent.trim();
  if (!text) {
    // Reused lockup whose text was cleared: drop our stale tooltip.
    span.removeAttribute("title");
    span.removeAttribute(MARKER);
    return;
  }
  if (span.title === text) return;
  span.title = text;
  span.setAttribute(MARKER, "");
};

const removeTitles = () => {
  document.querySelectorAll(`[${MARKER}]`).forEach((span) => {
    span.removeAttribute("title");
    span.removeAttribute(MARKER);
  });
};

export const optionMetadataTitles = (enabled) => {
  if (!!enabled === enabledState) return;
  enabledState = !!enabled;
  if (enabledState) {
    // Capture phase, so a stopPropagation on YouTube's side can't block it.
    document.addEventListener("mouseover", onMouseOver, true);
  } else {
    document.removeEventListener("mouseover", onMouseOver, true);
    removeTitles();
  }
};

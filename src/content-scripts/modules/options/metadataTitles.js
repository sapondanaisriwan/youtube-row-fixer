// Adds a hover tooltip (title attribute) to each metadata row of a video
// (channel name row, "views • date" row, etc.). The tooltip joins the text of
// every span in the row, so text pushed outside the visible area (where it
// can't be hovered) can still be read.
//
// The title is set when the pointer reaches a row. The browser reads it after
// its hover delay, so the tooltip still shows, and nothing runs until the user
// hovers. Reading the text on every hover also keeps reused lockups current.

// YouTube ships several class-name generations side by side; keep them all.
const ROW_SELECTOR = [
  ".ytContentMetadataViewModelMetadataRow",
  ".yt-content-metadata-view-model__metadata-row",
  ".yt-content-metadata-view-model-wiz__metadata-row",
].join(",");

const TEXT_SELECTOR = [
  ".ytContentMetadataViewModelMetadataText",
  ".yt-content-metadata-view-model__metadata-text",
  ".yt-content-metadata-view-model-wiz__metadata-text",
].join(",");

const SEPARATOR = " • ";

// Marks rows whose title we set, so we only clean up our own titles.
const MARKER = "data-rfyt-title";

let enabledState = false;

const rowText = (row) =>
  Array.from(row.querySelectorAll(TEXT_SELECTOR), (span) =>
    span.textContent.trim()
  )
    .filter(Boolean)
    .join(SEPARATOR);

const onMouseOver = (e) => {
  const row = e.target.closest?.(ROW_SELECTOR);
  if (!row) return;
  // Leave any tooltip YouTube set itself.
  if (row.title && !row.hasAttribute(MARKER)) return;
  const text = rowText(row);
  if (!text) {
    // Reused lockup whose text was cleared: drop our stale tooltip.
    row.removeAttribute("title");
    row.removeAttribute(MARKER);
    return;
  }
  if (row.title === text) return;
  row.title = text;
  row.setAttribute(MARKER, "");
};

const removeTitles = () => {
  document.querySelectorAll(`[${MARKER}]`).forEach((el) => {
    el.removeAttribute("title");
    el.removeAttribute(MARKER);
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

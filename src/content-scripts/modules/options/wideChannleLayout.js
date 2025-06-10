import { addStyle } from "../utils/addStyle";
import { KeyChannelPageWideLayout } from "../../../data/storage-key";
import { removeElementById } from "../utils/removeElement";

export const optionWideChannelLayout = (wideLayout) => {
  if (!wideLayout) {
    removeElementById(KeyChannelPageWideLayout);
    return;
  }

  addStyle(
    KeyChannelPageWideLayout,
    `
    [page-subtype="channels"] ytd-two-column-browse-results-renderer:has(ytd-rich-grid-renderer:not([is-shorts-grid])) {
      max-width: 100% !important;
      width: 100% !important;
    }
    [page-subtype="channels"] ytd-two-column-browse-results-renderer:has(ytd-rich-grid-renderer:not([is-shorts-grid])) #primary.ytd-two-column-browse-results-renderer {
      padding-inline: 20px;
    }
  `
  );
};

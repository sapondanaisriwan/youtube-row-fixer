import { addStyle } from "../utils/addStyle";
import { KeyHideShort } from "../../../data/storage-key";
import { removeElementById } from "../utils/removeElement";

// For testing
// https://www.youtube.com/
// https://www.youtube.com/feed/subscriptions
// https://www.youtube.com/results?search_query=shorts
// https://www.youtube.com/@MrBeast2

export const optionHideShort = (hideShort) => {
  if (!hideShort) {
    removeElementById(KeyHideShort);
    return;
  }

  addStyle(
    KeyHideShort,
    `
    /* ---- Home Feed ---- */
    [page-subtype='home'] ytd-rich-section-renderer:has(a[href^="/shorts/"]) {
      display: none;
    }

    /* ---- Watch Feed ---- */
    ytd-watch-grid ytd-rich-shelf-renderer[is-shorts],
    ytd-watch-flexy ytd-rich-shelf-renderer[is-shorts],
    ytd-watch-flexy ytd-reel-shelf-renderer {
      display: none;
    }

    /* ---- Subscription Feed ---- */
    [page-subtype="subscriptions"] ytd-item-section-renderer:has(a[href^="/shorts/"]),
    [page-subtype="subscriptions"] ytd-rich-section-renderer:has(a[href^="/shorts/"]),
    [page-subtype="subscriptions"] ytd-grid-video-renderer:has(a[href^="/shorts/"]),
    [page-subtype="subscriptions"] ytd-rich-item-renderer:has(a[href^="/shorts/"]) {
      display: none;
    }

    /* ---- Hashtag Feed ---- */
    [page-subtype="hashtag-landing-page"] ytd-rich-item-renderer:has(a[href^="/shorts/"]) {
      display: none;
    }

    /* ---- Channel Feed ---- */
    [page-subtype="channels"] ytd-item-section-renderer:has(a[href^="/shorts/"]),
    [page-subtype="channels"] ytd-rich-grid-renderer:has(a[href^="/shorts/"]) {
      display: none;
    }

    /*  ---- Search Feed ---- */
    ytd-search ytd-reel-shelf-renderer:has(a[href^="/shorts/"]),
    ytd-search ytd-video-renderer:has(a[href^="/shorts/"]) {
      display: none;
    }
  `
  );
};

import { addStyle } from "../utils/addStyle";
import { KeyPostPerRow } from "../../../data/storage-key";
import { removeElementById } from "../utils/removeElement";

export const optionPostsPerRow = () => {
  addStyle(
    KeyPostPerRow,
    `
    ytd-rich-item-renderer[is-post] {
        width: calc(100%/var(--ytd-rich-grid-posts-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px) !important;
    }
  `
  );
};

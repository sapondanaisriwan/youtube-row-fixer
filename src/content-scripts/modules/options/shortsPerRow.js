import { addStyle } from "../utils/addStyle";
import { KeyShelfItemPerRow } from "../../../data/storage-key";
import { removeElementById } from "../utils/removeElement";

export const optionShortsPerRow = (amount) => {
  addStyle(
    KeyShelfItemPerRow,
    `
    ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer[is-slim-media] {
      width: calc(100%/var(--ytd-rich-grid-slim-items-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px) !important;
    }
    ytd-rich-shelf-renderer[is-shorts][is-show-less-hidden] ytd-rich-item-renderer[is-slim-media]:nth-child(-n + ${amount}),
    ytd-rich-shelf-renderer[is-shorts][is-show-more-hidden] ytd-rich-item-renderer[is-slim-media]:nth-child(-n + ${amount}) {
      display: block !important;
    }
  `
  );
};

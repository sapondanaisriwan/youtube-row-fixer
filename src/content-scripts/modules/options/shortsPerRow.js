import { addStyle } from "../utils/addStyle";
import { KeyShelfItemPerRow } from "../../../data/storage-key";
import { removeElementById } from "../utils/removeElement";

export const optionShortsPerRow = (amount) => {
  addStyle(
    KeyShelfItemPerRow,
    `
    [page-subtype="subscriptions"] ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer[is-slim-media],
    [page-subtype="home"] ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer[is-slim-media] {
      width: calc(100%/${amount} - var(--ytd-rich-grid-item-margin) - 0.01px) !important;
    }
    [page-subtype="subscriptions"] ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer[is-slim-media],
    [page-subtype="home"] ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer[is-slim-media]:nth-child(-n + ${amount}) {
      display: block !important;
    }
  `
  );
};

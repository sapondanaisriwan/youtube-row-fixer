import { KeyVideoPerRow } from "../../../data/storage-key";
import { addStyle } from "../utils/addStyle";

export const optionSkeletonPerRow = (videoPerRow) => {
  addStyle(
    KeyVideoPerRow,
    `
  #home-page-skeleton .rich-grid-media-skeleton,
  #home-page-skeleton .rich-shelf-videos .rich-grid-media-skeleton.mini-mode,
  #home-page-skeleton #home-container-media .rich-grid-media-skeleton.mini-mode {
    min-width: calc(100% / ${videoPerRow} - 1.6rem) !important;
    max-width: calc(100% / ${videoPerRow} - 1.6rem) !important;
  }
  `
  );
};

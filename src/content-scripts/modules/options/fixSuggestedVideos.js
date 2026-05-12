import { KeyFixSuggestedVideos } from "../../../data/storage-key";
import { addStyle } from "../utils/addStyle";
import { removeElementById } from "../utils/removeElement";

export const optionFixSuggestedVideos = (enabled) => {
  if (!enabled) {
    removeElementById(KeyFixSuggestedVideos);
    return;
  }

  addStyle(
    KeyFixSuggestedVideos,
    `
    ytd-watch-next-secondary-results-renderer .ytLockupViewModelContentImage {
      width: 168px !important;
    }
    ytd-watch-next-secondary-results-renderer .ytLockupMetadataViewModelMoveLockupOverflowMenuToBottomRight {
      min-height: unset !important;
    }
    ytd-watch-next-secondary-results-renderer .ytLockupMetadataViewModelMenuButton.ytLockupMetadataViewModelBottomRight {
      top: -6px !important;
      right: -10px !important;
      bottom: unset !important;
      opacity: 1 !important;
      transition: none !important;
    }
    `
  );
};

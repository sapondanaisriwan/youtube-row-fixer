import { addStyle } from "../utils/addStyle";
import { KeyDisplayFullTitle } from "../../../data/storage-key";
import { removeElementById } from "../utils/removeElement";

export const optionDisplayFullTitle = (displayFullTitle) => {
  if (!displayFullTitle) {
    removeElementById(KeyDisplayFullTitle);
    return;
  }
  addStyle(
    KeyDisplayFullTitle,
    `
    ytd-grid-video-renderer #video-title.yt-simple-endpoint.ytd-grid-video-renderer,
    ytd-rich-grid-media[mini-mode] #video-title.yt-simple-endpoint.ytd-grid-video-renderer,
    ytd-grid-video-renderer #video-title.ytd-rich-grid-media,
    ytd-rich-grid-media[mini-mode] #video-title.ytd-rich-grid-media,
    .yt-lockup-metadata-view-model-wiz--standard.yt-lockup-metadata-view-model-wiz--rich-grid-legacy-typography .yt-lockup-metadata-view-model-wiz__title {
      max-height: unset;
      -webkit-line-clamp: unset;
    }
    #video-title.ytd-compact-video-renderer,
    #video-title.ytd-rich-grid-media,
    #video-title.ytd-video-renderer,
    #video-title.ytd-rich-grid-slim-media,
    #video-title.ytd-grid-playlist-renderer,
    #video-title.ytd-reel-item-renderer {
      max-height: unset;
      -webkit-line-clamp: unset;
    }    
  `
  );
};

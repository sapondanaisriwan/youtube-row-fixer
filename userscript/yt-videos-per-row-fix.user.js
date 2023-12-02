// ==UserScript==
// @name        YouTube Row Fixer
// @version     1.0.2
// @author      sapondanaisriwan
// @description Increase the videos per row on all page.
// @match       https://www.youtube.com/*
// @grant       none
// @license     MIT
// @run-at      document-start
// @icon        https://i.imgur.com/I9uDrsq.png
// @namespace   https://greasyfork.org/en/users/1021085-sapondanaisriwan
// @homepageURL https://github.com/sapondanaisriwan/youtube-videos-per-row-fix
// @supportURL  https://github.com/sapondanaisriwan/youtube-videos-per-row-fix/issues
// @require https://update.greasyfork.org/scripts/465819/1289214/API%20for%20CustomElements%20in%20YouTube.js
// @downloadURL https://update.greasyfork.org/scripts/465840/YouTube%20Row%20Fixer.user.js
// @updateURL https://update.greasyfork.org/scripts/465840/YouTube%20Row%20Fixer.meta.js
// ==/UserScript==

/*
If you want to submit a bug or request a feature please report via github issue. Since I receive so many emails, I can't reply to them all.
Contact: sapondanaisriwan@gmail.com
Support me: https://ko-fi.com/sapondanaisriwan 
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
Support me: https://ko-fi.com/sapondanaisriwan
*/

"use strict";

// Thanks so much to CY Fung (https://greasyfork.org/en/users/371179-cy-fung) for helping me.
const settings = {
  VIDEO_PER_ROW: 6,
  SHELF_ITEM_PER_ROW: 9, // Max is 9
  HIDE_PROFILE: true,
};

const target = "ytd-rich-grid-renderer";

const styles = {
  hideProfile: {
    id: "hide-ch-profile",
    css: `
    .channel-avatar.ytd-ghost-grid-renderer,
    #home-page-skeleton .channel-avatar {
        display: none;
    }
  
    ytd-rich-grid-media a#avatar-link {
        display: none;
    }
    `,
  },
  skeletonEle: {
    id: "unload-videos",
    css: `
    #home-page-skeleton .rich-grid-media-skeleton,
    #home-page-skeleton .rich-shelf-videos .rich-grid-media-skeleton.mini-mode,
    #home-page-skeleton #home-container-media .rich-grid-media-skeleton.mini-mode {
      min-width: calc(100% / ${settings.VIDEO_PER_ROW} - 1.6rem) !important;
      max-width: calc(100% / ${settings.VIDEO_PER_ROW} - 1.6rem) !important;
    }
    `,
  },
};

// Function to remove DOM element
const removeEle = (id) => {
  const ele = document.getElementById(id);
  ele && ele.remove();
};

// Function to inject a style into the webpage
const injectStyle = (id, css) => {
  // Remove before adding
  removeEle(id);

  const style = document.createElement("style");
  style.type = "text/css";
  style.id = id;
  style.textContent = css;
  document.documentElement.appendChild(style);
};

injectStyle(styles.skeletonEle.id, styles.skeletonEle.css);
settings.HIDE_PROFILE &&
  injectStyle(styles.hideProfile.id, styles.hideProfile.css);

customYtElements.whenRegistered(target, (proto) => {
  proto.calcElementsPerRow = (a, b) => {
    return a === 194 ? settings.SHELF_ITEM_PER_ROW : settings.VIDEO_PER_ROW;
  };
});

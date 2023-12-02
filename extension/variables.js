const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;

const defaultSettings = {
  isEnable: true,
  hideProfile: false,
  videosPerRow: 6,
  shelfItemsPerRow: 9,
};

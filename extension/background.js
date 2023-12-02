const youtubeURL = "https://www.youtube.com/*";
const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;

const defaultSettings = {
  isEnable: true,
  hideProfile: false,
  videosPerRow: 6,
  shelfItemsPerRow: 9,
};

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install" || reason === "update") {
    storage.clear();
    storage.set(defaultSettings);
    reloadTabs();
    fetchAllStorage();
  }
});

const fetchAllStorage = () => storage.get();
const fetchTabs = () => browser.tabs.query({ url: youtubeURL });

const reloadTabs = async () => {
  const tabs = await fetchTabs();
  tabs.forEach((tab) => browser.tabs.reload(tab.id));
};

const youtubeURL = "https://www.youtube.com/*";
const browser = chrome || browser;
const [runtime, storage] = [browser.runtime, browser.storage.sync];

const extensionSettings = {
  isEnable: true,
  videosPerRow: 6,
  shortsPerRow: 6,
};

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install" || reason === "update") {
    storage.set(extensionSettings);
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

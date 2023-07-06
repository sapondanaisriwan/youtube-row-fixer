// Ugly Code please don't read it 🥲
const youtubeURL = "https://www.youtube.com/*";
const selectors = {
  extension: "[data-extension]",
  hideCHProfile: "#hide-ch-profile",
  videosRange: "input[data-videos-range]",
  shortsRange: "input[data-shorts-range]",
  videoCurValue: ".video-current-value",
  shortCurValue: ".short-current-value",
};

const settingKeys = [
  "isEnable",
  "hideProfile",
  "videosPerRow",
  "shelfItemsPerRow",
];

const browser = chrome || browser;
const [runtime, storage] = [browser.runtime, browser.storage.sync];

const extensionToggle = document.querySelector(selectors.extension);
const hideProfileToggle = document.querySelector(selectors.hideCHProfile);
const videosRangeEle = document.querySelector(selectors.videosRange);
const shortsRangeEle = document.querySelector(selectors.shortsRange);
const videoValue = document.querySelector(selectors.videoCurValue);
const shortValue = document.querySelector(selectors.shortCurValue);

const checkSetting = () => storage.get(settingKeys);

const fetchTabs = () => browser.tabs.query({ url: youtubeURL });

const reloadTabs = async () => {
  const tabs = await fetchTabs();
  tabs.forEach((tab) => browser.tabs.reload(tab.id));
};

const updateRangeVal = (ele, val) => (ele.value = val);

const updateVal = (ele, val, key) => {
  storage.set({ [key]: +val });
  ele.textContent = val;
};

extensionToggle.addEventListener("click", ({ target }) => {
  storage.set({ isEnable: target.ariaPressed == "true" ? false : true });
  target.setAttribute(
    "aria-pressed",
    target.ariaPressed == "true" ? false : true
  );
  reloadTabs();
});

hideProfileToggle.addEventListener("change", ({ target }) =>
  storage.set({ hideProfile: target.checked })
);

videosRangeEle.addEventListener("input", ({ target }) => {
  updateVal(videoValue, target.value, settingKeys[2]);
});

videosRangeEle.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.target.valueAsNumber += Math.sign(e.deltaY);
  updateVal(videoValue, e.target.value, settingKeys[2]);
});

shortsRangeEle.addEventListener("input", ({ target }) => {
  updateVal(shortValue, target.value, settingKeys[3]);
});

shortsRangeEle.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.target.valueAsNumber += Math.sign(e.deltaY);
  updateVal(shortValue, e.target.value, settingKeys[3]);
});

const run = async () => {
  const { isEnable, hideProfile, videosPerRow, shelfItemsPerRow } =
    await checkSetting();

  extensionToggle.setAttribute("aria-pressed", isEnable);
  hideProfileToggle.checked = hideProfile;

  updateVal(videoValue, videosPerRow, settingKeys[2]);
  updateRangeVal(videosRangeEle, videosPerRow);
  updateVal(shortValue, shelfItemsPerRow, settingKeys[3]);
  updateRangeVal(shortsRangeEle, shelfItemsPerRow);
};

run();

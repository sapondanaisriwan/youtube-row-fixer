// Ugly Code please don't read it 🥲

const selectors = {
  videosRange: "input[data-videos-range]",
  shortsRange: "input[data-shorts-range]",
  videoCurValue: ".video-current-value",
  shortCurValue: ".short-current-value",
};

const settingKeys = ["isEnable", "videosPerRow", "shortsPerRow"];

const browser = chrome || browser;
const [runtime, storage] = [browser.runtime, browser.storage.sync];

const videosRangeEle = document.querySelector(selectors.videosRange);
const shortsRangeEle = document.querySelector(selectors.shortsRange);
const videoValue = document.querySelector(selectors.videoCurValue);
const shortValue = document.querySelector(selectors.shortCurValue);

const checkSetting = () => storage.get(settingKeys);

const updateRangeVal = (ele, val) => (ele.value = val);

const updateVal = (ele, val, key) => {
  storage.set({ [key]: +val });
  ele.textContent = val;
};

videosRangeEle.addEventListener("input", ({ target }) => {
  updateVal(videoValue, target.value, settingKeys[1]);
});

videosRangeEle.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.target.valueAsNumber += Math.sign(e.deltaY);
  updateVal(videoValue, e.target.value, settingKeys[1]);
});

shortsRangeEle.addEventListener("input", ({ target }) => {
  updateVal(shortValue, target.value, settingKeys[2]);
});

shortsRangeEle.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.target.valueAsNumber += Math.sign(e.deltaY);
  updateVal(shortValue, e.target.value, settingKeys[2]);
});

const run = async () => {
  const { isEnable, videosPerRow, shortsPerRow } = await checkSetting();
  updateVal(videoValue, videosPerRow, settingKeys[1]);
  updateRangeVal(videosRangeEle, videosPerRow);
  updateVal(shortValue, shortsPerRow, settingKeys[2]);
  updateRangeVal(shortsRangeEle, shortsPerRow);
};

run();

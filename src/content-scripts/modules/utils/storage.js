import { defaultSetting } from "../../../data/storage-key";

// will return the data from local storage based on a given key
export const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (data) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      }
      resolve(data[key] ?? defaultSetting[key]);
    });
  });
};

// will return all the data in storage
export const getAllStorage = (keysArray) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keysArray, (data) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      }
      const mergedSetting = keysArray.reduce((result, key) => {
        result[key] = data[key] ?? defaultSetting[key];
        return result;
      }, {});
      resolve(mergedSetting);
    });
  });
};

// set key-value pairs in local storage
export const setStorage = (kv) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(kv, () => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      }
      resolve(kv);
    });
  });
};

import { defaultSetting } from "../data/storage-key";

export const setStorage = (kv) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(kv, () => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      }
      resolve(kv);
    });
  });
};

export const getStorage = (storageKey) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(storageKey, (data) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      }
      resolve(data[storageKey] ?? defaultSetting[storageKey]);
    });
  });
};

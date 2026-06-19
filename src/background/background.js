import message from "../data/message";
import { scriptContentScript, scriptInjectScript } from "../data/scriptId";
import { KeyExtensionStatus } from "../data/storage-key";
import { getStorage } from "../utils/browserStorage";
import {
  getRegisteredScripts,
  injectScript,
  unregisterScripts,
} from "./modules/utils/registered";

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    await chrome.tabs.create({
      url: "https://github.com/sapondanaisriwan/youtube-row-fixer",
    });

    // const tabs = await chrome.tabs.query({
    //   url: "https://www.youtube.com/*",
    // });
    // tabs.forEach((tab) => {
    //   chrome.tabs.reload(tab.id);
    // });
  }
});

const main = async () => {
  try {
    const registeredScripts = await getRegisteredScripts();
    const registeredIds = new Set(registeredScripts.map(({ id }) => id));

    if (!registeredIds.has(scriptContentScript)) {
      await injectScript({
        id: scriptContentScript,
        files: ["inject/bridge.js"],
      });
    }
    if (!registeredIds.has(scriptInjectScript)) {
      await injectScript({
        id: scriptInjectScript,
        world: "MAIN",
        files: ["inject/lib/ytZara.js", "inject/inject_script.js"],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateRegisteredScripts = async () => {
  try {
    const extensionStatus = await getStorage(KeyExtensionStatus);

    if (extensionStatus) {
      await main();
      return;
    }

    const registeredScripts = await getRegisteredScripts();
    if (!registeredScripts.length) {
      return;
    }
    await unregisterScripts(registeredScripts.map(({ id }) => id));
  } catch (err) {
    console.log(err);
  }
};

chrome.storage.onChanged.addListener(updateRegisteredScripts);

// Restore the persisted enabled/disabled state when the service worker starts.
updateRegisteredScripts();

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const messageHandler = async () => {
//     if (request.cmd === message.injected) {
//       const matchingScripts = await getRegisteredScripts();

//       if (matchingScripts) {
//         sendResponse({ status: "❌ Already injected" });
//         return;
//       }

//       await injectScript({
//         id: scriptContentScript,
//         files: ["inject/bridge.js"],
//       });
//       await injectScript({
//         id: scriptInjectScript,
//         world: "MAIN",
//         files: ["inject/lib/ytZara.js", "inject/inject_script.js"],
//       });

//       sendResponse({ status: "Scripts injected" });
//     } else if (request.cmd === message.extensionStatus) {
//       const matchingScripts = await getRegisteredScripts();

//       if (matchingScripts) {
//         await unregisterScripts(allScriptIds);
//         sendResponse({ status: "✅ Uninject scripts" });
//         return;
//       }

//       sendResponse({ status: "❌ Already uninject" });
//     }
//   };
//   messageHandler();

//   // https://stackoverflow.com/questions/44056271/chrome-runtime-onmessage-response-with-async-await
//   // The `return true`; statement did the trick. It tells Chrome that you want to send a response asynchronously.
//   return true;
// });

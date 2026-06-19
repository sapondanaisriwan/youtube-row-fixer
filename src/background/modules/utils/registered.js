import { allScriptIds } from "../../../data/scriptId";

export const getRegisteredScripts = async () => {
  return chrome.scripting.getRegisteredContentScripts({
    ids: allScriptIds,
  });
};

export const injectScript = async ({ id, runAt, world, files }) => {
  await chrome.scripting.registerContentScripts([
    {
      id: id,
      runAt: runAt ?? "document_start", // document_end, document_idle, document_start
      world: world ?? "ISOLATED", // MAIN, ISOLATED
      matches: ["*://*.youtube.com/*"],
      js: files,
    },
  ]);
};

export const unregisterScripts = async (id) => {
  await chrome.scripting.unregisterContentScripts({
    ids: id,
  });
};

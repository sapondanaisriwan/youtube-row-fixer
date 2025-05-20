import { allScriptIds } from "../../../data/scriptId";

export const getRegisteredScripts = async () => {
  try {
    const matchingScripts = await chrome.scripting.getRegisteredContentScripts({
      ids: allScriptIds,
    });
    return matchingScripts.length > 0;
  } catch (err) {
    console.log(err);
  }
};

export const injectScript = async ({ id, runAt, world, files }) => {
  try {
    await chrome.scripting.registerContentScripts([
      {
        id: id,
        runAt: runAt ?? "document_start", // document_end, document_idle, document_start
        world: world ?? "ISOLATED", // MAIN, ISOLATED
        matches: ["*://*.youtube.com/*"],
        js: files,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const unregisterScripts = async (id) => {
  try {
    await chrome.scripting.unregisterContentScripts({
      ids: id,
    });
  } catch (err) {
    console.log(err);
  }
};

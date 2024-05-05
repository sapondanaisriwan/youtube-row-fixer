import { allScriptIds } from "../../../data/scriptId";

export const getRegisteredScripts = async () => {
  const matchingScripts = await chrome.scripting.getRegisteredContentScripts({
    ids: allScriptIds,
  });
  return matchingScripts.length > 0;
};

export const injectScript = async ({ id, runAt, world, files }) => {
  await chrome.scripting.registerContentScripts([
    {
      id: id,
      runAt: runAt ?? "document_start", // document_end, document_idle, document_start
      world: world ?? "ISOLATED", // MAIN, ISOLATED
      matches: ["https://www.youtube.com/*"],
      js: files,
    },
  ]);
};

export const unregisterScripts = async (id) => {
  await chrome.scripting.unregisterContentScripts({
    ids: id,
  });
};

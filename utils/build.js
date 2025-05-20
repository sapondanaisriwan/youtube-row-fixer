const { directory } = require("./modules/config");
const processInlineScript = require("./modules/inlineScript");
const moveFile = require("./modules/moveFiles");
const renameFile = require("./modules/renameFiles");

const main = async () => {
  try {
    // Build the Chrome extension
    await moveFile(
      "extension/manifest-chrome.json",
      `${directory}/manifest.json`
    );
    await renameFile(directory);
    await processInlineScript(directory);
  } catch (err) {
    console.log(err);
  }
};

main();

const { directory } = require("./modules/config");
const processInlineScript = require("./modules/inlineScript");
const moveFile = require("./modules/moveFiles");
const renameFile = require("./modules/renameFiles");

const main = async () => {
  await moveFile("extension/manifest-build.json", `${directory}/manifest.json`);
  await renameFile(directory);
  await processInlineScript(directory);
};

main();

const { readFile, mkdir } = require("fs/promises");
const { directory } = require("./modules/config");
const fsExists = require("fs.promises.exists");
const AdmZip = require("adm-zip");
const moveFile = require("./modules/moveFiles");
const zip = new AdmZip();

const run = async () => {
  const manifest = await readFile("extension/manifest-chrome.json", "utf-8");
  const { name, version } = JSON.parse(manifest);
  const isZipExists = await fsExists("zip");

  if (!isZipExists) {
    await mkdir("zip");
    console.log("Create zip folder");
  }

  // Build the Chrome extension
  await moveFile(
    "extension/manifest-chrome.json",
    `${directory}/manifest.json`
  );
  zip.addLocalFolder(directory);
  zip.toBuffer();
  zip.writeZip(`zip/Chrome v${version}.zip`);
  console.log("🚀 Chrome extension was built");

  // Build the Firefox extension
  await moveFile(
    "extension/manifest-firefox.json",
    `${directory}/manifest.json`
  );
  zip.addLocalFolder(directory);
  zip.toBuffer();
  zip.writeZip(`zip/Firefox v${version}.zip`);
  console.log("🚀 Firefox extension was built");
};

run();

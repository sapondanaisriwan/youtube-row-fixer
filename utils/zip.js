const { readFile, mkdir } = require("fs/promises");
const { directory } = require("./modules/config");
const fsExists = require("fs.promises.exists");
const AdmZip = require("adm-zip");
const zip = new AdmZip();

const run = async () => {
  const manifest = await readFile("extension/manifest-build.json", "utf-8");
  const { name, version } = JSON.parse(manifest);
  const isZipExists = await fsExists("zip");

  if (!isZipExists) {
    await mkdir("zip");
    console.log("Create zip folder");
  }

  zip.addLocalFolder(directory);
  zip.toBuffer();
  zip.writeZip(`zip/${name} v${version}.zip`);
};

run();

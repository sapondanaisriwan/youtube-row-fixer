const { resolve } = require("path");
const { readdir, readFile, rename, writeFile } = require("fs/promises");

const getFilesInDirectoryRecursively = async (directory) => {
  try {
    const dirents = await readdir(directory, { withFileTypes: true });

    const files = await Promise.all(
      dirents.map(async (dirent) => {
        const res = resolve(directory, dirent.name);
        return dirent.isDirectory() ? getFilesInDirectoryRecursively(res) : res;
      })
    );
    return files.flat();
  } catch (error) {
    console.log(error);
  }
};

const replaceNextInFiles = async (files) => {
  try {
    await Promise.all(
      files
        .filter((file) => /\.(html|js|css)$/.test(file))
        .map(async (file) => {
          try {
            let data = await readFile(file, "utf8");
            data = data
              .replace(/\/_next\//g, "/next/")
              .replace(/\\\/_next\\\//g, "\\/next\\/");
            await writeFile(file, data, "utf8");
          } catch (error) {
            console.error(`Error processing file: ${file}`, error);
          }
        })
    );
  } catch (error) {
    console.error(error);
  }
};

const renameNextDirectory = async (directory) => {
  try {
    await rename(`${directory}/_next`, `${directory}/next`);
  } catch (error) {
    console.error(
      `❌ Failed to rename "${directory}/_next" to "${directory}/next", please do it manually.`
    );
    console.error(error);
  }
};

const renameFile = async (directory) => {
  const files = await getFilesInDirectoryRecursively(directory);
  await replaceNextInFiles(files);
  await renameNextDirectory(directory);
};

module.exports = renameFile;

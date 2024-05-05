const { readFile, writeFile } = require("fs/promises");

const findScriptTag = /<script>[\s\S]*?<\/script>/gm;
const findHeadTag = /<\/head>/gm;

const getFileData = async (directory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = await readFile(`${directory}/index.html`, "utf8");
      const inlineScript = file.match(findScriptTag);
      resolve([file, inlineScript]);
    } catch (error) {
      reject(error);
    }
  });
};

// wii remove the inline script in index.html
const removeInlineScript = async (directory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [file, _] = await getFileData(directory);
      const data = file.replace(findScriptTag, "");
      await writeFile(`${directory}/index.html`, data, "utf8");
      console.log("✅ Removed inline script in index.html");
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

// will create inlineScript.js into build directory
const createFile = async (directory, inlineScript) => {
  return new Promise(async (resolve, reject) => {
    try {
      inlineScript.forEach(async (data, index) => {
        const result = data
          .replace("<script>", "")
          .replace("</script>", "")
          .trim();
        const indexFile = `${index === 0 ? "" : index}`;
        await writeFile(`${directory}/inlineScript${indexFile}.js`, result);
        console.log(`✅ ${directory}/inlineScript${indexFile}.js`);
        resolve();
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

// will insert script tag in head tag
const insertScriptTag = async (directory, file, inlineScript) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [file, inlineScript] = await getFileData(directory);

      const scripts = inlineScript.map((_, index) => {
        return `<script src="/inlineScript${
          index === 0 ? "" : index
        }.js" defer=""></script>`;
      });
      scripts.push("</head>");

      const data = file.replace(findHeadTag, scripts.join(""));
      await writeFile(`${directory}/index.html`, data);
      console.log("✅ Inserted script tag in head");
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

const processInlineScript = async (directory) => {
  const [_, inlineScript] = await getFileData(directory);
  if (!inlineScript) {
    return console.log("Not Found any Inline Script");
  }
  await insertScriptTag(directory);
  await removeInlineScript(directory);
  await createFile(directory, inlineScript);
};

module.exports = processInlineScript;

const { readFile, writeFile } = require("fs/promises");

const findScriptTag = /<script>[\s\S]*?<\/script>/gm;
const findHeadTag = /<\/head>/gm;

const getFileData = async (directory) => {
  try {
    const file = await readFile(`${directory}/index.html`, "utf8");
    const inlineScript = file.match(findScriptTag);
    return [file, inlineScript];
  } catch (error) {
    console.log(error);
  }
};

// will remove inline scripts from index.html file
const removeInlineScript = async (directory) => {
  try {
    const [file, _] = await getFileData(directory);
    const data = file.replace(findScriptTag, "");
    await writeFile(`${directory}/index.html`, data, "utf8");
    console.log("✅ 2) Removed inline script in index.html");
  } catch (error) {
    console.error(error);
  }
};

// will create separate script files from inline scripts and insert in build directory
const createFile = async (directory, inlineScript) => {
  try {
    await Promise.all(
      inlineScript.map(async (data, index) => {
        const result = data
          .replace("<script>", "")
          .replace("</script>", "")
          .trim();
        const indexFile = index === 0 ? "" : index;
        const direction = `${directory}/inline_script${indexFile}.js`;
        await writeFile(direction, result);
        console.log(`✅ 3) Created ${direction}`);
      })
    );
  } catch (error) {
    console.error(error);
  }
};

// will insert script tags into the HTML file's head section
const insertScriptTag = async (directory, file, inlineScript) => {
  try {
    const scriptTags = inlineScript.map((_, index) => {
      return `<script src="/inline_script${
        index === 0 ? "" : index
      }.js" defer=""></script>`;
    });
    scriptTags.push("</head>"); // Add closing head tag

    const updatedFile = file.replace(findHeadTag, scriptTags.join(""));
    await writeFile(`${directory}/index.html`, updatedFile);
    console.log("✅ 1) Inserted script tag in head");
  } catch (error) {
    console.error(error);
  }
};

const processInlineScript = async (directory) => {
  const [file, inlineScript] = await getFileData(directory);
  if (!inlineScript) {
    console.log("Not Found any Inline Script");
    return;
  }
  await insertScriptTag(directory, file, inlineScript);
  await removeInlineScript(directory);
  await createFile(directory, inlineScript);
};

module.exports = processInlineScript;

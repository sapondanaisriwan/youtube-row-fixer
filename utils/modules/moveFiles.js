const { copyFile } = require("fs/promises");

// will move a file from source to destination
const moveFile = async (source, destination) => {
  try {
    await copyFile(source, destination);
    console.log(`✅ Moved ${source} to ${destination}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = moveFile;

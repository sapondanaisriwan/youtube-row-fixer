const { resolve } = require("path");

const pathResolve = (dir) => {
  return resolve(__dirname, dir);
};

module.exports = pathResolve;

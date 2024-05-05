const { resolve } = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background/background.js",
    content_script: "./src/content-scripts/main.js",
    inject_script: "./src/content-scripts/inject/main.js",
    bridge: "./src/content-scripts/inject/bridge.js",
    ytZara: "./src/content-scripts/inject/lib/ytZara.js",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  output: {
    filename: (fileData) => {
      if (
        fileData.runtime === "inject_script" ||
        fileData.runtime === "bridge"
      ) {
        return "inject/[name].js";
      } else if (fileData.runtime === "ytZara") {
        return "inject/lib/[name].js";
      }
      // console.log(fileData);
      return "[name].js";
    },
    path: resolve(__dirname, "build"),
  },
};

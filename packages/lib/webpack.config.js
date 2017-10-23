const path = require("path");

module.exports = {
  entry: {
    mobx: "./src/index.js",
    mst: "./src/mst.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  externals: {
    mobx: { commonjs2: "mobx", commonjs: "mobx" },
    "mobx-state-tree": {
      commonjs2: "mobx-state-tree",
      commonjs: "mobx-state-tree"
    }
  },
  output: {
    library: {
      root: "mobx-wiretap",
      amd: "mobx-wiretap",
      commonjs: "mobx-wiretap"
    },
    library: "mobx-wiretap",
    libraryTarget: "umd",
    path: path.resolve(__dirname),
    filename: "[name].js"
  }
};

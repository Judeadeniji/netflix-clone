const path = require("path");

module.exports = {
  entry: "./assets/api.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jass$/,
        include: [path.resolve(__dirname, "assets")],
        use: [
          {
            loader: "jass-cli-loader",
            options: {
              inputFile: path.resolve(__dirname, "assets/styles.jass"),
              outputFile: "jass.css",
            },
          },
        ],
      },
    ],
  },
};

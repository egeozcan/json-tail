const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              module: "ESNext",
              moduleResolution: "bundler",
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
};

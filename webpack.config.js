module.exports = {
  entry: "/src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "@carbon": "@carbon",
  },
};

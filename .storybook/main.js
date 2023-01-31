const path = require("path");

module.exports = {
  stories: [
    // "../src/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/components/**/*.stories.@(tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
      },
    },
  },
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
};

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [],
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
};

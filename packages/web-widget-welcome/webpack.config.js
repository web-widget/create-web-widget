const { mergeWithCustomize } = require("webpack-merge");
const webWidgetDefaults = require("@web-widget/webpack-config-web-widget-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = webWidgetDefaults({
    orgName: "web-widget",
    projectName: "welcome",
    webpackConfigEnv,
    argv,
  });

  const merge = mergeWithCustomize({
    customizeArray(first, second, key) {
      if (key === "externals") {
        return second;
      }
    },
  });

  const config = merge(defaultConfig, {
    externals: ["web-widget"], // bundle all other dependencies
  });

  const publicPathPluginIndex = config.plugins.findIndex(
    (plugin) => plugin.constructor.name === "SystemJSPublicPathWebpackPlugin"
  );
  if (publicPathPluginIndex >= 0) {
    config.plugins.splice(publicPathPluginIndex, 1);
  }

  return config;
};

const webpackConfigWebWidget = require("@web-widget/webpack-config-web-widget");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { mergeWithCustomize } = require("webpack-merge");

const modifyConfig = (opts, webpackConfig) => {
  const merge = mergeWithCustomize({
    customizeArray(a, b, key) {
      if (key === "plugins" || key === "resolve.extensions") {
        return a.concat(b);
      }
    },
  });

  return merge(webpackConfig, {
    entry: webpackConfig.entry.replace(
      ".js",
      opts.framework === "react" ? ".tsx" : ".ts"
    ),
    plugins: [
      opts.webpackConfigEnv && opts.webpackConfigEnv.analyze
        ? false
        : new ForkTsCheckerWebpackPlugin({
            typescript: {
              mode: "write-references",
            },
          }),
    ].filter(Boolean),
    resolve: {
      extensions: [".ts", ".tsx"],
    },
  });
};

function webpackConfigWebWidgetTypescript(opts) {
  const config = webpackConfigWebWidget(opts);
  return modifyConfig(opts, config);
}

webpackConfigWebWidgetTypescript.modifyConfig = modifyConfig;

module.exports = webpackConfigWebWidgetTypescript;

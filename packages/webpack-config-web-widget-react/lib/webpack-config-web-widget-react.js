const webpackConfigWebWidget = require("@web-widget/webpack-config-web-widget");

module.exports = webpackConfigWebWidgetReact;

function webpackConfigWebWidgetReact(opts) {
  const webpackConfigEnv = opts.webpackConfigEnv || {};

  opts.react = true;
  const config = webpackConfigWebWidget(opts);

  if (!webpackConfigEnv.standalone) {
    config.externals.push("react", "react-dom");
  }

  return config;
}

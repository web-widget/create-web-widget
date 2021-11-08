const webpackConfigWebWidgetTs = require("@web-widget/webpack-config-web-widget-ts");
const webpackConfigWebWidgetReact = require("@web-widget/webpack-config-web-widget-react");

module.exports = webpackConfigWebWidgetReactTs;

function webpackConfigWebWidgetReactTs(opts) {
  opts.framework = "react";
  const reactConfig = webpackConfigWebWidgetReact(opts);
  return webpackConfigWebWidgetTs.modifyConfig(opts, reactConfig);
}

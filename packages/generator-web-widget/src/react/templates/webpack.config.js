const { merge } = require("webpack-merge");
const webWidgetDefaults = require("webpack-config-web-widget-react<% if (typescript) { %>-ts<% } %>");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = webWidgetDefaults({
    orgName: "<%= orgName %>",
    projectName: "<%= projectName %>",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};

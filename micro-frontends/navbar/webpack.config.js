const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "tovmassian",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
  });

  return webpackMerge.smart(defaultConfig, {
    externals: ["react", "react-dom", "@material-ui/core"],
    // customizations can go here
  });
};

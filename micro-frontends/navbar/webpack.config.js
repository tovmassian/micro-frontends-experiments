const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "tovmassian",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
  });

  return webpackMerge.smart(defaultConfig, {
    devServer: {
      port: 8090,
    },
    externals: ["react", "react-dom"],
    // customizations can go here
  });
};

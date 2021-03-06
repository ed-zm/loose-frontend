const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withTM = require("@weco/next-plugin-transpile-modules");
const path = require("path");
require("dotenv").config();

module.exports = withPlugins(
  [
    [
      withSass,
      {
        sassLoaderOptions: {
          includePaths: [path.resolve(__dirname, "./src/styles"), "node_modules"],
          // Provide path to the file with resources
          data: '@import "global";',
        },
        webpack(config) {
          config.plugins = config.plugins.filter((plugin) => {
            if (plugin.constructor.name === "ForkTsCheckerWebpackPlugin") return false;
            return true;
          });
          return config;
        },
      },
    ],
    [withCss],
    [
      withTM,
      {
        transpileModules: ["loose-components"],
      },
    ],
  ],
  {
    publicRuntimeConfig: {
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      HOST: process.env.HOST,
    },
  }
);

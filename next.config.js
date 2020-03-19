const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const path = require('path')
require('dotenv').config()

module.exports = withCss(withSass({
  sassLoaderOptions: {
    includePaths: [ path.resolve(__dirname, './src/styles') ],
      // Provide path to the file with resources
      data: '@import "global";'
  },
  webpack(config) {
    config.plugins = config.plugins.filter(plugin => {
      if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') return false;
      return true;
    })
    return config
  },
  env: {
    API: process.env.API
  }
}))
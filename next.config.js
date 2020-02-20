const withSass = require('@zeit/next-sass')
require('dotenv').config()

module.exports = withSass({
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
})
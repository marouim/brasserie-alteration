const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    proxy: {
      // "/api": {
      //   target:
      //     "https://aap-ansible-automation-platform.apps.hiybv6c8.eastus.aroapp.io/",
      //   logLevel: "debug",
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  }
})

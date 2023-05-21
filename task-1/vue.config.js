const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      css: {
        url: false,
      },
      sass: {
        additionalData: `@import "~@/assets/scss/_variables.scss"; @import "~@/assets/scss/_mixins.scss";`
      },
    },
    
  },
})

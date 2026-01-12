const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify", "vuetify-components"],
  configureWebpack: {
    resolve: {
      alias: {
        "@shared": path.resolve(__dirname, "src/shared-ui/src"),
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        // модификация опций
        return options;
      });

    config.module
      .rule("my-rule")
      .test(/\.ext$/)
      .use("my-loader")
      .loader("my-loader");

    config.module.rule("eslint").exclude.add(/node_modules/);
    config.plugins.delete("vuetify-loader");
  },
};

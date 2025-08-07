// vue.config.js
module.exports = {
    chainWebpack: config => {
        // Изменение существующих правил
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                // модификация опций
                return options
            })

        // Добавление нового правила
        config.module
            .rule('my-rule')
            .test(/\.ext$/)
            .use('my-loader')
            .loader('my-loader')
    },

    transpileDependencies: [
      'vuetify'
    ]
}

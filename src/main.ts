import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'
import router from './router'
import VueRouter from 'vue-router'
import VueCompositionAPI from '@vue/composition-api'
import './assets/global.css'
import store from './store'
Vue.use(VueCompositionAPI)



Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

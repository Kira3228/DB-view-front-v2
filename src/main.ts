import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'
import router from './router'
import VueRouter from 'vue-router'
import VueCompositionAPI from "@vue/composition-api"
import './assets/global.css'
import { createPinia, PiniaVuePlugin } from "pinia"
Vue.use(VueCompositionAPI)
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')

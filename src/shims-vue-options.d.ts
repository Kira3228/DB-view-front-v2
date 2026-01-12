import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import Vuetify from 'vuetify';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vuetify?: Vuetify;
    router?: VueRouter;
    store?: Store<any>;
  }
}
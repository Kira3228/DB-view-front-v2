import { RootState } from '@/store/types/DataTableItemsStore'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import dataTable from './modules/dataTable.store'
Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    dataTable
  },
  strict: process.env.NODE_ENV !== `prodaction`
}
export default new Vuex.Store<RootState>(store)

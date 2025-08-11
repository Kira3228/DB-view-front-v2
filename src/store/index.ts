import { RootState } from '@/store/types/DataTableItemsStore'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import dataTable from './modules/dataTable.store'
import activeFileTable from './modules/activeFile.store'
import fileDetailsModule from './modules/fileDetails.store'
import reportModule from './modules/report-module/reports.store'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    dataTable,
    activeFileTable,
    fileDetailsModule,
    reportModule
  },
  strict: process.env.NODE_ENV !== `prodaction`
}
export default new Vuex.Store<RootState>(store)

import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import dataTable from './modules/dataTable.store'
import activeFileTable from './modules/activeFile.store'
import fileDetailsModule from './modules/fileDetails.store'
import reportModule from './modules/report-module/reports.store'
import tableLogHeaderModule from './modules/tableLogHeader.store'
import tableActiveHeaderModule from './modules/tableActiveHeader.store'
import { RootState } from './types/IRootState'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    dataTable,
    activeFileTable,
    fileDetailsModule,
    reportModule,
    tableLogHeaderModule,
    tableActiveHeaderModule
  },
  strict: process.env.NODE_ENV !== `prodaction`
}
export default new Vuex.Store<RootState>(store)

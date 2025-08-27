import { DataTableHeader } from "vuetify";
import { ExtendedHeaderColumn, RootState, THeaderColumn } from "../types/DataTableItemsStore";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const state: THeaderColumn = {
  headers: [],
  sortByFields: []
}

const getters: GetterTree<THeaderColumn, RootState> = {

}

const mutations: MutationTree<THeaderColumn> = {
  UPDATE_HEADERS(state: THeaderColumn, newHeaders: ExtendedHeaderColumn[]) {
    state.headers = [...newHeaders]
  },
  SET_HEADERS(state: THeaderColumn, newHeaders: ExtendedHeaderColumn[]) {
    state.headers = [...newHeaders]
  },
  SET_SORT_BY_FIELDS(state: THeaderColumn, newArr: string[]) {
    state.sortByFields = [...newArr]
  }
}

const actions: ActionTree<THeaderColumn, RootState> = {}

const tableHeaderModule: Module<THeaderColumn, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}


export default tableHeaderModule
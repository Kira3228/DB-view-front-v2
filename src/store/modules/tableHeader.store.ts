import { DataTableHeader } from "vuetify";
import { RootState, THeaderColumn } from "../types/DataTableItemsStore";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const state: THeaderColumn = { headers: [] }

const getters: GetterTree<THeaderColumn, RootState> = {
  SET_HEADERS(state: THeaderColumn, newHeaders: DataTableHeader[]) {
    state.headers = [...newHeaders]
  }
}

const mutations: MutationTree<THeaderColumn> = {}

const actions: ActionTree<THeaderColumn, RootState> = {}

const tableHeaderModule: Module<THeaderColumn, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
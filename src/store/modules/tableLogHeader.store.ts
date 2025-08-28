import { ExtendedHeaderColumn, RootState, THeaderColumn } from "../types/DataTableItemsStore";
import {  Module, MutationTree } from "vuex";

const state: THeaderColumn = {
  headers: [],
  sortByFields: [],
  sortDescFields: [],
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
  },
  SET_SORT_DESC_FIELDS(state: THeaderColumn, newArr: boolean[]) {
    state.sortDescFields = [...newArr]
  }
}

const tableLogHeaderModule: Module<THeaderColumn, RootState> = {
  namespaced: true,
  state,
  mutations,
}


export default tableLogHeaderModule
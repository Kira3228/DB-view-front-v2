import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ActiveFileDataTableState, RootState } from "../types/DataTableItemsStore";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";

const state: ActiveFileDataTableState = {
    filepath: "",
    inode: 1,
    items: [],
    loading: false,
    page: 1,
    status: "",
    totalPages: 0
}
const getters: GetterTree<ActiveFileDataTableState, RootState> = {}
const mutations: MutationTree<ActiveFileDataTableState> = {
    SET_FILEPATH(state: ActiveFileDataTableState, newValue: string) {
        state.filepath = newValue
    },
    SET_INODE(state: ActiveFileDataTableState, newValue: number) {
        state.inode = newValue
    },
    SET_ITEMS(state: ActiveFileDataTableState, items: TDataTableItems[]) {
        state.items = items
    },
    SET_PAGE(state: ActiveFileDataTableState, newValue: number) {
        state.page = newValue
    },
    SET_STATUS(state: ActiveFileDataTableState, newValue: string) {
        state.status = newValue
    },
    SET_TOTAL_PAGES(state: ActiveFileDataTableState, newValue: number) {
        state.totalPages = newValue
    }
}
const actions: ActionTree<ActiveFileDataTableState, RootState> = {
    
}

const activeFileTableModule: Module<ActiveFileDataTableState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export default activeFileTableModule
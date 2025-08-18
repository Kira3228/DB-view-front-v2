import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ActiveFileDataTableState, RootState } from "../types/DataTableItemsStore";
import { ActiveFileDto } from "@/shared/types/ActiveFiles/TActiveFileDto";
import TActiveFile from "@/shared/types/ActiveFiles/TActiveFile";
import { fetchActiveFiles, fetchArchiveFiles, updateFileStatus } from "@/shared/api/activeFiles";

const state: ActiveFileDataTableState = {
    filepath: "",
    inode: "",
    items: [],
    loading: false,
    page: 1,
    status: "",
    totalPages: 0,
    isArchived: false
}

const getters: GetterTree<ActiveFileDataTableState, RootState> = {}

const mutations: MutationTree<ActiveFileDataTableState> = {
    SET_FILEPATH(state: ActiveFileDataTableState, newValue: string) {
        state.filepath = newValue
    },
    SET_INODE(state: ActiveFileDataTableState, newValue: string) {
        const n = Number(newValue);
        state.inode = newValue.trim() !== '' && Number.isFinite(n) ? n : '';
    },
    SET_ITEMS(state: ActiveFileDataTableState, items: TActiveFile[]) {
        state.items = items
    },
    SET_CURRENT_PAGE(state: ActiveFileDataTableState, newValue: number) {

        state.page = newValue
    },
    SET_STATUS(state: ActiveFileDataTableState, newValue: string) {
        state.status = newValue
    },
    SET_TOTAL_PAGES(state: ActiveFileDataTableState, newValue: number) {
        state.totalPages = newValue
    },
    SET_LOADING(state: ActiveFileDataTableState, newValue: boolean) {
        state.loading = newValue
    },
    SET_FILE_STATUS(state: ActiveFileDataTableState, payload: { id: number, status: string }) {
        const file = state.items.find((item) => {
            return item.id === payload.id
        })
        if (file && `status` in file) {
            file.status = payload.status
        }
    },
    SET_SWITCH(state: ActiveFileDataTableState, newValue: boolean) {
        state.isArchived = newValue
    }
}

const actions: ActionTree<ActiveFileDataTableState, RootState> = {
    async loadItems({ commit, state }, params: string) {
        commit(`SET_LOADING`, true)
        try {
            const query: { page: number; filePath?: string; inode?: number } = {
                page: state.page || 1
            }
            if (state.filepath && state.filepath.trim() !== '') {
                query.filePath = state.filepath.trim()
            }
            if (typeof state.inode === `number` && Number.isFinite(state.inode)) {
                query.inode = state.inode
            }

            const data: ActiveFileDto = state.isArchived
                ? await fetchArchiveFiles(query)
                : await fetchActiveFiles(query)

            commit(`SET_ITEMS`, data.files)
            commit(`SET_TOTAL_PAGES`, data.totalPages)
        }
        catch (error) {
            console.error(error);
        }
        finally {
            commit(`SET_LOADING`, false)
        }
    },
    updateCurrentPage({ commit }, page: number) {
        commit(`SET_CURRENT_PAGE`, page)
    },
    async debouncedFetch({ state, dispatch }) {
        try {
            const params = new URLSearchParams()
            params.set(`page`, String(state.page))
            params.set(`filePath`, String(state.filepath))
            params.set(`inode`, String(state.inode))

            await dispatch('loadItems', params)
        }
        catch (error) {
            console.error(error);
        }
    },
    async updateStatus({ commit }, payload: { id: string, status: string }) {
        try {
            const data = await updateFileStatus(payload.id, payload.status)
            commit(`SET_FILE_STATUS`, { id: Number(payload.id), status: payload.status })
            return data
        }
        catch (error) {
            console.error(error);
        }
    },
    async switchToArchive({ commit, state, dispatch }, newValue: boolean) {
        commit(`SET_SWITCH`, newValue)
        return dispatch(`loadItems`)
    }
}
const activeFileTableModule: Module<ActiveFileDataTableState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export default activeFileTableModule
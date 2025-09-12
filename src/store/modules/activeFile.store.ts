import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ActiveFileDto } from "@/shared/types/ActiveFiles/TActiveFileDto";
import TActiveFile from "@/shared/types/ActiveFiles/TActiveFile";
import { fetchActiveFiles, fetchArchiveFiles, fetchFileHeaders, fetchFilePreset, fetchFilters, updateFileStatus } from "@/shared/api/active-file";
import { ActiveFileDataTableState } from "../types/IActiveFileDataTableState";
import { RootState } from "../types/IRootState";
import { ExtendedHeaderColumn } from "../types/THeaders";

const state: ActiveFileDataTableState = {
    filepath: "",
    inode: "",
    items: [],
    loading: false,
    page: 1,
    status: "",
    totalPages: 0,
    isArchived: false,
    preset: "standart",
    presetList: [],
    exceptions: [],
    headers: [],
    default_filters: {
        sortBy: [],
        sortDesc: []
    },


}

const getters: GetterTree<ActiveFileDataTableState, RootState> = {
    getSortBy: (state: ActiveFileDataTableState): string[] => {
        const sortBy = state.default_filters.sortBy || []
        return sortBy
    },
    getSortDesc: (state: ActiveFileDataTableState): boolean[] => {
        const sortDesc = state.default_filters.sortDesc || []
        return sortDesc
    }
}

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
    },

    SET_PRESET(state: ActiveFileDataTableState, newValue: string) {
        state.preset = newValue
    },
    SET_HEADERS(state: ActiveFileDataTableState, newValue: ExtendedHeaderColumn[]) {
        state.headers = newValue
    },
    SET_ALL_PRESETS(state: ActiveFileDataTableState, newValue: string[]) {
        state.presetList = newValue
    },
    SET_EXCEPTIONS(state: ActiveFileDataTableState, newValue: typeof state.exceptions) {
        state.exceptions = newValue
    },
    SET_SORT_DESC(state: ActiveFileDataTableState, newValue: typeof state.default_filters.sortDesc) {
        state.default_filters.sortDesc = newValue
    },
    SET_SORT_BY(state: ActiveFileDataTableState, newValue: typeof state.default_filters.sortBy) {
        state.default_filters.sortBy = newValue
    },
    SET_FILTERS(state: ActiveFileDataTableState, newValue: typeof state.default_filters) {
        state.default_filters = newValue
    }
}

const actions: ActionTree<ActiveFileDataTableState, RootState> = {
    async loadItems({ commit, state }) {
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
    },

    async getPresets({ commit }) {
        try {
            const preset = await fetchFilePreset()
            commit(`SET_ALL_PRESETS`, preset)
        }
        catch (error) {
            console.log(error);

        }
    },

    async getHeaders({ commit, state }) {
        try {
            const headers = await fetchFileHeaders(state.preset)
            commit(`SET_HEADERS`, headers)
        }
        catch (error) {
            console.log(error);
        }
    },

    async getFilter({ commit, state }) {
        try {
            const filters = await fetchFilters(state.preset)
            if (filters) {
                commit(`SET_FILTERS`, filters)
            } else {
                commit(`SET_FILTERS`, { sortBy: [], sortDesc: [] })
            }
        } catch (error) {
            console.error(error);

        }
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
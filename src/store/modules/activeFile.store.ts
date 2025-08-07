import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ActiveFileDataTableState, RootState } from "../types/DataTableItemsStore";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import { ActiveFileDto } from "@/shared/types/ActiveFiles/TActiveFileDto";
import TActiveFile from "@/shared/types/ActiveFiles/TActiveFile";

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
        console.log(newValue);
        state.filepath = newValue
    },
    SET_INODE(state: ActiveFileDataTableState, newValue: string) {
        console.log(newValue);
        state.inode = newValue
    },
    SET_ITEMS(state: ActiveFileDataTableState, items: TActiveFile[]) {
        state.items = items
    },
    SET_CURRENT_PAGE(state: ActiveFileDataTableState, newValue: number) {
        console.log(newValue);

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
        try {
            if (state.isArchived) {
                commit(`SET_LOADING`, true)
                let url = `http://localhost:3000/api/active/get/archive/?page=${state.page}`
                if (params) {
                    url = `http://localhost:3000/api/active/get/archive/?${params}`
                }
                const response = await fetch(url)
                const data: ActiveFileDto = await response.json()
                commit(`SET_ITEMS`, data.files)
                commit(`SET_TOTAL_PAGES`, data.totalPages)
            }
            else {
                commit(`SET_LOADING`, true)
                let url = `http://localhost:3000/api/active/get/active/?page=${state.page}&filePath=${state.filepath}&inode=${state.inode}`
                if (params) {
                    url = `http://localhost:3000/api/active/get/active/?${params}`
                }
                const response = await fetch(url)
                const data: ActiveFileDto = await response.json()
                console.log(data.totalPages);

                commit(`SET_ITEMS`, data.files)
                commit(`SET_TOTAL_PAGES`, data.totalPages)
            }
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
            const response = await fetch(`http://localhost:3000/api/active/get/active/update/${payload.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: payload.status }),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            commit(`SET_FILE_STATUS`, payload)
            console.log(data);

            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    async switchToArchive({ commit, state, dispatch }, newValue: boolean) {
        try {
            if (newValue) {
                const response = await fetch(`http://localhost:3000/api/active/get/archive/?filePath=${state.filepath}&inode=${state.inode}`)
                if (!response.ok) {
                    throw new Error
                }
                const data: ActiveFileDto = await response.json()
                console.log(data.files);
                commit(`SET_SWITCH`, newValue)
                commit(`SET_ITEMS`, data.files)
                console.log(data.totalPages);

                commit(`SET_TOTAL_PAGES`, data.totalPages)
            }
            else {
                dispatch(`loadItems`)
            }

        }
        catch (error) {
            console.error();

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
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import { downloadBlob } from "@/shared/utils/downloadHelper";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { toSqlDateTimeOrEmpty } from "@/shared/utils/date";
import { downloadAllLogsCsv, downloadSelectedLogsCsv, fetchFilters, fetchLogPreset, fetchLogsFiltered, fetchLogsHeaders } from "@/shared/api/logs";
import { EventLogDataTableState } from "../types/IEventLogDataTableState";
import { RootState } from "../types/IRootState";
import { ExtendedHeaderColumn } from "../types/THeaders";

const state: EventLogDataTableState = {
    selectedItems: [],
    items: [],
    loading: false,
    page: 1,
    totalPages: 0,
    filepath: "",
    systemId: "",
    status: "",
    typeOfEvent: "",
    dateRange: [] as string[],
    headers: [],
    preset: "",
    presetList: [],
    exceptions: [],
    default_filters: {}
}

const getters: GetterTree<EventLogDataTableState, RootState> = {
    selectedCount: (state: EventLogDataTableState): number => state.selectedItems.length,
    hasSelection: (state: EventLogDataTableState): boolean => state.selectedItems.length > 0,
    selectedIds: (state: EventLogDataTableState): number[] => state.selectedItems.map(item => item.id),
    startDate: (state: EventLogDataTableState): string => {
        return toSqlDateTimeOrEmpty(state.dateRange?.[0])
    },
    endDate: (state: EventLogDataTableState): string => {
        return toSqlDateTimeOrEmpty(state.dateRange?.[1])
    },
}

const mutations: MutationTree<EventLogDataTableState> = {
    SET_SELECTED_ITEMS(state: EventLogDataTableState, items: TDataTableItems[]) {
        state.selectedItems = items
    },

    SET_ITEMS(state: EventLogDataTableState, items: TDataTableItems[]) {
        state.items = items
    },

    SET_LOADING(state: EventLogDataTableState, loading: boolean) {
        state.loading = loading
    },
    SET_TOTAL_PAGES(state: EventLogDataTableState, totalPages: number) {
        state.totalPages = totalPages
    },
    CLEAR_SELECTION(state: EventLogDataTableState) {
        state.selectedItems = []
    },
    ADD_TO_SELECTION(state: EventLogDataTableState, item: TDataTableItems) {
        if (!state.selectedItems.find(selected => selected.id === item.id)) {
            state.selectedItems.push(item)
        }
    },
    REMOVE_FROM_SELECTION(state: EventLogDataTableState, itemId: number) {
        state.selectedItems = state.selectedItems.filter(item => item.id !== itemId)
    },
    SET_CURRENT_PAGE(state: EventLogDataTableState, page: number) {
        state.page = page
    },
    SET_FILEPATH(state: EventLogDataTableState, newValue: string) {
        state.filepath = newValue
    },
    SET_SYSTEM_ID(state: EventLogDataTableState, newValue: string) {
        state.systemId = newValue
    },
    SET_STATUS(state: EventLogDataTableState, newStatus: string) {
        state.status = newStatus
    },
    SET_TYPE_OF_EVENT(state: EventLogDataTableState, newType: string) {
        state.typeOfEvent = newType
    },
    SET_DATE_RANGE(state: EventLogDataTableState, newDate: string[] | null) {
        state.dateRange = newDate ? [...newDate] : []
    },
    SET_PRESET(state: EventLogDataTableState, newValue: string) {
        state.preset = newValue
    },
    SET_HEADERS(state: EventLogDataTableState, newValue: ExtendedHeaderColumn[]) {
        state.headers = newValue
    },
    SET_ALL_PRESETS(state: EventLogDataTableState, newValue: string[]) {
        state.presetList = newValue
    },
    SET_EXCEPTIONS(state: EventLogDataTableState, newValue: typeof state.exceptions) {
        state.exceptions = newValue
    },
    SET_FILTERS(state: EventLogDataTableState, newValue: typeof state.default_filters) {
        state.default_filters = newValue
    }
}

const actions: ActionTree<EventLogDataTableState, RootState> = {
    async loadItems({ commit, getters }) {
        commit(`SET_LOADING`, true)
        try {
            const data = await fetchLogsFiltered({
                page: state.page,
                filePath: state.filepath || undefined,
                fileSystemId: state.systemId || undefined,
                status: state.status || undefined,
                eventType: state.typeOfEvent || undefined,
                startDate: getters.startDate,
                endDate: getters.endDate,
                filePathException: localStorage.getItem('fileExseption') || undefined,
                processPathException: localStorage.getItem('processExseption') || undefined,
            })

            if (data && data.events) {
                commit(`SET_ITEMS`, data.events)
                commit(`SET_TOTAL_PAGES`, data.totalPages ?? 0)
            }
            else {
                commit(`SET_ITEMS`, [])
                commit(`SET_TOTAL_PAGES`, 0)
            }
        }
        catch (error) {
            console.error(error)
        }
        finally {
            commit(`SET_LOADING`, false)
        }
    },

    updateSelection({ commit }, items: TDataTableItems[]) {
        commit(`SET_SELECTED_ITEMS`, items)
    },

    clearSelection({ commit }) {
        commit(`CLEAR_SELECTION`)
    },

    updatePage({ commit, dispatch }, page: number) {
        commit(`SET_CURRENT_PAGE`, page)
        return dispatch('loadItems');
    },

    async downloadSelectedLogReport({ commit, state }) {
        const selectedIds = state.selectedItems.map(item => item.id);
        if (selectedIds.length === 0) {
            throw new Error
        }
        try {
            const blob = await downloadSelectedLogsCsv(selectedIds)
            downloadBlob(blob, { filename: `report.csv` })
            return { succes: true, filename: `report.csv` }
        }
        catch (error) {
            console.log(error);
        }
    },

    async downloadAllLogReport({ commit, state }) {
        try {
            const blob = await downloadAllLogsCsv()
            downloadBlob(blob, { filename: `report.csv` })
            return { success: true, filename: `report.csv` };
        }
        catch (error) {
            console.log(error);
        }
    },

    async updateTableItems({ dispatch }, params?: string) {
        return dispatch(`loadItems`)
    },

    async debouncedFetch({ dispatch }) {
        dispatch(`loadItems`)
    },

    async getHeaders({ commit, state }) {
        try {
            const headers = await fetchLogsHeaders(state.preset)

            if (headers) {
                commit(`SET_HEADERS`, headers)
            }
            else {
                commit(`SET_HEADERS`, [])
            }
        }
        catch (error) {
            console.error(error)
        }
    },
    async getPresets({ commit, state }) {
        try {
            const presets = await fetchLogPreset()

            if (presets) {
                commit(`SET_ALL_PRESETS`, presets)
            }
            else {
                commit(`SET_ALL_PRESETS`, [])
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    async getFilters({ commit, state }) {
        try {
            const filters = await fetchFilters(state.preset)
            if (filters) {
                commit(`SET_FILTERS`, filters)
            }
            else {
                commit(``)
            }
        } catch (error) {
            console.error(error);

        }
    }
}

const eventLogDataTableModule: Module<EventLogDataTableState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export default eventLogDataTableModule
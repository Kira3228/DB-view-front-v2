import { TEventLogsDto } from "@/shared/types/EventLogs";
import { EventLogDataTableState, RootState } from "@/store/types/DataTableItemsStore";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import { downloadBlob } from "@/shared/utils/downloadHelper";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

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
    dateRange: []
}

const getters: GetterTree<EventLogDataTableState, RootState> = {
    selectedCount: (state: EventLogDataTableState): number => state.selectedItems.length,
    hasSelection: (state: EventLogDataTableState): boolean => state.selectedItems.length > 0,
    selectedIds: (state: EventLogDataTableState): number[] => state.selectedItems.map(item => item.id),
    startDate: (state: EventLogDataTableState): string => {
        if (state.dateRange) {
            if (state.dateRange[0]) {
                return state.dateRange[0].replace('T', ' ').replace('.000Z', ' ').trimEnd()
            }
        }
        return ''
    },
    endDate: (state: EventLogDataTableState): string => {
        if (state.dateRange) {
            if (state.dateRange[1]) {
                return state.dateRange[1].replace('T', ' ').replace('.000Z', ' ').trimEnd()
            }
        }

        return ''
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
        console.log(newDate);

        state.dateRange = newDate
    }
}

const actions: ActionTree<EventLogDataTableState, RootState> = {
    async loadItems({ commit }) {
        commit(`SET_LOADING`, true)
        try {
            const response = await fetch(`http://localhost:3000/api/logs/filtered`)
            const data: TEventLogsDto = await response.json()
            commit(`SET_ITEMS`, data.events)
            commit(`SET_TOTAL_PAGES`, data.totalPages)
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
    updatePage({ commit }, page: number) {
        commit(`SET_CURRENT_PAGE`, page)
    },
    async downloadSelectedLogReport({ commit, state }) {
        const selectedIds = state.selectedItems.map(item => item.id);
        if (selectedIds.length === 0) {
            throw new Error
        }
        try {
            const url = `http://localhost:3000/api/logs/export/selected/?ids=${selectedIds}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob()
            const filename = `report.csv`
            downloadBlob(blob, { filename })
            return { success: true, filename };
        }
        catch (error) {
            console.log(error);
        }
    },

    async downloadAllLogReport({ commit, state }) {
        try {
            const url = `http://localhost:3000/api/logs/export/all`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob()
            const filename = `report.csv`
            downloadBlob(blob, { filename })
            return { success: true, filename };
        }
        catch (error) {
            console.log(error);
        }
    },
    async updateTableItems({ commit, state }, params?: string) {
        try {
            let url = `http://localhost:3000/api/logs/filtered/?page=${state.page}`

            if (params) {
                url = `http://localhost:3000/api/logs/filtered/?${params}`
            }

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const events: TEventLogsDto = await response.json()
            if (events && events.events) {
                commit(`SET_ITEMS`, events.events)
                commit(`SET_TOTAL_PAGES`, events.totalPages)
            }
        } catch (error) {
            console.error(error);
        }
    },
    async debouncedFetch({ state, getters, dispatch }) {
        try {
            const params = new URLSearchParams()
            params.set(`filePath`, state.filepath)
            params.set(`fileSystemId`, state.systemId)
            params.set(`status`, state.status)
            params.set(`eventType`, state.typeOfEvent)
            if (getters.startDate) {
                params.set(`startDate`, getters.startDate)
            }
            if (getters.endDate) {
                params.set(`endDate`, getters.endDate)
            }
            params.set(`page`, String(state.page))

            await dispatch(`updateTableItems`, params)
        }
        catch (error) {
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
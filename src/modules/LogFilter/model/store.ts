import { defineStore } from "pinia";
import { fetchTypes } from "../api/fetch-statuses";

interface LogFilterState {
  eventType: string[]
  type: string | undefined
  systemId: string | undefined
  filePath: string | undefined
  status: { label: string, value: string } | undefined
  startDate: string | undefined
  endDate: string | undefined
}



export const useLogFilterStore = defineStore(`log-filter-store`, {
  state: (): LogFilterState => ({
    eventType: [],
    filePath: undefined,
    status: undefined,
    systemId: undefined,
    type: undefined,
    endDate: undefined,
    startDate: undefined
  }),

  actions: {
    async loadStatusTypes() {
      const types = await fetchTypes()
      this.eventType = types
    },

  }
})

import { defineStore } from "pinia";
import { fetchLogs } from "../api/fetch-log";
import { Header } from "@/common-components/src/components/DataTable";
import { fetchPreset } from "../api/fetchPreset";
import { EventLog, LogsParams } from "../types";
import { fetchReport } from "../api/fetch-report";

interface LogsTableState {
  headers: Header[]
  presetList: string[]
  events: EventLog[]
  totalPage: number
  totalCount: number
  ids: EventLog[]
}

export const useLogsViewerStore = defineStore(`logs-table-store`, {
  state: (): LogsTableState => ({ headers: [], presetList: [], events: [], totalCount: 0, totalPage: 0, ids: [] }),
  actions: {
    async logsLoad(params?: Partial<LogsParams>) {
      try {
        const events = await fetchLogs(params)
        this.headers = events.headers
        this.events = events.events
        this.totalPage = events.totalPage
        this.totalCount = events.totalCount
        console.log(events.events);

      }
      catch (error) {
        //TODO: что то сделеть 
        console.log(error);

      }

    },

    async presetLoad() {
      const presetList = await fetchPreset()
      this.presetList = presetList
    },

    async downloadAllLogReport() {
      const blob = await fetchReport()
    },
    async downloadSelectedLogReport() {
      const ids = this.ids.map((item) => { return item.id })
      const blob = await fetchReport({ ids: ids })
    },

  }
})
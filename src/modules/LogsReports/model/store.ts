import { defineStore } from "pinia";
import { fetchReport } from "../api/fetch-report";

interface LogsReportState {
  dialogIsOpen: boolean
  reportFormat: string
}

export const useLogsReportStore = defineStore(`logs-report-store`, {
  state: (): LogsReportState => ({ dialogIsOpen: false, reportFormat: "" }),
  actions: {
    getReport() {
      fetchReport()
    }
  }
})
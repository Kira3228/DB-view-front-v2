import { defineStore } from "pinia";
import { fetchReport } from "../api/fetch-report";
import { ReportParams } from "../types";

interface LogsReportState {
  dialogIsOpen: boolean
  reportFormat: string
}

export const useLogsReportStore = defineStore(`logs-report-store`, {
  state: (): LogsReportState => ({ dialogIsOpen: false, reportFormat: "" }),
  actions: {
    getReport(params: ReportParams) {
      fetchReport(params)
    }
  }
})
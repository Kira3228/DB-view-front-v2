import { defineStore } from "pinia";
import { fetchReport } from "../api/fetch-chains";
import { ChainReport } from "../types";
interface DetailsReportState {
  modalIsOpen: boolean
  startDate: string
  endDate: string
  format: string
}

export const useDetailsReportStore = defineStore(`details-report-store`, {
  state: (): DetailsReportState => ({
    endDate: "", modalIsOpen: false, startDate: '',
    format: ""
  }),
  actions: {
    getReport(params?: ChainReport) {
      fetchReport(params)
    }
  }

})
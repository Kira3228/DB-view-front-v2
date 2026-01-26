import { storeToRefs } from "pinia"
import { useLogsViewerStore } from "./store"
import { ref } from "vue"
import { useLogsReportStore } from "@/modules/LogsReports/model/store"


export const useLogsViewerModel = () => {
  const { logsLoad, presetLoad, downloadAllLogReport, downloadSelectedLogReport } = useLogsViewerStore()
  const { headers, presetList, events, totalCount, totalPage, ids, isOpenSnackbar } = storeToRefs(useLogsViewerStore())

  const { dialogIsOpen } = storeToRefs(useLogsReportStore())


  return {
    logsLoad,
    presetLoad,
    headers,
    presetList,
    events,
    totalCount,
    totalPage,
    downloadAllLogReport, downloadSelectedLogReport,
    ids,
    isOpenSnackbar,
    dialogIsOpen
  }

}
import { storeToRefs } from "pinia"
import { useLogsViewerStore } from "./store"
import { ref } from "vue"


export const useLogsViewerModel = () => {
  const { logsLoad, presetLoad, downloadAllLogReport, downloadSelectedLogReport } = useLogsViewerStore()
  const { headers, presetList, events, totalCount, totalPage, ids, isOpenSnackbar } = storeToRefs(useLogsViewerStore())

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
    isOpenSnackbar
  }

}
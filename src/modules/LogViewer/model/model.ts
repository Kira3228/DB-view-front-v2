import { storeToRefs } from "pinia"
import { useLogsViewerStore } from "./store"


export const useLogsViewerModel = () => {
  const { logsLoad, presetLoad, downloadAllLogReport, downloadSelectedLogReport } = useLogsViewerStore()
  const { headers, presetList, events, totalCount, totalPage, ids } = storeToRefs(useLogsViewerStore())

  return {
    logsLoad,
    presetLoad,
    headers,
    presetList,
    events,
    totalCount,
    totalPage,
    downloadAllLogReport, downloadSelectedLogReport,
    ids
  }

}
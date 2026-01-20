import { storeToRefs } from "pinia"
import { useLogsViewerStore } from "./store"


export const useLogsViewerModel = () => {
  const { logsLoad, presetLoad, resetTable } = useLogsViewerStore()
  const { headers, presetList, events, totalCount, totalPage } = storeToRefs(useLogsViewerStore())
  return {
    logsLoad, presetLoad, headers, presetList, events, resetTable, totalCount, totalPage
  }

}
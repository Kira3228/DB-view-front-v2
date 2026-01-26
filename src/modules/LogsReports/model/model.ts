import { storeToRefs } from "pinia"
import { useLogsReportStore } from "./store"
import { useLogsViewerStore } from "@/modules/LogViewer/model/store"

export const useLogReportModel = () => {
  const { dialogIsOpen, reportFormat } = storeToRefs(useLogsReportStore())
  const { headers } = storeToRefs(useLogsViewerStore())

  return { dialogIsOpen, headers, reportFormat }
}
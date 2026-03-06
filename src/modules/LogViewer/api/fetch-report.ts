import { useApi } from "@/shared/api/http"
import { EventLog } from "../types"

interface ReportParams {
  ids: number[]
}

export const fetchReport = async (params?: ReportParams) => {
  const { httpGetBlob, downloadBlob } = useApi()

  if (!params) {
    const blob = await httpGetBlob('/api/logs/export/all')
    downloadBlob(blob, { filename: `report.csv` })
  }
  else {
    const blob = await httpGetBlob(`/api/logs/export.csv`, params)
    downloadBlob(blob, { filename: `report.csv` })
  }

}
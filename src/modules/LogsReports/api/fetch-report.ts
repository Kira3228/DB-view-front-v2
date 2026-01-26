import { useApi } from "@/shared/api/http"
import { ReportParams } from "../types"

export const fetchReport = (params?: ReportParams) => {
  const { httpGetBlob } = useApi()
  return httpGetBlob(`/api/reports`)
}
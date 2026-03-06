import { useApi } from "@/shared/api/http"
import { LogsResponse } from "../types"
import { LogsParams } from "../types"


export const fetchLogs = async (params?: Partial<LogsParams>) => {
  const { get } = useApi()
  return get<LogsResponse>(`/api/logs`, params)
}
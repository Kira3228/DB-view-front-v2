import { useApi } from "@/shared/api/http"
import { ActiveFileResponse } from "../types"
import { ActiveFileParams } from "../types/active-file-params.type"



export const fetchActiveFile = async (params: Partial<ActiveFileParams>) => {
  const { get } = useApi()
  return await get<ActiveFileResponse>(`/api/files/active`, params)
}
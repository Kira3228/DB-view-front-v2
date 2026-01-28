import { useApi } from "@/shared/api/http"
import { FileDetailParams, FilDetailResponse } from "../types"

export const fetchRoots = async (params?: FileDetailParams) => {
  const { get } = useApi()
  return get<FilDetailResponse>(`/api/files/details`, params)

}
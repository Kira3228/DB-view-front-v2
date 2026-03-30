import { useApi } from "@/shared/api/http"
import { FilesManagementDto } from "../types/file-management.dto"
import { FileManagementTableBody } from "../types/table-body.type"

export interface FileManagementResponse {
  data: FileManagementTableBody[],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
}

export const getFiles = async (params?: FilesManagementDto) => {
  const { get } = useApi()
  const result = await get<FileManagementResponse>(`/file/get/all`, params)
  return result
}
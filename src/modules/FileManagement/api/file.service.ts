import { useApi } from "@/shared/api/http"
import { FileManagementTableBody } from "../types/table-body.type"
import { FilesManagementDto } from "../types/file-management.dto"

export interface FileManagementResponse {
  data: FileManagementTableBody[],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
}

const api = useApi()

export const FileService = {
  async get(params?: FilesManagementDto) {
    return await api.get<FileManagementResponse>(`/file/get/all`, params)
  }
}
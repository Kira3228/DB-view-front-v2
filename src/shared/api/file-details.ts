import { FileHierarchy } from "@/store/types/IFile"
import { httpGet } from "./http"
import { BASE_URL } from "@/constants"

export const fetchFileDetails = async (params: { filePath: string, inode?: number }) => {
  return httpGet<FileHierarchy>(`${BASE_URL}/api/files`)
}

export const fetchDetails = async (params: { filePath?: string, inode?: number }) => {
  return httpGet(`${BASE_URL}/api/files/graph`, params)
}
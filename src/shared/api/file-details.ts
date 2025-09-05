import { FileHierarchy } from "@/store/types/IFile"
import { httpGet } from "./http"
import { BASE } from "@/constants"

export const fetchFileDetails = async (params: { filePath: string, inode?: number }) => {
  return httpGet<FileHierarchy>(`${BASE}/api/files`)
}
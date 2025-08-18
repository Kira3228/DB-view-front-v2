import { ActiveFileDto } from "../types/ActiveFiles/TActiveFileDto";
import { httpGet, httpPatch } from "./http"

const BASE = `http://localhost:3000`

export const fetchActiveFiles = (params: { page?: number; filePath?: string; inode?: number }) => {
  return httpGet<ActiveFileDto>(`${BASE}/api/files/active`, params)
}

export const fetchArchiveFiles = (params: { page?: number, filePath?: string, inode?: number }) => {
  return httpGet<ActiveFileDto>(`${BASE}/api/files/archive`, params)
}

export const updateFileStatus = (id: number | string, staus: string) => {
  return httpPatch(`${BASE}/api/files/${id}/status`, { status })
}
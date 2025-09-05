import { BASE_URL } from "@/constants";
import { ActiveFileDto } from "../types/ActiveFiles/TActiveFileDto";
import { httpGet, httpPatch } from "./http"


export const fetchActiveFiles = (params: { page?: number; filePath?: string; inode?: number }) => {
  return httpGet<ActiveFileDto>(`${BASE_URL}/api/files/active`, params)
}

export const fetchArchiveFiles = (params: { page?: number, filePath?: string, inode?: number }) => {
  return httpGet<ActiveFileDto>(`${BASE_URL}/api/files/archive`, params)
}

export const updateFileStatus = (id: number | string, staus: string) => {
  return httpPatch(`${BASE_URL}/api/files/${id}/status`, { status })
}
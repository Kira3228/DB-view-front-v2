import { BASE_URL } from "@/constants";
import { ActiveFileDto } from "../types/ActiveFiles/TActiveFileDto";
import { httpGet, httpPatch } from "./http"

export const fetchActiveFiles = (params: { page?: number; filePath?: string; inode?: number }) => {
  return httpGet<ActiveFileDto>(`${BASE_URL}/api/files/active`, params)
}

export const fetchArchiveFiles = (params: { page?: number, filePath?: string, inode?: number }) => {
  return httpGet<ActiveFileDto>(`${BASE_URL}/api/files/archive`, params)
}

export const updateFileStatus = (id: number | string, status: string) => {
  return httpPatch(`${BASE_URL}/api/files/${id}/status`, { status })
}

export const fetchFilePreset = async () => {
  return await httpGet(`${BASE_URL}/api/files/presets`)
}

export const fetchFileHeaders = (presetName?: string) => {
  try {
    let params: { presetName: string }
    if (presetName) {
      params = { presetName: presetName }
    } else {
      params = { presetName: "" }
    }
    return httpGet(`${BASE_URL}/api/files/headers`, params)
  }
  catch (error) {
    console.error(error);
  }
}
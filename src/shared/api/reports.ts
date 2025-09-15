import { BASE_URL } from "@/constants"
import { httpGetBlob } from "./http"



export const downloadReport = async (params: Record<string, any>, reportType: string, reportFormat: string) => {
  return httpGetBlob(`${BASE_URL}/api/reports/${reportType}.${reportFormat}`, params)
}
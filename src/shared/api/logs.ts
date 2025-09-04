import { ExtendedHeaderColumn } from "@/store/types/DataTableItemsStore";
import { TEventLogsDto } from "../types/EventLogs";
import { httpGet, httpGetBlob } from "./http";
import { BASE } from "@/constants";


export const fetchLogsFiltered = (params: {
  page?: number;
  filePath?: string;
  fileSystemId?: string;
  status?: string;
  eventType?: string;
  startDate?: string;
  endDate?: string;
  filePathException?: string;
  processPathException?: string;
}) => {
  return httpGet<TEventLogsDto>(`${BASE}/api/logs/search`, params);
}

export const downloadSelectedLogsCsv = (ids: number[]) => {
  const params = { ids: ids.join(`,`) };
  return httpGetBlob(`${BASE}/api/logs/export/selected`, params)
}

export const downloadAllLogsCsv = () => {
  return httpGetBlob(`${BASE}/api/logs/export/all`)
}

export const fetchLogsHeaders = async (presetName?: string) => {
  try {
    let params: { presetName: string }
    if (presetName) {
      params = { presetName: presetName }
    }
    else {
      params = { presetName: "" }
    }
    const headers = await httpGet(`${BASE}/api/logs/headers`, params)
    return headers

  }
  catch (error) {
    console.error(error);

  }

}

export const fetchLogPreset = () => {
  return httpGet(`${BASE}/api/logs/presets`)
}


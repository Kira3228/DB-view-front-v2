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
export const fetchLogPreset = async () => {
  const presets = await httpGet(`${BASE}/api/logs/presets`)
  return presets
}

export const updateAndChange = async (presetName?: string) => {
  let params: { presetName?: string } = {};

  if (presetName) {
    params = { presetName };
    const response = await httpGet(`${BASE}/api/logs/`, params);
    return response;
  }

  const response = await httpGet(`${BASE}/api/logs/`);
  return response;
};
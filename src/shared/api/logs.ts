import { TEventLogsDto } from "../types/EventLogs";
import { httpGet, httpGetBlob } from "./http";

const BASE = `http://localhost:3000`;

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
  console.log(params
  );

  return httpGet<TEventLogsDto>(`${BASE}/api/logs/search`, params);
}

export const downloadSelectedLogsCsv = (ids: number[]) => {
  const params = { ids: ids.join(`,`) };
  return httpGetBlob(`${BASE}/api/logs/export/selected`, params)
}

export const downloadAllLogsCsv = () => {
  return httpGetBlob(`${BASE}/api/logs/export/all`)
}
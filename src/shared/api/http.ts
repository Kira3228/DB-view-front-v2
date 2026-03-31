import { BASE_URL } from "@/constants"
import axios, { AxiosResponse } from "axios"

interface IDownloadOptions {
  filename: string
}
const api = axios.create({
  baseURL: BASE_URL
})
export const useApi = () => {
  const get = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(endpoint, { params });
    return response.data;
  };

  const post = async <T>(
    endpoint: string,
    body: any,
    params?: Record<string, any>
  ): Promise<T> => {
    const response: AxiosResponse<T> = await api.post(endpoint, body, { params });
    return response.data;
  };

  const patch = async <T>(endpoint: string, body?: any): Promise<T> => {
    const response: AxiosResponse<T> = await api.patch(endpoint, body);
    return response.data;
  };

  const httpGetBlob = async (url: string, params?: Record<string, any>): Promise<Blob> => {
    const response = await api.get(url, {
      params,
      responseType: 'blob',
    });
    return response.data;
  };

  const httpPostBlob = async (endpoint: string, body: any): Promise<Blob> => {
    const response = await api.post(endpoint, body, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const downloadBlob = (blob: Blob, options: IDownloadOptions) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = options.filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return {
    get,
    post,
    patch,
    httpGetBlob,
    httpPostBlob,
    downloadBlob,
  };
};

export const httpPatch = async <T>(url: string, body?: any): Promise<T> => {
  const res = await fetch(url, {
    method: `PATCH`,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    throw new Error(`PATCH ${url} failed ${res.status}`)
  }

  return res.json() as Promise<T>
}


export const buildURL = (base: string, params?: Record<string, any>): string => {
  if (!params) {
    return `${BASE_URL}${base}`
  }

  const sp = new URLSearchParams()

  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue
    sp.set(k, String(v))
  }

  const qs = sp.toString()
  const result = qs ? `${BASE_URL}${base}?${qs}` : `${BASE_URL}${base}`
  return result
}



import { BASE_URL } from "@/constants"
import { IDownloadOptions } from "../utils/downloadHelper"


export const useApi = () => {
  const get = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {

    const url = buildURL(endpoint, params)
    const res = await fetch(url, { method: `GET` })

    if (!res.ok) {
      throw new Error(`GET ${url} failed ${res.status}`)
    }
    return res.json()
  }

  const patch = async <T>(endpoint: string, body?: any): Promise<T> => {
    const url = buildURL(endpoint)
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

  const httpGetBlob = async (url: string, params?: Record<string, any>): Promise<Blob> => {
    const final = buildURL(url, params);

    const res = await fetch(final)
    if (!res.ok) {
      throw new Error(`GET ${final} failed: ${res.status}`)
    }
    return res.blob()
  }

  const downloadBlob = (blob: Blob, options: IDownloadOptions = {}) => {
    const { filename = `report.csv` } = options

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement(`a`)
    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(url);
  }
  return {
    get,
    patch,
    httpGetBlob,
    downloadBlob
  }
}

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

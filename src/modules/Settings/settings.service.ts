import { useApi } from "@/shared/api/http"

const api = useApi()

export interface SettingsResponse {
  monitoringPaths: string[],
  exceptions: string[],
  dataBase: { path: string },
  interaface: { rowsQuantity: number, virtualScrolling: boolean }
}

export const SettingsService = {
  async get() {
    const result = await api.get<SettingsResponse>(`/settings/all`)
    console.log(result);

    return result
  }
}
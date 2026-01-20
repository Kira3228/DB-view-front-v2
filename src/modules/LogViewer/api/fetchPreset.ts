import { useApi } from "@/shared/api/http"

export const fetchPreset = async () => {
  const { get } = useApi()
  return await get<string[]>(`/api/logs/presets`)
}
import { useApi } from "@/shared/api/http"

export const fetchTypes = async () => {
  const { get } = useApi()
  return get<string[]>(`/api/logs/types`)
}
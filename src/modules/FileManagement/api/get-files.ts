import { useApi } from "@/shared/api/http"

export const getFiles = async () => {
  const { get } = useApi()
  const result = await get(`/file/get/all`)
  return result
}
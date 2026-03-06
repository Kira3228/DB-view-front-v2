import { useApi } from "@/shared/api/http"

export const fetchUpdateStatus = async (id: number, body: any) => {
  const { patch } = useApi()
  return await patch(`/api/files/${id}/status`, body)
}
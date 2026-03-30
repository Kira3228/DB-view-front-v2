import { useApi } from "@/shared/api/http"
import { FileReadsTableBody } from "../types/table-body.type"
import { MessageEventDto } from "../types/message-event.dto"

interface EventsResponse {
  data: FileReadsTableBody[],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
}

export const getFiles = async (params?: MessageEventDto) => {
  const { get } = useApi()
  return await get<EventsResponse>(`/events/all`, params)
}



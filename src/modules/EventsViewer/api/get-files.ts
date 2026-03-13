import { useApi } from "@/shared/api/http"
import { FileReadsTableBody } from "../types/table-body.type"
import { MessageEventDto } from "../types/message-event.dto"

export const getFiles = async (params?: MessageEventDto) => {
  const { get } = useApi()
  return await get<FileReadsTableBody[]>(`/events/all`, params)
}



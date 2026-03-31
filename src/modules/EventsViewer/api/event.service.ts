import { useApi } from "@/shared/api/http"
import { FileReadsTableBody } from "../types/table-body.type"
import { EventDto } from "../types/message-event.dto"

const api = useApi()

interface EventsResponse {
  data: FileReadsTableBody[],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
}

export const EventService = {
  async get(params?: EventDto) {
    return await api.get<EventsResponse>(`/events/all`, params)
  },
  async getFilesDetails(params: {
    fileId: number, processVersionId: number
  }) {
    return await api.get<FileReadsTableBody[]>(`/file/reads/${params.fileId}/${params.processVersionId}`)
  }
}
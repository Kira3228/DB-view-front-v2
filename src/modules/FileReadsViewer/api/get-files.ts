import { useApi } from "@/shared/api/http"
import { FileReadsTableBody } from "../types/table-body.type"

export const getFiles = async () => {
  const { get } = useApi()
  return await get<FileReadsTableBody[]>(`/file/reads`)

}



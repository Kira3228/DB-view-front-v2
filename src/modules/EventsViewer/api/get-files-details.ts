import { useApi } from "@/shared/api/http"
import { FileReadsTableBody } from "../types/table-body.type"

export const getFilesDetails = async (params: {
  fileId: number, processVersionId: number
}) => {
  const { get } = useApi()
  return await get<FileReadsTableBody[]>(`/file/reads/${params.fileId}/${params.processVersionId}`)

}



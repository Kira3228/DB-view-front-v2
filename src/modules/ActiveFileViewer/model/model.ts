import { storeToRefs } from "pinia"
import { useActiveFileViewStore } from "./store"

export const useActiveFileModel = () => {
  const { loadActiveFile } = useActiveFileViewStore()
  const { headers, files, getHeaders, limit, page, totalPage } = storeToRefs(useActiveFileViewStore())

  return { headers, files, loadActiveFile, limit, page, totalPage }
}
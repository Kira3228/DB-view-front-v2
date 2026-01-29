import { storeToRefs } from "pinia"
import { useActiveFileViewStore } from "./store"

export const useActiveFileModel = () => {
  const { loadActiveFile, presetLoad } = useActiveFileViewStore()
  const { headers, files, getHeaders, limit, page, totalPage, presetList } = storeToRefs(useActiveFileViewStore())

  return { headers, files, loadActiveFile, limit, page, totalPage, presetList, presetLoad }
}
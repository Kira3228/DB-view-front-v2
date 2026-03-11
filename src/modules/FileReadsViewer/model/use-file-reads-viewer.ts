import { onMounted } from "vue"
import { useFileReadsViewerStore } from "./use-file-reads-viewer-store"
import { FileReadsTableBody } from "../types/table-body.type"

export const useFileReadsViewer = () => {
  const { loadFiles } = useFileReadsViewerStore()


  onMounted(() => {
    loadFiles()
  })

  return {
  }
}
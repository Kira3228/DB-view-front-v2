import { onMounted, ref } from "vue"
import { useFileReadsViewerStore } from "./use-file-reads-viewer-store"
import { FileReadsTableBody } from "../types/table-body.type";

export const useFileReadsViewer = () => {
  const { loadFiles, loadFilesDetails } = useFileReadsViewerStore()

  const drawerIsOpen = ref<boolean>(false)
  const filterDrawerIsOpen = ref<boolean>(false)

  const handleRowClick = (data: FileReadsTableBody) => {
    loadFilesDetails(Number(data.fileId), Number(data.processVersionId))
    drawerIsOpen.value = true
  };

  const refreshClick = () => {
    loadFiles()
  }

  const openFiltersClick = () => {
    filterDrawerIsOpen.value = true
  };

  onMounted(() => {
    loadFiles()
  })

  return {
    drawerIsOpen,
    handleRowClick,
    refreshClick,
    filterDrawerIsOpen,
    openFiltersClick
  }
}
import { ref, watch } from "vue"
import { FilesManagementDto } from "../types/file-management.dto"
import { useFileManagementStore } from "./use-file-management-store"

export const useFileManagementFilter = (onClose: (val: boolean) => void) => {
  const fileManagementStore = useFileManagementStore()
  const localFilters = ref<FilesManagementDto>({ ...fileManagementStore.filters })

  watch(() => fileManagementStore.filters, (newVal) => {
    localFilters.value = { ...newVal };
  }, { deep: true });

  const applyFilters = () => {
    const filterToApply = {
      ...localFilters.value,
      page: 1,
    }
    fileManagementStore.setFilters(filterToApply)
    fileManagementStore.loadFiles()
    onClose(false)
  }

  const resetFilters = () => {
    fileManagementStore.resetFilters();
    fileManagementStore.loadFiles();
    onClose(false);
  }

  return {
    applyFilters, localFilters, resetFilters
  }
}
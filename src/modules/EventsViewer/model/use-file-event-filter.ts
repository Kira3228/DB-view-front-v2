import { ref, watch } from "vue"
import { MessageEventDto } from "../types/message-event.dto"
import { useFileReadsViewerStore } from "./use-file-reads-viewer-store"

export const useFileEventFilter = (onClose: (val: boolean) => void) => {
  const fileEventStore = useFileReadsViewerStore()
  const localFilters = ref<MessageEventDto>({ ...fileEventStore.filters })

  watch(() => fileEventStore.filters, (newVal) => {
    localFilters.value = { ...newVal };
  }, { deep: true });

  const applyFilters = () => {
    const filterToApply = {
      ...localFilters.value,
      page: 1,
    }
    fileEventStore.setFilters(filterToApply)
    fileEventStore.loadFiles()
    onClose(false)
  }

  const resetFilters = () => {
    fileEventStore.resetFilters();
    fileEventStore.loadFiles();
    onClose(false);
  }

  return {
    applyFilters, localFilters, resetFilters
  }
}
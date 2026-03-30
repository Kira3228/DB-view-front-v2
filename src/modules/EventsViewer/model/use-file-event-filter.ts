import { ref, watch } from "vue"
import { useEventFilter } from "./use-event-filter"

export const useFileEventFilter = (onClose: (val: boolean) => void) => {
  const { filters, setFilter, resetFilters: reset } = useEventFilter()
  const localFilters = ref({ ...filters.value })

  watch(filters, (newVal) => {
    localFilters.value = { ...newVal }
  })

  const applyFilters = () => {
    setFilter(localFilters.value)
    onClose(false)
  }

  const resetFilters = () => {
    reset()
    onClose(false)
  }

  return {
    applyFilters, localFilters, resetFilters
  }
}
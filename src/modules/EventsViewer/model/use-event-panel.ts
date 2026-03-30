import { computed, onMounted, ref } from "vue"
import { FileReadsTableBody } from "../types/table-body.type";
import { useEventFilter } from "./use-event-filter";
import { useQuery } from "@tanstack/vue-query";
import { FileService } from "../api/file.service";
import { useEventPanelStore } from "./use-event-panel-store";
//TODO: СДЕЛАТЬ ТАНСТАК КВЕРИ
export const useEventPanel = () => {
  const { loadFilesDetails } = useEventPanelStore()
  const { filters, setFilter, resetFilters } = useEventFilter()

  const { data, isLoading, error } = useQuery({
    queryKey: computed(() => ["events", filters.value]),
    queryFn: () => FileService.get(filters.value),
    keepPreviousData: true
  })


  const drawerIsOpen = ref<boolean>(false)
  const filterDrawerIsOpen = ref<boolean>(false)

  const handleRowClick = (data: FileReadsTableBody) => {
    loadFilesDetails(Number(data.fileId), Number(data.processVersionId))
    drawerIsOpen.value = true
  };

  const refreshClick = () => {
    // loadFiles()
  }

  const openFiltersClick = () => {
    filterDrawerIsOpen.value = true
  };

  onMounted(() => {
    // loadFiles()
  })

  return {
    drawerIsOpen,
    filterDrawerIsOpen,
    handleRowClick,
    refreshClick,
    openFiltersClick,
    files: computed(() => data.value?.data ?? []),
    totalPages: computed(() => data.value?.totalPages ?? 1),
    total: computed(() => data.value?.total ?? 0),
    isLoading,
    error,
  }
}
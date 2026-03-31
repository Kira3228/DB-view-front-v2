import { computed, ref } from "vue"
import { Header } from "@/common-components/src/components/DataTable"
import { useFileManagementFilter } from "./use-file-management-filters"
import { useQuery } from "@tanstack/vue-query"
import { FileService } from "../api/file.service"

export const useFileManagementPanel = () => {

  const { filters, setFilter, resetFilters } = useFileManagementFilter()
  // const { loadFiles } = useFileManagementStore()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: computed(() => ["files", filters.value]),
    queryFn: () => FileService.get(filters.value),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  })

  const filterDrawerIsOpen = ref<boolean>(false)

  const setPage = (page: number) => setFilter({ page })





  const headers: Header[] = [
    { align: "start", isVisible: true, sortable: true, text: 'birthTime', value: "birthTime", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'filesystem', value: "filesystem", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'inode', value: "inode", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'originProcess', value: "originProcess", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'path', value: "path", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'size', value: "size", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'status', value: "status", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'trackingStartedAt', value: "trackingStartedAt", width: 80 },
    { align: "start", isVisible: true, sortable: true, text: 'user', value: "user", width: 80 }
  ]

  const openFiltersClick = () => {
    filterDrawerIsOpen.value = true
  }

  return {
    headers,
    filterDrawerIsOpen,
    openFiltersClick: () => { filterDrawerIsOpen.value = true },
    refreshClick: () => refetch(),
    data: computed(() => data.value?.data ?? []),
    totalPages: computed(() => data.value?.totalPages ?? 1),
    currentPage: computed(() => filters.value.page),
    setPage,
    isLoading,
    error,
  }

}
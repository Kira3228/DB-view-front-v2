import { onMounted, ref } from "vue"
import { useFileManagementStore } from "./use-file-management-store"
import { Header } from "@/common-components/src/components/DataTable"

export const useFileManagementPanel = () => {
  const fileManagementStore = useFileManagementStore()

  onMounted(() => {
    fileManagementStore.loadFiles()
  })

  const filterDrawerIsOpen = ref<boolean>(false)
  
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
    openFiltersClick,
    filterDrawerIsOpen
  }
}
import { defineStore } from "pinia";
import { getFiles } from "../api/get-files";
import { ref } from "vue";
import { FilesManagementDto } from "../types/file-management.dto";
import { FileManagementTableBody } from "../types/table-body.type";

const emptyFilters: FilesManagementDto = {
  birthTime: '',
  executablePath: '',
  filesystemId: undefined,
  fileType: "",
  limit: 100,
  osUserId: "",
  page: 1,
  status: "",
  trackingStartedAt: "",
  versionNumber: undefined,
  process: ''
}

export const useFileManagementStore = defineStore(`use-file-management-store`, () => {
  const files = ref<FileManagementTableBody[]>()
  const page = ref<number>(1)
  const totalPages = ref<number>(1)
  const filters = ref<FilesManagementDto>(emptyFilters)

  const loadFiles = async () => {
    files.value = []
    try {
      const result = await getFiles(filters.value)

      files.value = result.data || []
      totalPages.value = result.totalPages
      console.log(totalPages.value);


      if (result.page !== undefined) {
        filters.value.page = result.page
      }

    } catch (e) {
      console.error(e);
      files.value = [];
    }
  }

  const setFilters = (params?: FilesManagementDto) => {
    filters.value = { ...params }
  }

  const resetFilters = () => {
    filters.value = { ...emptyFilters, limit: 100 }


  }
  return {
    files,
    page,
    totalPages,
    filters,
    loadFiles,
    setFilters,
    resetFilters
  }
})
import { defineStore } from "pinia";
import { getFiles } from '../api/get-files'
import { ref } from "vue";
import { FileReadsTableBody } from "../types/table-body.type";
import { getFilesDetails } from "../api/get-files-details";
import { MessageEventDto } from "../types/message-event.dto";

const emptyFilters: MessageEventDto = {
  birthTime: '',
  executablePath: '',
  filesystemId: undefined,
  fileType: "",
  firstAt: "",
  limit: 100,
  operationType: "",
  osUserId: "",
  page: 1,
  status: "",
  trackingStartedAt: "",
  versionNumber: undefined,
  process: ''
}

export const useFileReadsViewerStore = defineStore(`use-file-reads-viewer-store`, () => {
  const files = ref<FileReadsTableBody[]>()
  const fileDetails = ref()
  const filters = ref<MessageEventDto>(emptyFilters)
  const page = ref<number>(1)
  const totalPages = ref<number>(1)

  const loadFiles = async () => {
    files.value = []
    try {
      const result = await getFiles(filters.value);
      files.value = result.data || [];
      totalPages.value = result.totalPages || 1;
      if (result.page !== undefined) {
        filters.value.page = result.page;
      }
    } catch (e) {
      console.error(e);
      files.value = [];
    }
  }

  const loadFilesDetails = async (fileId: number, procVerId: number) => {
    const result = await getFilesDetails({ fileId: fileId, processVersionId: procVerId })
    fileDetails.value = result
  }

  const setFilters = (params?: MessageEventDto) => {
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
    fileDetails,
    loadFiles,
    setFilters,
    loadFilesDetails,
    resetFilters
  }
})
import { defineStore } from "pinia";
import { ref } from "vue";
import { FileReadsTableBody } from "../types/table-body.type";

export const useEventPanelStore = defineStore(`use-file-reads-viewer-store`, () => {
  const files = ref<FileReadsTableBody[]>()
  const fileDetails = ref()
  const page = ref<number>(1)
  const totalPages = ref<number>(1)


  const loadFilesDetails = async (fileId: number, procVerId: number) => {
    // const result = await getFilesDetails({ fileId: fileId, processVersionId: procVerId })
    // fileDetails.value = result
  }



  return {
    files,
    page,
    totalPages,
    fileDetails,
    loadFilesDetails,
  }
})
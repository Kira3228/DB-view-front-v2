import { defineStore } from "pinia";
import { getFiles } from '../api/get-files'
import { ref } from "vue";
import { FileReadsTableBody } from "../types/table-body.type";
import { getFilesDetails } from "../api/get-files-details";
export const useFileReadsViewerStore = defineStore(`use-file-reads-viewer-store`, () => {
  const files = ref<FileReadsTableBody[]>()
  const fileDetails = ref()

  const loadFiles = async () => {
    files.value = []
    const result = await getFiles()
    files.value = result
    console.log(files.value);
  }

  const loadFilesDetails = async (fileId: number, procVerId: number) => {
    const result = await getFilesDetails({ fileId: fileId, processVersionId: procVerId })
    fileDetails.value = result
    console.log(fileDetails.value);

  }

  return {
    files,
    loadFiles,
    loadFilesDetails,
    fileDetails
  }
})
import { defineStore } from "pinia";
import { getFiles } from '../api/get-files'
import { ref } from "vue";
import { FileReadsTableBody } from "../types/table-body.type";
export const useFileReadsViewerStore = defineStore(`use-file-reads-viewer-store`, () => {
  const files = ref<FileReadsTableBody[]>()
  const fileDetails = ref()

  const loadFiles = async () => {
    const result = await getFiles()
    files.value = result
    console.log(files.value);
  }

  return {
    files,
    loadFiles

  }
})
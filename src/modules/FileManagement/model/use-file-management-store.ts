import { defineStore } from "pinia";
import { getFiles } from "../api/get-files";
import { ref } from "vue";

export const useFileManagementStore = defineStore(`use-file-management-store`, () => {
  const files = ref()

  const loadFiles = async () => {
    files.value = await getFiles()
    console.log(files.value);
  }
  return {
    loadFiles,
    files
  }
})
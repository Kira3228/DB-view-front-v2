import { defineStore } from "pinia";

interface ActiveFileState {
  inode: string
}

export const useActiveFileFilterStore = defineStore(`active-file-filter-store`, {
  state: (): ActiveFileState => ({
    inode: ''
  })
})
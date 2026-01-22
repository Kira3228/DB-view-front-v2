import { Header } from "@/common-components/src/components/DataTable";
import { defineStore } from "pinia";
import { fetchActiveFile } from "../api";
import { ActiveFileParams, File } from "../types";
interface ActiveFileView {
  headers: Header[]
  presetList: string[]
  files: File[]
  totalPage: number
  totalCount: number
  page: number
  limit: number
}

export const useActiveFileViewStore = defineStore(`active-file-view-store`, {
  state: (): ActiveFileView => ({ headers: [], files: [], page: 1, limit: 15, presetList: [], totalCount: 1, totalPage: 1 }),
  actions: {
    async loadActiveFile(params: Partial<ActiveFileParams>) {
      const response = await fetchActiveFile(params)
      this.headers = response.headers
      this.files = response.files
    }
  },
  getters: {
    getHeaders(state: ActiveFileView) {
      const headers: Header[] = [...state.headers, {
        text: "Изменить статус",
        value: "changeStatus",
        sortable: true,
        isVisible: true,
        width: 80,
        align: `auto`
      }]
      return headers
    }
  }
})
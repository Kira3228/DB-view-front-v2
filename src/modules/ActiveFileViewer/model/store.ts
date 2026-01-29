import { Header } from "@/common-components/src/components/DataTable";
import { defineStore } from "pinia";
import { fetchActiveFile } from "../api";
import { ActiveFileParams, File } from "../types";
import { fetchPreset } from "../api/fetch-preset";
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
      console.log(this.headers);

      this.files = response.files
    },
    async presetLoad() {
      const presetList = await fetchPreset()
      this.presetList = presetList
    },
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
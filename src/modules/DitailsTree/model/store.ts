import { defineStore } from "pinia";
import { fetchRoots } from "../api/fetch-roots";
import { FileDetail, FileDetailParams, TreeNode } from "../types";
interface DetailsTreeState {
  files: FileDetail[]
  treeData: TreeNode[]
}

export const useDetailsTreeStore = defineStore(`details-tree-store`, {
  state: (): DetailsTreeState => ({ files: [], treeData: [] }),
  actions: {
    async loadRoots(params?: FileDetailParams) {
      const response = await fetchRoots(params)
      this.treeData = response.roots.map(f => ({
        id: f.id,
        name: f.name,
        hasChildren: f.hasChildren,
        children: f.hasChildren ? [] : undefined
      }))
    }
  },
  getters: {
    formatNodes(state: DetailsTreeState) {
      return state.files.map((f) => ({
        id: f.id,
        name: f.name,
        children: f.hasChildren ? [] : undefined,
      }));
    }
  }
})
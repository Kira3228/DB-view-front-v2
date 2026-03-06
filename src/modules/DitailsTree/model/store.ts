import { defineStore } from "pinia";
import { fetchRoots } from "../api/fetch-roots";
import { FileDetail, FileDetailParams, TreeNode } from "../types";
import { mapToNode } from "../helpers";
interface DetailsTreeState {
  files: FileDetail[]
  treeData: TreeNode[]
}

export const useDetailsTreeStore = defineStore(`details-tree-store`, {
  state: (): DetailsTreeState => ({ files: [], treeData: [] }),
  actions: {
    async loadRoots(params?: FileDetailParams) {
      const response = await fetchRoots(params)
      this.treeData = response.roots.map(f => mapToNode(f, `root`))
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
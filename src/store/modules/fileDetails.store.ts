import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { FileDetailsState, FileHierarchyMap, RootState } from "../types/DataTableItemsStore";

const state: FileDetailsState = {
  error: null,
  fileHierarchy: null,
  loading: false,
  filePath: '',
  inode: ''
}

const getters: GetterTree<FileDetailsState, RootState> = {
  getFileHierarchyObj: (state: FileDetailsState) => {
    if (!state.fileHierarchy) return []

    return Object.entries(state.fileHierarchy).map(([key, hierarchy]) => ({
      id: `parent-${hierarchy.parentFile.id}`,
      name: hierarchy.parentFile.fileName,
      path: hierarchy.parentFile.filePath,
      size: hierarchy.parentFile.fileSize,
      status: hierarchy.parentFile.status,
      fileData: hierarchy.parentFile,
      children: hierarchy.children.map(child => ({
        id: `child-${child.childFile.id}`,
        name: child.childFile.fileName,
        path: child.childFile.filePath,
        size: child.childFile.fileSize,
        status: child.childFile.status,
        relationshipType: child.relationshipType,
        fileData: child.childFile,
      }))
    }))
  }

}

const mutations: MutationTree<FileDetailsState> = {
  SET_FILE_HIERARCHY(state: FileDetailsState, newFileDetails) {
    state.fileHierarchy = newFileDetails
  },
  SET_FILEPATH(state: FileDetailsState, newValue) {
    state.filePath = newValue
  },
  SET_INODE(state: FileDetailsState, newValue) {
    state.inode = newValue
  }
}

const actions: ActionTree<FileDetailsState, RootState> = {
  async loadItems({ commit, state }) {
    try {
      const params = new URLSearchParams()
      params.set(`filePath`, state.filePath)
      params.set(`inode`, state.inode)
      const response = await fetch(`http://localhost:3000/api/active/get/graph/?${params}`)
      if (!response.ok) {
        throw new Error
      }
      const data: FileHierarchyMap = await response.json()
      console.log(data);

      commit(`SET_FILE_HIERARCHY`, data)
    }
    catch (error) {
      console.error(error);
    }

  },
}


const fileDetailsModule: Module<FileDetailsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default fileDetailsModule
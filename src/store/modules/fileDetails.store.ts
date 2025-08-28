import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { FileDetailsState, FileHierarchyMap, RootState } from "../types/DataTableItemsStore";
import { TFlattenGraph } from "@/widgets/FileDetails/file-details.type";
import { graphToTreeItems, TGraph } from "@/shared/utils/map-file-to-tree";

const state: FileDetailsState = {
  error: null,
  fileHierarchy: { edges: [], nodes: [], roots: [] },
  loading: false,
  filePath: '',
  inode: ''
}

const getters: GetterTree<FileDetailsState, RootState> = {
  getFileHierarchyObj: (state) => {
    console.log(`стейт в геттере`, state.fileHierarchy);

    const tree = graphToTreeItems(state.fileHierarchy)
    return tree
  }
}


const mutations: MutationTree<FileDetailsState> = {
  SET_FILE_HIERARCHY(state: FileDetailsState, graph: TGraph) {
    console.log(`в мутации`, graph);
    state.fileHierarchy = { ...graph }
    console.log(`cам стейт`, state.fileHierarchy);


  },
  SET_FILEPATH(state: FileDetailsState, newValue) {
    state.filePath = newValue
  },
  SET_INODE(state: FileDetailsState, newValue) {
    state.inode = newValue
  }
}

const actions: ActionTree<FileDetailsState, RootState> = {
  async loadItems({ commit, state, getters }) {
    try {
      const query: { filePath?: string; inode?: number } = {}
      if (state.filePath && state.filePath.trim() === ``) {
        query.filePath = state.filePath.trim()
      }
      if (typeof state.inode === `number` && Number.isFinite(state.inode)) {
        query.inode = state.inode
      }

      const params = new URLSearchParams()
      params.set(`filePath`, state.filePath)
      params.set(`inode`, state.inode)
      const response = await fetch(`http://localhost:3000/api/files/graph/?${params}`)
      if (!response.ok) {
        throw new Error
      }
      const data: TFlattenGraph = await response.json()
      console.log(`после fetch`, data);

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
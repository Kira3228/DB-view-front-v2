import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TFlattenGraph } from "@/widgets/FileDetails/file-details.type";
import { graphToTreeItems, TGraph } from "@/shared/utils/map-file-to-tree";
import { RootState } from "../types/IRootState";
import { FileDetailsState } from "../types/IFile";

const state: FileDetailsState = {
  error: null,
  fileHierarchy: { edges: [], nodes: [], roots: [] },
  loading: false,
  filePath: '',
  inode: ''
}

const getters: GetterTree<FileDetailsState, RootState> = {
  getFileHierarchyObj: (state) => {
    const tree = graphToTreeItems(state.fileHierarchy)
    return tree
  }
}


const mutations: MutationTree<FileDetailsState> = {
  SET_FILE_HIERARCHY(state: FileDetailsState, graph: TGraph) {
    state.fileHierarchy = { ...graph }
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
      const details = await fetchDetails({state.filePath, state.inode})

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
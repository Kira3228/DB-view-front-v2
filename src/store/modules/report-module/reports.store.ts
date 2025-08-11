import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ReportFields, ReportFilters, RootState, SelectedReportFields } from "../../types/DataTableItemsStore";
import { downloadBlob } from "@/shared/utils/downloadHelper";
import { toSearchString } from "./toSearchString";

const state: ReportFilters = {
  date: [],
  depht: [],
  selectedFields: {
    eventData: false,
    eventType: false,
    id: false,
    severity: false,
    source: false,
    timestamp: false,
    relatedFileId: {
      id: false,
      createdAt: false,
      extendedAttributes: false,
      fileName: false,
      filePath: false,
      fileSize: false,
      fileSystemId: false,
      inode: false,
      isOriginalMarked: false,
      maxChainDepth: false,
      minChainDepth: false,
      modifiedAt: false,
      status: false
    },
    relatedProcessId: {
      commandLine: false,
      createdAt: false,
      executablePath: false,
      groupId: false,
      id: false,
      parentPid: false,
      pid: false,
      processStartTime: false
    }
  },
  reportFormat: '',
  reportType: '',
  reportFields: []
}

const getters: GetterTree<ReportFilters, RootState> = {
  reportObject: (state: ReportFilters) => {
    const result: any = {};

    Object.keys(state.selectedFields).forEach(key => {
      if (key === 'relatedProcessId' || key === 'relatedFileId') {
        const nestedObj = state.selectedFields[key as keyof typeof state.selectedFields];
        if (typeof nestedObj === 'object' && nestedObj !== null) {
          result[key] = {};
          Object.keys(nestedObj).forEach(nestedKey => {
            if ((nestedObj as any)[nestedKey] === true) {
              result[key][nestedKey] = true;
            }
          });
        }
      } else {
        if (state.selectedFields[key as keyof typeof state.selectedFields] === true) {
          result[key] = true;
        }
      }
    });

    return result;
  }
}

const mutations: MutationTree<ReportFilters> = {
  SET_SELECTED_FIELDS(state: ReportFilters, newFields: SelectedReportFields) {
    state.selectedFields = { ...newFields };
  },

  SET_REPORT_FIELDS(state: ReportFilters, newFields: ReportFields[]) {
    state.reportFields = [...newFields];
  },

  SET_DEPTH(state: ReportFilters, newValues: number[]) {
    state.depht = [...newValues];
  },
  SET_DATE(state: ReportFilters, newValues: number[]) {
    state.date = [...newValues];
  },
  SET_FORMAT(state: ReportFilters, newValue: string) {
    state.reportFormat = newValue;
  },
  SET_TYPE(state: ReportFilters, newValue: string) {
    state.reportType = newValue;
  }
}

const actions: ActionTree<ReportFilters, RootState> = {
  async downloadReport({ state }) {
    try {
      const params = toSearchString(state.selectedFields)
      const url = `http://localhost:3000/api/reports/${state.reportFormat}%${params}`
      const response = await fetch(`/?${params}`)
      if (!response.ok) {
        throw new Error
      }


      const blob = await response.blob()
      const filename = `report.${state.reportFormat}`
      // downloadBlob(blob, { filename })
      console.log(url);

    }
    catch (e) {
      console.error(e);
    }
  }
}

const reportModule: Module<ReportFilters, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions

}

export default reportModule
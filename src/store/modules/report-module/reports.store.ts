import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ReportFields, ReportFilters, RootState, SelectedReportFields } from "../../types/DataTableItemsStore";
import { downloadBlob } from "@/shared/utils/downloadHelper";
import { toSearchString } from "./toSearchString";
import { TOption } from "@/shared/UI/SelectInput/TOptions";

const state: ReportFilters = {
  date: ['', ''],
  depht: [1, 2],
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
  reportFormat: { label: '', value: '' },
  reportType: { label: '', value: '' },
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
  },
  startDate: (state: ReportFilters) => {
    if (state.date) {
      if (state.date[0]) {
        return String(new Date(state.date[0]).getTime())
      }
    }
    return ''
  },
  endDate: (state: ReportFilters) => {
    if (state.date) {
      if (state.date[1]) {
        return String(new Date(state.date[1]).getTime())
      }
    }

    return ''
  },
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
    console.log(newValues);

  },
  SET_DATE(state: ReportFilters, newValues: string[] | null) {
    console.log(newValues);
    state.date = newValues;
  },
  SET_FORMAT(state: ReportFilters, newValue: TOption) {
    console.log(newValue);

    state.reportFormat = newValue;
  },
  SET_TYPE(state: ReportFilters, newValue: TOption) {
    state.reportType = newValue;
    console.log(newValue);

  }
}

const actions: ActionTree<ReportFilters, RootState> = {
  async downloadReport({ state, getters }) {
    try {
      const params = toSearchString(state.selectedFields)
      let url = '';
      if (state.reportType === `event`) {
        url = `http://localhost:3000/api/reports/${state.reportType}/${state.reportFormat}/?${params}&startDate=${getters.startDate}&endDate=${getters.endDate}`
      }
      else {
        url = `http://localhost:3000/api/reports/${state.reportType}/${state.reportFormat}/?minDepth=${state.depht[0]}&maxDepth=${state.depht[1]}&startDate=${getters.startDate}&endDate=${getters.endDate}`
      }

      if (state.date) {
        console.log(
          getters.startDate,
          getters.endDate
        );

      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error
      }

      const blob = await response.blob()
      const filename = `report.${state.reportFormat}`
      downloadBlob(blob, { filename })

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
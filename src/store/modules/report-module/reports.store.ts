import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { downloadBlob } from "@/shared/utils/downloadHelper";
import { toSearchStringAsObject } from "./toSearchString";
import { toSqlDateTimeOrEmpty } from "@/shared/utils/date";
import { RootState } from "@/store/types/IRootState";
import { ReportFields, ReportFilters, SelectedReportFields } from "@/store/types/IReportFilters";
import { downloadReport } from "@/shared/api/reports";

const state: ReportFilters = {
  date: [],
  depth: [1, 2],
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
  reportFormat: "",
  reportType: "",
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
    return toSqlDateTimeOrEmpty(state.date?.[0])
  },
  endDate: (state: ReportFilters) => {
    return toSqlDateTimeOrEmpty(state.date?.[1])
  },

  reportTypeValue: (state: ReportFilters): string => {
    return state.reportType || ""
  },
  reportFormatValue: (state: ReportFilters): string => {
    return state.reportFormat || ""
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
    state.depth = [...newValues];
  },

  SET_DATE(state: ReportFilters, newValues: string[] | null) {
    state.date = newValues;
  },

  SET_FORMAT(state: ReportFilters, newValue: string) {
    console.log(newValue);

    state.reportFormat = newValue;
  },

  SET_TYPE(state: ReportFilters, newValue: string) {

    state.reportType = newValue;
  }
}

const actions: ActionTree<ReportFilters, RootState> = {
  async downloadReport({ state, getters }) {
    try {
      const reportType = state.reportType;
      const reportFormat = state.reportFormat;
      console.log({ reportType, reportFormat });

      if (![`pdf`, `docx`, `xlsx`].includes(reportFormat)) {
        throw new Error("Не выбран формат");
      }
      if (![`events`, `chains`].includes(reportType)) {
        throw new Error("Не выбран тип документа");
      }

      const params: Record<string, any> = {};

      if (getters.startDate) {
        params.startDate = getters.startDate;
      }
      if (getters.endDate) {
        params.endDate = getters.endDate;
      }

      if (reportType === `events`) {
        const searchFields = toSearchStringAsObject(state.selectedFields);
        Object.assign(params, searchFields);
      } else {
        params.minDepth = state.depth[0];
        params.maxDepth = state.depth[1];
      }

      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === null) {
          delete params[key];
        }
      });

      const blob = await downloadReport(params, reportType, reportFormat)
      await downloadBlob(blob, { filename: `report.${reportFormat}` })

    } catch (error) {
      console.error('Download error:', error);
      alert(error);
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
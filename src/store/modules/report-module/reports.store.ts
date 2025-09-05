import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { downloadBlob } from "@/shared/utils/downloadHelper";
import { toSearchString } from "./toSearchString";
import { TOption } from "@/shared/UI/SelectInput/TOptions";
import { toSqlDateTimeOrEmpty } from "@/shared/utils/date";
import { buildURL } from "@/shared/api/http";
import { RootState } from "@/store/types/IRootState";
import { ReportFields, ReportFilters, SelectedReportFields } from "@/store/types/IReportFilters";

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
    return toSqlDateTimeOrEmpty(state.date?.[0])
  },
  endDate: (state: ReportFilters) => {
    return toSqlDateTimeOrEmpty(state.date?.[1])
  },

  reprtTypeValue: (state: ReportFilters): string => {
    return state.reportType?.value || ""
  },
  reortFormatValue: (state: ReportFilters): string => {
    return state.reportFormat?.value || ""
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

  SET_FORMAT(state: ReportFilters, newValue: TOption) {
    state.reportFormat = newValue;
  },

  SET_TYPE(state: ReportFilters, newValue: TOption) {
    state.reportType = newValue;
  }
}

const actions: ActionTree<ReportFilters, RootState> = {
  async downloadReport({ state, getters }) {
    try {
      const reportType = getters.reprtTypeValue
      const reportFormat = getters.reortFormatValue

      if (![`pdf`, `docx`, `xlsx`].includes(reportFormat)) {
        throw new Error("Не выбран формат");
      }
      if (![`events`, `chains`].includes(reportType)) {
        throw new Error("Не выбран тип документа");
      }
      const params: Record<string, any> = {
        startDate: getters.startDate || undefined,
        endDate: getters.endDate || undefined
      }

      if (reportType === `events`) {
        Object.assign(params, toSearchString(state.selectedFields))
      }
      else {
        params.minDepth = state.depth[0]
        params.maxDepth = state.depth[1]
      }

      const url = `http://localhost:3000/api/reports/${reportType}.${reportFormat}`;
      const fullUrl = buildURL(url, params)
      const response = await fetch(fullUrl)

      if (!response.ok) {
        throw new Error(`Ошибка загрузки отчета`)
      }
      const blob = await response.blob()

      downloadBlob(blob, { filename: `report.${reportFormat}` })
    }
    catch (e) {
      alert(e)
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
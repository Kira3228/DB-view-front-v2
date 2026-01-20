import { defineStore } from "pinia";

interface IExportLogsState {

}
export const useExportLogsStore = defineStore(`export-logs-store`, {
  actions: {
    // async downloadSelectedLogReport({ commit, state }) {
    //   const selectedIds = state.selectedItems.map(item => item.id);
    //   if (selectedIds.length === 0) {
    //     throw new Error
    //   }
    //   try {
    //     const blob = await downloadSelectedLogsCsv(selectedIds)
    //     downloadBlob(blob, { filename: `report.csv` })
    //     return { succes: true, filename: `report.csv` }
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    // },

    // async downloadAllLogReport() {
    //   try {
    //     const blob = await downloadAllLogsCsv()
    //     downloadBlob(blob, { filename: `report.csv` })
    //     return { success: true, filename: `report.csv` };
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    // },
  }
})
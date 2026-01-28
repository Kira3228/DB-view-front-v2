import { useApi } from "@/shared/api/http"
import { ReportParams } from "../types"

export const fetchReport = async (params?: ReportParams) => {
  const { httpPostBlob, downloadBlob } = useApi()
  switch (params?.format) {
    case `pdf`: {
      const blob = await httpPostBlob(`/api/reports/events`, params)
      downloadBlob(blob, { filename: `report.pdf` })
      break;
    }
    case `docx`: {
      const blob = await httpPostBlob(`/api/reports/events`, params)
      downloadBlob(blob, { filename: `report.docx` })
      break;
    }
    case `xlsx`: {
      const blob = await httpPostBlob(`/api/reports/events`, params)
      downloadBlob(blob, { filename: `report.xlsx` })
      break;
    }
  }
}
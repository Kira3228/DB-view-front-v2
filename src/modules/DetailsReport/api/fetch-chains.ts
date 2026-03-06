import { useApi } from "@/shared/api/http"
import { ChainReport } from "../types"

export const fetchReport = async (params?: ChainReport) => {
  const { downloadBlob, httpGetBlob } = useApi()
  switch (params?.format) {
    case `pdf`: {
      const blob = await httpGetBlob(`/api/reports/chains.pdf`, params)
      downloadBlob(blob, { filename: `report.pdf` })
      break;
    }
    case `docx`: {
      const blob = await httpGetBlob(`/api/reports/chains.docx`, params)
      downloadBlob(blob, { filename: `report.docx` })
      break;
    }
    case `xlsx`: {
      const blob = await httpGetBlob(`/api/reports/chains.xlsx`, params)
      downloadBlob(blob, { filename: `report.xlsx` })
      break;
    }
  }
}
import { storeToRefs } from 'pinia'
import { useDetailsReportStore } from './store'

export const useDetailsReportModel = () => {
  const { endDate, modalIsOpen, startDate, format } = storeToRefs(useDetailsReportStore())
  const { getReport } = useDetailsReportStore()

  return {
    endDate, modalIsOpen, startDate, getReport, format
  }
}
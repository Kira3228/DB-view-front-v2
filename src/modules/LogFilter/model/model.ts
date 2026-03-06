import { storeToRefs } from "pinia"
import { useLogFilterStore } from "./store"

export const useLogFilterModel = () => {
  const { loadStatusTypes, } = useLogFilterStore()
  const { status, systemId, filePath, eventType, type, endDate, startDate } = storeToRefs(useLogFilterStore())
  const resetFilters = () => {
    filePath.value = undefined
    status.value = undefined
    systemId.value = undefined
    type.value = undefined
    endDate.value = undefined
    startDate.value = undefined
  }
  return {
    loadStatusTypes,
    resetFilters,
    status,
    systemId,
    filePath,
    eventType,
    type,
    endDate,
    startDate
  }

}
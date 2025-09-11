import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems"
import { DataTable } from "./DataTableItemsStore"

export interface EventLogDataTableState extends DataTable {
  selectedItems: TDataTableItems[]
  filepath: string
  systemId: string
  typeOfEvent: string
  status: string
  dateRange: string[]
  default_filters: {
    sortBy?: string[]
    sortDesc?: boolean[]
  }
}


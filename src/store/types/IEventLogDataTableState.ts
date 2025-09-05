import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems"
import { ExtendedHeaderColumn } from "./THeaders"
import { DataTable } from "./DataTableItemsStore"

export interface EventLogDataTableState extends DataTable {
  selectedItems: TDataTableItems[]
  filepath: string
  systemId: string
  typeOfEvent: string
  status: string
  dateRange: string[]
  headers: ExtendedHeaderColumn[]
  preset: string
  presetList: string[]
  exceptions: TExceptions[]
  default_filters: Record<string, any>
}

type TExceptions = {
  field: string,
  values: string[]
}
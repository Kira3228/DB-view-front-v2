import { DataTable } from "./DataTableItemsStore"
import { IDefaultFilters } from "./IDefaultFilters"

export interface ActiveFileDataTableState extends DataTable {
  filepath: string
  inode: number | string
  status: string
  isArchived: boolean
  default_filters: IDefaultFilters
  isSuccessUpdateStatus: boolean
  isStatusPending: boolean | null
}
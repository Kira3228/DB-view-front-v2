import { DataTable } from "./DataTableItemsStore"

export interface ActiveFileDataTableState extends DataTable {
  filepath: string
  inode: number | string
  status: string
  isArchived: boolean
}
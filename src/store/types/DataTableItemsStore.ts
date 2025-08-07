import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
interface DataTable {
    items: TDataTableItems[]
    loading: boolean
    page: number
    totalPages: number
}
export interface EventLogDataTableState extends DataTable {
    selectedItems: TDataTableItems[]
    filepath: string
    systemId: string
    typeOfEvent: string
    status: string
    dateRange: string[] | null
}

export interface ActiveFileDataTableState extends DataTable {
    filepath: string
    inode: number
    status: string
}
export interface RootState {
    eventLogDataTable: EventLogDataTableState
    activeFileDataTable: ActiveFileDataTableState
}
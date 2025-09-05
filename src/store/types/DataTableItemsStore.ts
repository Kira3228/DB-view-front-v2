import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems"

export interface DataTable {
    items: TDataTableItems[]
    loading: boolean
    page: number
    totalPages: number
}

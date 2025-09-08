import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems"
import { ExtendedHeaderColumn } from "./THeaders"

export interface DataTable {
    items: TDataTableItems[]
    loading: boolean
    page: number
    totalPages: number
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
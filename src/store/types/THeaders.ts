import { DataTableHeader } from "vuetify"

export type THeaderColumn = {
  headers: ExtendedHeaderColumn[]
  sortByFields: string[]
  sortDescFields: boolean[],
}
type WithIsVisble = {
  isVisible: boolean
}

export type ExtendedHeaderColumn = DataTableHeader & WithIsVisble


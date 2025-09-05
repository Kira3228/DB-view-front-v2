import { ActiveFileDataTableState } from "./IActiveFileDataTableState"
import { EventLogDataTableState } from "./IEventLogDataTableState"
import { FileDetailsState } from "./IFile"
import { ReportFilters } from "./IReportFilters"

export interface RootState {
  eventLogDataTable: EventLogDataTableState
  activeFileDataTable: ActiveFileDataTableState
  fileDetailsGraph: FileDetailsState
  reportModule: ReportFilters
}
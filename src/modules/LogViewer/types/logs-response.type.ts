import { Header } from "@/common-components/src/components/DataTable"
import { EventLog } from "./event-log.type"

export type LogsResponse = {
  headers: Header[],
  events: EventLog[]
  totalCount: number
  totalPage: number
}
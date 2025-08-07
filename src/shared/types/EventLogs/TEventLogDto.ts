import TEventLogData from "./TEvent";

type TEventLogsDto = {
    events: TEventLogData[],
    totalCount: number,
    page: number,
    totalPages: number,
    limit: number
}

export type { TEventLogsDto as default }

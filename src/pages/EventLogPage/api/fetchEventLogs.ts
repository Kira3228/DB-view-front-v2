import { TEventLogsDto } from "@/shared/types/EventLogs";

const fetchEventLogs = async (): Promise<TEventLogsDto> => {
    const response = await fetch(`http://localhost:3000/api/logs/filtered`)
    if (!response.ok) {
        throw new Error
    }
    const result: TEventLogsDto = await response.json()
    return result
}

export default fetchEventLogs
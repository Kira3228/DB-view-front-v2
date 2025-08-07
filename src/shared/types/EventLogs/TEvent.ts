type TEventLogData = {
    id: number,
    eventType: string,
    eventData: string,
    source: string,
    timestamp: string,
    relatedFileId: TRelatedFileId,
    relatedProcessId: TRelatedProcessId
}

type TRelatedFileId = {
    id: number,
    fileSystemId: string,
    filePath: string,
    fileName: string,
    status: string
}
type TRelatedProcessId = {
    id: number,
    pid: number,
    executablePath: string
}

export type { TEventLogData as default }
export type { TRelatedFileId, TRelatedProcessId };

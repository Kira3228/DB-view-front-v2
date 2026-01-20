export type EventLog = {
  id: number,
  eventType: string,
  eventData: string,
  source: string,
  timestamp: string,
  relatedFileId: TRelatedFileId,
  relatedProcessId: TRelatedProcessId
}

export type TRelatedFileId = {
  id: number,
  fileSystemId: string,
  filePath: string,
  fileName: string,
  status: string
}

export type TRelatedProcessId = {
  id: number,
  pid: number,
  executablePath: string
}
export type LogsParams = {
  page: number;
  filePath: string;
  fileSystemId: string;
  status: string;
  eventType: string;
  startDate: string;
  endDate: string;
  filePathException: string;
  processPathException: string;
  presetName: string
  limit: number
}
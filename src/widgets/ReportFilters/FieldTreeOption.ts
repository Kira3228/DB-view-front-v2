export const FieldTreeOptions = [
  { label: 'ID', key: 'id', id: 1 },
  { label: 'Event Type', key: 'eventType', id: 2 },
  { label: 'Event Data', key: 'eventData', id: 3 },
  { label: 'Severity', key: 'severity', id: 4 },
  { label: 'Source', key: 'source', id: 5 },
  { label: 'Timestamp', key: 'timestamp', id: 6 },
  {
    label: 'Related Process',
    key: 'relatedProcessId',
    id: 7,
    children: [
      { label: 'ID', key: 'relatedProcessId.id', id: 8 },
      { label: 'PID', key: 'relatedProcessId.pid', id: 9 },
      { label: 'Executable Path', key: 'relatedProcessId.executablePath', id: 10 },
      { label: 'Command Line', key: 'relatedProcessId.commandLine', id: 11 },
      { label: 'Parent PID', key: 'relatedProcessId.parentPid', id: 12 },
      { label: 'Group ID', key: 'relatedProcessId.groupId', id: 13 },
      { label: 'Created At', key: 'relatedProcessId.createdAt', id: 14 },
      { label: 'Process Start Time', key: 'relatedProcessId.processStartTime', id: 15 },
    ]
  },
  {
    label: 'Related File',
    key: 'relatedFileId',
    id: 16,
    children: [
      { label: 'ID', key: 'relatedFileId.id', id: 17 },
      { label: 'File System ID', key: 'relatedFileId.fileSystemId', id: 18 },
      { label: 'Inode', key: 'relatedFileId.inode', id: 19 },
      { label: 'File Path', key: 'relatedFileId.filePath', id: 20 },
      { label: 'File Name', key: 'relatedFileId.fileName', id: 21 },
      { label: 'File Size', key: 'relatedFileId.fileSize', id: 22 },
      { label: 'Created At', key: 'relatedFileId.createdAt', id: 23 },
      { label: 'Modified At', key: 'relatedFileId.modifiedAt', id: 24 },
      { label: 'Is Original Marked', key: 'relatedFileId.isOriginalMarked', id: 25 },
      { label: 'Max Chain Depth', key: 'relatedFileId.maxChainDepth', id: 26 },
      { label: 'Min Chain Depth', key: 'relatedFileId.minChainDepth', id: 27 },
      { label: 'Status', key: 'relatedFileId.status', id: 28 },
      { label: 'Extended Attributes', key: 'relatedFileId.extendedAttributes', id: 29 },
    ]
  }
]
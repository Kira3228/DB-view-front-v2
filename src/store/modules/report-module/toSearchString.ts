import { SelectedReportFields } from "@/store/types/DataTableItemsStore"

export const toSearchString = (fields: SelectedReportFields) => {
  const params = new URLSearchParams()

  if (fields.id) params.set('id', String(fields.id))
  if (fields.eventType) params.set('eventType', String(fields.eventType))
  if (fields.eventData) params.set('eventData', String(fields.eventData))
  if (fields.severity) params.set('severity', String(fields.severity))
  if (fields.source) params.set('source', String(fields.source))
  if (fields.timestamp) params.set('timestamp', String(fields.timestamp))

  if (fields.relatedFileId) {
    const rf = fields.relatedFileId
    if (rf.id) params.set('relatedFileId[id]', String(rf.id))
    if (rf.fileSystemId) params.set('relatedFileId[fileSystemId]', String(rf.fileSystemId))
    if (rf.inode) params.set('relatedFileId[inode]', String(rf.inode))
    if (rf.filePath) params.set('relatedFileId[filePath]', String(rf.filePath))
    if (rf.fileName) params.set('relatedFileId[fileName]', String(rf.fileName))
    if (rf.fileSize) params.set('relatedFileId[fileSize]', String(rf.fileSize))
    if (rf.createdAt) params.set('relatedFileId[createdAt]', String(rf.createdAt))
    if (rf.modifiedAt) params.set('relatedFileId[modifiedAt]', String(rf.modifiedAt))
    if (rf.isOriginalMarked) params.set('relatedFileId[isOriginalMarked]', String(rf.isOriginalMarked))
    if (rf.maxChainDepth) params.set('relatedFileId[maxChainDepth]', String(rf.maxChainDepth))
    if (rf.minChainDepth) params.set('relatedFileId[minChainDepth]', String(rf.minChainDepth))
    if (rf.status) params.set('relatedFileId[status]', String(rf.status))
    if (rf.extendedAttributes) params.set('relatedFileId[extendedAttributes]', String(rf.extendedAttributes))
  }

  if (fields.relatedProcessId) {
    const rp = fields.relatedProcessId
    if (rp.id) params.set('relatedProcessId[id]', String(rp.id))
    if (rp.pid) params.set('relatedProcessId[pid]', String(rp.pid))
    if (rp.executablePath) params.set('relatedProcessId[executablePath]', String(rp.executablePath))
    if (rp.commandLine) params.set('relatedProcessId[commandLine]', String(rp.commandLine))
    if (rp.parentPid) params.set('relatedProcessId[parentPid]', String(rp.parentPid))
    if (rp.groupId) params.set('relatedProcessId[groupId]', String(rp.groupId))
    if (rp.createdAt) params.set('relatedProcessId[createdAt]', String(rp.createdAt))
    if (rp.processStartTime) params.set('relatedProcessId[processStartTime]', String(rp.processStartTime))
  }

  return params.toString()
}
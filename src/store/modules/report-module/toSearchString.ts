import { SelectedReportFields } from "@/store/types/IReportFilters";

export const toSearchStringAsObject = (fields: SelectedReportFields): Record<string, any> => {
  const result: Record<string, any> = {};

  if (fields.id) result['id'] = String(fields.id);
  if (fields.eventType) result['eventType'] = String(fields.eventType);
  if (fields.eventData) result['eventData'] = String(fields.eventData);
  if (fields.severity) result['severity'] = String(fields.severity);
  if (fields.source) result['source'] = String(fields.source);
  if (fields.timestamp) result['timestamp'] = String(fields.timestamp);

  if (fields.relatedFileId) {
    const rf = fields.relatedFileId;
    if (rf.id) result['relatedFileId[id]'] = String(rf.id);
    if (rf.fileSystemId) result['relatedFileId[fileSystemId]'] = String(rf.fileSystemId);
    if (rf.inode) result['relatedFileId[inode]'] = String(rf.inode);
    if (rf.filePath) result['relatedFileId[filePath]'] = String(rf.filePath);
    if (rf.fileName) result['relatedFileId[fileName]'] = String(rf.fileName);
    if (rf.fileSize) result['relatedFileId[fileSize]'] = String(rf.fileSize);
    if (rf.createdAt) result['relatedFileId[createdAt]'] = String(rf.createdAt);
    if (rf.modifiedAt) result['relatedFileId[modifiedAt]'] = String(rf.modifiedAt);
    if (rf.isOriginalMarked) result['relatedFileId[isOriginalMarked]'] = String(rf.isOriginalMarked);
    if (rf.maxChainDepth) result['relatedFileId[maxChainDepth]'] = String(rf.maxChainDepth);
    if (rf.minChainDepth) result['relatedFileId[minChainDepth]'] = String(rf.minChainDepth);
    if (rf.status) result['relatedFileId[status]'] = String(rf.status);
    if (rf.extendedAttributes) result['relatedFileId[extendedAttributes]'] = String(rf.extendedAttributes);
  }

  if (fields.relatedProcessId) {
    const rp = fields.relatedProcessId;
    if (rp.id) result['relatedProcessId[id]'] = String(rp.id);
    if (rp.pid) result['relatedProcessId[pid]'] = String(rp.pid);
    if (rp.executablePath) result['relatedProcessId[executablePath]'] = String(rp.executablePath);
    if (rp.commandLine) result['relatedProcessId[commandLine]'] = String(rp.commandLine);
    if (rp.parentPid) result['relatedProcessId[parentPid]'] = String(rp.parentPid);
    if (rp.groupId) result['relatedProcessId[groupId]'] = String(rp.groupId);
    if (rp.createdAt) result['relatedProcessId[createdAt]'] = String(rp.createdAt);
    if (rp.processStartTime) result['relatedProcessId[processStartTime]'] = String(rp.processStartTime);
  }

  return result;
};
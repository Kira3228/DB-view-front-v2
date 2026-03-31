export interface FilesManagementDto {
  status?: string
  filesystemId?: string
  trackingStartedAt?: string
  birthTime?: string
  fileType?: string
  versionNumber?: number
  osUserId?: string
  executablePath?: string
  limit?: number
  page?: number
  process?: string
  searchTerm?: string
}
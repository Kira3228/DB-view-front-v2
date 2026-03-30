export interface FileManagementTableBody {
  id: number;
  path: string;
  filesystem: string;
  status: string;
  trackingStartedAt: Date;
  birthTime: Date;
  size: number;
  originProcess: string;
  user: string;
  inode: string;
}
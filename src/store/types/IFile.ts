import { TGraph } from "@/shared/utils/map-file-to-tree";

export interface File {
  id: number;
  fileSystemId: string;
  inode: number;
  filePath: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  modifiedAt: string;
  isOriginalMarked: boolean;
  maxChainDepth: number;
  minChainDepth: number;
  status: FileStatus;
  extendedAttributes: string;
}

type FileStatus = 'active' | 'archived' | 'deleted';

export interface FileRelationship {
  relationshipType: string;
  childFile: File;
  createdAt: string;
}
export interface FileHierarchy {
  parentFile: File;
  children: FileRelationship[];
}

export interface FileHierarchyMap {
  [key: string]: FileHierarchy;
}

export interface TreeItem {
  id: string | number;
  name: string;
  children?: TreeItem[];
  fileData?: File;
  relationshipType?: string;
  isLeaf?: boolean;
}
export interface FileDetailsState {
  fileHierarchy: TGraph;
  loading: boolean;
  error: string | null;
  filePath: string,
  inode: string
}
import TActiveFile from "@/shared/types/ActiveFiles/TActiveFile";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import { TOption } from "@/shared/UI/SelectInput/TOptions";
interface DataTable {
    items: TDataTableItems[]
    loading: boolean
    page: number
    totalPages: number
}
export interface EventLogDataTableState extends DataTable {
    selectedItems: TDataTableItems[]
    filepath: string
    systemId: string
    typeOfEvent: string
    status: string
    dateRange: string[] 
}

export interface ActiveFileDataTableState extends DataTable {
    filepath: string
    inode: number | string
    status: string
    isArchived: boolean
}

export type FileStatus = 'active' | 'archived' | 'deleted';
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
    fileHierarchy: FileHierarchyMap | null;
    loading: boolean;
    error: string | null;
    filePath: string,
    inode: string
}

export interface ReportFilters {
    date: string[] | null
    depth: number[]
    reportType: TOption
    reportFormat: TOption
    selectedFields: SelectedReportFields
    reportFields: ReportFields[]
}

export interface SelectedReportFields {
    id: boolean;
    eventType: boolean;
    eventData: boolean;
    severity: boolean;
    source: boolean;
    timestamp: boolean;
    relatedFileId: MonitoredFile;
    relatedProcessId: Process;
}

type Process = {
    id: boolean;
    pid: boolean;
    executablePath: boolean;
    commandLine: boolean;
    parentPid: boolean;
    groupId: boolean;
    createdAt: boolean;
    processStartTime: boolean;
};

type MonitoredFile = {
    id: boolean;
    fileSystemId: boolean;
    inode: boolean;
    filePath: boolean;
    fileName: boolean;
    fileSize: boolean;
    createdAt: boolean;
    modifiedAt: boolean;
    isOriginalMarked: boolean;
    maxChainDepth: boolean;
    minChainDepth: boolean;
    status: boolean;
    extendedAttributes: boolean;
};

export type ReportFields =
    { label: string, key: string, id: number, children?: ReportFields[] }


export interface RootState {
    eventLogDataTable: EventLogDataTableState
    activeFileDataTable: ActiveFileDataTableState
    fileDetailsGraph: any
    reportModule: any
}
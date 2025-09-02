import { ExtendedHeaderColumn } from "@/store/types/DataTableItemsStore";
import { DataTableHeader } from "vuetify";

export const EventLogTableHeaders: ExtendedHeaderColumn[] = [
    {
        text: `ID`,
        value: `id`,
        align: `start`,
        sortable: false,
        isVisible: true
    },
    {
        text: `Тип`,
        value: `eventType`,
        isVisible: true,
        sortable: true,
    },
    {
        text: `Источник`,
        value: `source`,
        isVisible: true,
        sortable: true,
    },
    {
        text: `Время`,
        value: `timestamp`,
        sortable: true,
        isVisible: true
    },
    {
        text: `Id файла`,
        value: `relatedFileId.id`,
        sortable: true,
        isVisible: true
    },
    {
        text: `ID системы`,
        value: `relatedFileId.fileSystemId`,
        sortable: true,
        isVisible: true
    },
    {
        text: `Путь к файлу`,
        value: `relatedFileId.filePath`,
        sortable: true,
        isVisible: true
    },
    {
        text: `Имя`,
        value: `relatedFileId.fileName`,
        sortable: true,
        isVisible: true
    },
    {
        text: `Статус`,
        value: `relatedFileId.status`,
        sortable: true,
        isVisible: true
    },
    {
        text: `Путь к процессу`,
        value: `relatedProcessId.executablePath`,
        sortable: true,
        
        isVisible: true
    }
]
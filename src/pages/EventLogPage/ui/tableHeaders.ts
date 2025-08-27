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
        isVisible: true
    },
    {
        text: `Источник`,
        value: `source`,
        isVisible: true
    },
    {
        text: `Время`,
        value: `timestamp`,
        isVisible: true
    },
    {
        text: `Id файла`,
        value: `relatedFileId.id`,
        isVisible: true
    },
    {
        text: `ID системы`,
        value: `relatedFileId.fileSystemId`,
        isVisible: true
    },
    {
        text: `Путь к файлу`,
        value: `relatedFileId.filePath`,
        isVisible: true
    },
    {
        text: `Имя`,
        value: `relatedFileId.fileName`,
        isVisible: true
    },
    {
        text: `Статус`,
        value: `relatedFileId.status`,
        isVisible: true
    },
    {
        text: `Путь к процессу`,
        value: `relatedProcessId.executablePath`,
        isVisible: true
    }
]
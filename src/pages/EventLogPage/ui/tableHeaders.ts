import { DataTableHeader } from "vuetify";

export const EventLogTableHeaders: DataTableHeader[] = [
    {
        text: `ID`,
        value: `id`,
        align: `start`,
        sortable: false,
    },
    {
        text: `Тип`,
        value: `eventType`,
    },
    {
        text: `Источник`,
        value: `source`
    },
    {
        text: `Время`,
        value: `timestamp`
    },
    {
        text: `Id файла`,
        value: `relatedFileId.id`
    },
    {
        text: `ID системы`,
        value: `relatedFileId.fileSystemId`
    },
    {
        text: `Путь к файлу`,
        value: `relatedFileId.filePath`
    },
    {
        text: `Имя`,
        value: `relatedFileId.fileName`
    },
    {
        text: `Статус`,
        value: `relatedFileId.status`
    },
    {
        text: `Путь к процессу`,
        value: `relatedProcessId.executablePath`
    },
    { text: '', value: 'data-table-expand' },



]
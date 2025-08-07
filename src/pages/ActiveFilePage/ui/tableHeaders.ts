import { DataTableHeader } from "vuetify";

export const ActiveFileTableHeaders: DataTableHeader[] = [
    {
        text: `ID`,
        value: `id`,
        sortable: false,
    },
    {
        text: `Путь`,
        value: `eventType`
    },
    {
        text: `Inode`,
        value: `source`
    },
    {
        text: `Размер`,
        value: `timestamp`
    },
    {
        text: `Макс. глубина цепочки`,
        value: `relatedFileId.id`
    },
    {
        text: `Мин. глуюина цепочки`,
        value: `relatedFileId.fileSystemId`
    },
    {
        text: `Статус`,
        value: `status`,
        align: `center`,
    },
    {
        text: `Изменить статус`,
        align: `start`,
        value: `changeStatus`
    },
]
import { DataTableHeader } from "vuetify";

export const ActiveFileTableHeaders: DataTableHeader[] = [
    {
        text: `ID`,
        value: `id`,
        sortable: false,
    },
    {
        text: `Путь`,
        value: `filePath`
    },
    {
        text: `Inode`,
        value: `inode`
    },
    {
        text: `Размер`,
        value: `fileSize`
    },
    {
        text: `Макс. глубина цепочки`,
        value: `maxChainDepth`
    },
    {
        text: `Мин. глуюина цепочки`,
        value: `minChainDepth`
    },
    {
        text: `Статус`,
        value: `status`,
        align: `center`,
    },
    {
        text: `Изменить статус`,
        value: `changeStatus`
    },
]
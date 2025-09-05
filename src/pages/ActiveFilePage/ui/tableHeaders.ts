import { ExtendedHeaderColumn } from "@/store/types/THeaders";
import { DataTableHeader } from "vuetify";

export const ActiveFileTableHeaders: ExtendedHeaderColumn[] = [
    {
        text: `ID`,
        value: `id`,
        sortable: false,
        isVisible: true
    },
    {
        text: `Путь`,
        value: `filePath`,
        isVisible: true,
        sortable: true,
    },
    {
        text: `Inode`,
        value: `inode`,
        isVisible: true,
        sortable: true
    },
    {
        text: `Размер`,
        value: `fileSize`,
        isVisible: true,
        sortable: true
    },
    {
        text: `Макс. глубина цепочки`,
        value: `maxChainDepth`,
        isVisible: true,
        sortable: true
    },
    {
        text: `Мин. глуюина цепочки`,
        value: `minChainDepth`,
        isVisible: true,
        sortable: true
    },
    {
        text: `Статус`,
        value: `status`,
        align: `center`,
        isVisible: true,
        sortable: true
    },
    {
        text: `Изменить статус`,
        value: `changeStatus`,
        isVisible: true,
        sortable: true
    },
]
import { TOption } from "../../../shared/UI/SelectInput/TOptions";

export const eventOptions: TOption[] = [
    { label: `Все`, value: `` },
    { label: `Создание файла`, value: `file_added` },
    { label: `Создание процесса`, value: `process_created` },
    { label: `Отказано в доступе`, value: `access_denied` },
]
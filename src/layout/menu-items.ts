import { TMenuItem } from "@/common-components/src/components/Menu";

export const menuItems: TMenuItem[] = [
  {
    title: "Журнал событий",
    icon: "",
    to: "/",
  },
  {
    title: "Управление файлами",
    icon: "",
    subMenu: [
      {
        title: `Активные файлы`,
        icon: '',
        to: `/active`,
      },
      {
        title: `Архив`,
        icon: '',
        to: `/archive`,
      },
      {
        title: `Детали файла`,
        icon: '',
        to: `/details`,
      },
    ]
  },
  {
    title: "Детали файла",
    icon: "",
    to: "/details",
  },

  {
    title: "Отчёты",
    icon: "",
    to: "/report-list",
  },
]
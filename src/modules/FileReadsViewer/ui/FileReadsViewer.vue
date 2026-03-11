<template>
  <div class="tw-flex-1 tw-overflow-auto tw-min-h-0">
    <!-- @input="(val) => (drawerIsOpen = val)" -->
    <Drawer :value="true" :event-data="{}">
      <template #content>
        <span>Детали файла</span>
        <v-divider />
        <DrawerInfoBlock />
      </template>
    </Drawer>
    <DataTable
      style="cursor: pointer"
      @click-row="handleRowClick"
      :headers="headers"
      :items="store.files"
      dense
    >
      <template #select-preset>
        <div class="tw-flex tw-justify-between">
          <!-- <div>
            <UiSelect
              class="tw-flex-1 pa-4"
              v-model="presetName"
              label="Пресет"
              :items="presetList"
            />
          </div> -->
          <!-- <div class="tw-flex tw-gap-2 tw-items-center">
            <Button
              @click="
                () => {
                  dialogIsOpen = true;
                }
              "
              outlined
              :height="32"
              >Экспорт</Button
            >
            <Button @click="downloadAllLogReport" outlined :height="32"
              >Экспорт всего</Button
            >
            <Button @click="downloadSelectedLogReport" outlined :height="32"
              >Экспорт выделенноего</Button
            >
          </div> -->
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import {
  DataTable,
  Header,
} from "@/common-components/src/components/DataTable";
import { ref } from "vue";
import { useFileReadsViewer } from "../model/use-file-reads-viewer";
import { useFileReadsViewerStore } from "../model/use-file-reads-viewer-store";
import { Drawer } from "@/components/Drawer";
import { VDivider } from "vuetify/lib";
import DrawerInfoBlock from "./components/DrawerInfoBlock.vue";

interface Props {}
const props = defineProps<Props>();
const fileReadsViewer = useFileReadsViewer();
const drawerIsOpen = ref<boolean>(false);

const handleRowClick = (data: any) => {
  drawerIsOpen.value = true;
};
const headers = ref<Header[]>([
  {
    text: `Файл`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `filePath`,
    width: 80,
  },
  {
    text: `Версия файла`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `fileVersion`,
    width: 80,
  },
  {
    text: `Процесс`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `process`,
    width: 80,
  },
  {
    text: `Версия`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `processVersion`,
    width: 80,
  },
  {
    text: `Пользователь`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `user`,
    width: 80,
  },
  {
    text: `First At`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `firstAt`,
    width: 80,
  },
  {
    text: `Last At`,
    align: "start",
    isVisible: true,
    sortable: true,
    value: `lastAt`,
    width: 80,
  },
]);

const store = useFileReadsViewerStore();
</script>

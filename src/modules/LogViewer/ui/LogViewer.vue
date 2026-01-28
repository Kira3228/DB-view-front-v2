<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
    <v-navigation-drawer
      fixed
      right
      overlay-opacity="0.1"
      temporary
      v-model="isDrawerOpen"
      width="400"
    >
      <div class="tw-p-5">
        <h4 class="tw-text-xl tw-text-center tw-font-normal">Данные события</h4>
        <JsonViewer boxed copyable :value="eventData"></JsonViewer>
      </div>
    </v-navigation-drawer>
    <div class="tw-flex-1 tw-overflow-auto tw-min-h-0">
      <DataTable
        @click-row="handleRowClick"
        :headers="headers"
        ё
        :items="events"
        :items-per-page="limit"
        v-model="ids"
        show-select
      >
        <template #select-preset>
          <div class="tw-flex tw-justify-between">
            <div>
              <UiSelect
                class="tw-flex-1 pa-4"
                v-model="presetName"
                ф
                label="Пресет"
                :items="presetList"
              />
            </div>
            <div class="tw-flex tw-gap-2 tw-items-center">
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
            </div>
          </div>
        </template>
      </DataTable>
    </div>
    <div class="tw-shrink-0 tw-border-t tw-p-2">
      <Pagination
        v-model="currentPage"
        :length="totalPage"
        :totalVisible="10"
      />
    </div>
    <v-snackbar tile v-model="isOpenSnackbar" color="yellow" :timeout="1500">
      <span class="tw-text-black">Выбрано 0 элементов </span>
    </v-snackbar>
  </div>
</template>
<script lang="ts" setup>
import { DataTable } from "@/common-components/src/components/DataTable";
import { onMounted, ref, watch } from "vue";
import { useLogsViewerModel } from "../model/model";
import { UiSelect } from "@/common-components/src/components/Select";
import { useRoute, useRouter } from "vue-router/composables";
import { Pagination } from "@/common-components/src/components/pagination";
import JsonViewer from "vue-json-viewer";
import { useLogFilterModel } from "@/modules/LogFilter/model";
import { useDebounce } from "@/common-components/src/lib/debounce";
import { Button } from "@/common-components/src/components/Button";

const {
  logsLoad,
  downloadAllLogReport,
  downloadSelectedLogReport,
  headers,
  presetLoad,
  presetList,
  events,
  totalPage,
  ids,
  isOpenSnackbar,
  dialogIsOpen,
} = useLogsViewerModel();

const { endDate, filePath, startDate, status, systemId, type } =
  useLogFilterModel();
const { debounce } = useDebounce();
const router = useRouter();
const route = useRoute();

const presetName = ref<string | undefined>(
  (route.query.preset as string) || undefined,
);
const currentPage = ref<number>(Number(route.query.page) || 1);
const eventData = ref<string>("");
const isDrawerOpen = ref<boolean>(false);
const limit = ref(14);

onMounted(() => {
  presetLoad();
});

const handleRowClick = (data: any) => {
  eventData.value = { ...data, eventData: JSON.parse(data.eventData) };
  isDrawerOpen.value = !isDrawerOpen.value;
};

const updateUrl = () => {
  const query = { ...route.query };
  if (presetName.value) query.preset = presetName.value;
  else delete query.preset;

  if (currentPage.value && currentPage.value !== 1)
    query.page = String(currentPage.value);
  else delete query.page;

  router.replace({ query }).catch(() => {});
};

watch(presetName, updateUrl);
watch(currentPage, updateUrl);

watch(
  () => route.query,
  (newQuery) => {
    const newPreset = (newQuery.preset as string) || undefined;
    const newPage = Number(newQuery.page) || 1;

    if (presetName.value !== newPreset) presetName.value = newPreset;
    if (currentPage.value !== newPage) currentPage.value = newPage;

    logsLoad({
      presetName: newPreset,
      page: newPage,
      limit: limit.value,
    });
  },
  { immediate: true },
);
const debouncedFetch = () => {
  debounce(() => {
    logsLoad({
      endDate: endDate.value,
      eventType: type.value,
      filePath: filePath.value,
      startDate: startDate.value,
      status: status.value?.value,
      fileSystemId: systemId.value,
      page: currentPage.value,
      limit: limit.value,
    });
  }, 500);
};

watch([endDate, filePath, startDate, status, systemId, type], debouncedFetch);
</script>

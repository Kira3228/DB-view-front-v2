<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
    <div class="tw-flex-1 tw-overflow-auto tw-min-h-0">
      <DataTable
        :page="page"
        :items-per-page="14"
        :headers="headers"
        :items="files"
      >
        <template #item.status="{ value, item }">
          <UiSelect
            @input="handleChange($event, item.id)"
            :items="statusToChange"
            :value="item.status"
            label="Статус"
          />
        </template>
        <template #select-preset>
          <div class="tw-flex tw-justify-between">
            <div>
              <UiSelect
                class="tw-flex-1 pa-4"
                v-model="presetName"
                label="Пресет"
              />
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
  </div>
</template>
<script lang="ts" setup>
import { DataTable } from "@/common-components/src/components/DataTable";
import { useActiveFileModel } from "../model/model";
import { onMounted, ref, watch } from "vue";
import { UiSelect } from "@/common-components/src/components/Select";
import { fetchUpdateStatus } from "../api";
import { useRoute, useRouter } from "vue-router/composables";
import { Pagination } from "@/common-components/src/components/pagination";

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  isArchive?: `archived`;
}>();

const { headers, files, loadActiveFile, page, totalPage } =
  useActiveFileModel();

const statusToChange = [`active`, `archived`, `deleted`];

const currentPage = ref<number>(Number(route.query.page) || 1);
const presetName = ref<string | undefined>(
  (route.query.preset as string) || undefined,
);

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

    loadActiveFile({
      presetName: newPreset,
      page: newPage,
      limit: 14,
      isArchived: props.isArchive ? `archived` : ``,
    });
  },
  { immediate: true },
);

const handleChange = async (value: any, id: number) => {
  fetchUpdateStatus(id, { status: value });
};
</script>

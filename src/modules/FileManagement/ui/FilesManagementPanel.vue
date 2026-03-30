<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <FileFilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-justify-between">
      <Button text @click="openFiltersClick">
        <div class="tw-flex tw-items-center">
          <FiltersIcon />
          <span> Фильтры </span>
        </div>
      </Button>
      <Button height="32" width="32" icon>
        <div class="tw-flex tw-items-center">
          <RefrehsIcon :width="24" />
        </div>
      </Button>
    </div>
    <div class="viewer__table">
      <DataTable
        :items-per-page="limit"
        :items="fileManagementStore.files"
        :headers="headers"
        height="100%"
      />
    </div>
    <div class="viewer__pagination">
      <Pagination
        v-model="fileManagementStore.filters.page"
        :length="fileManagementStore.totalPages"
        :totalVisible="10"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTable } from "@/common-components/src/components/DataTable";
import { useFileManagementPanel } from "../model/use-file-management-panel";
import { useFileManagementStore } from "../model/use-file-management-store";
import FileFilterDrawer from "./FileFilterDrawer.vue";
import { Button } from "@/common-components/src/components/Button";
import {
  FiltersIcon,
  RefrehsIcon,
} from "@/common-components/src/components/Icons";
import { Pagination } from "@/common-components/src/components/pagination";
import { ref, watch } from "vue";

interface Props {}
const props = defineProps<Props>();

const { headers, openFiltersClick, filterDrawerIsOpen } =
  useFileManagementPanel();

const fileManagementStore = useFileManagementStore();

const limit = ref(100);
watch(
  () => fileManagementStore.filters.page,
  () => {
    fileManagementStore.loadFiles();
  },
);
</script>
<style scoped>
.viewer {
}

.viewer__table {
  overflow: auto;
}

.viewer__pagination {
  flex-shrink: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px;
}

.viewer__table ::v-deep .v-data-table__wrapper {
  overflow: visible !important;
}
</style>

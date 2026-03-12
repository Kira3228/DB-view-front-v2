<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <Drawer />
    <FilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-justify-between">
      <Button text @click="openFiltersClick">
        <div class="tw-flex tw-items-center">
          <FiltersIcon />
          Фильтры
        </div>
      </Button>
      <Button @click="refreshClick" height="32" width="32" icon>
        <div class="tw-flex tw-items-center">
          <RefrehsIcon :width="24" />
        </div>
      </Button>
    </div>
    <div class="viewer__table">
      <DataTable
        @click-row="handleRowClick"
        :headers="headers"
        :items="fileReadsViewStore.files"
        :items-per-page="limit"
        height="100%"
      >
        <template #select-preset>
          <div class="tw-flex tw-justify-between"></div>
        </template>
      </DataTable>
    </div>

    <div class="viewer__pagination">
      <Pagination v-model="currentPage" :length="1" :totalVisible="10" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  DataTable,
  Header,
} from "@/common-components/src/components/DataTable";
import { ref, watch } from "vue";
import { useRoute } from "vue-router/composables";
import { Pagination } from "@/common-components/src/components/pagination";
import { useLogFilterModel } from "@/modules/LogFilter/model";
import { useDebounce } from "@/common-components/src/lib/debounce";
import { Button } from "@/common-components/src/components/Button";
import { useFileReadsViewerStore } from "../model/use-file-reads-viewer-store";
import { useFileReadsViewer } from "../model/use-file-reads-viewer";
import FiltersIcon from "@/common-components/src/components/Icons/FiltersIcon.vue";
import { RefrehsIcon } from "@/common-components/src/components/Icons";
import { Drawer } from "@/components/Drawer";
import { headerList } from "../model/header-list.mock";
import FilterDrawer from "./components/FilterDrawer.vue";

const { handleRowClick, refreshClick, filterDrawerIsOpen, openFiltersClick } =
  useFileReadsViewer();

const fileReadsViewStore = useFileReadsViewerStore();

const { endDate, filePath, startDate, status, systemId, type } =
  useLogFilterModel();

const { debounce } = useDebounce();
const route = useRoute();

const currentPage = ref<number>(Number(route.query.page) || 1);

const limit = ref(100);

const headers = ref<Header[]>(headerList);

const debouncedFetch = () => {
  debounce(() => {}, 500);
};

watch([endDate, filePath, startDate, status, systemId, type], debouncedFetch);
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

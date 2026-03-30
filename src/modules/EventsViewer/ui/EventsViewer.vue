<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <Drawer />
    <FilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-flex tw-w-1/2">
        <Button class="tw-flex tw-items-center" text @click="openFiltersClick">
          Фильтры
        </Button>
        <div class="tw-flex">
          <TextInput v-model="search" @keyup.enter="handleEnter" outlined />
          <Button height="" icon>
            <div @click="searchHandler" class="tw-flex tw-items-center">
              <SearchIcon :width="24" />
            </div>
          </Button>
        </div>
      </div>
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
      <Pagination
        v-model="fileReadsViewStore.filters.page"
        :length="fileReadsViewStore.totalPages"
        :totalVisible="10"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  DataTable,
  Header,
} from "@/common-components/src/components/DataTable";
import { ref, watch } from "vue";
import { Pagination } from "@/common-components/src/components/pagination";
import { Button } from "@/common-components/src/components/Button";
import { useFileReadsViewerStore } from "../model/use-file-reads-viewer-store";
import { useFileReadsViewer } from "../model/use-file-reads-viewer";
import {
  RefrehsIcon,
  SearchIcon,
} from "@/common-components/src/components/Icons";
import { Drawer } from "@/components/Drawer";
import { headerList } from "../model/header-list.mock";
import FilterDrawer from "./components/FilterDrawer.vue";
import { TextInput } from "@/common-components/src/components/TextInput";

const { handleRowClick, refreshClick, filterDrawerIsOpen, openFiltersClick } =
  useFileReadsViewer();

const fileReadsViewStore = useFileReadsViewerStore();
const limit = ref(100);
const headers = ref<Header[]>(headerList);

const search = ref<string>(``);

const searchHandler = () => {
  fileReadsViewStore.filters.searchTerm = search.value;
  fileReadsViewStore.filters.page = 1;
  fileReadsViewStore.loadFiles();
  search.value = "";
};

const handleEnter = () => {
  searchHandler();
};
watch(
  () => fileReadsViewStore.filters.page,
  () => {
    fileReadsViewStore.loadFiles();
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

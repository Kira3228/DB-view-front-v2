<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <Drawer v-model="drawerIsOpen" />
    <FilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-flex tw-w-1/2">
        <Button class="tw-flex tw-items-center" text @click="openFiltersClick">
          Фильтры
        </Button>
        <div class="tw-flex">
          <TextInput v-model="search" outlined />
          <Button height="" icon>
            <div class="tw-flex tw-items-center">
              <SearchIcon :width="24" />
            </div>
          </Button>
        </div>
      </div>
    </div>
    <div class="viewer__table">
      <DataTable
        @click-row="handleRowClick"
        :headers="headers"
        :items="files"
        :items-per-page="limit"
        height="100%"
        :is-loading="isLoading"
      >
        <template #select-preset>
          <div class="tw-flex tw-justify-between"></div>
        </template>
      </DataTable>
    </div>

    <div class="viewer__pagination">
      <Pagination
        v-model="totalPages"
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
import { ref } from "vue";
import { Pagination } from "@/common-components/src/components/pagination";
import { Button } from "@/common-components/src/components/Button";
import { useEventPanelStore } from "../model/use-event-panel-store";
import { useEventPanel } from "../model/use-event-panel";
import {
  RefrehsIcon,
  SearchIcon,
} from "@/common-components/src/components/Icons";
import { Drawer } from "@/components/Drawer";
import { headerList } from "../model/header-list.mock";
import FilterDrawer from "./components/FilterDrawer.vue";
import { TextInput } from "@/common-components/src/components/TextInput";

const {
  files,
  drawerIsOpen,
  filterDrawerIsOpen,
  handleRowClick,
  openFiltersClick,
  isLoading,
  totalPages,
} = useEventPanel();

const fileReadsViewStore = useEventPanelStore();
const limit = ref(100);
const headers = ref<Header[]>(headerList);

const search = ref<string>(``);
</script>

<style scoped>
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

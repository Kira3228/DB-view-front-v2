<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <Drawer v-model="drawerIsOpen" />
    <FilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-flex-col tw-gap-2">
      <!-- строка поиска и кнопки -->
      <div class="tw-flex tw-items-center tw-gap-2">
        <div class="tw-w-1/2">
          <TextInput
            @keyup.enter.native="test"
            is-search
            v-model="search"
            outlined
          >
            <template #append>
              <div class="tw-flex tw-items-center tw-h-full">
                <SearchIcon :width="24" />
              </div>
            </template>
          </TextInput>
        </div>
        <Button class="tw-flex tw-items-center" text @click="openFiltersClick">
          Фильтры
        </Button>
      </div>

      <!-- чипсы под строкой -->
      <div class="tw-flex tw-gap-2 tw-flex-wrap">
        <v-chip close small>asd</v-chip>
        <v-chip close small>asd</v-chip>
        <v-chip close small>asd</v-chip>
        <v-chip close small>asd</v-chip>
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
        :length="totalPages"
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
import { useEventPanel } from "../model/use-event-panel";
import { SearchIcon } from "@/common-components/src/components/Icons";
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

const limit = ref(100);
const headers = ref<Header[]>(headerList);

const search = ref<string>(``);

const test = () => {
  console.log(113212321);
};
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

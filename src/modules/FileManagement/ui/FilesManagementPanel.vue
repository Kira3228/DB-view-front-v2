<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <FileFilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-flex-col tw-gap-2">
      <div class="tw-flex tw-items-center tw-gap-2">
        <div class="tw-w-1/2">
          <TextInput
            @keyup.enter.native="fileManagementFilter.applyFilters"
            v-model="fileManagementFilter.localFilters.value.searchTerm"
            is-search
            outlined
            clearable
            @click:clear="handleClear"
            placeholder="Поиск..."
          >
            <template #append>
              <div class="tw-flex tw-items-center tw-h-full">
                <SearchIcon :width="24" />
              </div>
            </template>
          </TextInput>
        </div>
        <Button text @click="openFiltersClick">
          <div class="tw-flex tw-items-center">
            <FiltersIcon />
            <span> Фильтры </span>
          </div>
        </Button>
      </div>
    </div>
    <div class="tw-flex tw-gap-2 tw-flex-wrap">
      <v-chip
        v-for="chip in fileManagementFilter.filterChips.value"
        :key="chip.key"
        small
        close
        @click:close="fileManagementFilter.removeFilter(chip.key)"
      >
        {{ chip.label }}
      </v-chip>
    </div>
    <div class="viewer__table">
      <DataTable
        :items-per-page="limit"
        :items="data"
        :headers="headers"
        height="100%"
      />
    </div>
    <div class="viewer__pagination">
      <Pagination
        :value="currentPage"
        :length="totalPages"
        :totalVisible="10"
        @input="setPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataTable } from "@/common-components/src/components/DataTable";
import { useFileManagementPanel } from "../model/use-file-management-panel";
import { Button } from "@/common-components/src/components/Button";
import {
  FiltersIcon,
  RefrehsIcon,
  SearchIcon,
} from "@/common-components/src/components/Icons";
import { Pagination } from "@/common-components/src/components/pagination";
import { ref, watch } from "vue";
import FileFilterDrawer from "./FileFilterDrawer.vue";
import { TextInput } from "@/common-components/src/components/TextInput";
import { useFileManagementFilter } from "../model/use-file-management-filters";

interface Props {}
const props = defineProps<Props>();

const {
  headers,
  openFiltersClick,
  filterDrawerIsOpen,
  refreshClick,
  data,
  isLoading,
  currentPage,
  totalPages,
  setPage,
  error,
} = useFileManagementPanel();

const limit = ref(100);

const fileManagementFilter = useFileManagementFilter();

const handleClear = (data: any) => {
  console.log(data);
  fileManagementFilter.applyFilters();
};
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

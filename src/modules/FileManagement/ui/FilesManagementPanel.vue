<template>
  <div>
    <FileFilterDrawer v-model="filterDrawerIsOpen" />
    <div class="tw-flex tw-justify-between">
      <Button text @click="openFiltersClick">
        <div class="tw-flex tw-items-center">
          <FiltersIcon />
          Фильтры
        </div>
      </Button>
      <Button height="32" width="32" icon>
        <div class="tw-flex tw-items-center">
          <RefrehsIcon :width="24" />
        </div>
      </Button>
    </div>
    <DataTable :items="fileManagementStore.files.items" :headers="headers" />
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

interface Props {}
const props = defineProps<Props>();

const { headers, openFiltersClick, filterDrawerIsOpen } =
  useFileManagementPanel();

const fileManagementStore = useFileManagementStore();
</script>

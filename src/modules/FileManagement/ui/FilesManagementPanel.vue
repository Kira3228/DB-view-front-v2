<template>
  <DataTable
    :items="fileManagementStore.files.items"
    :headers="fileManagementPanel.headers"
  />
</template>
<script setup lang="ts">
import { DataTable } from "@/common-components/src/components/DataTable";
import { useFileManagementPanel } from "../model/use-file-management-panel";
import { useFileManagementStore } from "../model/use-file-management-store";

interface Props {}
const props = defineProps<Props>();

const fileManagementPanel = useFileManagementPanel();

const fileManagementStore = useFileManagementStore();
</script>

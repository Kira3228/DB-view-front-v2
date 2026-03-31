<template>
  <div>
    <v-card class="tw-p-2">
      <span class="tw-font-semibold">Предпросмотр</span>
      <DataTable :headers="headerList" />
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { DataTable } from "@/common-components/src/components/DataTable";
import { headerList } from "@/modules/EventsViewer/model/header-list.mock";

interface Props {}
const props = defineProps<Props>();
</script>

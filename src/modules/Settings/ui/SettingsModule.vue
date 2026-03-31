<template>
  <div v-if="settins" class="tw-grid tw-grid-cols-2 tw-gap-3">
    <MonitoringSetting :chips="settins.monitoringPaths" />
    <v-card>
      <span>База данных</span>
    </v-card>
    <v-card>
      <span>Исключения</span>
    </v-card>
    <v-card>
      <span>Интерфейс</span>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useGetSettings } from "../hooks/useGetSettings";
import MonitoringSetting from "./MonitoringSetting .vue";

interface Props {}
const props = defineProps<Props>();

const { data: settins } = useGetSettings();
</script>

<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
    Активные файлы
    <ActiveFileFilters />
    <ActiveFileViewer />
  </div>
</template>
<script lang="ts" setup>
import { ActiveFileFilters } from "@/modules/ActiveFileFilters/ui";
import { ActiveFileViewer } from "@/modules/ActiveFileViewer/ui";
import { ref } from "vue";
</script>

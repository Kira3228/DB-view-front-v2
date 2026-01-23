<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
    Архив
    <ActiveFileFilters />
    <ActiveFileViewer is-archive="archived" />
  </div>
</template>
<script lang="ts" setup>
import { ActiveFileFilters } from "@/modules/ActiveFileFilters/ui";
import { ActiveFileViewer } from "@/modules/ActiveFileViewer/ui";
</script>

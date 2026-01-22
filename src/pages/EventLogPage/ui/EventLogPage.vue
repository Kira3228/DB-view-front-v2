<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
    <LogFilter />
    <LogViewer />
  </div>
</template>

<script lang="ts" setup>
import { LogFilter } from "@/modules/LogFilter/ui";
import { LogViewer } from "@/modules/LogViewer/ui";
</script>

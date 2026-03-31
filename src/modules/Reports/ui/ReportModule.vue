<template>
  <div class="tw-flex tw-gap-2">
    <div>
      <ReportParams />
    </div>
    <div>
      <ReportPreview />
    </div>
  </div>
</template>
<script setup lang="ts">
import ReportParams from "./ReportParams.vue";
import ReportPreview from "./ReportPreview.vue";

interface Props {}
const props = defineProps<Props>();
</script>

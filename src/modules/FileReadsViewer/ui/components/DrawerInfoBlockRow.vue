<template>
  <div>
    <div class="tw-flex tw-justify-between">
      <span class="tw-text-xs tw-font-medium">{{ title }}</span>
      <span class="tw-text-xs tw-font-medium">{{ value }}</span>
    </div>
    <v-divider />
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
  value: string;
}
const props = defineProps<Props>();
</script>

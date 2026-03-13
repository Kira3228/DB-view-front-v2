<template>
  <div class="page">
    <EventViewer class="page__viewer" />
  </div>
</template>
<script setup lang="ts">
import { EventViewer } from "@/modules/EventsViewer/ui";
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.page__filter {
  flex-shrink: 0;
}

.page__viewer {
  flex: 1;
  min-height: 0;
}
</style>

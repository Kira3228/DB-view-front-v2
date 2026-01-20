<script setup lang="ts">
import { Menu as AppMenu } from "@/common-components/src/components/Menu";
import { menuItems } from "./menu-items";
import { RouterView } from "vue-router";
</script>
<template>
  <div class="tw-h-screen tw-bg-gray-100 tw-flex">
    <AppMenu :items="menuItems" />
    <div
      class="tw-p-4 tw-flex-1 tw-min-w-0 tw-overflow-hidden tw-flex tw-flex-col"
    >
      <RouterView />
    </div>
  </div>
</template>

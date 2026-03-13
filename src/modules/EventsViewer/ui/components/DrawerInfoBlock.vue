<template>
  <div>
    <span class="tw-text-sm tw-font-medium">Файл</span>
    <v-divider />
    <div class="tw-flex tw-flex-col tw-gap-1 tw-p-1">
      <div class="tw-flex tw-justify-between">
        <span class="tw-text-xs tw-font-medium">Путь к файлу</span>
        <span class="tw-text-xs tw-font-medium">
          /run/user/1000/media/by-uuid-e85370e8-be4a-43ab-b39f-e41025c4b01f/xa11.txt
        </span>
      </div>
      <v-divider />
      <DrawerInfoBlockRow title="Id сиситемы" value="/temp/qwe" />

      <div class="tw-flex tw-justify-between">
        <span class="tw-text-xs tw-font-medium">Id сиситемы</span>
        <span class="tw-text-xs tw-font-medium">/temp/qwe</span>
      </div>
      <v-divider />
      <div class="tw-flex tw-justify-between">
        <span class="tw-text-xs tw-font-medium">Дескриптор</span>
        <span class="tw-text-xs tw-font-medium">/temp/qwe</span>
      </div>
      <v-divider />
      <div class="tw-flex tw-justify-between">
        <span class="tw-text-xs tw-font-medium">Начальный размер</span>
        <span class="tw-text-xs tw-font-medium">/temp/qwe</span>
      </div>
      <v-divider />
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DrawerInfoBlockRow from "./DrawerInfoBlockRow.vue";
interface Props {}
const props = defineProps<Props>();
</script>

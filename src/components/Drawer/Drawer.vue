<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from "vue";
import JsonViewer from "vue-json-viewer";

interface Props {
  value?: boolean;
  eventData?: T | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "input", data: boolean): void }>();

const handleClose = (value: boolean) => {
  console.log(value);

  emit(`input`, value);
};
</script>

<template>
  <v-navigation-drawer
    fixed
    right
    overlay-opacity="0.1"
    temporary
    :value="value"
    @input="handleClose"
    width="600"
  >
    <div class="tw-p-5">
      <slot name="content" />
      <JsonViewer theme boxed copyable :value="eventData"></JsonViewer>
    </div>
  </v-navigation-drawer>
</template>

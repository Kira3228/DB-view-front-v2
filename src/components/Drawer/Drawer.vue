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
    <slot name="content" />
  </v-navigation-drawer>
</template>
<script setup lang="ts" generic="T extends Record<string, any>">
interface Props {
  value?: boolean;
  eventData?: T | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "input", data: boolean): void }>();

const handleClose = (value: boolean) => {
  emit(`input`, value);
};
</script>

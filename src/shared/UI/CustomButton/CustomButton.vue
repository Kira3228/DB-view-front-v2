<template>
  <v-btn
    @click="$emit(`click`, $event)"
    :disabled="isDisabled"
    elevation="2"
    color="primary"
    >{{ title }}</v-btn
  >
</template>
<script lang="ts">
interface ButtonProps {
  title: string;
  isDisabled: boolean;
}
export default {
  name: `CustomButton`,
  props: {
    title: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

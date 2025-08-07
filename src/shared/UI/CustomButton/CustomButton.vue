<template>
  <div>
    <v-btn
      @click="$emit(`click`, $event)"
      :disabled="isDisabled"
      elevation="2"
      color="primary"
      >{{ title }}</v-btn
    >
  </div>
</template>
<script lang="ts">
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
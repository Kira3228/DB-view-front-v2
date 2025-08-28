<template></template>
<script lang="ts">
import { PropType } from "@vue/composition-api";
import Vue from "vue";

export default Vue.extend({
  name: `ProfileCard`,
  props: {
    logFilePath: {
      type: String,
      default: "",
    },
    systemId: { type: [String, Number], default: "" },
    satus: { type: Object as PropType<number>, default: null },
    typeOfEvent: { type: Object as PropType<number>, default: null },
  },
});
</script>
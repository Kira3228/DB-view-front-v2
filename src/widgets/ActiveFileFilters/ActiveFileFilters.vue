<template>
  <div class="tw-flex">
    <div class="tw-flex tw-w-2/3 tw-gap-x-2">
      <text-input
        v-model="filepath"
        label="Путь"
        placeholder="Путь"
      ></text-input>
      <text-input
        v-model="inode"
        label="Id системы"
        placeholder="Id системы"
      ></text-input>
    </div>
  </div>
</template>
<script lang="ts">
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import Vue from "vue";

export default Vue.extend({
  name: `ActiveFileFilters`,
  components: {
    TextInput,
  },
  data() {
    return {
      filepath: "",
      inode: "",
    };
  },
});
</script>
<template>
  <div class="tw-flex">
    <div class="tw-flex tw-w-2/3 tw-gap-x-2">
      <text-input
        v-model="filepath"
        label="Путь"
        placeholder="Путь"
        @debounce="fetchFiltered"
      ></text-input>
      <text-input
        v-model="inode"
        label="Id системы"
        placeholder="Id системы"
        @debounce="fetchFiltered"
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
    return {};
  },
  methods: {
    async fetchFiltered() {
      return await this.$store.dispatch(`activeFileTable/debouncedFetch`);
    },
  },
  computed: {
    filepath: {
      get(): string {
        return this.$store.state.filepath;
      },
      set(newValue: string) {
        this.$store.commit(`activeFileTable/SET_FILEPATH`, newValue);
      },
    },
    inode: {
      get(): string {
        return this.$store.state.inode;
      },
      set(newValue: string) {
        this.$store.commit(`activeFileTable/SET_INODE`, newValue);
      },
    },
  },
});
</script>
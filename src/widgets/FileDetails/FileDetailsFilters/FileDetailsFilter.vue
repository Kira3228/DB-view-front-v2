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
  name: `FileDetailsFilters`,
  components: {
    TextInput,
  },
  data() {
    return {};
  },
  methods: {
    async fetchFiltered() {
      return await this.$store.dispatch(`fileDetailsModule/loadItems`);
    },
  },
  computed: {
    filepath: {
      get(): string {
        return this.$store.state.fileDetailsModule.filepath;
      },
      set(newValue: string) {
        this.$store.commit(`fileDetailsModule/SET_FILEPATH`, newValue);
      },
    },
    inode: {
      get(): string {
        return this.$store.state.fileDetailsModule.inode;
      },
      set(newValue: string) {
        this.$store.commit(`fileDetailsModule/SET_INODE`, newValue);
      },
    },
  },
});
</script>
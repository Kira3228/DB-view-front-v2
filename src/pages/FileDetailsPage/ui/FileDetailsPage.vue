<template>
  <div>
    <filters-bar
      v-model="filters"
      :debouncedEvent="fetchFiltered"
    ></filters-bar>
    <file-details-tree></file-details-tree>
  </div>
</template>
<script lang="ts">
import FileDetailsFilter from "@/widgets/FileDetails/FileDetailsFilters/FileDetailsFilter.vue";
import FileDetailsTree from "@/widgets/FileDetails/FileDetailsTree/FileDetailsTree.vue";
import FiltersBar from "@/widgets/FiltersBar/FiltersBar.vue";

import Vue from "vue";

export default Vue.extend({
  name: "FileDetailsPage",
  components: { FileDetailsTree, FileDetailsFilter, FiltersBar },
  async mounted() {},
  methods: {
    async fetchFiltered() {
      await this.$store.dispatch(``);
    },
  },
  data() {
    return {
      filters: {
        filepath: this.$store.state.fileDeatails.filePath,
        inode: this.$store.state.fileDeatails.inode,
      },
    };
  },
  watch: {
    filters: {
      deep: true,
      handler(newVal) {
        this.$store.commit(`activeFileTable/SET_FILEPATH`, newVal.filepath);
        this.$store.commit(`activeFileTable/SET_INODE`, newVal.inode);
      },
    },
  },
});
</script>
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
import FileDetailsTree from "@/widgets/FileDetails/FileDetailsTree/FileDetailsTree.vue";
import FiltersBar from "@/widgets/FiltersBar/FiltersBar.vue";
import Vue from "vue";

export default Vue.extend({
  name: "FileDetailsPage",
  components: { FileDetailsTree, FiltersBar },
  methods: {
    async fetchFiltered() {
      await this.$store.dispatch(`fileDetailsModule/loadItems`);
    },
  },

  data() {
    return {
      filters: {
        filepath: this.$store.state.fileDetailsModule.filePath,
        inode: this.$store.state.fileDetailsModule.inode,
      },
    };
  },
  
  watch: {
    filters: {
      deep: true,
      handler(newVal) {
        this.$store.commit(`fileDetailsModule/SET_FILEPATH`, newVal.filepath);
        this.$store.commit(`fileDetailsModule/SET_INODE`, newVal.inode);
      },
    },
  },
});
</script>
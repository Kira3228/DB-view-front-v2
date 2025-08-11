<template>
  <div>
    <file-details-filter></file-details-filter>
    <file-details-tree></file-details-tree>
  </div>
</template>
<script lang="ts">
import FileDetailsFilter from "@/widgets/FileDetails/FileDetailsFilters/FileDetailsFilter.vue";
import FileDetailsTree from "@/widgets/FileDetails/FileDetailsTree/FileDetailsTree.vue";
import Vue from "vue";

export default Vue.extend({
  name: "FileDetailsPage",
  components: { FileDetailsTree, FileDetailsFilter },
  async mounted() {},
  methods: {},
});
</script>
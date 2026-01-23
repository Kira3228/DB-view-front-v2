<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
    Детали файла
    <div class="tw-h-full">
      <div class="tw-bg-red-500">asdads</div>
      <DetailsTree />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DetailsTree } from "@/modules/DitailsTree/ui";
// export default Vue.extend({
//   name: "FileDetailsPage",
//   components: { FileDetailsTree, FiltersBar },
//   methods: {
//     async fetchFiltered() {
//       await this.$store.dispatch(`fileDetailsModule/loadItems`);
//     },
//   },

//   data() {
//     return {
//       filters: {
//         filepath: this.$store.state.fileDetailsModule.filePath,
//         inode: this.$store.state.fileDetailsModule.inode,
//       },
//     };
//   },

//   watch: {
//     filters: {
//       deep: true,
//       handler(newVal) {
//         this.$store.commit(`fileDetailsModule/SET_FILEPATH`, newVal.filepath);
//         this.$store.commit(`fileDetailsModule/SET_INODE`, newVal.inode);
//       },
//     },
//   },
// });
</script>

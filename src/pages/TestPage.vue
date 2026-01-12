<template>
  <div>
    <ui-data-table></ui-data-table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import UiDataTable from "./../shared-ui/src/components/DataTable/DataTable.vue";
export default Vue.extend({
  components: { UiDataTable },
});
</script>

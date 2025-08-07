<template>
  <div>
    <active-file-filters></active-file-filters>
    <data-table table-type="active" :items="items" :headers="headers">
    </data-table>
  </div>
</template>
<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import ActiveFileFilters from "@/widgets/ActiveFileFilters/ActiveFileFilters.vue";
import Vue from "vue";
import { ActiveFileTableHeaders } from "./tableHeaders";
import { mockActiveFiles } from "./mock";

export default Vue.extend({
  name: `ActiveFilePage`,
  components: { ActiveFileFilters, DataTable },
  data() {
    return {
      headers: ActiveFileTableHeaders,
      items: mockActiveFiles,
    };
  },
  methods: {},
  computed: {},
});
</script>
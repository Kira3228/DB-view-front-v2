<template>
  <div>
    <active-file-filters></active-file-filters>
    <data-table
      :paginationLength="totalPages"
      table-type="active"
      :items="items"
      :headers="headers"
      @page-changed="updatePage"
    >
    </data-table>
  </div>
</template>
<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import ActiveFileFilters from "@/widgets/ActiveFileFilters/ActiveFileFilters.vue";
import Vue from "vue";
import { ActiveFileTableHeaders } from "./tableHeaders";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";

export default Vue.extend({
  name: `ActiveFilePage`,
  components: { ActiveFileFilters, DataTable },
  data() {
    return {
      headers: ActiveFileTableHeaders,
    };
  },
  methods: {
    async loadItems() {
      this.$store.dispatch("activeFileTable/loadItems");
    },
    updatePage(newPage: number) {
      this.$store.commit(`activeFileTable/SET_CURRENT_PAGE`, newPage);
      this.$store.dispatch(`activeFileTable/loadItems`);
    },
  },
  async mounted() {
    await this.loadItems();
  },
  computed: {
    items(): TDataTableItems[] {
      return this.$store.state.activeFileTable.items;
    },
    totalPages() {
      return this.$store.state.activeFileTable.totalPages;
    },
  },
});
</script>
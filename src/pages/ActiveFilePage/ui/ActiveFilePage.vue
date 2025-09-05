<template>
  <div>
    <filters-bar
      v-model="filters"
      :debouncedEvent="fetchFiltered"
    ></filters-bar>
    <data-table
      :paginationLength="totalPages"
      table-type="active"
      :items="items"
      :headers="visibleHeaders"
      @page-changed="updatePage"
      multi-sort
      :sort-by-list.sync="sortByFields"
      :setting-headers.sync="headersFromStore"
    >
    </data-table>
  </div>
</template>
<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import Vue from "vue";
import { ActiveFileTableHeaders } from "./tableHeaders";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import FiltersBar from "@/widgets/FiltersBar/FiltersBar.vue";
import { ExtendedHeaderColumn } from "@/store/types/THeaders";

export default Vue.extend({
  name: `ActiveFilePage`,
  components: { DataTable, FiltersBar },
  data() {
    return {
      headers: ActiveFileTableHeaders,
      filters: {
        filepath: this.$store.state.activeFileTable.filepath,
        inode: this.$store.state.activeFileTable.inode,
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
  methods: {
    loadItems() {
      this.$store.dispatch("activeFileTable/loadItems");
    },
    updatePage(newPage: number) {
      this.$store.commit(`activeFileTable/SET_CURRENT_PAGE`, newPage);
      this.$store.dispatch(`activeFileTable/loadItems`);
    },
    async fetchFiltered() {
      await this.$store.dispatch(`activeFileTable/debouncedFetch`);
    },
  },
  mounted() {
    this.loadItems();
  },
  computed: {
    items(): TDataTableItems[] {
      return this.$store.state.activeFileTable.items;
    },
    totalPages(): number {
      return this.$store.state.activeFileTable.totalPages;
    },
    sortByFields(): string[] {
      return this.$store.state.tableActiveHeaderModule.sortByFields;
    },
    sortDescFields: {
      get(): boolean[] {
        return this.$store.state.tableActiveHeaderModule.sortDescFields || [];
      },
      set(value: boolean[]) {
        this.$store.commit(
          "tableActiveHeaderModule/SET_SORT_DESC_FIELDS",
          value
        );
      },
    },
    headersFromStore: {
      get(): ExtendedHeaderColumn[] {
        return this.$store.state.tableActiveHeaderModule.headers;
      },
      set(value: ExtendedHeaderColumn[]) {
        this.$store.commit("tableActiveHeaderModule/UPDATE_HEADERS", value);
      },
    },
    visibleHeaders(): ExtendedHeaderColumn[] {
      return this.headersFromStore.filter(
        (h: ExtendedHeaderColumn) => h.isVisible
      );
    },
  },
  created() {
    this.$store.commit(
      `tableActiveHeaderModule/SET_HEADERS`,
      ActiveFileTableHeaders
    );
  },
});
</script>
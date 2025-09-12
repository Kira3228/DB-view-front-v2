<template>
  <div>
    <filters-bar
      v-model="filters"
      :selectedPreset="currentPreset"
      :debouncedEvent="fetchFiltered"
      :presetOptions="presetOptions"
      @preset-change="handlePresetChange"
      :debouncedEventOnSelect="debouncedFetchPresets"
    ></filters-bar>
    <data-table
      :paginationLength="totalPages"
      table-type="active"
      :items="items"
      :headers="headersFromBackend"
      @page-changed="updatePage"
      multi-sort
      :sort-by-list.sync="sortByFields"
      :sortDescList.sync="sortDescFields"
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
    async fetchPresets() {
      return this.$store.dispatch(`activeFileTable/getPresets`);
    },
    async debouncedFetchPresets() {
      return await this.$store.dispatch(`activeFileTable/getHeaders`);
    },
    handlePresetChange(newPreset: string) {
      this.$store.commit(`activeFileTable/SET_PRESET`, newPreset);
    },
    async loadHeader() {
      await this.$store.dispatch("activeFileTable/getHeaders");
    },
  },
  async mounted() {
    await this.loadItems();
    await this.loadHeader();
    await this.fetchPresets();
    await this.$store.dispatch(`activeFileTable/getFilter`);
  },

  computed: {
    items(): TDataTableItems[] {
      return this.$store.state.activeFileTable.items;
    },
    totalPages(): number {
      return this.$store.state.activeFileTable.totalPages;
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
    currentPreset(): string {
      return this.$store.state.dataTable.preset || "";
    },
    presetOptions() {
      return this.$store.state.activeFileTable.presetList || [];
    },
    headersFromBackend() {
      return this.$store.state.activeFileTable.headers || [];
    },
    sortByFields: {
      get(): string[] {
        console.log(
          `Из EventLogPage`,
          this.$store.getters["activeFileTable/getSortBy"]
        );

        return this.$store.getters["activeFileTable/getSortBy"];
      },
      set(newSortList: string[]) {
        this.$store.commit(`activeFileTable/SET_SORT_BY`, newSortList);
      },
    },
    sortDescFields: {
      get(): boolean[] {
        return this.$store.getters["activeFileTable/getSortDesc"];
      },
      set(value: boolean[]) {
        this.$store.commit("activeFileTable/SET_SORT_DESC", value);
      },
    },
  },

  created() {
    this.$store.commit(
      `tableActiveHeaderModule/SET_HEADERS`,
      ActiveFileTableHeaders
    );
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
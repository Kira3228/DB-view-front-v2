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
      v-if="!isLoading"
      :paginationLength="totalPages"
      table-type="active"
      :items="items"
      :headers="headersFromBackend"
      @page-changed="updatePage"
      multi-sort
      :sort-by-list.sync="sortByFields"
      :sortDescList.sync="sortDescFields"
    >
    </data-table>
    <v-skeleton-loader v-else type="table-tbody"></v-skeleton-loader>
    <v-snackbar :color="getColor()" v-model="isStatusPending">
      {{ getText() }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="isStatusPending = false"
        >
          Закрыть
        </v-btn></template
      ></v-snackbar
    >
  </div>
</template>
<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import Vue from "vue";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import FiltersBar from "@/widgets/FiltersBar/FiltersBar.vue";

export default Vue.extend({
  name: `ActiveFilePage`,
  components: { DataTable, FiltersBar },
  data() {
    return {
      filters: {
        filepath: this.$store.state.activeFileTable.filepath,
        inode: this.$store.state.activeFileTable.inode,
      },
    };
  },

  methods: {
    getColor(): "red" | "green" {
      return this.$store.state.activeFileTable.isSuccessUpdateStatus
        ? "green"
        : "red";
    },
    getText(): string {
      return this.$store.state.activeFileTable.isSuccessUpdateStatus
        ? "Статус успешно обновлён"
        : "Ошибка обновления статуса";
    },
    loadItems() {
      this.$store.dispatch("activeFileTable/loadItems");
    },
    updatePage(page: number) {
      this.$store.commit("activeFileTable/SET_CURRENT_PAGE", page);
      this.loadItems();
    },
    fetchFiltered() {
      return this.$store.dispatch("activeFileTable/debouncedFetch");
    },
    fetchPresets() {
      return this.$store.dispatch("activeFileTable/getPresets");
    },
    debouncedFetchPresets() {
      return this.$store.dispatch("activeFileTable/getHeaders");
    },
    handlePresetChange(newPreset: string) {
      this.$store.commit("activeFileTable/SET_PRESET", newPreset);
    },
    loadHeader() {
      return this.$store.dispatch("activeFileTable/getHeaders");
    },
  },

  mounted() {
    this.loadItems();
    this.loadHeader();
    this.fetchPresets();
    this.$store.dispatch("activeFileTable/getFilter");
  },

  computed: {
    items(): TDataTableItems[] {
      return this.$store.state.activeFileTable.items;
    },
    totalPages(): number {
      return this.$store.state.activeFileTable.totalPages;
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
      get() {
        return this.$store.getters["activeFileTable/getSortBy"];
      },
      set(value: string[]) {
        this.$store.commit("activeFileTable/SET_SORT_BY", value);
      },
    },
    sortDescFields: {
      get() {
        return this.$store.getters["activeFileTable/getSortDesc"];
      },
      set(value: boolean[]) {
        this.$store.commit("activeFileTable/SET_SORT_DESC", value);
      },
    },
    isLoading() {
      return this.$store.state.activeFileTable.loading;
    },
    isStatusPending: {
      get() {
        return this.$store.state.activeFileTable.isStatusPending;
      },
      set() {
        this.$store.commit("activeFileTable/SET_STATUS_PENDING");
      },
    },
  },

  watch: {
    filters: {
      deep: true,
      handler(newVal) {
        this.$store.commit("activeFileTable/SET_FILEPATH", newVal.filepath);
        this.$store.commit("activeFileTable/SET_INODE", newVal.inode);
      },
    },
  },
});
</script>
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
    getColor(): `red` | `green` {
      const status = this.$store.state.activeFileTable.isSuccessUpdateStatus;
      if (status) {
        return `green`;
      }
      return `red`;
    },
    getText(): string {
      const status = this.$store.state.activeFileTable.isSuccessUpdateStatus;
      if (status) {
        return `Статус успешно обновлён`;
      }
      return `Ошибка обновления статуса`;
    },
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
    isLoading() {
      return this.$store.state.activeFileTable.loading;
    },
    isStatusPending: {
      get() {
        return this.$store.state.activeFileTable.isStatusPending;
      },
      set() {
        this.$store.commit(`activeFileTable/SET_STATUS_PENDING`);
      },
    },
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
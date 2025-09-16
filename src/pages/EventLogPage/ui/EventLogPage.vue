<template>
  <div>
    <event-log-filters></event-log-filters>
    <data-table
      v-if="!isLoading"
      :selected.sync="selectedItems"
      :paginationLength="totalPages"
      :items="items"
      :headers="headersFromBackend"
      @page-changed="updatePage"
      table-type="events"
      multi-sort
      :setting-headers.sync="headersFromBackend"
      :sort-by-list.sync="sortByFields"
      :sortDescList.sync="sortDescFields"
    >
      <template v-slot:header="{ props }">
        <tr>
          <th v-for="h in props.headers" :key="h.value">
            {{ h.text }}
          </th>
        </tr>
      </template>
    </data-table>
    <v-skeleton-loader v-else type="table-tbody"></v-skeleton-loader>
  </div>
</template>

<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import EventLogFilters from "@/widgets/EventLogFilters/EventLogFilters.vue";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import Vue from "vue";
import { ExtendedHeaderColumn } from "@/store/types/THeaders";

export default Vue.extend({
  name: `EventLogPage`,
  components: {
    EventLogFilters,
    DataTable,
  },
  data() {
    return {
      pages: 0,
    };
  },
  async mounted() {
    await this.$store.dispatch("dataTable/getPresets");
    await this.$store.dispatch("dataTable/getHeaders");
    await this.$store.dispatch("dataTable/getSort");

    await this.$store.dispatch("dataTable/loadItems");
  },
  methods: {
    updatePage(newPage: number) {
      this.$store.dispatch(`dataTable/updatePage`, newPage);
      this.$store.dispatch(`dataTable/updateTableItems`);
    },
  },
  computed: {
    sortByFields: {
      get(): string[] {
        return this.$store.getters["dataTable/getSortBy"];
      },
      set(newSortList: string[]) {
        this.$store.commit(`dataTable/SET_SORT_BY`, newSortList);
      },
    },
    sortDescFields: {
      get(): boolean[] {
        return this.$store.getters["dataTable/getSortDesc"];
      },
      set(value: boolean[]) {
        this.$store.commit("dataTable/SET_SORT_DESC", value);
      },
    },
    selectedItems: {
      get() {
        return this.$store.state.dataTable.selectedItems;
      },
      set(value: TDataTableItems[]) {
        this.$store.dispatch(`dataTable/updateSelection`, value);
      },
    },
    headersFromStore: {
      get(): ExtendedHeaderColumn[] {
        return this.$store.state.tableLogHeaderModule.headers;
      },
      set(value: ExtendedHeaderColumn[]) {
        this.$store.commit("tableLogHeaderModule/UPDATE_HEADERS", value);
      },
    },
    items(): TDataTableItems[] {
      return this.$store.state.dataTable.items;
    },
    totalPages(): number {
      return this.$store.state.dataTable.totalPages;
    },
    headersFromBackend() {
      return this.$store.state.dataTable.headers;
    },
    isLoading() {
      return this.$store.state.dataTable.loading;
    },
  },
});
</script>
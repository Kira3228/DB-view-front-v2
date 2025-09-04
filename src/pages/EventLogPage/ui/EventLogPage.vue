<template>
  <div class="">
    <event-log-filters></event-log-filters>
    <data-table
      :selected.sync="selectedItems"
      :paginationLength="totalPages"
      :items="items"
      :headers="headersFromBackend"
      @page-changed="updatePage"
      table-type="events"
      multi-sort
      :sort-by-list.sync="sortByFields"
      :setting-headers.sync="headersFromBackend"
    >
      <template v-slot:header="{ props }">
        <tr>
          <th v-for="h in props.headers" :key="h.value">
            {{ h.text }}
          </th>
        </tr>
      </template>
    </data-table>
  </div>
</template>

<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import EventLogFilters from "@/widgets/EventLogFilters/EventLogFilters.vue";
import { EventLogTableHeaders } from "./tableHeaders";
import { TDataTableItems } from "@/shared/UI/DataTable/TDataTableItems";
import Vue from "vue";
import { ExtendedHeaderColumn } from "@/store/types/DataTableItemsStore";

export default Vue.extend({
  name: `EventLogPage`,
  components: {
    EventLogFilters,
    DataTable,
  },
  data() {
    return {
      headers: EventLogTableHeaders,
      pages: 0,
    };
  },
  async mounted() {
    await this.loadHeader();
    await this.loadItems();

  },
  methods: {
    async loadItems() {
      await this.$store.dispatch("dataTable/loadItems");
    },
    updateSelection(items: TDataTableItems[]) {
      this.$store.dispatch(`dataTable/updateSelection`, items);
    },
    updatePage(newPage: number) {
      this.$store.dispatch(`dataTable/updatePage`, newPage);
      this.$store.dispatch(`dataTable/updateTableItems`);
    },
    async refreshData() {
      try {
        await this.loadItems();
      } catch (error) {
        console.error(error);
      }
    },
    async loadHeader() {
      await this.$store.dispatch("dataTable/getHeaders");
    },
  },
  computed: {
    sortDescFields: {
      get(): boolean[] {
        return this.$store.state.tableLogHeaderModule.sortDescFields || [];
      },
      set(value: boolean[]) {
        this.$store.commit("tableLogHeaderModule/SET_SORT_DESC_FIELDS", value);
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
      console.log(this.$store.state.dataTable.items);
      
      return this.$store.state.dataTable.items;
    },
    totalPages(): number {
      return this.$store.state.dataTable.totalPages;
    },
    selectedCount(): number {
      return this.$store.getters["dataTable/selectedCount"];
    },
    sortByFields(): string[] {
      return this.$store.state.tableLogHeaderModule.sortByFields;
    },
    visibleHeaders(): ExtendedHeaderColumn[] {
      return this.headersFromStore.filter(
        (h: ExtendedHeaderColumn) => h.isVisible
      );
    },
    headersFromBackend() {
      return this.$store.state.dataTable.headers;
    },
    presetsFromBackend() {
      return this.$store.state.dataTable.presetList;
    },
  },
  created() {
    this.$store.commit(
      `tableLogHeaderModule/SET_HEADERS`,
      EventLogTableHeaders
    );
  },
});
</script>
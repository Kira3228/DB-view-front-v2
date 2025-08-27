<template>
  <div class="">
    <event-log-filters></event-log-filters>
    <data-table
      :selected.sync="selectedItems"
      :paginationLength="totalPages"
      :items="items"
      :headers="visibleHeaders"
      @page-changed="updatePage"
      table-type="events"
    >
      <template v-slot:header="{ props }">
        <tr>
          <th v-for="h in props.headers" :key="h.value">
            {{ h.text }}
          </th>
        </tr>
      </template></data-table
    >
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
  },
  computed: {
    items(): TDataTableItems[] {
      return this.$store.state.dataTable.items;
    },
    totalPages(): number {
      return this.$store.state.dataTable.totalPages;
    },
    selectedCount(): number {
      return this.$store.getters["dataTable/selectedCount"];
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
      get() {
        return this.$store.state.tableHeaderModule.headers;
      },
      set(v) {
        this.$store.commit(`tableHeaderModule/UPDATE_HEADERS`, v);
      },
    },
    visibleHeaders(): ExtendedHeaderColumn[] {
      return this.headersFromStore.filter(
        (h: ExtendedHeaderColumn) => h.isVisible
      );
    },
  },
  created() {
    this.$store.commit(`tableHeaderModule/SET_HEADERS`, EventLogTableHeaders);
  },
});
</script>
<template>
  <div class="">
    <event-log-filters></event-log-filters>
    <data-table
      v-if="sortDataLoaded"
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
    <div v-else class="text-center pa-4">Загрузка таблицы...</div>
  </div>
</template>

<script lang="ts">
import DataTable from "@/shared/UI/DataTable/DataTable.vue";
import EventLogFilters from "@/widgets/EventLogFilters/EventLogFilters.vue";
import { EventLogTableHeaders } from "./tableHeaders";
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
      headers: EventLogTableHeaders,
      pages: 0,
      sortDataLoaded: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("dataTable/getPresets");
    await this.$store.dispatch("dataTable/getHeaders");
    await this.$store.dispatch("dataTable/getSort");
    this.sortDataLoaded = true;
    await this.$store.dispatch("dataTable/loadItems");
  },
  methods: {
    updateSelection(items: TDataTableItems[]) {
      this.$store.dispatch(`dataTable/updateSelection`, items);
    },
    updatePage(newPage: number) {
      this.$store.dispatch(`dataTable/updatePage`, newPage);
      this.$store.dispatch(`dataTable/updateTableItems`);
    },
    async refreshData() {
      try {
        await this.$store.dispatch("dataTable/loadItems");
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    sortByFields: {
      get(): string[] {
        console.log(
          `Из EventLogPage`,
          this.$store.getters["dataTable/getSortBy"]
        );

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
    selectedCount(): number {
      return this.$store.getters["dataTable/selectedCount"];
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
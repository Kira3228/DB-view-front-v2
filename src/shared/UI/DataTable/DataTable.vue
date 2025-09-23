<template>
  <div class="tw-w-full">
    <v-data-table
      :multi-sort="true"
      item-class="tw-w-full"
      :headers="headers"
      :items="items"
      calculate-widths
      v-model="localSelected"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :show-select="showSelect()"
      item-key="id"
      class="elevation-1 tw-text-xs"
      color="primary"
      :single-select="false"
      hide-default-footer
      dense
      :show-expand="expandable()"
      :sort-by.sync="localSortByList"
      :sort-desc.sync="sortDescFields"
    >
      <template
        v-if="tableType === `events`"
        v-slot:expanded-item="{ headers, item }"
      >
        <td :colspan="headers.length">
          <pre>
            {{ JSON.stringify(item.eventData, null, 2) }}
          </pre>
        </td>
      </template>
      <template v-slot:item.eventData="{ item }">
        <v-tooltip top color="primary">
          <template v-slot:activator="{ on, attrs }">
            <p v-bind="attrs" v-on="on" class="tw-text-xs tw-truncate tw-w-40">
              {{ JSON.stringify(item.eventData, null, 2) }}
            </p>
          </template>
          <span>
            <p class="tw-text-black">
              {{ JSON.stringify(item.eventData, null, 2) }}
            </p>
          </span>
        </v-tooltip>
      </template>
      <template
        v-if="tableType === 'active'"
        v-slot:item.changeStatus="{ item }"
      >
        <div class="tw-flex tw-flex-col tw-justify-center tw-align-middle">
          <select-input
            @input="(newStatus) => onUpdate(item.id, newStatus)"
            :value="item.status"
            :items="statusOptions"
          />
        </div>
      </template>
      <template v-slot:item.timestamp="{ item }">
        <p class="tw-text-xs">
          {{ formatDate(item.timestamp) }}
        </p>
      </template>

      <template v-if="tableType === 'active'" v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)">{{ item.status }} </v-chip>
      </template>

      <template v-slot:top>
        <div class="tw-flex tw-items-center">
          <div class="tw-flex tw-items-center tw-gap-2">
            <v-switch
              v-if="tableType === 'active'"
              v-model="isArchived"
              label="Архив"
              class="pa-3"
            ></v-switch>
          </div>
        </div>
      </template>
    </v-data-table>

    <v-pagination
      @input="handleChangePage"
      v-model="localPage"
      :total-visible="7"
      :length="paginationLength"
    >
    </v-pagination>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { DataTableHeader } from "vuetify";
import SelectInput from "../SelectInput/SelectInput.vue";
import { TDataTableItems } from "./TDataTableItems";
import { statusOptions } from "@/widgets/ActiveFileFilters/StatusOptions/StatusOptions";

export default Vue.extend({
  components: { SelectInput },
  name: "DataTable",
  props: {
    selected: {
      type: Array as PropType<TDataTableItems[]>,
      default: (): TDataTableItems[] => [],
    },
    headers: {
      type: Array as PropType<DataTableHeader[]>,
      default: (): DataTableHeader[] => [],
    },
    items: {
      type: Array as PropType<TDataTableItems[]>,
      default: (): TDataTableItems[] => [],
    },
    paginationLength: {
      type: Number,
      default: 0,
    },
    page: { type: Number, default: 1 },
    tableType: {
      type: String as PropType<"events" | "active" | "archive">,
      required: true,
    },
    sortByList: {
      type: Array,
      default: (): string[] => [],
    },
    sortDescList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      localPage: this.page,
      itemsPerPage: 14,
      statusOptions: statusOptions,
    };
  },

  computed: {
    sortDescFields: {
      get() {
        return this.sortDescList;
      },
      set(value) {
        this.$emit("update:sortDescList", value);
      },
    },
    localSelected: {
      get(): TDataTableItems[] {
        return this.selected;
      },
      set(this: Vue, value: TDataTableItems[]) {
        this.$emit("update:selected", value);
      },
    },
    isArchived: {
      get(): boolean {
        return this.$store.state.activeFileTable.isArchived;
      },
      set(newValue: boolean) {
        this.$store.commit(`activeFileTable/SET_SWITCH`, newValue);
      },
    },
    localSortByList: {
      get() {
        return this.sortByList;
      },
      set(value) {
        this.$emit("update:sortByList", value);
      },
    },
  },

  methods: {
    handleChangePage(newPage: number) {
      this.localPage = newPage;
      this.$emit("update:page", newPage);
      this.$emit("page-changed", newPage);
    },
    expandable(): boolean {
      return this.tableType === "events";
    },
    showSelect(): boolean {
      return this.tableType === "events";
    },
    getColor(status: string): string {
      if (status === `active`) return `green`;
      else if (status === `archived`) return `orange`;
      else return `red`;
    },
    async onUpdate(itemId: string, newStatus: string) {
      await this.$store.dispatch(`activeFileTable/updateStatus`, {
        id: Number(itemId),
        status: newStatus,
      });
    },
    formatDate(date: string): string {
      return date ? date.split("T")[0] : "";
    },
  },

  watch: {
    page(newPage: number) {
      this.localPage = newPage;
    },
    async isArchived(newValue: boolean) {
      await this.$store.dispatch(`activeFileTable/switchToArchive`, newValue);
    },
  },
});
</script>

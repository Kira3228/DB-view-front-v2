<template>
  <div class="tw-w-full">
    <v-data-table
      item-class="tw-w-full"
      :headers="headers"
      :items="items"
      calculate-widths
      v-model="localSelected"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :show-select="showSelect()"
      item-key="id"
      class="elevation-1"
      color="primary"
      :single-select="false"
      hide-default-footer
      dense
      :show-expand="expandable()"
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

      <template
        v-if="tableType === 'active'"
        v-slot:item.changeStatus="{ item }"
      >
        <div class="tw-flex tw-flex-col tw-justify-center tw-align-middle">
          <select-input :items="statusOptions" />
        </div>
      </template>

      <template v-if="tableType === 'active'" v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)">{{ item.status }} </v-chip>
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
import { statusOptions } from "@/widgets/EventLogFilters/SelectOptions/StatusOptions";

interface DataTableData {
  pageCount: number;
  localPage: number;
  itemsPerPage: number;
}

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
  },
  mounted() {
    if (this.tableType === "events") {
      console.log(true);

      return true;
    } else console.log(false);
  },

  data() {
    return {
      pageCount: 0,
      localPage: this.page,
      itemsPerPage: 14,
      statusOptions: statusOptions,
    };
  },
  computed: {
    localSelected: {
      get(): TDataTableItems[] {
        return this.selected;
      },
      set(this: Vue, value: TDataTableItems[]) {
        this.$emit("update:selected", value);
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
      if (this.tableType === "events") {
        console.log(true);

        return true;
      } else {
        console.log(false);
        return false;
      }
    },
    showSelect(): boolean {
      if (this.tableType === "events") {
        console.log(true);

        return true;
      } else {
        console.log(false);
        return false;
      }
    },
    getColor(status: string): string {
      if (status === `active`) return `green`;
      else if (status === `archived`) return `orange`;
      else return `red`;
    },
  },
  watch: {
    page(newPage: number) {
      this.localPage = newPage;
    },
  },
});
</script>

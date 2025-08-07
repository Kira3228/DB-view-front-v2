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
          <select-input
            @input="(newStatus) => onUpdate(item.id, newStatus)"
            :value="item.status"
            :items="statusOptions"
          />
        </div>
      </template>

      <template v-if="tableType === 'active'" v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)">{{ item.status }} </v-chip>
      </template>

      <template v-if="tableType === 'active'" v-slot:top>
        <v-switch v-model="isArchived" label="Архив" class="pa-3"></v-switch>
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
    selectedStatus: {
      get(): string {
        return this.$store.state.activeFileTable.status;
      },
      set() {},
    },
    isArchived: {
      get(): boolean {
        return this.$store.state.activeFileTable.isArchived;
      },
      set(newValue: boolean) {
        this.$store.commit(`activeFileTable/SET_SWITCH`, newValue);
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
        return true;
      } else {
        return false;
      }
    },
    showSelect(): boolean {
      if (this.tableType === "events") {
        return true;
      } else {
        return false;
      }
    },
    getColor(status: string): string {
      if (status === `active`) return `green`;
      else if (status === `archived`) return `orange`;
      else return `red`;
    },
    async onUpdate(itemId: string, newStatus: string) {
      console.log(`itemIDIDIDID`, itemId);

      await this.$store.dispatch(`activeFileTable/updateStatus`, {
        id: Number(itemId),
        status: newStatus,
      });
    },
  },
  watch: {
    page(newPage: number) {
      this.localPage = newPage;
    },
    async isArchived(newValue: boolean) {
      console.log(newValue);

      await this.$store.dispatch(`activeFileTable/switchToArchive`, newValue);
    },
  },
});
</script>

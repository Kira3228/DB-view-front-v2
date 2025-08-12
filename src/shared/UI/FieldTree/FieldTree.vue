<template>
  <div>
    <v-treeview
      dense
      v-model="selected"
      return-object
      selectable
      :items="items"
      @input="update"
    >
      <template v-slot:label="{ item }">
        <div class="tw-flex tw-items-center tw-gap-2">
          <span class="font-weight-medium tw-truncate">{{ item.label }}</span>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script lang="ts">
import {
  ReportFields,
  SelectedReportFields,
} from "@/store/types/DataTableItemsStore";
import { FieldTreeOptions } from "@/widgets/ReportFilters/FieldTreeOption";
import Vue from "vue";

export default Vue.extend({
  name: "FieldTree",
  props: {},
  data() {
    return {
      selected: [] as ReportFields[],
      items: FieldTreeOptions,
    };
  },
  methods: {
    update(selectedItems: ReportFields[]) {
      this.selected = selectedItems;

      const selectedFields = this.convertToSelectedFields(selectedItems);

      this.$store.commit("reportModule/SET_SELECTED_FIELDS", selectedFields);
    },

    convertToSelectedFields(
      selectedItems: ReportFields[]
    ): SelectedReportFields {
      const selectedFields: SelectedReportFields = {
        id: false,
        eventType: false,
        eventData: false,
        severity: false,
        source: false,
        timestamp: false,
        relatedFileId: {
          id: false,
          fileSystemId: false,
          inode: false,
          filePath: false,
          fileName: false,
          fileSize: false,
          createdAt: false,
          modifiedAt: false,
          isOriginalMarked: false,
          maxChainDepth: false,
          minChainDepth: false,
          status: false,
          extendedAttributes: false,
        },
        relatedProcessId: {
          id: false,
          pid: false,
          executablePath: false,
          commandLine: false,
          parentPid: false,
          groupId: false,
          createdAt: false,
          processStartTime: false,
        },
      };

      selectedItems.forEach((item) => {
        const key = item.key;

        if (
          key in selectedFields &&
          typeof selectedFields[key as keyof SelectedReportFields] === "boolean"
        ) {
          (selectedFields as any)[key] = true;
        }

        if (key.includes(".")) {
          const [parentKey, childKey] = key.split(".");

          if (
            parentKey === "relatedFileId" &&
            childKey in selectedFields.relatedFileId
          ) {
            (selectedFields.relatedFileId as any)[childKey] = true;
          }

          if (
            parentKey === "relatedProcessId" &&
            childKey in selectedFields.relatedProcessId
          ) {
            (selectedFields.relatedProcessId as any)[childKey] = true;
          }
        }
      });

      return selectedFields;
    },
  },

  computed: {
    selectbleFields(): string {
      return JSON.stringify(
        this.$store.getters["reportModule/reportObject"],
        null,
        2
      );
    },
  },
});
</script>

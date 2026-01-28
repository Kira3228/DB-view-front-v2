<template>
  <Dialog @download="handleDownload" title="Экспорт данных" v-model="dialogIsOpen">
    <template #content>
      <div class="tw-grid tw-gap-12 tw-grid-cols-3 tw-grid-rows-2">
        <UiSelect
          label="Поля"
          multiple
          return-object
          item-value="value"
          item-text="text"
          class="tw-col-start-1"
          :items="headers"
          v-model="selectedHeaders"
        />
        <UiSelect
          :items="[`docx`, 'pdf', 'xlsx', `csv`]"
          label="Формат"
          class="tw-col-start-2"
          v-model="reportFormat"
        />
        <DateInput v-model="startDate" label="От" class="tw-col-start-2" />
        <DateInput v-model="endDate" label="До" />
      </div> </template
  ></Dialog>
</template>
<script lang="ts" setup>
import { Dialog } from "@/common-components/src/components/Dialog";
import { useLogReportModel } from "../model/model";
import { UiSelect } from "@/common-components/src/components/Select";
import DateInput from "@/common-components/src/components/DateInput/DateInput.vue";
import { ref, watch } from "vue";
import { Header } from "@/common-components/src/components/DataTable";

const { dialogIsOpen, headers, reportFormat, getReport } = useLogReportModel();

const startDate = ref<string>("");
const endDate = ref<string>("");

const selectedHeaders = ref<Header[]>([]);

const handleDownload = async () => {
  const headerArray = selectedHeaders.value.map((header) => {
    header.text;
    header.value;
    return {
      text: header.text,
      value: header.value,
    };
  });

  getReport({
    headers: headerArray,
    format: reportFormat.value,
    endDate: endDate.value,
    startDate: startDate.value,
  });
};

watch([startDate, endDate], ([newStart, newEnd], [oldStart, oldEnd]) => {
  if (!newStart || !newEnd) return;
  const start = new Date(newStart);
  const end = new Date(newEnd);
  if (start.getTime() > end.getTime()) {
    endDate.value = startDate.value;
  }
});
</script>

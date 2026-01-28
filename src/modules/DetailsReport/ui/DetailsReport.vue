<template>
  <Dialog
    @download="handleDownload"
    v-model="modalIsOpen"
    title="Экспорт цепочек"
  >
    <template #content>
      <div class="tw-grid tw-grid-cols-2 tw-grid-rows-2 tw-gap-8">
        <UiSelect
          label="Формат"
          v-model="format"
          :items="[`docx`, 'xlsx', 'pdf']"
        />
        <UiSelect />
        <DateInput v-model="startDate" label="От" />
        <DateInput v-model="endDate" label="До" />
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import DateInput from "@/common-components/src/components/DateInput/DateInput.vue";
import { Dialog } from "@/common-components/src/components/Dialog";
import { UiSelect } from "@/common-components/src/components/Select";
import { watch } from "vue";
import { useDetailsReportModel } from "../model/model";

const { endDate, modalIsOpen, startDate, getReport, format } =
  useDetailsReportModel();

watch([startDate, endDate], ([newStart, newEnd], [oldStart, oldEnd]) => {
  if (!newStart || !newEnd) return;
  const start = new Date(newStart);
  const end = new Date(newEnd);
  if (start.getTime() > end.getTime()) {
    endDate.value = startDate.value;
  }
});

const handleDownload = () => {
  getReport({
    endDate: endDate.value,
    startDate: startDate.value,
    format: format.value,
  });
};
</script>

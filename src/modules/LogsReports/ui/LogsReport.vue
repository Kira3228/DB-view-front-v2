<template>
  <Dialog title="Экспорт данных" v-model="dialogIsOpen">
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
        />
        <UiSelect
          :items="[`docx`, 'pptx', 'xslx']"
          label="Формат"
          class="tw-col-start-2"
          v-model="reportFormat"
        />
        <DateInput label="От" class="tw-col-start-2" />
        <DateInput label="До" />
      </div> </template
  ></Dialog>
</template>
<script lang="ts" setup>
import { Dialog } from "@/common-components/src/components/Dialog";
import { useLogReportModel } from "../model/model";
import { UiSelect } from "@/common-components/src/components/Select";
import DateInput from "@/common-components/src/components/DateInput/DateInput.vue";

const { dialogIsOpen, headers, reportFormat } = useLogReportModel();
</script>

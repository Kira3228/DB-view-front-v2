<template>
  <v-card class="tw-p-2">
    <div class="tw-flex tw-flex-col tw-gap-3">
      <span class="tw-font-semibold"> Параметры отчёта </span>
      <UiSelect label="Тип операции" />
      <DateInput label="Период - С" />
      <DateInput label="Период - По" />
      <v-btn-toggle v-model="val" class="tw-flex tw-w-full tw-justify-between">
        <Button height="30" outlined>PDF</Button>
        <Button height="30" outlined>DOCX</Button>
        <Button height="30" outlined>CSV</Button>
      </v-btn-toggle>
      <Button block height="30">
        <span class="tw-text-white"> Сгенерировать </span>
      </Button>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { Button } from "@/common-components/src/components/Button";
import { DataTable } from "@/common-components/src/components/DataTable";
import { DateInput } from "@/common-components/src/components/DateInput";
import { UiSelect } from "@/common-components/src/components/Select";
import { ref } from "vue";

interface Props {}
const val = ref();
const props = defineProps<Props>();
</script>

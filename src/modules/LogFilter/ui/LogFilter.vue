<template>
  <div class="tw-flex tw-gap-3 tw-items-center">
    <TextInput
      class="tw-flex-1"
      label="Id системы"
      placeholder="/usr/tpm"
      v-model="systemId"
    />

    <UiSelect
      class="tw-flex-1"
      v-model="type"
      label="Тип события"
      :items="eventType"
      clearable
    />
    <UiSelect
      class="tw-flex-1"
      v-model="status"
      label="Статус"
      return-object
      :items="statuses"
      item-value="value"
      item-text="label"
      clearable
    />
    <TextInput
      class="tw-flex-1"
      label="Путь к файлу"
      placeholder="/usr/tpm"
      v-model="filePath"
    />
    <DateInput label="От" v-model="startDate" />
    <DateInput label="До" v-model="endDate" />

    <Button @click="resetFilters" outlined :height="32">Сбросить</Button>
  </div>
</template>
<script lang="ts" setup>
import { UiSelect } from "@/common-components/src/components/Select";
import { TextInput } from "@/common-components/src/components/TextInput";
import { DateInput } from "@/common-components/src/components/DateInput";
import { useLogFilterModel } from "../model";
import { onMounted } from "vue";
import { Button } from "@/common-components/src/components/Button";

type StatusSelectItem = { label: string; value: string };
const statuses: StatusSelectItem[] = [
  { label: `Архивный`, value: "archived" },
  { label: "Активный", value: "active" },
  { label: "Удалённый", value: "deleted" },
];

const {
  loadStatusTypes,
  eventType,
  status,
  systemId,
  filePath,
  endDate,
  startDate,
  type,
  resetFilters,
} = useLogFilterModel();

onMounted(() => {
  loadStatusTypes();
});
</script>

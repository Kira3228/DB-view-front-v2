<template>
  <Drawer :value="value" @input="handleClose">
    <template #content>
      <div class="tw-p-5">
        <TextInput label="Процесс"></TextInput>
        <TextInput label="Оригинальный файл"></TextInput>
        <UiSelect />
        <DateInput label="Старт отслеживания" />
        <DateInput label="Дата удаления" />
      </div>
    </template>
  </Drawer>
</template>
<script setup lang="ts">
import { DateInput } from "@/common-components/src/components/DateInput";
import { UiSelect } from "@/common-components/src/components/Select";
import { TextInput } from "@/common-components/src/components/TextInput";
import { Drawer } from "@/components/Drawer";

interface Props {
  value?: boolean;
}

const emit = defineEmits<{ (e: `input`, data: boolean): void }>();
const props = defineProps<Props>();

const handleClose = (value: boolean) => {
  emit(`input`, value);
};
</script>

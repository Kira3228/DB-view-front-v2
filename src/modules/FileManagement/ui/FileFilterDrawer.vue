<template>
  <Drawer :value="value" @input="handleClose">
    <template #content>
      <div class="tw-p-5 tw-h-full tw-flex tw-flex-col tw-justify-between">
        <div class="tw-flex tw-flex-col tw-gap-3">
          <div class="tw-flex tw-flex-col tw-gap-2">
            <TextInput
              outlined
              placeholder="Например, be2925b5-72ac-4d61-a5b2-873a744f6683"
              label="Файловая система"
            />
            <TextInput
              outlined
              placeholder="Например, 12"
              label="Номер версии"
            />
            <TextInput
              outlined
              placeholder="Например, astra"
              label="Пользователь"
            />
            <TextInput outlined placeholder="Например, " label="Процесс" />
          </div>
          <div class="tw-flex tw-gap-2">
            <DateInput outlined label="Начало отслеживания" />
            <DateInput outlined label="Дата создания" />
            <DateInput outlined label="Дата операции" />
          </div>
          <div class="tw-flex tw-gap-2 tw-w-full">
            <UiSelect
              class="tw-flex-1 tw-min-w-0 tw-w-1/2"
              outlined
              label="Тип операции"
              :items="[`read`, `write`, `delete`, `rename`]"
              clearable
            />
            <UiSelect
              class="tw-flex-1 tw-min-w-0 tw-w-1/2"
              outlined
              label="Тип файла в цепочке"
              :items="[`read`, `write`, `delete`, `rename`]"
              clearable
            />
          </div>
        </div>
        <div class="tw-right-0 tw-bottom-0 tw-w-full tw-flex tw-gap-3">
          <Button height="32">Применить фильтры</Button>
          <Button height="32" outlined>Сбросить</Button>
        </div>
      </div>
    </template>
  </Drawer>
</template>
<script setup lang="ts">
import Button from "@/common-components/src/components/Button/Button.vue";
import { DateInput } from "@/common-components/src/components/DateInput";
import { UiSelect } from "@/common-components/src/components/Select";
import { TextInput } from "@/common-components/src/components/TextInput";
import { Drawer } from "@/components/Drawer";

interface Props {
  value?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{ (e: `input`, data: boolean): void }>();

const handleClose = (value: boolean) => {
  emit(`input`, value);
};
</script>

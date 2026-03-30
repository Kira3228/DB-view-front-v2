<template>
  <Drawer :value="value" @input="handleClose">
    <template #content>
      <div class="tw-p-5 tw-h-full tw-flex tw-flex-col tw-justify-between">
        <div class="tw-flex tw-flex-col tw-gap-3">
          <div class="tw-flex tw-flex-col tw-gap-2">
            <TextInput
              v-model="fileManagementFilter.localFilters.value.filesystemId"
              outlined
              placeholder="Например, be2925b5-72ac-4d61-a5b2-873a744f6683"
              label="Файловая система"
            />
            <TextInput
              v-model="fileManagementFilter.localFilters.value.versionNumber"
              outlined
              placeholder="Например, 12"
              label="Номер версии"
            />
            <TextInput
              v-model="fileManagementFilter.localFilters.value.osUserId"
              outlined
              placeholder="Например, astra"
              label="Пользователь"
            />
            <TextInput
              outlined
              v-model="fileManagementFilter.localFilters.value.process"
              placeholder="Например, "
              label="Процесс"
            />
          </div>
          <div class="tw-flex tw-gap-2">
            <DateInput
              v-model="
                fileManagementFilter.localFilters.value.trackingStartedAt
              "
              outlined
              label="Начало отслеживания"
            />
            <DateInput
              v-model="fileManagementFilter.localFilters.value.birthTime"
              outlined
              label="Дата создания"
            />
          </div>
          <div class="tw-flex tw-gap-2 tw-w-full">
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
          <Button @click="fileManagementFilter.applyFilters" height="32"
            ><span class="tw-text-white"> Применить фильтры </span>
          </Button>
          <Button
            @click="fileManagementFilter.resetFilters"
            height="32"
            outlined
            >Сбросить</Button
          >
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
import { useFileManagementFilter } from "../model/use-file-management-filters";

interface Props {
  value?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{ (e: `input`, data: boolean): void }>();

const handleClose = (value: boolean) => {
  emit(`input`, value);
};

const fileManagementFilter = useFileManagementFilter(handleClose);
</script>

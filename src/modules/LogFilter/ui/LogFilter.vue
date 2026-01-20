<template>
  <div class="tw-flex tw-gap-3">
    <TextInput
      class="tw-flex-1"
      label="Id системы"
      placeholder="/usr/tpm"
      value=""
    />

    <UiSelect
      class="tw-flex-1"
      v-model="test"
      label="Тип события"
      :items="[`asd`, 'zxc', 'qwe']"
    />
    <UiSelect
      class="tw-flex-1"
      v-model="test"
      label="Статус"
      :items="[`asd`, 'zxc', 'qwe']"
    />
    <TextInput
      class="tw-flex-1"
      label="Путь к файлу"
      placeholder="/usr/tpm"
      value=""
    />
    <DateInput />
    <DateInput />
  </div>
</template>
<script lang="ts" setup>
import { UiSelect } from "@/common-components/src/components/Select";
import { TextInput } from "@/common-components/src/components/TextInput";
import { DateInput } from "@/common-components/src/components/DateInput";
import { onMounted, ref, watch } from "vue";
const test = ref("asdasdads");
onMounted(() => {
  console.log(test);
});
</script>

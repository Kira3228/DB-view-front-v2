<template>
  <div class="tw-h-16 tw-flex">
    <TextInput
      v-model="inode"
      label="Inode / Путь к файлу"
      placeholder="1234/ \example\file"
    />
  </div>
</template>
<script lang="ts" setup>
import { TextInput } from "@/common-components/src/components/TextInput";
import { useActiveFileFiltersModel } from "../model/model";

const { inode } = useActiveFileFiltersModel();
</script>

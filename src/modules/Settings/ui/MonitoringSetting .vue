<template>
  <div>
    <v-card class="tw-p-2">
      <span>Пути мониторинга</span>
      <TextInput outlined />

      <v-chip v-for="chip in chips" :key="chip" small>
        {{ chip }}
      </v-chip>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import TextInput from "@/common-components/src/components/TextInput/TextInput.vue";

interface Props {
  chips?: string[];
}
const props = defineProps<Props>();
</script>

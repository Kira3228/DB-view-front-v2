<template>
  <v-card class="tw-p-4 tw-w-1/2">
    <div class="tw-flex tw-flex-col tw-gap-2">
      <select-input v-model="type" :items="types" label="Тип"></select-input>
      <select-input
        v-model="format"
        :items="formats"
        label="Формат"
      ></select-input>
      <report-filters :type="type"></report-filters>
      <custom-button
        @click="handleClick"
        title="Загрузить отчёт"
      ></custom-button>
    </div>
  </v-card>
</template>

<script lang="ts">
import CustomButton from "@/shared/UI/CustomButton/CustomButton.vue";
import SelectInput from "@/shared/UI/SelectInput/SelectInput.vue";
import ReportFilters from "@/widgets/ReportFilters/ReportFilters.vue";
import Vue from "vue";
import { typeOptions } from "./options/type-options";
import { formatOptions } from "./options/format-options";
import { TOption } from "@/shared/UI/SelectInput/TOptions";

export default Vue.extend({
  name: "ReportPage",
  components: {
    SelectInput,
    CustomButton,
    ReportFilters,
  },
  data() {
    return {
      types: typeOptions, 
      formats: formatOptions, 
    };
  },
  methods: {
    handleClick() {
      this.$store.dispatch("reportModule/downloadReport");
    },
  },
  computed: {
    type: {
      get(): TOption {
        return this.$store.state.reportModule.reportType;
      },
      set(newVal: TOption) {
        console.log("Setting type:", newVal);
        this.$store.commit("reportModule/SET_TYPE", newVal);
      },
    },
    format: {
      get(): TOption {
        return this.$store.state.reportModule.reportFormat;
      },
      set(newVal: TOption) {
        console.log("Setting format:", newVal);
        this.$store.commit("reportModule/SET_FORMAT", newVal);
      },
    },
  },
});
</script>

<template>
  <div>
    <report-filters></report-filters>
    <select-input :items="types" @input="handleChangeType"></select-input>
    <select-input :items="formats" @input="handleChangeFormat"></select-input>

    <custom-button @click="handleClick" title="Загрузить отчёт"></custom-button>
  </div>
</template>
<script lang="ts">
import CustomButton from "@/shared/UI/CustomButton/CustomButton.vue";
import SelectInput from "@/shared/UI/SelectInput/SelectInput.vue";
import ReportFilters from "@/widgets/ReportFilters/ReportFilters.vue";
import Vue from "vue";
import { typeOptions } from "./options/type-options";
import { formatOptions } from "./options/format-options";

export default Vue.extend({
  name: `ReportPage`,
  components: {
    SelectInput,
    CustomButton,
    ReportFilters,
  },
  data() {
    return {
      min: -50,
      max: 90,
      range: [-20, 70],
      types: typeOptions,
      formats: formatOptions,
    };
  },
  methods: {
    handleClick() {
      this.$store.dispatch(`reportModule/downloadReport`);
    },
    handleChangeType() {
      this.$store.commit(`reportModule/SET_TYPE`);
    },
    handleChangeFormat() {
      this.$store.commit(`reportModule/SET_FORMAT`);
    },
  },
});
</script>
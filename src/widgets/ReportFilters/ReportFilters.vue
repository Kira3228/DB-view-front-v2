<template>
  <div>
    <date-input @input="handleDateChange"></date-input>
    <field-tree v-if="shouldShowFieldTree"></field-tree>
    <custom-slider
      v-if="shouldShowCustomSlider"
      :max="20"
      :min="0"
      :range="depthRange"
      @update-slider="handleUpdateSlider"
    ></custom-slider>
  </div>
</template>

<script lang="ts">
import DateInput from "@/shared/UI/DateInput/DateInput.vue";
import FieldTree from "@/shared/UI/FieldTree/FieldTree.vue";
import { TOption } from "@/shared/UI/SelectInput/TOptions";
import CustomSlider from "@/shared/UI/Slider/CustomSlider.vue";
import Vue from "vue";
export default Vue.extend({
  name: `ReportFilters`,
  components: { CustomSlider, DateInput, FieldTree },
  props: {
    type: {
      type: [Object, String],
      default: () => ({ label: "", value: "" }),
    },
  },
  methods: {
    handleUpdateSlider(newVal: number[]) {
      this.$store.commit("reportModule/SET_DEPTH", newVal);
    },
    handleDateChange(newVal: string[]) {
      console.log("Date changed:", newVal);
      this.$store.commit("reportModule/SET_DATE", newVal);
    },
  },
  computed: {
    range() {
      return ["", ""];
    },

    normalizedType(): TOption {
      if (typeof this.type === "string") {
        return { label: this.type, value: this.type };
      }
      return this.type || { label: "", value: "" };
    },

    shouldShowFieldTree(): boolean {
      return this.normalizedType.value === "event";
    },
    shouldShowCustomSlider(): boolean {
      return this.normalizedType.value === "chains";
    },
    depthRange(): number[] {
      return this.$store.state.reportModule.depht || [5, 10];
    },

    typeDebug(): string {
      return `Type: ${JSON.stringify(this.type)} | Normalized: ${JSON.stringify(
        this.normalizedType
      )}`;
    },
    // dateRange: {
    //   get(): string[] {
    //     return this.$store.state.reportModule.date;
    //   },
    //   set(newVal: string[]) {
    //     this.$store.commit(`reportModule/SET_DATE`, newVal);
    //   },
    // },
  },
});
</script>
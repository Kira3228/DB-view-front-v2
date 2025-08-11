<template>
  <div>
    <date-input></date-input>
    <field-tree></field-tree>
    <custom-slider :max="20" :min="0" :range="[5, 10]"></custom-slider>
  </div>
</template>

<script lang="ts">
import DateInput from "@/shared/UI/DateInput/DateInput.vue";
import FieldTree from "@/shared/UI/FieldTree/FieldTree.vue";
import CustomSlider from "@/shared/UI/Slider/CustomSlider.vue";
import Vue from "vue";
export default Vue.extend({
  name: `ReportFilters`,
  components: { CustomSlider, DateInput, FieldTree },
});
</script>
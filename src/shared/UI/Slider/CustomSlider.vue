<template>
  <div>
    <label>Глубина</label>
    <v-range-slider
      v-model="localRange"
      :max="max"
      :min="min"
      hide-details
      class="align-center"
      @input="handleUpdate"
    >
      <template v-slot:prepend>
        <v-text-field
          :value="localRange[0]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="updateRangeValue(0, $event)"
        ></v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field
          :value="localRange[1]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="updateRangeValue(1, $event)"
        ></v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: `CustomSlider`,
  props: {
    range: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      localRange: [...this.range] as number[],
    };
  },
  methods: {
    handleUpdate(newVal: number[]) {
      this.localRange = [...newVal];
      this.$emit("update-slider", newVal);
    },
    updateRangeValue(index: number, value: string | number) {
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (!isNaN(numValue)) {
        const newRange = [...this.localRange];
        newRange[index] = numValue;
        this.localRange = newRange;
        this.$emit("update-slider", newRange);
      }
    },
  },
  watch: {
    range: {
      handler(newVal: number[]) {
        this.localRange = [...newVal];
      },
      immediate: true,
    },
  },
});
</script>
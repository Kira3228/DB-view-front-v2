<template>
  <v-range-slider
    v-model="range"
    :max="max"
    :min="min"
    hide-details
    class="align-center"
  >
    <template v-slot:prepend>
      <v-text-field
        :value="range[0]"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        style="width: 60px"
        @change="$set(range, 0, $event)"
      ></v-text-field>
    </template>
    <template v-slot:append>
      <v-text-field
        :value="range[1]"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        style="width: 60px"
        @change="$set(range, 1, $event)"
      ></v-text-field>
    </template>
  </v-range-slider>
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
      default: 0,
    },
    min: {
      type: Number,
      default: 100,
    },
  },
  methods: {},
});
</script>
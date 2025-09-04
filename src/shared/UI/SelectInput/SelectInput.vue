<template>
  <v-select
    solo
    dense
    :placeholder="placeholder"
    :label="label"
    item-text="label"
    item-value="value"
    single-line
    :items="items"
    :value="selectedValue"
    color="primary"
    @input="handleSelect"
    style="max-width: 250px"
    :hide-details="true"
  ></v-select>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { TOption } from "./TOptions";
import { useDebounce } from "@/shared/utils/debounce";

export default defineComponent({
  name: "CustomSelect",
  props: {
    label: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: (): TOption[] | string[] => [],
    },
    placeholder: {
      type: String,
      default: "Выберите опцию",
    },
    value: {
      type: [String, Number, Object, Array],
      default: null,
    },
  },

  data() {
    return {
      debounce: null as ReturnType<typeof useDebounce> | null,
      selectedValue: this.value,
    };
  },
  created() {
    this.debounce = useDebounce();
  },
  methods: {
    handleSelect(newValue: string) {
      this.$emit("input", newValue);
      if (this.debounce) {
        this.debounce.debounce(() => {
          this.$emit(`debounce`, newValue);
        });
      }
    },
  },
  watch: {
    value(newVal) {
      this.selectedValue = newVal;
    },
  },
});
</script>

<template>
  <div>
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          clearable
          :value="dateRangeText"
          :label="label"
          persistent-hint
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          dense
          style="font-size: small"
          @click:clear="localValue = []"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="localValue"
        no-title
        range
        @input="onDateChange"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { useDebounce } from "@/shared/utils/debounce";
import { defineComponent, PropType } from "@vue/composition-api";

export default defineComponent({
  name: "DateInput",
  props: {
    label: {
      type: String,
      default: "Дата",
    },
    value: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  data() {
    return {
      dates: [] as string[],
      menu2: false,
      debounce: null as ReturnType<typeof useDebounce> | null,
    };
  },
  created() {
    this.debounce = useDebounce();
  },
  methods: {
    onDateChange(selectedDates: string[]) {
      this.$emit(`input`, selectedDates);
      if (this.debounce) {
        this.debounce.debounce(() => {
          this.$emit("debounce", selectedDates);
        }, 500);
      }
      if (selectedDates.length === 2) {
        this.menu2 = false;
      }
    },
  },
  watch: {
    localValue(newVal: string[]) {
      this.onDateChange(newVal);
    },
  },
  computed: {
    dateRangeText(): string {
      return this.value
        .map((val) => {
          const [year, month, day] = val.split(`-`);
          return `${day}-${month}-${year}`;
        })
        .join(`~`);
    },
    localValue: {
      get(): string[] | null {
        return this.value;
      },
      set(newVal: string[] | null) {
        this.$emit(`input`, newVal);
        if (newVal && newVal.length === 2) {
          this.menu2 = false;
        }
      },
    },
  },
});
</script>
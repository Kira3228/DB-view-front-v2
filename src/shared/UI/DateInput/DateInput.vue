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
          @click:clear="clearDates"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="localDates"
        no-title
        range
        @input="handleDatePickerChange"
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
      localDates: [] as string[],
      menu2: false,
      debounce: null as ReturnType<typeof useDebounce> | null,
    };
  },
  created() {
    this.debounce = useDebounce();
    this.localDates = [...this.value];
  },
  methods: {
    handleDatePickerChange(selectedDates: string[]) {
      console.log("Date picker changed:", selectedDates);

      this.localDates = selectedDates || [];

      this.$emit("input", this.localDates);

      if (this.debounce) {
        this.debounce.debounce(() => {
          this.$emit("debounce", this.localDates);
        }, 500);
      }

      if (this.localDates.length === 2) {
        this.menu2 = false;
      }
    },

    clearDates() {
      this.localDates = [];
      this.$emit("input", []);
    },
  },
  computed: {
    dateRangeText(): string {
      return this.localDates
        .map((val) => {
          if (!val) return "";
          const [year, month, day] = val.split("-");
          return `${day}-${month}-${year}`;
        })
        .filter(Boolean)
        .join("~");
    },
  },
  watch: {
    value: {
      handler(newVal: string[]) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localDates)) {
          this.localDates = [...(newVal || [])];
        }
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

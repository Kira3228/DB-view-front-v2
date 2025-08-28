<template>
  <div>
    <v-textarea
      v-if="textarea"
      :value="value"
      filled
      auto-grow
      :label="label"
      @input="handleInput"
    >
    </v-textarea>
    <v-text-field
      v-else
      dense
      :label="label"
      :placeholder="placeholder"
      :value="value"
      color="primary"
      solo
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { useDebounce } from "@/shared/utils/debounce";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: `TextInput`,
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    textarea: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      debounce: null as ReturnType<typeof useDebounce> | null,
      localValue: this.value,
    };
  },
  created() {
    this.debounce = useDebounce();
  },
  methods: {
    handleInput(newValue: string) {
      this.$emit(`input`, newValue);

      if (this.debounce) {
        this.debounce.debounce(() => {
          this.$emit("debounce", newValue);
        }, 500);
      }
    },
  },
  beforeDestroy() {
    if (this.debounce) {
      this.debounce.destroy();
    }
  },
});
</script>
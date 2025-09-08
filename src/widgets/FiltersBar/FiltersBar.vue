<template>
  <div class="tw-flex">
    <div class="tw-flex tw-w-2/3 tw-gap-x-2">
      <text-input
        :value="value.filepath"
        label="Путь"
        placeholder="Путь"
        @input="updateFilePath"
        @debounce="onDebounce"
      >
      </text-input>
      <text-input
        :value="value.inode"
        label="Inode"
        placeholder="Inode"
        @input="updateInode"
        @debounce="onDebounce"
      ></text-input>
      <select-input
        :value="selectedPreset"
        :items="presetOptions"
        placeholder="Пресет"
        @input="updatePreset"
        @debounce="onSelectDebounce"
      ></select-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import SelectInput from "@/shared/UI/SelectInput/SelectInput.vue";

interface IFilterValue {
  filepath: string;
  inode: string;
}

export default Vue.extend({
  name: `FiltersBar`,
  components: {
    TextInput,
    SelectInput,
  },
  props: {
    value: {
      type: Object as () => IFilterValue,
      required: true,
      default: (): IFilterValue => ({ filepath: "", inode: "" }),
    },
    selectedPreset: {
      type: String,
      default: ``,
    },
    debouncedEvent: {
      type: Function,
      required: false,
      default: null,
    },
    debouncedEventOnSelect: {
      type: Function,
      required: false,
      default: null,
    },
    presetOptions: {
      type: Array as () => string[],
      default: (): string[] => [],
    },
  },
  data() {
    return {
      localFilepath: this.value.filepath || "",
      localInode: this.value.inode || "",
    };
  },
  methods: {
    updateFilePath(newValue: string) {
      this.$emit(`input`, {
        ...this.value,
        filepath: newValue,
      });
    },
    updateInode(newValue: string) {
      this.$emit(`input`, {
        ...this.value,
        inode: newValue,
      });
    },

    updatePreset(newValue: string) {
      this.$emit("preset-change", newValue);
    },
    onDebounce(): void {
      if (typeof this.debouncedEvent === "function") {
        this.debouncedEvent();
      } else {
        this.$emit("debounce");
      }
    },
    onSelectDebounce(): void {
      if (typeof this.debouncedEventOnSelect === `function`) {
        this.debouncedEventOnSelect();
      } else {
        this.$emit(`select-debounce`);
      }
    },
  },
  computed: {},
});
</script>

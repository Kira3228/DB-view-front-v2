<template>
  <div class="tw-flex">
    <div class="tw-flex tw-w-2/3 tw-gap-x-2">
      <text-input
        v-model="localFilepath"
        label="Путь"
        placeholder="Путь"
        @debounce="onDebounce"
      >
      </text-input>
      <text-input
        v-model="localInode"
        label="Inode"
        placeholder="Inode"
        @debounce="onDebounce"
      ></text-input>
      <select-input placeholder="Пресет"></select-input>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import SelectInput from "@/shared/UI/SelectInput/SelectInput.vue";

export default Vue.extend({
  name: `FiltersBar`,
  components: {
    TextInput,
    SelectInput,
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({ filepath: "", inode: "" }),
    },
    debouncedEvent: {
      type: Function,
      require: false,
      default: null,
    },
  },
  data() {
    return {
      localFilepath: this.value.filepath || "",
      localInode: this.value.inode || "",
    };
  },
  watch: {
    value: {
      deep: true,
      handler(newVal) {
        this.localFilepath = newVal.filepath || "";
        this.localInode = newVal.inode || "";
      },
    },
    localFilepath() {
      this.emitChange();
    },
    localInode() {
      this.emitChange();
    },
  },
  methods: {
    emitChange() {
      this.$emit("input", {
        filepath: this.localFilepath,
        inode: this.localInode,
      });
    },
    onDebounce() {
      if (typeof this.debounceEvent === "function") {
        this.debounceEvent();
      } else {
        this.$emit("debounce");
      }
    },
  },
});
</script>

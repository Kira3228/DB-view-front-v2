<template>
  <div>
    <text-input
      :textarea="true"
      v-model="fileExseption"
      label="Исключения файлов"
      @input="handleFileExseptionChange"
      @debounce="saveSettings"
    ></text-input>
    <text-input
      :textarea="true"
      v-model="processExseption"
      label="Исключения процессов"
      @input="handleProcessExseptionChange"
      @debounce="saveSettings()"
    ></text-input>
  </div>
</template>

<script lang="ts">
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import Vue from "vue";

export default Vue.extend({
  name: "SettingPage",
  components: {
    TextInput,
  },
  data() {
    return {
      fileExseption: "",
      processExseption: "",
    };
  },
  methods: {
    saveSettings() {
      localStorage.setItem("fileExseption", this.fileExseption);
      localStorage.setItem("processExseption", this.processExseption);
    },

    handleFileExseptionChange(newValue: string) {
      this.fileExseption = newValue;
    },

    handleProcessExseptionChange(newValue: string) {
      this.processExseption = newValue;
    },

    loadSettings() {
      this.fileExseption = localStorage.getItem("fileExseption") || "";
      this.processExseption = localStorage.getItem("processExseption") || "";
    },
  },

  mounted() {
    this.loadSettings();
  },
});
</script>

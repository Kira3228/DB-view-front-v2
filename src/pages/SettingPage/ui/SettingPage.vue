<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SettingPage",
  components: {},
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

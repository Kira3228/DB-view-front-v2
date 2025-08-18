<template>
  <div>
    <v-switch
      v-model="$vuetify.theme.dark"
      inset
      label="Сменить тему"
      persistent-hint
      @change="saveTheme"
    ></v-switch>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ThemeButton",
  mounted() {
    const savedTheme = localStorage.getItem("isDarkTheme");
    if (savedTheme !== null) {
      this.$vuetify.theme.dark = savedTheme === "true";
    }
  },
  methods: {
    saveTheme(value: boolean) {
      localStorage.setItem("isDarkTheme", String(value));
    },
  },
});
</script>

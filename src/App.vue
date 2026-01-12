<template>
  <div id="app">
    <v-app class="tw-p-0"> <test-page-vue></test-page-vue> </v-app>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TestPageVue from "./pages/TestPage.vue";
export default Vue.extend({
  components: {
    TestPageVue,
  },
});
</script>

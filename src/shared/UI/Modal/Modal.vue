<template>
  <v-dialog transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <custom-button title="Настройка" color="primary" v-bind="attrs" v-on="on">
      </custom-button>
    </template>
    <template v-slot:default="dialog">
      <v-card class="tw-p-2">
        <order-change></order-change>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import CustomButton from "../CustomButton/CustomButton.vue";
import OrderChange from "@/widgets/OrderChange/OrderChange.vue";
import Test from "../test/Test2.vue";

export default Vue.extend({
  name: `Modal`,
  components: {
    CustomButton,
    Test,
    OrderChange,
  },
});
</script>
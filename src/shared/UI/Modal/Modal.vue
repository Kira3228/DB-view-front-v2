<template>
  <v-dialog transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <custom-button title="Настройка" color="primary" v-bind="attrs" v-on="on">
      </custom-button>
    </template>
    <template v-slot:default="dialog">
      <v-card class="tw-p-2">
        <order-change v-model="model"></order-change>
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
import { DataTableHeader } from "vuetify";
import { ExtendedHeaderColumn } from "@/store/types/DataTableItemsStore";

export default Vue.extend({
  name: `Modal`,
  components: {
    CustomButton,
    OrderChange,
  },
  methods: {},
  props: {
    headers: { type: Array as () => ExtendedHeaderColumn[], default: () => [] },
  },
  computed: {
    model: {
      get(): ExtendedHeaderColumn[] {
        return this.headers;
      },
      set(v: ExtendedHeaderColumn[]) {
        this.$emit("update:headers", v);
      },
    },
  },
});
</script>
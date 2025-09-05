<template>
  <v-dialog transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <custom-button title="Настройка" color="primary" v-bind="attrs" v-on="on">
      </custom-button>
    </template>
    <template v-slot:default="dialog">
      <v-card class="tw-p-2">
        <order-change
          :sort-by-list.sync="sortByListModel"
          :sort-desc-list.sync="sortDescListModel"
          v-model="model"
        ></order-change>
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
import { ExtendedHeaderColumn } from "@/store/types/THeaders";

export default Vue.extend({
  name: `Modal`,
  components: {
    CustomButton,
    OrderChange,
  },
  methods: {},
  props: {
    headers: { type: Array as () => ExtendedHeaderColumn[], default: () => [] },
    sortByList: { type: Array as () => string[], default: () => [] },
    sortDescList: { type: Array as () => boolean[], default: () => [] },
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
    sortByListModel: {
      get(): string[] {
        return this.sortByList;
      },
      set(v: string[]) {
        this.$emit("update:sortByList", v);
      },
    },
    sortDescListModel: {
      get(): boolean[] {
        return this.sortDescList;
      },
      set(v: boolean[]) {
        this.$emit("update:sortDescList", v);
      },
    },
  },
  mounted() {},
});
</script>
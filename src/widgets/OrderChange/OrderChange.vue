<template>
  <div>
    <draggable
      class="tw-flex tw-gap-1"
      v-model="local"
      tag="v-card"
      :animation="150"
      ghost-class="drag-ghost"
      :component-data="{ props: { flat: true }, attrs: { class: 'tw-p-2' } }"
    >
      <v-card
        class="tw-cursor-move"
        v-for="header in local"
        :key="header.value"
      >
        <div>
          <v-icon small class="mr-2">mdi-drag</v-icon>
          <text-input v-model="header.text" placeholder="Название"></text-input>
          <v-checkbox v-model="header.isVisible" label="Видимость"></v-checkbox>
          <v-checkbox
            v-model="sortByModel"
            :value="header.value"
            label="Приоритет соритровки"
          ></v-checkbox>
        </div>
        <text-input v-model="header.width" placeholder="Ширина px"></text-input>
      </v-card>
    </draggable>
  </div>
</template>
<script lang="ts">
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import { ExtendedHeaderColumn } from "@/store/types/DataTableItemsStore";
import Vue from "vue";
import draggable from "vuedraggable";
import { DataTableHeader } from "vuetify";

export default Vue.extend({
  name: `OrderChange`,
  components: { draggable, TextInput },
  props: {
    value: { type: Array as () => DataTableHeader[], default: () => [] },
    sortByList: { type: Array as () => string[], default: () => [] },
  },
  computed: {
    sortByModel: {
      get(): string[] {
        return this.sortByList;
      },
      set(v: string[]) {
        this.$emit(`update/sortByList`, v);
      },
    },
    local: {
      get(): ExtendedHeaderColumn[] {
        return this.value as ExtendedHeaderColumn[];
      },
      set(v: ExtendedHeaderColumn[]) {
        this.$emit("input", v);
      },
    },
  },
});
</script>

<style scoped>
.drag-ghost {
  opacity: 0.5;
}
.handle {
  cursor: move;
}
</style>

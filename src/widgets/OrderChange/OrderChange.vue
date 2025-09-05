<template>
  <div>
    <draggable
      class="tw-flex tw-gap-1"
      v-model="local"
      item-key="value"
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
            :disabled="!header.sortable"
            :input-value="sortByModel.includes(header.value)"
            @change="toggleSortBy(header.value)"
            label="Приоритет сортировки"
          ></v-checkbox>
        </div>
        <text-input v-model="header.width" placeholder="Ширина px"></text-input>
      </v-card>
    </draggable>
  </div>
</template>
<script lang="ts">
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import { ExtendedHeaderColumn } from "@/store/types/THeaders";
import Vue from "vue";
import draggable from "vuedraggable";
import { DataTableHeader } from "vuetify";

export default Vue.extend({
  name: `OrderChange`,
  components: { draggable, TextInput },
  props: {
    value: { type: Array as () => DataTableHeader[], default: () => [] },
    sortByList: { type: Array as () => string[], default: () => [] },
    sortDescList: { type: Array as () => boolean[], default: () => [] },
  },
  computed: {
    sortByModel() {
      return this.sortByList;
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
  methods: {
    toggleSortBy(value: string) {
      const newSortByList = [...this.sortByModel];
      const index = newSortByList.indexOf(value);

      if (index === -1) {
        newSortByList.push(value);
      } else {
        newSortByList.splice(index, 1);
      }

      this.$emit("update:sortByList", newSortByList);
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

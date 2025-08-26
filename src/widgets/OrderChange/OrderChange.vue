<template>
  <div>
    <draggable class="tw-flex tw-gap-1" v-model="headers" tag="v-card">
      <v-card
        class="tw-cursor-move tw-w-32 tw-h-16"
        v-for="(header, index) in headers"
        :key="header.name"
      >
        <v-icon small class="mr-2">mdi-drag</v-icon>
        {{ header.name }}
        {{ index }}
        <text-input placeholder="Ширина px"></text-input>
      </v-card>
    </draggable>
  </div>
</template>
<script>
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import Vue from "vue";
import draggable from "vuedraggable";

export default Vue.extend({
  components: { draggable, TextInput },
  props: {},
  data: () => ({
    headers: [{ name: `id` }, { name: `name` }, { name: `жопа` }],

    dragging: false,
    items: [
      { id: 1, title: "Задача 1", subtitle: "Описание" },
      { id: 2, title: "Задача 2", subtitle: "Описание" },
      { id: 3, title: "Задача 3", subtitle: "Описание" },
    ],
  }),
});
</script>

<style>
.drag-ghost {
  opacity: 0.5;
}
.handle {
  cursor: move;
}
</style>

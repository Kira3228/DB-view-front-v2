<template>
  <div>
    <v-treeview
      :open="initiallyOpen"
      :items="items"
      activatable
      item-key="name"
      open-on-click
      dense
      class="tw-h-full tw-overflow-y-auto tw-overflow-x-hidden"
    >
      <template v-slot:label="{ item }">
        <div class="tw-flex tw-items-center tw-gap-2">
          <span class="font-weight-medium tw-truncate">{{ item.name }}</span>

          <span
            v-if="item.status"
            :class="getColor(item.status)"
            class="font-weight-thin tw-text-xs"
          >
            {{ item.status }}
          </span>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: `FileDetailsTree`,
  data: () => ({
    initiallyOpen: ["public"],
    tree: [],
  }),
  methods: {
    getColor(status: string) {
      switch (status) {
        case `deleted`:
          return `tw-text-red-600`;
        case `archived`:
          return `tw-text-orange-600`;
        case `active`:
          return `tw-text-green-600`;
        default:
          ``;
      }
    },
    async loadData() {
      this.$store.dispatch(`fileDetailsModule/loadItems`);
    },
  },
  async mounted() {
    await this.loadData();
  },
  computed: {
    items() {
      return this.$store.getters[`fileDetailsModule/getFileHierarchyObj`];
    },
  },
});
</script>

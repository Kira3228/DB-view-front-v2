<template>
  <div class="tw-flex tw-flex-col">
    <div class="tw-flex tw-mb-3 tw-gap-2">
      <custom-button
        @click="downloadAllLogReport"
        title="Экспортировать всё"
      ></custom-button>
      <custom-button
        @click="downloadSelectedLogReport"
        title="Экспортировать выделенное"
        :isDisabled="!isDisabled"
      ></custom-button>
      <select-input
        :items="presetOptions"
        v-model="selectedPreset"
        placeholder="Пресет"
        @debounce="fetchPreset"
      ></select-input>
    </div>
    <div class="tw-flex tw-justify-between">
      <div class="tw-flex tw-w-2/3 tw-gap-x-2">
        <text-input
          v-model="filepath"
          label="Путь"
          placeholder="Путь"
          @debounce="fetchFiltered"
        ></text-input>
        <p>{{ filepath }}</p>
        <text-input
          v-model="systemId"
          label="Id системы"
          placeholder="Id системы"
          @debounce="fetchFiltered"
        ></text-input>
        <select-input
          v-model="selectedEvent"
          :items="events"
          placeholder="Тип события"
          @debounce="fetchFiltered"
        ></select-input>
        <select-input
          v-model="selectedStatus"
          :items="status"
          placeholder="Статус"
          @debounce="fetchFiltered"
        ></select-input>
        <date-input @debounce="fetchFiltered" v-model="dateRange"></date-input>
      </div>
    </div>
  </div>
</template>Видимость
<script lang="ts">
import CustomButton from "@/shared/UI/CustomButton/CustomButton.vue";
import DateInput from "@/shared/UI/DateInput/DateInput.vue";
import SelectInput from "@/shared/UI/SelectInput/SelectInput.vue";
import TextInput from "@/shared/UI/TextInput/TextInput.vue";
import { eventOptions } from "./SelectOptions/EventOptions";
import { statusOptions } from "./SelectOptions/StatusOptions";
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: `EventLogFilters`,
  components: {
    TextInput,
    SelectInput,
    DateInput,
    CustomButton,
  },
  data() {
    return { status: statusOptions, events: eventOptions };
  },
  async mounted() {
    await this.$store.dispatch(`dataTable/getPresets`);
  },
  methods: {
    async downloadSelectedLogReport() {
      return await this.$store.dispatch(`dataTable/downloadSelectedLogReport`);
    },
    async downloadAllLogReport() {
      return await this.$store.dispatch(`dataTable/downloadAllLogReport`);
    },
    async fetchFiltered() {
      return await this.$store.dispatch(`dataTable/debouncedFetch`);
    },
    async fetchPreset() {
      return await this.$store.dispatch(`dataTable/getHeaders`);
    },
  },
  computed: {
    presetOptions: {
      get(): string[] {
        return this.$store.state.dataTable.presetList;
      },
      set() {},
    },
    isDisabled(): boolean {
      return this.$store.getters[`dataTable/hasSelection`];
    },
    filepath: {
      get(): string {
        return this.$store.state.dataTable.filepath;
      },
      set(newValue: string) {
        this.$store.commit(`dataTable/SET_FILEPATH`, newValue);
      },
    },
    systemId: {
      get(): string {
        return this.$store.state.dataTable.inode;
      },
      set(newValue: string) {
        this.$store.commit(`dataTable/SET_SYSTEM_ID`, newValue);
      },
    },
    selectedEvent: {
      get(): string {
        return this.$store.state.dataTable.typeOfEvent;
      },
      set(newType: string) {
        this.$store.commit(`dataTable/SET_TYPE_OF_EVENT`, newType);
      },
    },
    selectedStatus: {
      get(): string {
        return this.$store.state.dataTable.status;
      },
      set(newType: string) {
        this.$store.commit(`dataTable/SET_STATUS`, newType);
      },
    },
    dateRange: {
      get(): string[] {
        return this.$store.state.dataTable.dateRange;
      },
      set(newDateRange: string[]) {
        this.$store.commit(`dataTable/SET_DATE_RANGE`, newDateRange);
      },
    },
    selectedPreset: {
      get(): string {
        return this.$store.state.dataTable.preset;
      },
      set(newPreset: string) {
        this.$store.commit(`dataTable/SET_PRESET`, newPreset);
      },
    },
  },
});
</script>
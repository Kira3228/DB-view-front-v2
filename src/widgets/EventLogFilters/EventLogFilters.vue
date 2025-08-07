<template>
  <div class="tw-flex tw-flex-col">
    <div>
      <div class="tw-flex tw-mb-3 tw-gap-2">
        <custom-button
          @click="downloadAllLogReport"
          title="Экспортировать всё"
        ></custom-button>
        <custom-button
          @click="downloadSelectedLogReport"
          title="Экспортировать выделенное"
          :isDisabled="!isDisbled"
        ></custom-button>
      </div>
      <div class="tw-flex">
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
        </div>
        <div class="tw-w-1/6">
          <date-input
            @debounce="fetchFiltered"
            v-model="dateRange"
          ></date-input>
        </div>
      </div>
    </div>
  </div>
</template>
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
    return {
      pathName: "",
      date: [],
      status: statusOptions,
      events: eventOptions,
    };
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
    test() {
      console.log(`хуй`);
    },
  },
  computed: {
    isDisbled(): boolean {
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
  },
});
</script>
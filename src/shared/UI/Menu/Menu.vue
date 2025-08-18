<template>
  <div class="tw-flex">
    <v-list class="tw-w-56 tw-min-w-[224px] tw-h-full" nav dense>
      <div class="tw-flex tw-flex-col tw-justify-between tw-h-full">
        <div>
          <v-list-item
            color="primary"
            v-for="item in menuItems"
            :key="item.route"
            :to="item.route"
            link
            exact
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </div>
        <theme-button></theme-button>
      </div>
    </v-list>
    <v-main class="tw-flex-1">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ThemeButton from "../ThemeButton/ThemeButton.vue";
export default defineComponent({
  name: "MainMenu",
  components: { ThemeButton },
  data() {
    return {
      menuItems: [
        {
          title: "Журнал событий",
          icon: "mdi-home",
          route: "/",
        },
        {
          title: "Активные файлы",
          icon: "mdi-folder",
          route: "/active-files",
        },
        {
          title: "Детали файла",
          icon: "mdi-star",
          route: "/details",
        },
        {
          title: "Настройки",
          icon: "mdi-star",
          route: "/settings",
        },
        {
          title: "Отчёты",
          icon: "mdi-star",
          route: "/report-list",
        },
      ],
    };
  },
});
</script>

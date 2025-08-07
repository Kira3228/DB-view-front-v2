<template>
  <div class="tw-flex">
    <v-list class="tw-w-56 tw-min-w-[224px]" nav dense>
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
    </v-list>
    <v-main>
      <v-container fluid class="">
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "MainMenu",
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
          title: "Архив",
          icon: "mdi-account-multiple",
          route: "/archive",
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

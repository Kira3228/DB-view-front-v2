<template>
  <div class="tw-h-screen tw-flex tw-relative tw-overflow-hidden">
    <AppMenu :items="menuItems" />
    <Button
      height="32"
      :color="isDark ? 'white' : 'black'"
      outlined
      class="theme"
      @click="handleThemeChange"
    >
      {{ isDark ? "Светлая тема" : "Темная тема" }}
    </Button>
    <div
      class="tw-p-4 tw-flex-1 tw-min-w-0 tw-min-h-0 tw-overflow-hidden tw-flex tw-flex-col"
    >
      <RouterView class="tw-flex-1 tw-min-h-0" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Menu as AppMenu,
  TMenuItem,
} from "@/common-components/src/components/Menu";
import { RouterView } from "vue-router";
import { Button } from "@/common-components/src/components/Button";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import {
  ListIcon,
  ControlIcon,
  ReportIcon,
} from "@/common-components/src/components/Icons";

const instance = getCurrentInstance();
const vuetify = instance?.proxy?.$vuetify;

const isDark = ref(false);

const applyTheme = () => {
  if (vuetify) {
    vuetify.theme.dark = isDark.value;
  }
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const menuItems = computed<TMenuItem[]>(() => {
  const currentTheme = isDark.value ? "dark" : `light`;

  return [
    {
      title: "Журнал операций",
      icon: ListIcon,
      iconProps: {
        theme: currentTheme,
      },
      to: `/events`,
    },
    {
      title: "Управление файлами",
      icon: ControlIcon,
      iconProps: {
        theme: currentTheme,
      },
      to: `/management`,
    },
    {
      title: "Отчёты",
      icon: ReportIcon,
      iconProps: {
        theme: currentTheme,
      },
      to: `/reports`,
    },
    {
      title: "Настройки",
      to: `/settings`,
      iconProps: {
        theme: currentTheme,
      },
    },
  ];
});

onMounted(() => {
  const savedTheme = localStorage.getItem("PMOVT-theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }
  applyTheme();
});

const handleThemeChange = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("PMOVT-theme", isDark.value ? "dark" : "light");
  applyTheme();
};
</script>
<style scoped lang="scss">
.theme {
  position: absolute;
  bottom: 16px;
  left: 16px;
}
</style>
